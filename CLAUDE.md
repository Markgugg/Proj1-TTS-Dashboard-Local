@AGENTS.md

# TTS Dashboard — Project Guide

## What this is
TikTok Shop affiliate analytics dashboard. Clean Apple/Cal.ai-style UI for viewing earnings, sales, and video performance without loading TikTok.

## Tech stack
- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS + shadcn/ui
- Recharts for charts
- Prisma (SQLite locally, Neon Postgres for deploy) — not yet set up
- NextAuth.js v5 — not yet set up

## Project structure
- `src/app/` — Next.js App Router pages
- `src/app/dashboard/` — Dashboard pages (home, sales, videos)
- `src/components/ui/` — shadcn/ui primitives
- `src/components/layout/` — Sidebar, Header
- `src/components/dashboard/` — Dashboard-specific components (stats, chart, top products)
- `src/lib/` — Utilities, config, API clients

## Data strategy
Dual-track: app works with mock data by default. Single env var `USE_MOCK_DATA` toggles between mock and live TikTok API data. Components never know the difference.

## What's been built (Phase 1 complete)
- Landing/login page at `/`
- Dashboard layout with sidebar + header
- Dashboard home with 4 stat cards, 30-day earnings area chart, top 3 products
- Placeholder pages for Sales and Videos
- All data is currently hardcoded — Phase 2 replaces with mock data system

## Commands
- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build
- `npm run lint` — ESLint
