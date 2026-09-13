"use client";

import { useState } from "react";
import axios from "axios";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
});

type ProfileUpdateFormProps = {
  name: string;
  phone?: string;
};

export default function ProfileUpdateForm({
  name,
  phone,
}: ProfileUpdateFormProps) {
  const [formName, setFormName] = useState(name);
  const [formPhone, setFormPhone] = useState(phone ?? "");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const result = profileSchema.safeParse({
      name: formName,
      phone: formPhone,
    });

    if (!result.success) {
      setMessage(result.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    try {
      await axios.put(
        "http://localhost:3000/engineer/profile",
        result.data,
        {
          withCredentials: true,
        }
      );

      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to update profile.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4">
      <div>
        <label className="mb-1 block font-medium">Name</label>

        <input
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Phone</label>

        <input
          value={formPhone}
          onChange={(e) => setFormPhone(e.target.value)}
          className="w-full rounded border p-2"
        />
      </div>

      {message && (
        <p className="text-sm">{message}</p>
      )}

      <button
        type="submit"
        className="rounded bg-black px-4 py-2 text-white"
      >
        Update Profile
      </button>
    </form>
  );
}