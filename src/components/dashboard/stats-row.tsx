import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardStats } from "@/types";

function formatCurrency(n: number): string {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatChange(n: number): string {
  return `${n >= 0 ? "+" : ""}${n}%`;
}

export function StatsRow({ stats }: { stats: DashboardStats }) {
  const cards = [
    {
      title: "Total Earnings",
      value: formatCurrency(stats.totalEarnings),
      change: formatChange(stats.earningsChange),
      positive: stats.earningsChange >= 0,
      period: "vs last 30 days",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toString(),
      change: formatChange(stats.ordersChange),
      positive: stats.ordersChange >= 0,
      period: "vs last 30 days",
    },
    {
      title: "Avg Commission",
      value: `${stats.avgCommission}%`,
      change: formatChange(stats.commissionChange),
      positive: stats.commissionChange >= 0,
      period: "vs last 30 days",
    },
    {
      title: "Pending Payout",
      value: formatCurrency(stats.pendingPayout),
      change: "",
      positive: true,
      period: "next settlement",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {card.change && (
                <span className={card.positive ? "text-emerald-600" : "text-red-500"}>
                  {card.change}{" "}
                </span>
              )}
              {card.period}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
