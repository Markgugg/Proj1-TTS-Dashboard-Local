import { NextRequest, NextResponse } from "next/server";

// TikTok Shop OAuth callback
// After the user authorizes your app, TikTok redirects here with ?code=...
// Exchange the code for an access token and store it.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    console.error("TikTok OAuth error:", error);
    return NextResponse.redirect(new URL("/dashboard?error=tiktok_auth_failed", req.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/dashboard?error=no_code", req.url));
  }

  // TODO: exchange code for access token
  // const token = await exchangeCodeForToken(code);
  // Store token in Supabase against the user's session

  console.log("TikTok auth code received:", code, "state:", state);

  // Placeholder — redirect to dashboard for now
  return NextResponse.redirect(new URL("/dashboard?tiktok=connected", req.url));
}
