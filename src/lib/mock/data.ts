import type { Order, DailyEarnings, VideoPerformance, Product } from "@/types";

// Realistic TikTok Shop products that actually trend on the platform
const PRODUCTS = [
  { name: "LED Vanity Mirror with Lights", price: 34.99, commission: 0.18 },
  { name: "Portable Blender Cup", price: 24.99, commission: 0.22 },
  { name: "Cloud Slides Slippers", price: 19.99, commission: 0.15 },
  { name: "Sunset Lamp Projector", price: 29.99, commission: 0.20 },
  { name: "Ice Roller for Face", price: 12.99, commission: 0.25 },
  { name: "Mini Waffle Maker", price: 15.99, commission: 0.18 },
  { name: "Scalp Massager Shampoo Brush", price: 8.99, commission: 0.30 },
  { name: "Phone Camera Lens Kit", price: 22.99, commission: 0.16 },
  { name: "Acrylic Nail Kit Set", price: 18.99, commission: 0.20 },
  { name: "LED Strip Lights 50ft", price: 14.99, commission: 0.22 },
  { name: "Ceramic Hair Curling Iron", price: 39.99, commission: 0.15 },
  { name: "Reusable Water Bottle 40oz", price: 27.99, commission: 0.18 },
  { name: "Wireless Earbuds Pro", price: 49.99, commission: 0.12 },
  { name: "Lip Gloss Set (6 Pack)", price: 16.99, commission: 0.25 },
  { name: "Ring Light with Tripod Stand", price: 32.99, commission: 0.17 },
];

const VIDEO_TITLES = [
  "This mirror changed my morning routine",
  "POV: your smoothie is ready in 30 seconds",
  "The comfiest slides I've ever worn",
  "My room at 3am with this sunset lamp",
  "Ice rolling my face for 30 days — results",
  "Mini waffles for breakfast every day this week",
  "The $9 haircare tool TikTok made me buy",
  "Phone photography hack you NEED to know",
  "Doing my own nails at home — full tutorial",
  "LED lights room transformation",
  "Beach waves in 5 minutes tutorial",
  "Hydration check — this bottle is everything",
  "Budget earbuds vs AirPods — honest review",
  "Lip gloss collection that actually stays on",
  "My ring light setup for content creation",
];

// Seeded random for consistent mock data across renders
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(42);

function randomBetween(min: number, max: number): number {
  return min + rand() * (max - min);
}

function randomInt(min: number, max: number): number {
  return Math.floor(randomBetween(min, max + 1));
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(randomInt(8, 22), randomInt(0, 59), 0, 0);
  return d;
}

function formatDate(d: Date): string {
  return d.toISOString().split("T")[0];
}

// Generate orders with realistic distribution
function generateOrders(): Order[] {
  const orders: Order[] = [];
  const statuses: Order["status"][] = ["paid", "paid", "paid", "paid", "pending", "pending", "cancelled", "refunded"];

  for (let day = 0; day < 90; day++) {
    // More orders on weekends, some daily variation
    const isWeekend = new Date(daysAgo(day)).getDay() % 6 === 0;
    const baseOrders = isWeekend ? randomInt(4, 12) : randomInt(2, 8);

    for (let i = 0; i < baseOrders; i++) {
      const product = pickRandom(PRODUCTS);
      const quantity = rand() > 0.8 ? randomInt(2, 3) : 1;
      const saleAmount = +(product.price * quantity).toFixed(2);
      const commissionEarned = +(saleAmount * product.commission).toFixed(2);

      // Recent orders more likely to be pending
      let status: Order["status"];
      if (day < 3) {
        status = rand() > 0.4 ? "pending" : "paid";
      } else {
        status = pickRandom(statuses);
      }

      orders.push({
        id: `ORD-${String(orders.length + 1).padStart(5, "0")}`,
        productName: product.name,
        productImage: `/products/placeholder.svg`,
        orderDate: daysAgo(day),
        saleAmount,
        commissionRate: product.commission,
        commissionEarned,
        status,
        videoId: rand() > 0.3 ? `VID-${String(randomInt(1, 15)).padStart(3, "0")}` : undefined,
      });
    }
  }

  return orders.sort((a, b) => b.orderDate.getTime() - a.orderDate.getTime());
}

// Pre-generate all mock data once
const allOrders = generateOrders();

export function getMockOrders(): Order[] {
  return allOrders;
}

export function getMockDailyEarnings(days: number = 30): DailyEarnings[] {
  const earnings: Map<string, DailyEarnings> = new Map();

  for (const order of allOrders) {
    const date = formatDate(order.orderDate);
    const daysDiff = Math.floor(
      (Date.now() - order.orderDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysDiff > days) continue;
    if (order.status === "cancelled" || order.status === "refunded") continue;

    const existing = earnings.get(date) ?? { date, totalEarnings: 0, orderCount: 0 };
    existing.totalEarnings = +(existing.totalEarnings + order.commissionEarned).toFixed(2);
    existing.orderCount += 1;
    earnings.set(date, existing);
  }

  // Fill in missing days with zero
  for (let i = 0; i < days; i++) {
    const date = formatDate(daysAgo(i));
    if (!earnings.has(date)) {
      earnings.set(date, { date, totalEarnings: 0, orderCount: 0 });
    }
  }

  return Array.from(earnings.values()).sort(
    (a, b) => a.date.localeCompare(b.date)
  );
}

export function getMockTopProducts(limit: number = 5): Product[] {
  const productMap = new Map<string, Product>();

  for (const order of allOrders) {
    if (order.status === "cancelled" || order.status === "refunded") continue;

    const existing = productMap.get(order.productName);
    if (existing) {
      existing.totalOrders += 1;
      existing.totalEarnings = +(existing.totalEarnings + order.commissionEarned).toFixed(2);
    } else {
      productMap.set(order.productName, {
        id: `PROD-${productMap.size + 1}`,
        name: order.productName,
        image: order.productImage,
        totalOrders: 1,
        totalEarnings: +order.commissionEarned.toFixed(2),
        commissionRate: order.commissionRate,
      });
    }
  }

  return Array.from(productMap.values())
    .sort((a, b) => b.totalEarnings - a.totalEarnings)
    .slice(0, limit);
}

export function getMockVideoPerformance(): VideoPerformance[] {
  return VIDEO_TITLES.map((title, i) => {
    const views = randomInt(5000, 500000);
    const clickRate = randomBetween(0.02, 0.08);
    const conversionRate = randomBetween(0.05, 0.15);
    const clicks = Math.floor(views * clickRate);
    const conversions = Math.floor(clicks * conversionRate);
    const avgEarning = randomBetween(3, 12);

    return {
      videoId: `VID-${String(i + 1).padStart(3, "0")}`,
      title,
      thumbnailUrl: `/videos/placeholder.svg`,
      views,
      clicks,
      conversions,
      earnings: +(conversions * avgEarning).toFixed(2),
      postedDate: daysAgo(randomInt(1, 60)),
    };
  }).sort((a, b) => b.earnings - a.earnings);
}

export function getMockDashboardStats() {
  const last30 = allOrders.filter((o) => {
    const daysDiff = Math.floor(
      (Date.now() - o.orderDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysDiff <= 30 && o.status !== "cancelled" && o.status !== "refunded";
  });

  const prev30 = allOrders.filter((o) => {
    const daysDiff = Math.floor(
      (Date.now() - o.orderDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysDiff > 30 && daysDiff <= 60 && o.status !== "cancelled" && o.status !== "refunded";
  });

  const totalEarnings = last30.reduce((s, o) => s + o.commissionEarned, 0);
  const prevEarnings = prev30.reduce((s, o) => s + o.commissionEarned, 0);
  const avgCommission = last30.length
    ? last30.reduce((s, o) => s + o.commissionRate, 0) / last30.length
    : 0;
  const prevAvgCommission = prev30.length
    ? prev30.reduce((s, o) => s + o.commissionRate, 0) / prev30.length
    : 0;

  const pendingPayout = allOrders
    .filter((o) => o.status === "pending")
    .reduce((s, o) => s + o.commissionEarned, 0);

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
