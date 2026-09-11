"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState, type SubmitEvent } from "react";
import { z } from "zod";

const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email"),
    phone: z.string().min(11, "Phone number must be at least 11 characters"),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    role: z.string(),
    companyId: z.string(),
  })
  .refine(
    (data) => !data.password || data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

type Company = {
  id: number;
  name: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  company?: {
    id: number;
    name: string;
  };
};

export default function CreateEditUserForm({
  user,
  onCancel,
}: {
  user?: User;
  onCancel?: () => void;
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);

  const router = useRouter();
  const isEdit = !!user;

  useEffect(() => {
    async function getCompanies() {
      try {
        const response = await axios.get("http://localhost:3000/admin/companies");
        setCompanies(response.data);
      } catch (err) {
        console.error("Failed to load companies", err);
      }
    }

    getCompanies();
  }, []);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const result = signUpSchema.safeParse({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      password: String(formData.get("password") ?? ""),
      confirmPassword: String(formData.get("confirmPassword") ?? ""),
      role: String(formData.get("role") ?? ""),
      companyId: String(formData.get("companyId") ?? ""),
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      setLoading(false);
      return;
    }

    try {
      if (isEdit) {
        await axios.patch(
          `http://localhost:3000/admin/users/${user.id}`,
          {
            name: result.data.name,
            email: result.data.email,
            phone: result.data.phone,
            role: result.data.role,
            companyId:
              result.data.companyId === "" ? null : Number(result.data.companyId),
          }
        );

        alert("User updated successfully");

        onCancel?.();
      } else {
        await axios.post(
          "http://localhost:3000/admin/createUser",
          {
            name: result.data.name,
            email: result.data.email,
            phone: result.data.phone,
            password: result.data.password,
            role: result.data.role,
            companyId:
              result.data.companyId === "" ? null : Number(result.data.companyId),
          }
        );

        alert("User created successfully");
      }

      router.refresh();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || "Request failed";
        setError(Array.isArray(message) ? message[0] : message);
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
        {isEdit ? "Edit User" : "Create User"}
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
          defaultValue={user?.name ?? ""}
        />

        <input
          className="border rounded-lg p-2"
          placeholder="Email"
          type="email"
          name="email"
          defaultValue={user?.email ?? ""}
        />

        {!isEdit && (
          <>
            <input
              className="border rounded-lg p-2"
              placeholder="Password"
              type="password"
              name="password"
            />

            <input
              className="border rounded-lg p-2"
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
            />
          </>
        )}

        <input
          className="border rounded-lg p-2"
          placeholder="Phone"
          type="tel"
          name="phone"
          defaultValue={user?.phone ?? ""}
        />

        <select
          className="border rounded-lg p-2"
          name="role"
          defaultValue={user?.role ?? "ADMIN"}
        >
          <option value="ADMIN">ADMIN</option>
          <option value="SALES_EXECUTIVE">
            SALES EXECUTIVE
          </option>
          <option value="ENGINEER">ENGINEER</option>
        </select>

        <select
          className="border rounded-lg p-2"
          name="companyId"
          defaultValue={user?.company?.id ?? ""}
        >
          <option value="">No Company</option>

          {companies.map((company) => (
            <option
              key={company.id}
              value={company.id}
            >
              {company.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-x-2">
        <button
          type="submit"
          className="bg-black text-white px-5 py-2 rounded-lg"
        >
          {loading
            ? "Saving..."
            : isEdit
            ? "Update User"
            : "Create User"}
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