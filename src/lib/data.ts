import type { Order, DailyEarnings, VideoPerformance, Product, DashboardStats, OrderFilters } from "@/types";
import { config } from "./config";
import * as mock from "./mock/handlers";

// Every data function checks the toggle.
// When live API is implemented, add: import * as live from "./tiktok/client";

export function getOrders(filters?: Partial<OrderFilters>): Order[] {
  if (config.useMockData) return mock.getOrders(filters);
  // TODO: return live.getOrders(filters);
  return mock.getOrders(filters);
}

export function getDailyEarnings(days?: number): DailyEarnings[] {
  if (config.useMockData) return mock.getDailyEarnings(days);
  return mock.getDailyEarnings(days);
}

export function getTopProducts(limit?: number): Product[] {
  if (config.useMockData) return mock.getTopProducts(limit);
  return mock.getTopProducts(limit);
}

export function getVideoPerformance(): VideoPerformance[] {
  if (config.useMockData) return mock.getVideoPerformance();
  return mock.getVideoPerformance();
}

export function getDashboardStats(): DashboardStats {
  if (config.useMockData) return mock.getDashboardStats();
  return mock.getDashboardStats();
}
