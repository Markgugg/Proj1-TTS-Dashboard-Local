import { StatsRow } from "@/components/dashboard/stats-row";
import { EarningsChart } from "@/components/dashboard/earnings-chart";
import { TopProducts } from "@/components/dashboard/top-products";
import { getDashboardStats, getDailyEarnings, getTopProducts, getOrders } from "@/lib/data";

const orderIconColors = [
  "bg-emerald-100 text-emerald-600",
  "bg-blue-100 text-blue-600",
  "bg-violet-100 text-violet-600",
  "bg-rose-100 text-rose-600",
  "bg-amber-100 text-amber-600",
  "bg-indigo-100 text-indigo-600",
  "bg-pink-100 text-pink-600",
  "bg-teal-100 text-teal-600",
];

const statusColors: Record<string, string> = {
  paid: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  cancelled: "bg-gray-100 text-gray-500",
  refunded: "bg-red-100 text-red-600",
};

function formatCurrency(n: number) {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  const dailyEarnings = await getDailyEarnings(30);
  const topProducts = await getTopProducts(3);
  const recentOrders = (await getOrders()).slice(0, 8);

  return (
    <div className="flex flex-col gap-6">
      <StatsRow stats={stats} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EarningsChart data={dailyEarnings} />
        </div>
        <TopProducts products={topProducts} />
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-50 px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Recent Orders</h2>
          <a href="/dashboard/sales" className="text-xs font-medium text-indigo-500 hover:text-indigo-700">
            View all →
          </a>
        </div>
        <div className="divide-y divide-gray-50">
          {recentOrders.map((order, i) => (
            <div key={order.id} className="flex items-center justify-between px-6 py-3.5">
              <div className="flex items-center gap-4">
                {/* Product icon */}
                <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${orderIconColors[i % orderIconColors.length]}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><line x1="3" x2="21" y1="6" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 leading-none">{order.productName}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{order.id} · {formatDate(order.orderDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${statusColors[order.status]}`}>
                  {order.status}
                </span>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{formatCurrency(order.commissionEarned)}</p>
                  <p className="text-[10px] text-gray-400">{Math.round(order.commissionRate * 100)}% commission</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
