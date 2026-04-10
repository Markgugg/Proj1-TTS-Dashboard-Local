import { SalesTable } from "@/components/dashboard/sales-table";
import type { OrderRow } from "@/components/dashboard/sales-table";
import { getOrders } from "@/lib/data";
import * as mock from "@/lib/mock/handlers";

export default async function SalesPage() {
  let raw;
  try {
    raw = await getOrders();
  } catch (e) {
    console.error("SalesPage data fetch failed, using mock:", e);
    raw = mock.getOrders();
  }

  const orders: OrderRow[] = raw.map((o) => ({
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
