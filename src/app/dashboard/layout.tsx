import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getDashboardStats, getTopProducts, getVideoPerformance, getOrders } from "@/lib/data";
import * as mock from "@/lib/mock/handlers";
import type { SidebarData } from "@/components/layout/sidebar";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let stats, products, videos, orders;
  try {
    [stats, products, videos, orders] = await Promise.all([
      getDashboardStats(),
      getTopProducts(1),
      getVideoPerformance(),
      getOrders(),
    ]);
  } catch (e) {
    console.error("Dashboard data fetch failed, falling back to mock:", e);
    stats = mock.getDashboardStats();
    products = mock.getTopProducts(1);
    videos = mock.getVideoPerformance();
    orders = mock.getOrders();
  }

  const todayStr = new Date().toISOString().split("T")[0];
  const todayFiltered = orders.filter(
    (o) =>
      o.orderDate.toISOString().split("T")[0] === todayStr &&
      o.status !== "cancelled" &&
      o.status !== "refunded"
  );

  const sidebarData: SidebarData = {
    stats,
    topProduct: products[0] ?? null,
    topVideo: videos[0]
      ? { title: videos[0].title, views: videos[0].views, earnings: videos[0].earnings }
      : null,
    todayOrders: todayFiltered.length,
    todayEarnings: +todayFiltered.reduce((s, o) => s + o.commissionEarned, 0).toFixed(2),
  };

  return <DashboardShell sidebarData={sidebarData}>{children}</DashboardShell>;
}
