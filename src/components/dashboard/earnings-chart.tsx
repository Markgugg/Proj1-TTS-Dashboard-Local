"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartData = [
  { date: "Feb 19", earnings: 62 },
  { date: "Feb 20", earnings: 78 },
  { date: "Feb 21", earnings: 45 },
  { date: "Feb 22", earnings: 91 },
  { date: "Feb 23", earnings: 120 },
  { date: "Feb 24", earnings: 105 },
  { date: "Feb 25", earnings: 87 },
  { date: "Feb 26", earnings: 54 },
  { date: "Feb 27", earnings: 98 },
  { date: "Feb 28", earnings: 112 },
  { date: "Mar 1", earnings: 76 },
  { date: "Mar 2", earnings: 134 },
  { date: "Mar 3", earnings: 89 },
  { date: "Mar 4", earnings: 67 },
  { date: "Mar 5", earnings: 103 },
  { date: "Mar 6", earnings: 95 },
  { date: "Mar 7", earnings: 142 },
  { date: "Mar 8", earnings: 118 },
  { date: "Mar 9", earnings: 73 },
  { date: "Mar 10", earnings: 86 },
  { date: "Mar 11", earnings: 109 },
  { date: "Mar 12", earnings: 97 },
  { date: "Mar 13", earnings: 125 },
  { date: "Mar 14", earnings: 81 },
  { date: "Mar 15", earnings: 94 },
  { date: "Mar 16", earnings: 138 },
  { date: "Mar 17", earnings: 107 },
  { date: "Mar 18", earnings: 83 },
  { date: "Mar 19", earnings: 116 },
  { date: "Mar 20", earnings: 99 },
];

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function EarningsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          Earnings — Last 30 Days
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-earnings)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-earnings)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              type="monotone"
              dataKey="earnings"
              stroke="var(--color-earnings)"
              strokeWidth={2}
              fill="url(#fillEarnings)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
