import Link from "next/link";
import { getOrders } from "@/lib/api/orders";
import { getCookieHeader } from "@/lib/server-cookie";
import { OrderTable } from "@/components/sales/order-table";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const orders = await getOrders(getCookieHeader()); // AXIOS — SSR

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Orders</h1>
        <Button render={<Link href="/orders/create" />}>New order</Button>
      </div>
      <OrderTable initialOrders={orders} />
    </div>
  );
}