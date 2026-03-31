-- TTS Dashboard — Supabase Schema
-- Run this in the Supabase SQL Editor to set up your tables.

create table if not exists orders (
  id               text primary key,
  product_name     text not null,
  product_image    text not null,
  order_date       timestamptz not null,
  sale_amount      numeric(10, 2) not null,
  commission_rate  numeric(6, 4) not null,
  commission_earned numeric(10, 2) not null,
  status           text not null check (status in ('paid', 'pending', 'cancelled', 'refunded')),
  video_id         text
);

create table if not exists videos (
  video_id     text primary key,
  title        text not null,
  thumbnail_url text not null,
  views        integer not null default 0,
  clicks       integer not null default 0,
  conversions  integer not null default 0,
  earnings     numeric(10, 2) not null default 0,
  posted_date  timestamptz not null
);

-- Indexes for common query patterns
create index if not exists orders_order_date_idx on orders (order_date desc);
create index if not exists orders_status_idx on orders (status);
create index if not exists videos_earnings_idx on videos (earnings desc);

-- Enable Row Level Security (recommended — open read access for now)
alter table orders enable row level security;
alter table videos enable row level security;

create policy "Allow read access" on orders for select using (true);
create policy "Allow read access" on videos for select using (true);
