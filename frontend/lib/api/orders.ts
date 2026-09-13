import { api, withCookie } from "../axios";
import { Order, OrderStatus } from "../types";
import { CreateOrderInput } from "../validations";

// AXIOS CALL 1 — GET /api/sales/orders (SSR list + CSR filter re-fetch)
export async function getOrders(cookieHeader?: string): Promise<Order[]> {
  const res = await api.get<Order[]>("/api/sales/orders", withCookie(cookieHeader));
  return res.data;
}

// AXIOS CALL 2 — GET /api/sales/orders/:id (SSR detail + CSR edit prefill)
export async function getOrderById(id: number, cookieHeader?: string): Promise<Order> {
  const res = await api.get<Order>(`/api/sales/orders/${id}`, withCookie(cookieHeader));
  return res.data;
}

// AXIOS CALL 3 — POST /api/sales/orders (CSR, cookie sent automatically)
export async function createOrder(data: CreateOrderInput): Promise<Order> {
  const res = await api.post<Order>("/api/sales/orders", data);
  return res.data;
}

// AXIOS CALL 4 — PATCH /api/sales/orders/:id
export async function updateOrderStatus(id: number, status: OrderStatus): Promise<Order> {
  const res = await api.patch<Order>(`/api/sales/orders/${id}`, { status });
  return res.data;
}

// AXIOS CALL 5 — DELETE /api/sales/orders/:id
export async function deleteOrder(id: number): Promise<{ message: string }> {
  const res = await api.delete(`/api/sales/orders/${id}`);
  return res.data;
}