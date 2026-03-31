import { SalesTable } from "@/components/dashboard/sales-table";
import type { OrderRow } from "@/components/dashboard/sales-table";
import { getOrders } from "@/lib/data";

export default async function SalesPage() {
  const orders: OrderRow[] = (await getOrders()).map((o) => ({
    id: o.id,
    productName: o.productName,
    orderDate: o.orderDate.toISOString(),
    saleAmount: o.saleAmount,
    commissionEarned: o.commissionEarned,
    commissionRate: o.commissionRate,
    status: o.status,
  }));

  return <SalesTable orders={orders} />;
}
