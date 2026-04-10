import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getDashboardStats, getTopProducts, getVideoPerformance, getOrders } from "@/lib/data";
import type { SidebarData } from "@/components/layout/sidebar";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stats, products, videos, orders] = await Promise.all([
    getDashboardStats(),
    getTopProducts(1),
    getVideoPerformance(),
    getOrders(),
  ]);

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
