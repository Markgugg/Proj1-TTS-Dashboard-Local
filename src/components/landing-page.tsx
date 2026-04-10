"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Logo, LogoIcon } from "@/components/logo";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 transition-shadow";

function SignInModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });
    if (result?.error) {
      setError("Invalid email or password.");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <LogoIcon size={32} />
            <h2 className="text-lg font-semibold text-gray-900">Sign in</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="modal-email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="modal-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="demo@example.com"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="modal-password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="modal-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full rounded-full bg-black py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <p className="text-center text-xs text-gray-400">
            Demo: demo@example.com / demo1234
          </p>
        </form>
      </div>
    </div>
  );
}

export function LandingPage() {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: "linear-gradient(to bottom, #FFFFFF, #FFFFF0, #F0F8FF, #FFFFF0, #FFFFFF)",
      }}
    >
      {/* Sign-in modal */}
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}

      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Logo size={32} />

        <div className="hidden items-center gap-8 text-sm font-medium text-gray-500 md:flex">
          <a href="#features" className="transition-colors hover:text-gray-900">Features</a>
          <a href="#about" className="transition-colors hover:text-gray-900">About</a>
        </div>

        <button
          onClick={() => setShowSignIn(true)}
          className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          Sign in
        </button>
      </nav>

      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-6 pb-24 pt-16 md:px-10 lg:flex-row lg:items-start">
        {/* Left */}
        <div className="flex-1">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-600 shadow-sm">
            <span>📊</span>
            <span>Built for TikTok Shop affiliates</span>
          </div>

          <h1 className="mb-5 text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl">
            Track your TikTok&nbsp;earnings,<br className="hidden md:block" /> without the distraction
          </h1>

          <p className="mb-8 max-w-md text-lg leading-relaxed text-gray-500">
            Clean analytics for TikTok Shop affiliates. View sales, commissions, and video performance — without opening TikTok.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={() => setShowSignIn(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Get started free
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <p className="text-xs text-gray-400">Demo account included · No setup required</p>
          </div>
        </div>

        {/* Right — dashboard mockup */}
        <div className="w-full max-w-lg flex-shrink-0 lg:max-w-xl">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/60">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 border-b border-gray-100 bg-gray-50 px-4 py-3">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
              <div className="ml-3 flex-1 rounded-md bg-gray-200 px-3 py-1 text-xs text-gray-400">
                tts-dashboard.vercel.app/dashboard
              </div>
            </div>
            {/* Mock dashboard */}
            <div className="bg-gray-50 p-5">
              <div className="mb-4 grid grid-cols-2 gap-3">
                {[
                  { label: "Total Earnings", value: "$2,847.20", change: "+12.4%" },
                  { label: "Total Orders", value: "184", change: "+8.1%" },
                  { label: "Avg Commission", value: "19.2%", change: "+0.3%" },
                  { label: "Pending Payout", value: "$312.50", change: null },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                    <p className="text-[10px] font-medium text-gray-400">{s.label}</p>
                    <p className="mt-1 text-lg font-bold text-gray-900">{s.value}</p>
                    {s.change && (
                      <p className="text-[10px] font-medium text-emerald-600">{s.change} vs last 30d</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                <p className="mb-3 text-[10px] font-semibold text-gray-500">EARNINGS — LAST 30 DAYS</p>
                <div className="flex h-16 items-end gap-1">
                  {[30,45,38,55,42,68,52,71,60,85,72,90,65,78,88,70,95,82,76,91,68,84,79,93,87,72,98,85,92,100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-gray-900"
                      style={{ height: `${h}%`, opacity: 0.08 + (i / 30) * 0.85 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand banner */}
      <section className="overflow-hidden border-y border-gray-100 bg-white/60 py-8">
        <p className="mb-5 text-center text-xs font-medium uppercase tracking-widest text-gray-400">
          Top brands on TikTok Shop
        </p>
        <div className="relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
          <div className="animate-scroll-left flex w-max items-center gap-16">
            {/* Duplicated list for seamless loop */}
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-16">
                {[
                  "Maybelline",
                  "TCL",
                  "DJI",
                  "Anker",
                  "CIDER",
                  "Kraft",
                  "Nokia",
                  "Laifen",
                  "UGREEN",
                  "e.l.f.",
                  "CeraVe",
                  "NYX",
                  "BelleMe",
                  "Halara",
                ].map((brand) => (
                  <span
                    key={`${setIndex}-${brand}`}
                    className="whitespace-nowrap text-xl font-bold tracking-tight text-gray-300 transition-colors hover:text-gray-500"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 pb-24 pt-24 md:px-10">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          What does CreatorTok include?
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              iconBg: "bg-emerald-100",
              iconColor: "text-emerald-600",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              ),
              title: "Daily Earnings Tracking",
              desc: "See exactly how much you earned each day with a 30-day chart. Spot your best-performing days at a glance.",
            },
            {
              iconBg: "bg-blue-100",
              iconColor: "text-blue-600",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><line x1="3" x2="21" y1="6" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              ),
              title: "Sales Breakdown",
              desc: "Filter every order by date range and status. See sale amounts, commission rates, and payout status in one table.",
            },
            {
              iconBg: "bg-rose-100",
              iconColor: "text-rose-600",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              ),
              title: "Video Performance",
              desc: "Track views, clicks, CTR, and conversions per video. Know exactly which content drives your commissions.",
            },
            {
              iconBg: "bg-violet-100",
              iconColor: "text-violet-600",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
                </svg>
              ),
              title: "Top Products",
              desc: "See which products generate the most commission so you can focus your content on what actually converts.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${f.iconBg} ${f.iconColor}`}>
                {f.icon}
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">{f.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section id="about" className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-black px-10 py-10 text-center md:flex-row md:text-left">
          <div>
            <h3 className="text-2xl font-bold text-white">Ready to see your real numbers?</h3>
            <p className="mt-1 text-sm text-gray-400">Sign in with the demo account and explore your mock dashboard instantly.</p>
          </div>
          <button
            onClick={() => setShowSignIn(true)}
            className="flex-shrink-0 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-100"
          >
            Get started free →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} CreatorTok · Built for TikTok Shop affiliates
      </footer>
    </div>
  );
}
