"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";

const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    const result = signUpSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    console.log(result.data);
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
        <form  onSubmit={handleSubmit}  className="w-full max-w-sm space-y-4 rounded-lg border p-6">
            <h1 className="text-2xl font-bold">Sign Up</h1>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <input name="name" type="text" placeholder="Name" className="w-full rounded border p-2"/>      
            <input name="email" type="text" placeholder="Email" className="w-full rounded border p-2"/>

            <input  name="password"  type="text" placeholder="Password"  className="w-full rounded border p-2"/>

            <input  name="confirmPassword"  type="text"  placeholder="Confirm Password"  className="w-full rounded border p-2"/>

            <button  type="submit"  className="w-full rounded bg-black p-2 text-white">Sign Up</button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-black underline">Sign In</Link>
            </p>

            <p className="text-center text-sm">
              <Link href="/" className="text-gray-500 hover:text-black">Back to Home</Link>
            </p>
      </form>
    </main>
  );
}