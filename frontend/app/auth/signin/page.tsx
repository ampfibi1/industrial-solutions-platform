"use client";

import Link from "next/link";
import { useState , type SubmitEvent} from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";

const signInSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignIn() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const result = signInSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    // Frontend validation
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid input");
      setLoading(false);
      return;
    }

    const { email, password } = result.data;

    try {
      // Send login request to backend
      const response = await axios.post("http://localhost:3000/auth/login",
        {
          email,
          password,
        }
      );

      // Get data returned by AuthService
      const { access_token, user } = response.data;

      // Store JWT
      localStorage.setItem("access_token", access_token);

      // Store user information
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on user role
      if (user.role === "CUSTOMER") {
        router.push(`/admin/${user.id}`);
      } else {
        router.push(`/profile/${user.id}`);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message ?? "Invalid email or password";

        if (Array.isArray(message)) {
          setError(message[0]);
        } else {
          setError(message);
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-lg border p-6"
      >
        <h1 className="text-2xl font-bold">
          Sign In
        </h1>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full rounded border p-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full rounded border p-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-black p-2 text-white disabled:opacity-50"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-black underline"
          >
            Sign Up
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