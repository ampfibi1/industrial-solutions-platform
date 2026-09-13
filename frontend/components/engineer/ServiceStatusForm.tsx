"use client";

import { useState } from "react";
import axios from "axios";
import { z } from "zod";

const statusSchema = z.object({
  status: z.enum([
    "OPEN",
    "IN_PROGRESS",
    "RESOLVED",
    "CLOSED",
  ]),
});

type ServiceStatusFormProps = {
  requestId: number;
  currentStatus: string;
};

export default function ServiceStatusForm({
  requestId,
  currentStatus,
}: ServiceStatusFormProps) {
  const [status, setStatus] = useState(currentStatus);
  const [message, setMessage] = useState("");

  const nextStatus: Record<string, string | null> = {
    OPEN: "IN_PROGRESS",
    IN_PROGRESS: "RESOLVED",
    RESOLVED: "CLOSED",
    CLOSED: null,
  };

  const allowedNextStatus = nextStatus[currentStatus];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const result = statusSchema.safeParse({ status });

    if (!result.success) {
      setMessage("Invalid status");
      return;
    }

    if (!allowedNextStatus) {
      setMessage("This request is already closed.");
      return;
    }

    if (status !== allowedNextStatus) {
      setMessage(
        `Status can only move to ${allowedNextStatus.replace("_", " ")}.`
      );
      return;
    }

    try {
      await axios.patch(
        `http://localhost:3000/engineer/service-request/${requestId}`,
        result.data,
        {
          withCredentials: true,
        }
      );

      setMessage("Status updated successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to update status.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4">
      <div>
        <label className="mb-1 block font-medium">
          Update Status
        </label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={!allowedNextStatus}
          className="w-full rounded border p-2"
        >
          <option value={currentStatus}>
            {currentStatus.replace("_", " ")}
          </option>

          {allowedNextStatus && (
            <option value={allowedNextStatus}>
              {allowedNextStatus.replace("_", " ")}
            </option>
          )}
        </select>
      </div>

      {message && (
        <p className="text-sm">{message}</p>
      )}

      <button
        type="submit"
        disabled={!allowedNextStatus}
        className="rounded bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Update Status
      </button>
    </form>
  );
}