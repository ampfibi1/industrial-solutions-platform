"use client";

import DeleteButton from "@/components/admin/DeleteButton";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, type SubmitEvent } from "react";
import { z } from "zod";

const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .max(100, "Category name must be at most 100 characters"),
});

type Category = {
  id: number;
  name: string;
};

export default function CategoryManager({
  categories,
}: {
  categories: Category[];
}) {
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSaving(true);

    const formData = new FormData(e.currentTarget);

    const result = categorySchema.safeParse({
      name: String(formData.get("name") ?? "").trim(),
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      setSaving(false);
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/admin/categories",
        {
          name: result.data.name,
        },
        { withCredentials: true }
      );
      alert("Category created successfully");
      router.refresh();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || "Request failed";

        setError(Array.isArray(message) ? message[0] : message );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <p className="text-muted-foreground">Manage product categories</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-6 flex flex-col sm:flex-row gap-3"
      >
        <input className="input input-bordered flex-1" placeholder="Category name" name="name" />

        <button type="submit" className="btn btn-primary" disabled={saving} >
          {saving ? "Saving..." : "Add Category"}
        </button>
      </form>

      {error && (
        <p className="mb-4 text-sm text-red-500">{error}</p>
      )}

      <div className="overflow-x-auto rounded-lg border">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>

                <td>
                  <DeleteButton
                    id={category.id}
                    url={`http://localhost:3000/admin/categories/${category.id}`}
                    name="Category"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}