import Link from "next/link";
import { getOrders } from "@/lib/api/orders";
import { getAssignments } from "@/lib/api/assignments";
import { getCookieHeader } from "@/lib/server-cookie";
import { StatCard } from "@/components/sales/stat-card";
import { OrderStatusBadge } from "@/components/sales/order-status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const cookieHeader = getCookieHeader();

  // AXIOS CALL — SSR, forwarded httpOnly cookie
  const orders = await getOrders(cookieHeader);
  // AXIOS CALL — SSR, forwarded httpOnly cookie
  const assignments = await getAssignments(cookieHeader);

  const pending = orders.filter((o) => o.status === "PENDING").length;
  const revenue = orders.reduce((sum, o) => sum + Number(o.totalAmount), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total orders" value={orders.length} />
        <StatCard label="Pending" value={pending} />
        <StatCard label="Assignments" value={assignments.length} />
        <StatCard label="Order value" value={`৳${revenue.toLocaleString()}`} />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm">Recent orders</CardTitle>
          <Link href="/orders" className="text-xs text-muted-foreground hover:underline">
            View all
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.slice(0, 5).map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Link href={`/orders/${order.id}`} className="text-primary">
                      #{order.id}
                    </Link>
                  </TableCell>
                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    ৳{Number(order.totalAmount).toLocaleString()}
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