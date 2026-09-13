import { z } from "zod";

export const orderItemSchema = z.object({
  product_id: z.coerce.number().int().positive("Product ID must be a positive number."),
  quantity: z.coerce.number().int().positive("Quantity must be greater than 0."),
  unit_price: z.coerce.number().positive("Unit price must be greater than 0."),
});

export const createOrderSchema = z.object({
  customer_id: z.coerce.number().int().positive("Select a customer."),
  items: z.array(orderItemSchema).min(1, "Add at least one item."),
});
export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export const createAssignmentSchema = z.object({
  customer_id: z.coerce.number().int().positive("Select a customer."),
  region: z.string().optional(),
});
export type CreateAssignmentInput = z.infer<typeof createAssignmentSchema>;