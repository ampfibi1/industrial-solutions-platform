"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

type Product = {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category?: {
    id: number;
    name: string;
  };
  createdBy?: {
    id: number;
    name: string;
    email: string;
  };
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/admin/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="p-6">Loading products...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage platform products
          </p>
        </div>

        <button className="btn btn-primary">
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>SKU</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Created By</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.sku}</td>
                <td>{product.name}</td>
                <td>{product.category?.name ?? "-"}</td>
                <td>৳{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.createdBy?.name ?? "-"}</td>

                <td className="flex gap-2">
                  <button className="btn btn-sm">
                    Edit
                  </button>

                  <button className="btn btn-sm btn-error">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}