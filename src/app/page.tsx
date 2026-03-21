import { redirect } from "next/navigation";

// The proxy handles redirecting logged-in users to /dashboard.
// Unauthenticated users land here and get sent to /login.
export default function Home() {
  redirect("/login");
}
