import type { Order, DailyEarnings, VideoPerformance, Product, DashboardStats, OrderFilters } from "@/types";
import {
  getMockOrders,
  getMockDailyEarnings,
  getMockTopProducts,
  getMockVideoPerformance,
  getMockDashboardStats,
} from "./data";

export function getOrders(filters?: Partial<OrderFilters>): Order[] {
  let orders = getMockOrders();

  if (filters?.status && filters.status !== "all") {
    orders = orders.filter((o) => o.status === filters.status);
  }

  if (filters?.dateRange && filters.dateRange !== "all") {
    const now = Date.now();
    const msMap = { today: 1, "7d": 7, "30d": 30 };
    const days = msMap[filters.dateRange];
    const cutoff = now - days * 24 * 60 * 60 * 1000;
    orders = orders.filter((o) => o.orderDate.getTime() >= cutoff);
  }

  const sortBy = filters?.sortBy ?? "date";
  const sortOrder = filters?.sortOrder ?? "desc";
  const multiplier = sortOrder === "desc" ? -1 : 1;

  orders.sort((a, b) => {
    if (sortBy === "date") return multiplier * (a.orderDate.getTime() - b.orderDate.getTime());
    if (sortBy === "amount") return multiplier * (a.saleAmount - b.saleAmount);
    if (sortBy === "commission") return multiplier * (a.commissionEarned - b.commissionEarned);
    return 0;
  });

  return orders;
}

export function getDailyEarnings(days?: number): DailyEarnings[] {
  return getMockDailyEarnings(days);
}

export function getTopProducts(limit?: number): Product[] {
  return getMockTopProducts(limit);
}

export function getVideoPerformance(): VideoPerformance[] {
  return getMockVideoPerformance();
}

export function getDashboardStats(): DashboardStats {
  return getMockDashboardStats();
}
