import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SalesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Sales table with filtering and sorting coming in Phase 3.
        </p>
      </CardContent>
    </Card>
  );
}
