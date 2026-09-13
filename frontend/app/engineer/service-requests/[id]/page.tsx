"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import ServiceStatusForm from "@/components/engineer/ServiceStatusForm";

type ServiceRequest = {
  id: number;
  description?: string;
  status?: string;
  createdAt?: string;
  resolvedAt?: string;
  product?: {
    name?: string;
  };
  customer?: {
    name?: string;
    email?: string;
  };
};

export default function ServiceRequestDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);

  useEffect(() => {
    async function getRequest() {
      try {
        const { id } = await params;

        const response = await axios.get(
          `http://localhost:3000/engineer/service-request/${id}`,
          {
            withCredentials: true,
          }
        );

        setRequest(response.data);
      } catch (error) {
        console.error("Failed to load service request:", error);
        setNotFoundError(true);
      } finally {
        setLoading(false);
      }
    }

    getRequest();
  }, [params]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (notFoundError || !request) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Service Request #{request.id}
      </h1>

      <div className="mt-6 max-w-lg space-y-3 rounded-lg border p-6">
        <p>
          <span className="font-medium">Product:</span>{" "}
          {request.product?.name ?? "Unknown"}
        </p>

        <p>
          <span className="font-medium">Status:</span>{" "}
          {request.status ?? "Unknown"}
        </p>

        <p>
          <span className="font-medium">Description:</span>{" "}
          {request.description ?? "No description"}
        </p>

        <p>
          <span className="font-medium">Customer:</span>{" "}
          {request.customer?.name ?? "Unknown"}
        </p>

        <p>
          <span className="font-medium">Customer Email:</span>{" "}
          {request.customer?.email ?? "Unknown"}
        </p>

        <p>
          <span className="font-medium">Created:</span>{" "}
          {request.createdAt
            ? new Date(request.createdAt).toLocaleString()
            : "Unknown"}
        </p>

        <p>
          <span className="font-medium">Resolved:</span>{" "}
          {request.resolvedAt
            ? new Date(request.resolvedAt).toLocaleString()
            : "Not resolved"}
        </p>
      </div>

      <ServiceStatusForm
        requestId={request.id}
        currentStatus={request.status ?? "OPEN"}
      />

      <Link
        href="/engineer/service-requests"
        className="mt-4 inline-block underline"
      >
        Back to Service Requests
      </Link>
    </div>
  );
}