import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/lib/types";

const variants: Record<OrderStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  CONFIRMED: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  SHIPPED: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  DELIVERED: "bg-green-100 text-green-800 hover:bg-green-100",
  CANCELLED: "bg-red-100 text-red-800 hover:bg-red-100",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return <Badge className={variants[status]}>{status}</Badge>;
}