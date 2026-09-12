import Link from "next/link";
import ProductCard from "@/components/admin/products/card";
import axios from "axios";

async function getProducts() {
  const response = await axios.get("http://localhost:3000/admin/products");
  return response.data;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>

          <p className="text-muted-foreground">
            Manage platform products
          </p>
        </div>

        <Link
          href="/admin/products/create"
          className="btn btn-primary"
        >
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="rounded-lg border p-10 text-center">
          <h2 className="text-lg font-semibold">
            No products found
          </h2>

          <p className="text-base-content/60 mt-2">
            Start by adding your first product.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product: any) => (
            <ProductCard
              key={product.id}
              id={product.id}
              sku={product.sku}
              name={product.name}
              description={product.description}
              price={product.price}
              stock={product.stock}
              category={product.category}
              pictureUrl={`http://localhost:3000/admin/products/${product.id}/picture`}
            />
          ))}
        </div>
      )}
    </div>
  );
}