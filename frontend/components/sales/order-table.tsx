"use client";

import { useState } from "react";
import Link from "next/link";
import { Order, OrderStatus } from "@/lib/types";
import { getOrders } from "@/lib/api/orders";
import { OrderStatusBadge } from "./order-status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const STATUSES: (OrderStatus | "ALL")[] = [
  "ALL",
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export function OrderTable({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState<OrderStatus | "ALL">("ALL");
  const [refreshing, setRefreshing] = useState(false);

  async function handleFilterChange(next: OrderStatus | "ALL") {
    setFilter(next);
    setRefreshing(true);
    try {
      // CSR re-fetch — cookie goes along automatically (withCredentials)
      const fresh = await getOrders();
      setOrders(fresh);
    } finally {
      setRefreshing(false);
    }
  }

  const visible = filter === "ALL" ? orders : orders.filter((o) => o.status === filter);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {STATUSES.map((status) => (
            <Button
              key={status}
              size="sm"
              variant={filter === status ? "default" : "outline"}
              onClick={() => handleFilterChange(status)}
            >
              {status}
            </Button>
          ))}
          {refreshing && <span className="text-xs text-muted-foreground">refreshing…</span>}
        </div>

        {visible.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No orders match this filter.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Link href={`/orders/${order.id}`} className="font-medium text-primary">
                      #{order.id}
                    </Link>
                  </TableCell>
                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell className="text-muted-foreground">{order.items.length}</TableCell>
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
        )}
      </CardContent>
    </Card>
  );
}