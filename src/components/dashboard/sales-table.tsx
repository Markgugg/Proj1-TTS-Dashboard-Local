"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Order, OrderFilters } from "@/types";

// Date is serialized to ISO string before passing from server component
export type OrderRow = {
  id: string;
  productName: string;
  orderDate: string;
  saleAmount: number;
  commissionEarned: number;
  commissionRate: number;
  status: Order["status"];
};

type DateRange = OrderFilters["dateRange"];
type StatusFilter = OrderFilters["status"];

function StatusBadge({ status }: { status: Order["status"] }) {
  if (status === "paid") {
    return (
      <Badge className="border-emerald-200 bg-emerald-500/10 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400">
        Paid
      </Badge>
    );
  }
  if (status === "pending") {
    return (
      <Badge className="border-amber-200 bg-amber-500/10 text-amber-700 dark:border-amber-800 dark:text-amber-400">
        Pending
      </Badge>
    );
  }
  if (status === "cancelled") {
    return <Badge variant="secondary">Cancelled</Badge>;
  }
  return <Badge variant="destructive">Refunded</Badge>;
}

function formatCurrency(n: number): string {
  return `$${n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function applyFilters(
  orders: OrderRow[],
  dateRange: DateRange,
  status: StatusFilter
): OrderRow[] {
  let result = orders;

  if (status !== "all") {
    result = result.filter((o) => o.status === status);
  }

  if (dateRange !== "all") {
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysMap: Record<Exclude<DateRange, "all">, number> = {
      today: 1,
      "7d": 7,
      "30d": 30,
    };
    const cutoff = Date.now() - daysMap[dateRange] * msPerDay;
    result = result.filter((o) => new Date(o.orderDate).getTime() >= cutoff);
  }

  return result;
}

const selectClass =
  "h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring";

export function SalesTable({ orders }: { orders: OrderRow[] }) {
  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const [status, setStatus] = useState<StatusFilter>("all");

  const filtered = useMemo(
    () => applyFilters(orders, dateRange, status),
    [orders, dateRange, status]
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle>Sales Breakdown</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              {filtered.length} order{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as DateRange)}
              className={selectClass}
            >
              <option value="today">Today</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="all">All time</option>
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as StatusFilter)}
              className={selectClass}
            >
              <option value="all">All statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No orders match the selected filters.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Sale Amount</TableHead>
                <TableHead className="text-right">Commission</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="max-w-[220px] truncate font-medium">
                    {order.productName}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(order.orderDate)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(order.saleAmount)}
                  </TableCell>
                  <TableCell className="text-right font-medium text-emerald-700 dark:text-emerald-400">
                    {formatCurrency(order.commissionEarned)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
