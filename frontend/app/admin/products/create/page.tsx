"use client";

import axios from "axios";
import { useEffect, useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const productSchema = z.object({
  sku: z
    .string()
    .min(1, "SKU is required")
    .max(50, "SKU must be at most 50 characters"),

  name: z
    .string()
    .min(1, "Product name is required")
    .max(150, "Product name must be at most 150 characters"),

  description: z.string().optional(),

  price: z
    .number()
    .min(0, "Price cannot be negative"),

  stock: z
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),

  categoryId: z
    .number()
    .int()
    .positive("Please select a category"),
});

type Category = {
  id: number;
  name: string;
};

export default function CreateProductPage() {
  const router = useRouter();

  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);

  const [picture, setPicture] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/categories",{ withCredentials: true });
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (
    e: SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const result = productSchema.safeParse({
      sku,
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      categoryId: Number(categoryId),
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string") fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("sku", result.data.sku);
      formData.append("name", result.data.name);
      formData.append("description",result.data.description ?? "");
      formData.append("price",result.data.price.toString());
      formData.append("stock",result.data.stock.toString());
      formData.append("categoryId",result.data.categoryId.toString());

      if (picture) formData.append("picture", picture);

      await axios.post("http://localhost:3000/admin/products",formData,{ withCredentials: true });
      alert("Product created successfully");
      router.push("/admin/products");
    } catch (error) {
      console.error("Failed to create product:", error);
      alert("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl" >
        <div>
          <label className="label">SKU</label>

          <input type="text" className="input input-bordered w-full" value={sku}
            onChange={(e) =>
              setSku(e.target.value)
            }
          />

          {errors.sku && (<p className="text-error text-sm mt-1">{errors.sku}</p>)}
        </div>

        <div>
          <label className="label">Product Name</label>

          <input type="text" className="input input-bordered w-full" value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          {errors.name && (<p className="text-error text-sm mt-1">{errors.name}</p>)}
        </div>

        {/* Description */}
        <div>
          <label className="label">
            Description
          </label>

          <textarea
            className="textarea textarea-bordered w-full"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
        </div>

        {/* Price */}
        <div>
          <label className="label">
            Price
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            className="input input-bordered w-full"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
          />

          {errors.price && (
            <p className="text-error text-sm mt-1">
              {errors.price}
            </p>
          )}
        </div>

        {/* Stock */}
        <div>
          <label className="label">
            Stock
          </label>

          <input
            type="number"
            min="0"
            className="input input-bordered w-full"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
          />

          {errors.stock && (
            <p className="text-error text-sm mt-1">
              {errors.stock}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="label">
            Category
          </label>

          <select
            className="select select-bordered w-full"
            value={categoryId}
            onChange={(e) =>
              setCategoryId(e.target.value)
            }
          >
            <option value="">
              Select a category
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>

          {errors.categoryId && (
            <p className="text-error text-sm mt-1">
              {errors.categoryId}
            </p>
          )}
        </div>

        {/* Picture */}
        <div>
          <label className="label">
            Product Picture
          </label>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={(e) =>
              setPicture(
                e.target.files?.[0] ?? null
              )
            }
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Product"}
          </button>

          <button
            type="button"
            className="btn"
            onClick={() => router.back()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}