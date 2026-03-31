import type { Order, DailyEarnings, VideoPerformance, Product, DashboardStats, OrderFilters } from "@/types";
import { getSupabaseClient } from "./client";

// Row types matching the DB schema
type OrderRow = {
  id: string;
  product_name: string;
  product_image: string;
  order_date: string;
  sale_amount: number;
  commission_rate: number;
  commission_earned: number;
  status: string;
  video_id: string | null;
};

type VideoRow = {
  video_id: string;
  title: string;
  thumbnail_url: string;
  views: number;
  clicks: number;
  conversions: number;
  earnings: number;
  posted_date: string;
};

function mapOrder(row: OrderRow): Order {
  return {
    id: row.id,
    productName: row.product_name,
    productImage: row.product_image,
    orderDate: new Date(row.order_date),
    saleAmount: Number(row.sale_amount),
    commissionRate: Number(row.commission_rate),
    commissionEarned: Number(row.commission_earned),
    status: row.status as Order["status"],
    videoId: row.video_id ?? undefined,
  };
}

function mapVideo(row: VideoRow): VideoPerformance {
  return {
    videoId: row.video_id,
    title: row.title,
    thumbnailUrl: row.thumbnail_url,
    views: row.views,
    clicks: row.clicks,
    conversions: row.conversions,
    earnings: Number(row.earnings),
    postedDate: new Date(row.posted_date),
  };
}

function formatDate(d: Date): string {
  return d.toISOString().split("T")[0];
}

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

// --- Data functions ---

export async function getOrders(filters?: Partial<OrderFilters>): Promise<Order[]> {
  const supabase = getSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query = supabase.from("orders").select("*") as any;

  if (filters?.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }
  if (filters?.dateRange && filters.dateRange !== "all") {
    const msMap = { today: 1, "7d": 7, "30d": 30 };
    const days = msMap[filters.dateRange];
    query = query.gte("order_date", daysAgo(days).toISOString());
  }

  const sortBy = filters?.sortBy ?? "date";
  const sortOrder = filters?.sortOrder ?? "desc";
  const ascending = sortOrder === "asc";
  if (sortBy === "date") query = query.order("order_date", { ascending });
  else if (sortBy === "amount") query = query.order("sale_amount", { ascending });
  else if (sortBy === "commission") query = query.order("commission_earned", { ascending });

  const { data, error } = await query;
  if (error) throw error;
  return ((data ?? []) as OrderRow[]).map(mapOrder);
}

export async function getDailyEarnings(days: number = 30): Promise<DailyEarnings[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await (supabase
    .from("orders")
    .select("order_date, commission_earned, status")
    .gte("order_date", daysAgo(days).toISOString()) as unknown as Promise<{
      data: Pick<OrderRow, "order_date" | "commission_earned" | "status">[] | null;
      error: { message: string } | null;
    }>);
  if (error) throw error;

  const earnings: Map<string, DailyEarnings> = new Map();
  for (const row of data ?? []) {
    if (row.status === "cancelled" || row.status === "refunded") continue;
    const date = formatDate(new Date(row.order_date));
    const existing = earnings.get(date) ?? { date, totalEarnings: 0, orderCount: 0 };
    existing.totalEarnings = +(existing.totalEarnings + Number(row.commission_earned)).toFixed(2);
    existing.orderCount += 1;
    earnings.set(date, existing);
  }
  for (let i = 0; i < days; i++) {
    const date = formatDate(daysAgo(i));
    if (!earnings.has(date)) earnings.set(date, { date, totalEarnings: 0, orderCount: 0 });
  }
  return Array.from(earnings.values()).sort((a, b) => a.date.localeCompare(b.date));
}

export async function getTopProducts(limit: number = 5): Promise<Product[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await (supabase
    .from("orders")
    .select("product_name, product_image, commission_earned, commission_rate, status") as unknown as Promise<{
      data: Pick<OrderRow, "product_name" | "product_image" | "commission_earned" | "commission_rate" | "status">[] | null;
      error: { message: string } | null;
    }>);
  if (error) throw error;

  const productMap = new Map<string, Product>();
  for (const row of data ?? []) {
    if (row.status === "cancelled" || row.status === "refunded") continue;
    const existing = productMap.get(row.product_name);
    if (existing) {
      existing.totalOrders += 1;
      existing.totalEarnings = +(existing.totalEarnings + Number(row.commission_earned)).toFixed(2);
    } else {
      productMap.set(row.product_name, {
        id: `PROD-${productMap.size + 1}`,
        name: row.product_name,
        image: row.product_image,
        totalOrders: 1,
        totalEarnings: +Number(row.commission_earned).toFixed(2),
        commissionRate: Number(row.commission_rate),
      });
    }
  }
  return Array.from(productMap.values())
    .sort((a, b) => b.totalEarnings - a.totalEarnings)
    .slice(0, limit);
}

export async function getVideoPerformance(): Promise<VideoPerformance[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await (supabase
    .from("videos")
    .select("*")
    .order("earnings", { ascending: false }) as unknown as Promise<{
      data: VideoRow[] | null;
      error: { message: string } | null;
    }>);
  if (error) throw error;
  return (data ?? []).map(mapVideo);
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = getSupabaseClient();
  type StatsRow = Pick<OrderRow, "order_date" | "commission_earned" | "commission_rate" | "status">;

  const { data, error } = await (supabase
    .from("orders")
    .select("order_date, commission_earned, commission_rate, status")
    .gte("order_date", daysAgo(60).toISOString()) as unknown as Promise<{
      data: StatsRow[] | null;
      error: { message: string } | null;
    }>);
  if (error) throw error;

  const now = Date.now();
  const last30 = (data ?? []).filter((o) => {
    const diff = Math.floor((now - new Date(o.order_date).getTime()) / (1000 * 60 * 60 * 24));
    return diff <= 30 && o.status !== "cancelled" && o.status !== "refunded";
  });
  const prev30 = (data ?? []).filter((o) => {
    const diff = Math.floor((now - new Date(o.order_date).getTime()) / (1000 * 60 * 60 * 24));
    return diff > 30 && diff <= 60 && o.status !== "cancelled" && o.status !== "refunded";
  });

  const { data: pendingData } = await (supabase
    .from("orders")
    .select("commission_earned")
    .eq("status", "pending") as unknown as Promise<{
      data: Pick<OrderRow, "commission_earned">[] | null;
      error: { message: string } | null;
    }>);

  const totalEarnings = last30.reduce((s, o) => s + Number(o.commission_earned), 0);
  const prevEarnings = prev30.reduce((s, o) => s + Number(o.commission_earned), 0);
  const avgCommission = last30.length
    ? last30.reduce((s, o) => s + Number(o.commission_rate), 0) / last30.length
    : 0;
  const prevAvgCommission = prev30.length
    ? prev30.reduce((s, o) => s + Number(o.commission_rate), 0) / prev30.length
    : 0;
  const pendingPayout = (pendingData ?? []).reduce((s, o) => s + Number(o.commission_earned), 0);

  const pctChange = (curr: number, prev: number) =>
    prev === 0 ? 0 : +((curr - prev) / prev * 100).toFixed(1);

  return {
    totalEarnings: +totalEarnings.toFixed(2),
    totalOrders: last30.length,
    avgCommission: +(avgCommission * 100).toFixed(1),
    pendingPayout: +pendingPayout.toFixed(2),
    earningsChange: pctChange(totalEarnings, prevEarnings),
    ordersChange: pctChange(last30.length, prev30.length),
    commissionChange: pctChange(avgCommission, prevAvgCommission),
  };
}
