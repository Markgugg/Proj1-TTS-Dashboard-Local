import { StatsRow } from "@/components/dashboard/stats-row";
import { EarningsChart } from "@/components/dashboard/earnings-chart";
import { TopProducts } from "@/components/dashboard/top-products";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <StatsRow />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EarningsChart />
        </div>
        <TopProducts />
      </div>
    </div>
  );
}
