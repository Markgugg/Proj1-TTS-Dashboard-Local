import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div
      className="min-h-screen overflow-x-hidden font-sans"
      style={{
        background:
          "linear-gradient(to bottom, #FFFFFF, #FFFFF0, #F0F8FF, #FFFFF0, #FFFFFF)",
      }}
    >
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-sm font-bold text-white">
            T
          </div>
          <span className="text-sm font-semibold text-gray-900">
            TTS Dashboard
          </span>
        </div>
        <Link
          href="/login"
          className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          Sign in
        </Link>
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
            Clean analytics for TikTok Shop affiliates. View sales,
            commissions, and video performance — without opening TikTok.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Get started free
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-xs text-gray-400">
              Demo account included · No setup required
            </p>
          </div>
        </div>

        {/* Right — dashboard preview mockup */}
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

            {/* Mock dashboard content */}
            <div className="bg-gray-50 p-5">
              {/* Stat cards */}
              <div className="mb-4 grid grid-cols-2 gap-3">
                {[
                  { label: "Total Earnings", value: "$2,847.20", change: "+12.4%", up: true },
                  { label: "Total Orders", value: "184", change: "+8.1%", up: true },
                  { label: "Avg Commission", value: "19.2%", change: "+0.3%", up: true },
                  { label: "Pending Payout", value: "$312.50", change: "", up: true },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
                  >
                    <p className="text-[10px] font-medium text-gray-400">
                      {s.label}
                    </p>
                    <p className="mt-1 text-lg font-bold text-gray-900">
                      {s.value}
                    </p>
                    {s.change && (
                      <p className="text-[10px] font-medium text-emerald-600">
                        {s.change} vs last 30d
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Mini chart */}
              <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                <p className="mb-3 text-[10px] font-semibold text-gray-500">
                  EARNINGS — LAST 30 DAYS
                </p>
                <div className="flex h-16 items-end gap-1">
                  {[30, 45, 38, 55, 42, 68, 52, 71, 60, 85, 72, 90, 65, 78, 88, 70, 95, 82, 76, 91, 68, 84, 79, 93, 87, 72, 98, 85, 92, 100].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-gray-900"
                        style={{ height: `${h}%`, opacity: 0.08 + (i / 30) * 0.85 }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          What does TTS Dashboard include?
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "💰",
              title: "Daily Earnings Tracking",
              desc: "See exactly how much you earned each day with a 30-day area chart. Spot your best-performing days at a glance.",
            },
            {
              icon: "🛍️",
              title: "Sales Breakdown",
              desc: "Filter every order by date range and status. See sale amounts, commission rates, and payout status in one table.",
            },
            {
              icon: "🎬",
              title: "Video Performance",
              desc: "Track views, clicks, CTR, and conversions per video. Know exactly which content is driving your commissions.",
            },
            {
              icon: "📈",
              title: "Top Products",
              desc: "See which products generate the most commission so you can focus your content on what actually converts.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 text-3xl">{f.icon}</div>
              <h3 className="mb-2 font-semibold text-gray-900">{f.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-black px-10 py-10 text-center md:flex-row md:text-left">
          <div>
            <h3 className="text-2xl font-bold text-white">
              Ready to see your real numbers?
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Sign in with the demo account and explore your mock dashboard instantly.
            </p>
          </div>
          <Link
            href="/login"
            className="flex-shrink-0 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-100"
          >
            Get started free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} TTS Dashboard · Built for TikTok Shop affiliates
      </footer>
    </div>
  );
}
