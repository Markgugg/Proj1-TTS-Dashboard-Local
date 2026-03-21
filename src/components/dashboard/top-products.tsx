import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types";

function formatCurrency(n: number): string {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function TopProducts({ products }: { products: Product[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Top Products</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {products.map((product, index) => (
          <div
            key={product.id}
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
                  {product.totalOrders} orders
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">
                {formatCurrency(product.totalEarnings)}
              </span>
              <Badge variant="secondary" className="text-xs">
                {Math.round(product.commissionRate * 100)}%
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
