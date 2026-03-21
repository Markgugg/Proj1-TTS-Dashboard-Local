import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VideosPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Video Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Video analytics with performance metrics coming in Phase 5.
        </p>
      </CardContent>
    </Card>
  );
}
