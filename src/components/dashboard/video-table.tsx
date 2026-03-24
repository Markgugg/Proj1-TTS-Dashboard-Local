"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type VideoRow = {
  videoId: string;
  title: string;
  views: number;
  clicks: number;
  conversions: number;
  earnings: number;
  postedDate: string; // ISO string
};

type SortKey = "earnings" | "views" | "conversions" | "date";
type DateFilter = "30d" | "60d" | "all";

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
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

function applyFilters(videos: VideoRow[], dateFilter: DateFilter): VideoRow[] {
  if (dateFilter === "all") return videos;
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysMap: Record<Exclude<DateFilter, "all">, number> = {
    "30d": 30,
    "60d": 60,
  };
  const cutoff = Date.now() - daysMap[dateFilter] * msPerDay;
  return videos.filter((v) => new Date(v.postedDate).getTime() >= cutoff);
}

function applySort(videos: VideoRow[], sortBy: SortKey): VideoRow[] {
  return [...videos].sort((a, b) => {
    if (sortBy === "earnings") return b.earnings - a.earnings;
    if (sortBy === "views") return b.views - a.views;
    if (sortBy === "conversions") return b.conversions - a.conversions;
    return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
  });
}

const selectClass =
  "h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring";

export function VideoTable({ videos }: { videos: VideoRow[] }) {
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [sortBy, setSortBy] = useState<SortKey>("earnings");

  const rows = useMemo(
    () => applySort(applyFilters(videos, dateFilter), sortBy),
    [videos, dateFilter, sortBy]
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle>Video Performance</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              {rows.length} video{rows.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as DateFilter)}
              className={selectClass}
            >
              <option value="30d">Last 30 days</option>
              <option value="60d">Last 60 days</option>
              <option value="all">All time</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className={selectClass}
            >
              <option value="earnings">Sort: Earnings</option>
              <option value="views">Sort: Views</option>
              <option value="conversions">Sort: Conversions</option>
              <option value="date">Sort: Date</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No videos in the selected time range.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Posted</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">CTR</TableHead>
                <TableHead className="text-right">Conversions</TableHead>
                <TableHead className="text-right">Earnings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((video) => {
                const ctr =
                  video.views > 0
                    ? ((video.clicks / video.views) * 100).toFixed(1)
                    : "0.0";
                return (
                  <TableRow key={video.videoId}>
                    <TableCell className="max-w-[260px] truncate font-medium">
                      {video.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(video.postedDate)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(video.views)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNumber(video.clicks)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {ctr}%
                    </TableCell>
                    <TableCell className="text-right">
                      {video.conversions.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-medium text-emerald-700 dark:text-emerald-400">
                      {formatCurrency(video.earnings)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
