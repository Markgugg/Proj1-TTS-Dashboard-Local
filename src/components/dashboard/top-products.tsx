import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const topProducts = [
  {
    name: "LED Vanity Mirror with Lights",
    orders: 34,
    earnings: "$487.20",
    commission: "18%",
  },
  {
    name: "Portable Blender Cup",
    orders: 28,
    earnings: "$392.50",
    commission: "22%",
  },
  {
    name: "Cloud Slides Slippers",
    orders: 25,
    earnings: "$312.75",
    commission: "15%",
  },
];

export function TopProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Top Products</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {topProducts.map((product, index) => (
          <div
            key={product.name}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-medium text-muted-foreground">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-medium leading-none">
                  {product.name}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {product.orders} orders
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{product.earnings}</span>
              <Badge variant="secondary" className="text-xs">
                {product.commission}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
