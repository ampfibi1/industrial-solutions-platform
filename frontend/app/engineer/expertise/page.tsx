"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Product = {
  id: number;
  sku: string;
  name: string;
};

type Expertise = {
  id: number;
  certifiedAt?: string;
  product?: {
    id: number;
    sku?: string;
    name?: string;
  };
};

const products: Product[] = [
  {
    id: 1,
    name: "Test Laptop",
    sku: "TEST-LAPTOP",
  },
  {
    id: 2,
    name: "Test Printer",
    sku: "TEST-PRINTER",
  },
  {
    id: 3,
    name: "Desktop Computer",
    sku: "TEST-DESKTOP",
  },
  {
    id: 4,
    name: "Network Router",
    sku: "TEST-ROUTER",
  },
  {
    id: 5,
    name: "Network Switch",
    sku: "TEST-SWITCH",
  },
  {
    id: 6,
    name: "CCTV Camera",
    sku: "TEST-CCTV",
  },
  {
    id: 7,
    name: "Projector",
    sku: "TEST-PROJECTOR",
  },
  {
    id: 8,
    name: "UPS",
    sku: "TEST-UPS",
  },
  {
    id: 9,
    name: "Scanner",
    sku: "TEST-SCANNER",
  },
  {
    id: 10,
    name: "Server",
    sku: "TEST-SERVER",
  },
];

export default function EngineerExpertise() {
  const [expertise, setExpertise] = useState<Expertise[]>([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExpertise, setSelectedExpertise] =
    useState<Expertise | null>(null);
  const [loading, setLoading] = useState(false);

  async function getExpertise() {
    try {
      const response = await axios.get(
        "http://localhost:3000/engineer/expertise",
        {
          withCredentials: true,
        }
      );

      setExpertise(response.data);
    } catch (error) {
      console.error("Failed to load expertise:", error);
      setMessage("Failed to load expertise.");
    }
  }

  useEffect(() => {
    getExpertise();
  }, []);

  const availableProducts = products.filter(
    (product) =>
      !expertise.some(
        (item) => item.product?.id === product.id
      )
  );

  function openModal() {
    setMessage("");
    setSelectedProductId("");
    setIsModalOpen(true);
  }

  function closeModal() {
    if (loading) {
      return;
    }

    setIsModalOpen(false);
    setSelectedProductId("");
    setMessage("");
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (!selectedProductId) {
      setMessage("Please select a product.");
      return;
    }

    const productId = Number(selectedProductId);

    const selectedProduct = products.find(
      (product) => product.id === productId
    );

    if (!selectedProduct) {
      setMessage("Please select a valid product.");
      return;
    }

    const alreadyExists = expertise.some(
      (item) => item.product?.id === productId
    );

    if (alreadyExists) {
      setMessage("This product is already in your expertise.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:3000/engineer/expertise",
        {
          product_id: productId,
        },
        {
          withCredentials: true,
        }
      );

      setIsModalOpen(false);
      setSelectedProductId("");
      setMessage(
        `${selectedProduct.name} added to your expertise successfully.`
      );

      await getExpertise();
    } catch (error) {
      console.error(error);

      if (
        axios.isAxiosError(error) &&
        error.response?.status === 404
      ) {
        setMessage("Please select a valid product.");
      } else {
        setMessage("Failed to add expertise.");
      }
    } finally {
      setLoading(false);
    }
  }

  function openDeleteModal(item: Expertise) {
    setSelectedExpertise(item);
    setIsDeleteModalOpen(true);
    setMessage("");
  }

  function closeDeleteModal() {
    if (loading) {
      return;
    }

    setSelectedExpertise(null);
    setIsDeleteModalOpen(false);
  }

  async function confirmDelete() {
    if (!selectedExpertise) {
      return;
    }

    try {
      setLoading(true);

      await axios.delete(
        `http://localhost:3000/engineer/expertise/${selectedExpertise.id}`,
        {
          withCredentials: true,
        }
      );

      const productName =
        selectedExpertise.product?.name ?? "Expertise";

      setExpertise((current) =>
        current.filter(
          (item) => item.id !== selectedExpertise.id
        )
      );

      setSelectedExpertise(null);
      setIsDeleteModalOpen(false);

      setMessage(`${productName} removed from your expertise.`);
    } catch (error) {
      console.error(error);
      setMessage("Failed to remove expertise.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Expertise</h1>

          <p className="mt-1 text-sm text-gray-500">
            Products you are experienced and qualified to service.
          </p>
        </div>

        <button
          type="button"
          onClick={openModal}
          className="rounded bg-black px-4 py-2 text-white hover:opacity-90"
        >
          + Add Expertise
        </button>
      </div>

      {message && !isModalOpen && !isDeleteModalOpen && (
        <div className="mt-4 max-w-2xl rounded-lg border p-3 text-sm">
          {message}
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-lg font-semibold">
          Current Expertise
        </h2>

        {expertise.length === 0 ? (
          <div className="mt-4 max-w-2xl rounded-lg border p-8 text-center">
            <p className="font-medium">No expertise added.</p>

            <p className="mt-1 text-sm text-gray-500">
              Add a product that you are qualified to service.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
            {expertise.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border p-5"
              >
                <div>
                  <p className="font-medium">
                    {item.product?.name ?? "Unknown Product"}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Product ID: {item.product?.id ?? "Unknown"}
                  </p>

                  <p className="text-sm text-gray-500">
                    SKU: {item.product?.sku ?? "Unknown"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => openDeleteModal(item)}
                  className="rounded border px-3 py-1 text-sm hover:bg-gray-100"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Expertise Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5">
              <h2 className="text-xl font-semibold">
                Add Product Expertise
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Select the product you are qualified to service.
              </p>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              {availableProducts.length === 0 ? (
                <div className="rounded-lg border p-4">
                  <p className="font-medium">
                    All available products are already added.
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Remove an existing expertise first if you want
                    to add it again.
                  </p>
                </div>
              ) : (
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Product
                  </label>

                  <select
                    value={selectedProductId}
                    onChange={(e) =>
                      setSelectedProductId(e.target.value)
                    }
                    className="w-full rounded-lg border p-2.5"
                  >
                    <option value="">
                      Select a product
                    </option>

                    {availableProducts.map((product) => (
                      <option
                        key={product.id}
                        value={product.id}
                      >
                        {product.id} - {product.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {message && (
                <p className="text-sm text-red-600">
                  {message}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={loading}
                  className="rounded-lg border px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                >
                  Cancel
                </button>

                {availableProducts.length > 0 && (
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-black px-4 py-2 text-white hover:opacity-90 disabled:opacity-50"
                  >
                    {loading ? "Adding..." : "Add Expertise"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedExpertise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold">
              Remove Expertise
            </h2>

            <p className="mt-3 text-sm text-gray-600">
              Are you sure you want to remove{" "}
              <span className="font-semibold">
                {selectedExpertise.product?.name ??
                  "this expertise"}
              </span>{" "}
              from your expertise?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={loading}
                className="rounded-lg border px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                disabled={loading}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
