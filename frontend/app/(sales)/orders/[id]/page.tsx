import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/api/orders";
import { getCookieHeader } from "@/lib/server-cookie";
import { OrderStatusBadge } from "@/components/sales/order-status-badge";
import { DeleteOrderButton } from "@/components/sales/delete-order-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  let order;
  try {
    order = await getOrderById(id, getCookieHeader()); // AXIOS — SSR, dynamic param
  } catch {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link href="/orders" className="text-sm text-muted-foreground hover:underline">
        ← Back to orders
      </Link>

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">
            Order #{order.id} — ৳{Number(order.totalAmount).toLocaleString()}
          </h1>
          <OrderStatusBadge status={order.status} />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" render={<Link href={`/orders/${order.id}/edit`} />}>
            Update status
          </Button>
          <DeleteOrderButton orderId={order.id} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-sm">Customer</CardTitle></CardHeader>
          <CardContent>
            <p className="font-medium">{order.customer.name}</p>
            <p className="text-sm text-muted-foreground">{order.customer.email}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Sales executive</CardTitle></CardHeader>
          <CardContent>
            <p className="font-medium">{order.salesExecutive.name}</p>
            <p className="text-sm text-muted-foreground">{order.salesExecutive.email}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-sm">Line items</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product ID</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead className="text-right">Unit price</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>#{item.product.id}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-right">৳{Number(item.unitPrice).toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    ৳{(item.quantity * Number(item.unitPrice)).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}