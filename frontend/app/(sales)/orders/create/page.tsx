"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createOrderSchema, CreateOrderInput } from "@/lib/validations";
import { createOrder } from "@/lib/api/orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function CreateOrderPage() {
  const router = useRouter();
  const form = useForm<CreateOrderInput>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: { items: [{ product_id: undefined, quantity: undefined, unit_price: undefined }] },
  });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "items" });

  async function onSubmit(data: CreateOrderInput) {
    // AXIOS — CSR insert
    const order = await createOrder(data);
    router.push(`/orders/${order.id}`);
  }

  return (
    <div className="max-w-2xl space-y-4">
      <Link href="/orders" className="text-sm text-muted-foreground hover:underline">
        ← Back to orders
      </Link>

      <Card>
        <CardHeader><CardTitle>New order</CardTitle></CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="customer_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer ID</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Line items</p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => append({ product_id: undefined, quantity: undefined, unit_price: undefined })}
                  >
                    + Add item
                  </Button>
                </div>

                {fields.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2">
                    <FormField
                      control={form.control}
                      name={`items.${index}.product_id`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Product ID</FormLabel>
                          <FormControl><Input type="number" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Quantity</FormLabel>
                          <FormControl><Input type="number" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${index}.unit_price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Unit price</FormLabel>
                          <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="self-end text-destructive"
                      disabled={fields.length === 1}
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Creating…" : "Create order"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}