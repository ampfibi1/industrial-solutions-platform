"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

type Product = {
  id: number;
  sku: string;
  name: string;
  description?: string;
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

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const id = params.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/admin/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading product...</div>;
  }

  if (!product) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Product not found</h1>

        <button className="btn mt-4" onClick={() => router.back()} >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          className="btn btn-sm"
          onClick={() => router.back()}
        >
          ← Back
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Product image */}
        <div className="rounded-lg border bg-base-200 overflow-hidden">
          <img
            src={`http://localhost:3000/admin/products/${product.id}/picture`}
            alt={product.name}
            className="w-full h-[400px] object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://cdn3d.iconscout.com/3d/premium/thumb/product-5806313-4863042.png";
            }}
          />
        </div>

        {/* Product information */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-base-content/60">SKU: {product.sku}</p>
          <div className="divider" />

          <p className="text-2xl font-bold">৳{product.price}</p>

          <div className="mt-4">
            <p>
              <strong>Category:</strong>{" "}
              {product.category?.name ?? "-"}
            </p>

            <p className="mt-2">
              <strong>Stock:</strong> {product.stock}
            </p>

            <p className="mt-2">
              <strong>Created By:</strong>{" "}
              {product.createdBy?.name ?? "-"}
            </p>
          </div>

          <div className="divider" />

          <h2 className="text-lg font-semibold">
            Description
          </h2>

          <p className="mt-2 text-base-content/70">
            {product.description || "No description available."}
          </p>

          <div className="mt-6">
            <button
              className="btn btn-primary"
              onClick={() =>
                router.push(`/admin/products/${product.id}/edit`)
              }
            >
              Edit Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}