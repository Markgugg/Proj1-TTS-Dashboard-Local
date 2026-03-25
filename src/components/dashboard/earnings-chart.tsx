"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { DailyEarnings } from "@/types";

const chartConfig = {
  totalEarnings: {
    label: "Earnings",
    color: "#6366f1",
  },
} satisfies ChartConfig;

function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function EarningsChart({ data }: { data: DailyEarnings[] }) {
  const chartData = data.map((d) => ({
    date: formatShortDate(d.date),
    totalEarnings: d.totalEarnings,
  }));

  const total = data.reduce((s, d) => s + d.totalEarnings, 0);

  return (
    <Card className="rounded-2xl border-gray-100 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-400 uppercase tracking-wide">
            Earnings — Last 30 Days
          </CardTitle>
          <span className="text-sm font-semibold text-gray-900">
            ${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              interval="preserveStartEnd"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              tickFormatter={(value) => `$${value}`}
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              type="monotone"
              dataKey="totalEarnings"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#fillEarnings)"
              dot={false}
              activeDot={{ r: 5, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
