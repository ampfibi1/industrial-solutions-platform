"use client";

import Link from "next/link";
import { useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";

const signUpSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email"),
    phone: z.string().min(11, "Phone number must be at least 11 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const result = signUpSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:3000/auth/reg", {
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone,
        password: result.data.password,
      });

      router.push("/auth/signin");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || "Registration failed";

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
    <main className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-lg border p-6">
        <h1 className="text-2xl font-bold">Sign Up</h1>

        {error && (<p className="text-sm text-red-500">{error}</p>)}

        <input name="name"  type="text"  placeholder="Name"  className="w-full rounded border p-2"/>
        <input  name="email"  type="email"  placeholder="Email"  className="w-full rounded border p-2"/>
        <input name="phone" type="tel" placeholder="Phone" className="w-full rounded border p-2"/>
        <input  name="password"  type="password"  placeholder="Password"  className="w-full rounded border p-2"/>
        <input  name="confirmPassword"  type="password"  placeholder="Confirm Password"  className="w-full rounded border p-2"/>

        <button  type="submit"  disabled={loading}  className="w-full rounded bg-black p-2 text-white disabled:opacity-50">
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-black underline"
          >
            Sign In
          </Link>
        </p>

        <p className="text-center text-sm">
          <Link
            href="/"
            className="text-gray-500 hover:text-black"
          >
            Back to Home
          </Link>
        </p>
      </form>
    </main>
  );
}