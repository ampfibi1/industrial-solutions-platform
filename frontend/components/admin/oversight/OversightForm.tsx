"use client";

import { useState, type SubmitEvent } from "react";
import { z } from "zod";

const oversightSchema = z.object({
  adminId: z
    .string()
    .min(1, "Please select an admin")
    .transform(Number)
    .refine(
      (value) => Number.isInteger(value) && value > 0,
      {
        message: "Invalid admin",
      },
    ),

  companyId: z
    .string()
    .min(1, "Please select a company")
    .transform(Number)
    .refine(
      (value) => Number.isInteger(value) && value > 0,
      {message: "Invalid company"},
    ),
});

type Admin = {
  id: number;
  name: string;
  email: string;
};

type Company = {
  id: number;
  name: string;
};

type Props = {
  admins: Admin[];
  companies: Company[];
  onCompanyChange: (companyId: string) => void;
  onSubmit: (adminId: number, companyId: number) => void;
  errors: string[];
  loading: boolean;
};

export default function OversightForm({admins,companies,onCompanyChange,onSubmit,errors,loading}: Props) {
  const [adminId, setAdminId] = useState("");
  const [companyId, setCompanyId] = useState("");

  function handleSubmit(
    event: SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const validation = oversightSchema.safeParse({
      adminId,
      companyId,
    });

    if (!validation.success) {
      return;
    }

    onSubmit(
      validation.data.adminId,
      validation.data.companyId,
    );

    setAdminId("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-4 rounded-lg border p-6"
    >
      <div>
        <label className="mb-1 block font-medium">
          Admin
        </label>

        <select
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="">Select an admin</option>

          {admins.map((admin) => (
            <option key={admin.id} value={admin.id}>
              {admin.name} - {admin.email}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block font-medium">
          Company
        </label>

        <select
          value={companyId}
          onChange={(e) => {
            setCompanyId(e.target.value);
            onCompanyChange(e.target.value);
          }}
          className="select select-bordered w-full"
        >
          <option value="">Select a company</option>

          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>

      {errors.length > 0 && (
        <div className="alert alert-error">
          <ul className="list-disc pl-5">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary"
      >
        {loading ? "Assigning..." : "Assign Oversight"}
      </button>
    </form>
  );
}