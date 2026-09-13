"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getOrderById, updateOrderStatus } from "@/lib/api/orders";
import { Order, OrderStatus } from "@/lib/types";
import { OrderStatusBadge } from "@/components/sales/order-status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const STATUSES: OrderStatus[] = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function EditOrderStatusPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const orderId = Number(id);

  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<OrderStatus>("PENDING");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // AXIOS — CSR, prefills the form
    getOrderById(orderId)
      .then((data) => {
        setOrder(data);
        setStatus(data.status);
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  async function handleSave() {
    setSaving(true);
    try {
      // AXIOS — CSR update
      await updateOrderStatus(orderId, status);
      router.push(`/orders/${orderId}`);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Skeleton className="h-48 w-full max-w-md" />;
  if (!order) return <p className="text-sm text-destructive">Order not found.</p>;

  return (
    <div className="max-w-md space-y-4">
      <Link href={`/orders/${orderId}`} className="text-sm text-muted-foreground hover:underline">
        ← Back to order
      </Link>

      <Card>
        <CardHeader><CardTitle>Update status — Order #{order.id}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="mb-2 text-xs text-muted-foreground">Current status</p>
            <OrderStatusBadge status={order.status} />
          </div>

          <Select value={status} onValueChange={(v) => setStatus(v as OrderStatus)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? "Saving…" : "Save status"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}