"use client";

import Link from "next/link";
import DeleteButton from "../DeleteButton";

type ProductCardProps = {
  id: number;
  sku: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  pictureUrl?: string;
  category?: {
    id: number;
    name: string;
  };
};

export default function ProductCard({
  id,
  sku,
  name,
  description,
  price,
  stock,
  pictureUrl,
  category,
}: ProductCardProps) {
  return (
    <div className="card bg-base-100 shadow-sm border">
      <figure className="h-52 bg-base-200">
  <img
    src={
      pictureUrl ||
      "https://cdn3d.iconscout.com/3d/premium/thumb/product-5806313-4863042.png"
    }
    alt={name}
    className="h-full w-full object-cover"
    onError={(e) => {
      e.currentTarget.src =
        "https://cdn3d.iconscout.com/3d/premium/thumb/product-5806313-4863042.png";
    }}
  />
</figure>

      <div className="card-body">
        <div className="flex items-start justify-between gap-2">
          <h2 className="card-title">{name}</h2>

          <span
            className={`badge ${
              stock > 0 ? "badge-success" : "badge-error"
            }`}
          >
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <p className="text-sm text-base-content/60">
          SKU: {sku}
        </p>

        <p className="text-sm">
          {description || "No description available."}
        </p>

        <div className="mt-2">
          <p className="font-bold text-lg">৳{price}</p>

          <p className="text-sm text-base-content/60">
            Category: {category?.name ?? "-"}
          </p>

          <p className="text-sm text-base-content/60">
            Stock: {stock}
          </p>
        </div>

        <div className="card-actions justify-end mt-4">
          <Link
            href={`/admin/products/${id}`}
            className="btn btn-sm btn-primary"
          >
            Edit
          </Link>

          <DeleteButton
            id={id}
            url={`/admin/products/${id}`}
            name={name}
          />
        </div>
      </div>
    </div>
  );
}