"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Logo } from "@/components/logo";
import type { DashboardStats, Product, } from "@/types";

export interface SidebarData {
  stats: DashboardStats;
  topProduct: Pick<Product, "name" | "totalOrders" | "totalEarnings"> | null;
  topVideo: { title: string; views: number; earnings: number } | null;
  todayOrders: number;
  todayEarnings: number;
}

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
      </svg>
    ),
  },
  {
    label: "Sales",
    href: "/dashboard/sales",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" x2="12" y1="2" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    label: "Videos",
    href: "/dashboard/videos",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="6 3 20 12 6 21 6 3" />
      </svg>
    ),
  },
];

export function Sidebar({ data, onClose }: { data: SidebarData; onClose?: () => void }) {
  const pathname = usePathname();
  const { stats, topProduct, topVideo, todayOrders, todayEarnings } = data;

  return (
    <aside className="flex h-full w-60 flex-col border-r border-gray-100 bg-white">
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-gray-100 px-5">
        <Logo size={28} />
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 p-3">
        <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
          Menu
        </p>
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={[
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-black text-white"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
              ].join(" ")}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Quick stats */}
      <div className="mx-3 mt-4 rounded-2xl bg-gray-50 p-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
          This Month
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Earnings</span>
            <span className="text-xs font-semibold text-gray-900">
              ${stats.totalEarnings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Orders</span>
            <span className="text-xs font-semibold text-gray-900">{stats.totalOrders}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Pending</span>
            <span className="text-xs font-semibold text-amber-600">
              ${stats.pendingPayout.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          {/* Mini earnings bar */}
          <div className="pt-1">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[10px] text-gray-400">Avg commission</span>
              <span className="text-[10px] font-medium text-violet-600">{stats.avgCommission}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-gray-200">
              <div
                className="h-1.5 rounded-full bg-violet-400"
                style={{ width: `${Math.min(stats.avgCommission * 4, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Today's snapshot */}
      <div className="mx-3 mt-3 rounded-2xl bg-indigo-50 p-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-indigo-400">
          Today
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-indigo-500">Earned</span>
            <span className="text-xs font-semibold text-indigo-700">
              ${todayEarnings.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-indigo-500">Orders</span>
            <span className="text-xs font-semibold text-indigo-700">{todayOrders}</span>
          </div>
        </div>
      </div>

      {/* Top product */}
      <div className="mx-3 mt-3 rounded-2xl bg-emerald-50 p-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-emerald-500">
          Top Product
        </p>
        <p className="text-xs font-semibold text-gray-900 leading-snug">{topProduct?.name}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[10px] text-emerald-600">{topProduct?.totalOrders} orders</span>
          <span className="text-[10px] font-semibold text-emerald-700">
            ${topProduct?.totalEarnings.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Top video */}
      <div className="mx-3 mt-3 rounded-2xl bg-rose-50 p-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-rose-400">
          Top Video
        </p>
        <p className="text-xs font-semibold text-gray-900 leading-snug line-clamp-2">{topVideo?.title}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[10px] text-rose-500">{topVideo?.views.toLocaleString()} views</span>
          <span className="text-[10px] font-semibold text-rose-600">
            ${topVideo?.earnings.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex-1" />

      {/* User */}
      <div className="border-t border-gray-100 p-3">
        <div className="flex items-center justify-between rounded-lg px-3 py-2">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
              MG
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">Demo User</span>
              <span className="text-xs text-gray-400">demo@example.com</span>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            title="Sign out"
            className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
