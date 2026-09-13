"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createAssignmentSchema, CreateAssignmentInput } from "@/lib/validations";
import { createAssignment } from "@/lib/api/assignments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function CreateAssignmentPage() {
  const router = useRouter();
  const form = useForm<CreateAssignmentInput>({ resolver: zodResolver(createAssignmentSchema) });

  async function onSubmit(data: CreateAssignmentInput) {
    // AXIOS — CSR insert
    await createAssignment(data);
    router.push("/assignments");
    router.refresh();
  }

  return (
    <div className="max-w-md space-y-4">
      <Link href="/assignments" className="text-sm text-muted-foreground hover:underline">
        ← Back to assignments
      </Link>

      <Card>
        <CardHeader><CardTitle>Assign a customer</CardTitle></CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <FormControl><Input placeholder="e.g. Dhaka" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                {form.formState.isSubmitting ? "Assigning…" : "Assign customer"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}