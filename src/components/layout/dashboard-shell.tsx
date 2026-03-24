"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={[
          "fixed inset-y-0 left-0 z-30 md:relative md:flex",
          sidebarOpen ? "flex" : "hidden md:flex",
        ].join(" ")}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        <main
          className="flex-1 overflow-y-auto p-4 md:p-6"
          style={{
            background:
              "linear-gradient(to bottom, #FFFFFF, #FFFFF0, #F0F8FF, #FFFFF0)",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
