import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Total Earnings",
    value: "$2,847.63",
    change: "+12.5%",
    changeType: "positive" as const,
    period: "vs last 30 days",
  },
  {
    title: "Total Orders",
    value: "184",
    change: "+8.2%",
    changeType: "positive" as const,
    period: "vs last 30 days",
  },
  {
    title: "Avg Commission",
    value: "15.4%",
    change: "+0.3%",
    changeType: "positive" as const,
    period: "vs last 30 days",
  },
  {
    title: "Pending Payout",
    value: "$412.80",
    change: "",
    changeType: "neutral" as const,
    period: "next settlement",
  },
];

export function StatsRow() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {stat.change && (
                <span
                  className={
                    stat.changeType === "positive"
                      ? "text-emerald-600"
                      : "text-muted-foreground"
                  }
                >
                  {stat.change}{" "}
                </span>
              )}
              {stat.period}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
