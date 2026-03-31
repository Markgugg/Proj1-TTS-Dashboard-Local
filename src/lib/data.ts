import type { Order, DailyEarnings, VideoPerformance, Product, DashboardStats, OrderFilters } from "@/types";
import { config } from "./config";
import * as mock from "./mock/handlers";
import * as db from "./supabase/handlers";

export async function getOrders(filters?: Partial<OrderFilters>): Promise<Order[]> {
  if (config.useMockData) return mock.getOrders(filters);
  return db.getOrders(filters);
}

export async function getDailyEarnings(days?: number): Promise<DailyEarnings[]> {
  if (config.useMockData) return mock.getDailyEarnings(days);
  return db.getDailyEarnings(days);
}

export async function getTopProducts(limit?: number): Promise<Product[]> {
  if (config.useMockData) return mock.getTopProducts(limit);
  return db.getTopProducts(limit);
}

export async function getVideoPerformance(): Promise<VideoPerformance[]> {
  if (config.useMockData) return mock.getVideoPerformance();
  return db.getVideoPerformance();
}

export async function getDashboardStats(): Promise<DashboardStats> {
  if (config.useMockData) return mock.getDashboardStats();
  return db.getDashboardStats();
}
