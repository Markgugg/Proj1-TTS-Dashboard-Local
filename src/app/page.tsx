import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LandingPage } from "@/components/landing-page";

export default async function HomePage() {
  try {
    const session = await auth();
    if (session) redirect("/dashboard");
  } catch {
    // auth() can fail if AUTH_URL/AUTH_SECRET misconfigured — show landing page anyway
  }
  return <LandingPage />;
}
