import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background text-sm font-bold">
            T
          </div>
          <CardTitle className="text-xl">TTS Dashboard</CardTitle>
          <p className="text-sm text-muted-foreground">
            Simple analytics for TikTok Shop affiliates
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Link href="/dashboard">
            <Button className="w-full">Enter Demo Dashboard</Button>
          </Link>
          <Button variant="outline" className="w-full" disabled>
            Sign in with TikTok
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            TikTok OAuth coming soon. Use demo mode to explore.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
