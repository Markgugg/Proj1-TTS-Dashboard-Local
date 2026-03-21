export interface Order {
  id: string;
  productName: string;
  productImage: string;
  orderDate: Date;
  saleAmount: number;
  commissionRate: number;
  commissionEarned: number;
  status: "paid" | "pending" | "cancelled" | "refunded";
  videoId?: string;
}

export interface DailyEarnings {
  date: string; // "2026-03-19"
  totalEarnings: number;
  orderCount: number;
}

export interface VideoPerformance {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  views: number;
  clicks: number;
  conversions: number;
  earnings: number;
  postedDate: Date;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  totalOrders: number;
  totalEarnings: number;
  commissionRate: number;
}

export interface DashboardStats {
  totalEarnings: number;
  totalOrders: number;
  avgCommission: number;
  pendingPayout: number;
  earningsChange: number; // percentage vs previous period
  ordersChange: number;
  commissionChange: number;
}

export interface OrderFilters {
  dateRange: "today" | "7d" | "30d" | "all";
  status: "all" | "paid" | "pending" | "cancelled" | "refunded";
  sortBy: "date" | "amount" | "commission";
  sortOrder: "asc" | "desc";
}
