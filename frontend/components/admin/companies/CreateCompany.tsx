"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, type SubmitEvent } from "react";
import { z } from "zod";

const companySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),

  gstNumber: z
    .string()
    .min(5, "GST number must be at least 5 characters")
    .max(100, "GST number is too long")
    .regex(/^[A-Z0-9]+$/, "GST number must be alphanumeric and uppercase"),

  address: z.string().min(1, "Address is required"),
  industry: z.string().min(2, "Industry must be at least 2 characters"),
});

type Company = {
  id: number;
  name: string;
  gstNumber: string;
  address: string;
  industry: string;
};

export default function CreateEditCompanyForm({company,onCancel,}: {company?: Company;onCancel?: () => void;}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const isEdit = !!company;

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const result = companySchema.safeParse({
      name: formData.get("name"),
      gstNumber: formData.get("gstNumber"),
      address: formData.get("address"),
      industry: formData.get("industry"),
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      setLoading(false);
      return;
    }

    try {
      if (isEdit) {
      await axios.patch(
        `http://localhost:3000/admin/company/${company.id}`,
        {
          name: result.data.name,
          gstNumber: result.data.gstNumber,
          address: result.data.address,
          industry: result.data.industry,
        }
      );
  
      alert("Company updated successfully");
      onCancel?.();
    }else {
        await axios.post(
          "http://localhost:3000/admin/createCompanie",
          {
            name: result.data.name,
            gstNumber: result.data.gstNumber,
            address: result.data.address,
            industry: result.data.industry,
          }
        );

        alert("Company created successfully");
      }

      router.refresh();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message || "Request failed";

        setError(
          Array.isArray(message) ? message[0] : message
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-xl p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold">
        {isEdit ? "Edit Company" : "Create Company"}
      </h2>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-4">

        <input
          className="border rounded-lg p-2"
          placeholder="Name"
          name="name"
          type="text"
          defaultValue={company?.name ?? ""}
        />

        <input
          className="border rounded-lg p-2"
          placeholder="GST Number"
          type="text"
          name="gstNumber"
          defaultValue={company?.gstNumber ?? ""}
        />

        <input
          className="border rounded-lg p-2"
          placeholder="Address"
          type="text"
          name="address"
          defaultValue={company?.address ?? ""}
        />

        <input
          className="border rounded-lg p-2"
          placeholder="Industry"
          type="text"
          name="industry"
          defaultValue={company?.industry ?? ""}
        />

      </div>

      <div className="space-x-2">

        <button
          type="submit"
          className="bg-black text-white px-5 py-2 rounded-lg"
        >
          {loading
            ? "Saving..."
            : isEdit
            ? "Update Company"
            : "Create Company"}
        </button>

        {isEdit && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border"
          >
            Cancel
          </button>
        )}

      </div>
    </form>
  );
}