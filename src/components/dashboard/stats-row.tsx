import type { DashboardStats } from "@/types";

function formatCurrency(n: number): string {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatChange(n: number): string {
  return `${n >= 0 ? "+" : ""}${n}%`;
}

const EarningsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const OrdersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <line x1="3" x2="21" y1="6" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const CommissionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" x2="5" y1="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);

const PayoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

export function StatsRow({ stats }: { stats: DashboardStats }) {
  const cards = [
    {
      title: "Total Earnings",
      value: formatCurrency(stats.totalEarnings),
      change: formatChange(stats.earningsChange),
      positive: stats.earningsChange >= 0,
      period: "vs last 30 days",
      icon: <EarningsIcon />,
      accent: "text-emerald-600",
      iconBg: "bg-emerald-50",
      border: "border-l-emerald-400",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toString(),
      change: formatChange(stats.ordersChange),
      positive: stats.ordersChange >= 0,
      period: "vs last 30 days",
      icon: <OrdersIcon />,
      accent: "text-blue-600",
      iconBg: "bg-blue-50",
      border: "border-l-blue-400",
    },
    {
      title: "Avg Commission",
      value: `${stats.avgCommission}%`,
      change: formatChange(stats.commissionChange),
      positive: stats.commissionChange >= 0,
      period: "vs last 30 days",
      icon: <CommissionIcon />,
      accent: "text-violet-600",
      iconBg: "bg-violet-50",
      border: "border-l-violet-400",
    },
    {
      title: "Pending Payout",
      value: formatCurrency(stats.pendingPayout),
      change: "",
      positive: true,
      period: "next settlement",
      icon: <PayoutIcon />,
      accent: "text-amber-600",
      iconBg: "bg-amber-50",
      border: "border-l-amber-400",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-2xl border border-gray-100 border-l-4 ${card.border} bg-white p-5 shadow-sm`}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{card.title}</span>
            <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${card.iconBg} ${card.accent}`}>
              {card.icon}
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{card.value}</div>
          <p className="mt-1 text-xs text-gray-400">
            {card.change && (
              <span className={card.positive ? "text-emerald-600 font-medium" : "text-red-500 font-medium"}>
                {card.change}{" "}
              </span>
            )}
            {card.period}
          </p>
        </div>
      ))}
    </div>
  );
}
