"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignIn() {
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    const result = signInSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    const { email, password } = result.data;
    console.log("Email:", email);
    console.log("Password:", password);
    if (email === "tamjid@gmail.com" && password === "tamjid") {
      router.push("/admin/tamjid");
      return;
    }
    
    setError("Invalid email or password");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-lg border p-6">
        <h1 className="text-2xl font-bold">Sign In</h1>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <input name="email" type="text" placeholder="Email" className="w-full rounded border p-2" value="tamjid@gmail.com"/>
        <input  name="password"  type="text"  placeholder="Password"  className="w-full rounded border p-2" value="tamjid"/>

        <button  type="submit"  className="w-full rounded bg-black p-2 text-white"> Sign In</button>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-black underline">Sign Up</Link>
        </p>

        <p className="text-center text-sm">
          <Link href="/" className="text-gray-500 hover:text-black"> Back to Home</Link>
        </p>
      </form>
    </main>
  );
}