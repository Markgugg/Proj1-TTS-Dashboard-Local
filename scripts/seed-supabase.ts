/**
 * Seed Supabase with mock data.
 * Run with: npx tsx scripts/seed-supabase.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Mock data generation (mirrors src/lib/mock/data.ts) ---

const PRODUCTS = [
  { name: "LED Vanity Mirror with Lights", price: 34.99, commission: 0.18 },
  { name: "Portable Blender Cup", price: 24.99, commission: 0.22 },
  { name: "Cloud Slides Slippers", price: 19.99, commission: 0.15 },
  { name: "Sunset Lamp Projector", price: 29.99, commission: 0.20 },
  { name: "Ice Roller for Face", price: 12.99, commission: 0.25 },
  { name: "Mini Waffle Maker", price: 15.99, commission: 0.18 },
  { name: "Scalp Massager Shampoo Brush", price: 8.99, commission: 0.30 },
  { name: "Phone Camera Lens Kit", price: 22.99, commission: 0.16 },
  { name: "Acrylic Nail Kit Set", price: 18.99, commission: 0.20 },
  { name: "LED Strip Lights 50ft", price: 14.99, commission: 0.22 },
  { name: "Ceramic Hair Curling Iron", price: 39.99, commission: 0.15 },
  { name: "Reusable Water Bottle 40oz", price: 27.99, commission: 0.18 },
  { name: "Wireless Earbuds Pro", price: 49.99, commission: 0.12 },
  { name: "Lip Gloss Set (6 Pack)", price: 16.99, commission: 0.25 },
  { name: "Ring Light with Tripod Stand", price: 32.99, commission: 0.17 },
];

const VIDEO_TITLES = [
  "This mirror changed my morning routine",
  "POV: your smoothie is ready in 30 seconds",
  "The comfiest slides I've ever worn",
  "My room at 3am with this sunset lamp",
  "Ice rolling my face for 30 days — results",
  "Mini waffles for breakfast every day this week",
  "The $9 haircare tool TikTok made me buy",
  "Phone photography hack you NEED to know",
  "Doing my own nails at home — full tutorial",
  "LED lights room transformation",
  "Beach waves in 5 minutes tutorial",
  "Hydration check — this bottle is everything",
  "Budget earbuds vs AirPods — honest review",
  "Lip gloss collection that actually stays on",
  "My ring light setup for content creation",
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(42);
const randomBetween = (min: number, max: number) => min + rand() * (max - min);
const randomInt = (min: number, max: number) => Math.floor(randomBetween(min, max + 1));
const pickRandom = <T>(arr: T[]) => arr[Math.floor(rand() * arr.length)];

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(randomInt(8, 22), randomInt(0, 59), 0, 0);
  return d;
}

function generateOrders() {
  const orders = [];
  const statuses = ["paid", "paid", "paid", "paid", "pending", "pending", "cancelled", "refunded"];

  for (let day = 0; day < 90; day++) {
    const isWeekend = new Date(daysAgo(day)).getDay() % 6 === 0;
    const baseOrders = isWeekend ? randomInt(4, 12) : randomInt(2, 8);

    for (let i = 0; i < baseOrders; i++) {
      const product = pickRandom(PRODUCTS);
      const quantity = rand() > 0.8 ? randomInt(2, 3) : 1;
      const saleAmount = +(product.price * quantity).toFixed(2);
      const commissionEarned = +(saleAmount * product.commission).toFixed(2);

      let status: string;
      if (day < 3) {
        status = rand() > 0.4 ? "pending" : "paid";
      } else {
        status = pickRandom(statuses);
      }

      orders.push({
        id: `ORD-${String(orders.length + 1).padStart(5, "0")}`,
        product_name: product.name,
        product_image: "/products/placeholder.svg",
        order_date: daysAgo(day).toISOString(),
        sale_amount: saleAmount,
        commission_rate: product.commission,
        commission_earned: commissionEarned,
        status,
        video_id: rand() > 0.3 ? `VID-${String(randomInt(1, 15)).padStart(3, "0")}` : null,
      });
    }
  }

  return orders;
}

function generateVideos() {
  return VIDEO_TITLES.map((title, i) => {
    const views = randomInt(5000, 500000);
    const clicks = Math.floor(views * randomBetween(0.02, 0.08));
    const conversions = Math.floor(clicks * randomBetween(0.05, 0.15));
    const earnings = +(conversions * randomBetween(3, 12)).toFixed(2);

    return {
      video_id: `VID-${String(i + 1).padStart(3, "0")}`,
      title,
      thumbnail_url: "/videos/placeholder.svg",
      views,
      clicks,
      conversions,
      earnings,
      posted_date: daysAgo(randomInt(1, 60)).toISOString(),
    };
  });
}

// --- Seed ---

async function seed() {
  console.log("Seeding orders...");
  const orders = generateOrders();
  const { error: ordersError } = await supabase.from("orders").upsert(orders);
  if (ordersError) { console.error("Orders error:", ordersError.message); process.exit(1); }
  console.log(`  ✓ ${orders.length} orders inserted`);

  console.log("Seeding videos...");
  const videos = generateVideos();
  const { error: videosError } = await supabase.from("videos").upsert(videos);
  if (videosError) { console.error("Videos error:", videosError.message); process.exit(1); }
  console.log(`  ✓ ${videos.length} videos inserted`);

  console.log("Done.");
}

seed();
