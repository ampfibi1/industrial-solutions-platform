export type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface OrderItem {
  id: number;
  product: { id: number };
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  customer: User;
  salesExecutive: User;
  status: OrderStatus;
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
}

export interface Assignment {
  id: number;
  salesExecutive: User;
  customer: User;
  region: string;
  assignedAt: string;
}

export interface CreateOrderInput {
  customer_id: number;
  items: { product_id: number; quantity: number; unit_price: number }[];
}

export interface CreateAssignmentInput {
  customer_id: number;
  region?: string;
}