import { StatsRow } from "@/components/dashboard/stats-row";
import { EarningsChart } from "@/components/dashboard/earnings-chart";
import { TopProducts } from "@/components/dashboard/top-products";
import { getDashboardStats, getDailyEarnings, getTopProducts } from "@/lib/data";

export default function DashboardPage() {
  const stats = getDashboardStats();
  const dailyEarnings = getDailyEarnings(30);
  const topProducts = getTopProducts(3);

  return (
    <div className="flex flex-col gap-6">
      <StatsRow stats={stats} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EarningsChart data={dailyEarnings} />
        </div>
        <TopProducts products={topProducts} />
      </div>
    </div>
  );
}
