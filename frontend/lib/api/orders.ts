import { api, withToken } from "../axios";
import { Order, OrderStatus } from "../types";
import { CreateOrderInput } from "../validations";

export async function getOrders(token?: string): Promise<Order[]> {
  const res = await api.get<Order[]>("/api/sales/orders", withToken(token));
  return res.data;
}

export async function getOrderById(id: number, token?: string): Promise<Order> {
  const res = await api.get<Order>(`/api/sales/orders/${id}`, withToken(token));
  return res.data;
}

export async function createOrder(data: CreateOrderInput): Promise<Order> {
  const res = await api.post<Order>("/api/sales/orders", data);
  return res.data;
}

export async function updateOrderStatus(id: number, status: OrderStatus): Promise<Order> {
  const res = await api.patch<Order>(`/api/sales/orders/${id}`, { status });
  return res.data;
}

export async function deleteOrder(id: number): Promise<{ message: string }> {
  const res = await api.delete(`/api/sales/orders/${id}`);
  return res.data;
}