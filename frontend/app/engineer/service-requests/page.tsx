"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";

type ServiceRequest = {
  id: number;
  description?: string;
  status?: string;
  createdAt?: string;
  product?: {
    id: number;
    name?: string;
  };
};

const statuses = [
  "ALL",
  "OPEN",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
];

export default function ServiceRequests() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [availableRequests, setAvailableRequests] = useState<
    ServiceRequest[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  async function loadRequests() {
    try {
      const [myRequestsResponse, availableResponse] =
        await Promise.all([
          axios.get(
            "http://localhost:3000/engineer/service-request",
            {
              withCredentials: true,
            }
          ),
          axios.get(
            "http://localhost:3000/engineer/available-service-requests",
            {
              withCredentials: true,
            }
          ),
        ]);

      setRequests(myRequestsResponse.data);
      setAvailableRequests(availableResponse.data);
    } catch (error) {
      console.error("Failed to load service requests:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRequests();
  }, []);

  async function handleApply(requestId: number) {
    try {
      setApplyingId(requestId);
      setMessage("");

      await axios.post(
        `http://localhost:3000/engineer/service-request/${requestId}/apply`,
        {},
        {
          withCredentials: true,
        }
      );

      setMessage(`Request #${requestId} assigned to you successfully.`);

      await loadRequests();
    } catch (error: any) {
      console.error("Failed to apply for service request:", error);

      setMessage(
        error.response?.data?.message ??
          "Failed to apply for the service request."
      );
    } finally {
      setApplyingId(null);
    }
  }

  const filteredRequests = useMemo(() => {
    if (selectedStatus === "ALL") {
      return requests;
    }

    return requests.filter(
      (request) => request.status === selectedStatus
    );
  }, [requests, selectedStatus]);

  const statusCounts = {
    ALL: requests.length,
    OPEN: requests.filter((request) => request.status === "OPEN").length,
    IN_PROGRESS: requests.filter(
      (request) => request.status === "IN_PROGRESS"
    ).length,
    RESOLVED: requests.filter(
      (request) => request.status === "RESOLVED"
    ).length,
    CLOSED: requests.filter(
      (request) => request.status === "CLOSED"
    ).length,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Service Requests</h1>

      {message && (
        <div className="alert alert-info mt-6">
          <span>{message}</span>
        </div>
      )}

      {loading ? (
        <p className="mt-6">Loading...</p>
      ) : (
        <>
          {/* Available Service Requests */}
          <section className="mt-8">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                Available Service Requests
              </h2>

              <p className="text-sm text-base-content/60">
                These requests are currently unassigned. You can apply for
                a request you want to handle.
              </p>
            </div>

            {availableRequests.length === 0 ? (
              <div className="rounded-lg border p-6">
                <p className="text font-medium text-base-content/60 text-primary">
                  No service requests are currently available.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {availableRequests.map((request) => (
                  <div
                    key={request.id}
                    className="rounded-lg border p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="font-semibold">
                          Request #{request.id}
                        </h3>

                        <p className="mt-2">
                          Product:{" "}
                          {request.product?.name ?? "Unknown"}
                        </p>

                        <p className="mt-1">
                          Description:{" "}
                          {request.description ?? "No description"}
                        </p>

                        <p className="mt-1">
                          Status:{" "}
                          <span className="font-medium">
                            {request.status ?? "Unknown"}
                          </span>
                        </p>
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary"
                        disabled={applyingId === request.id}
                        onClick={() => handleApply(request.id)}
                      >
                        {applyingId === request.id
                          ? "Applying..."
                          : "Apply"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Status Summary */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold">
              Request Summary
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
              {statuses.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setSelectedStatus(status)}
                  className={`rounded-lg border p-4 text-left transition ${
                    selectedStatus === status
                      ? "border-primary bg-primary/10"
                      : "hover:bg-base-200"
                  }`}
                >
                  <p className="text-sm text-base-content/60">
                    {status === "ALL"
                      ? "All"
                      : status.replace("_", " ")}
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {statusCounts[
                      status as keyof typeof statusCounts
                    ]}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* My Service Requests */}
          <section className="mt-10">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  My Service Requests
                </h2>

                <p className="text-sm text-base-content/60 font-medium text-primary">
                  Service requests currently assigned to you.
                </p>
              </div>

              <select
                value={selectedStatus}
                onChange={(event) =>
                  setSelectedStatus(event.target.value)
                }
                className="select select-bordered border-base-content/20 bg-base-100 text-base-content placeholder:text-base-content/60 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="ALL">All Statuses</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">
                  In Progress
                </option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>

            {filteredRequests.length === 0 ? (
              <div className="rounded-lg border p-6">
                <p className="text-base-content/60 font-medium text-primary">
                  No service requests found for this status.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    className="rounded-lg border p-5"
                  >
                    <h3 className="font-semibold">
                      Request #{request.id}
                    </h3>

                    <p className="mt-2">
                      Product:{" "}
                      {request.product?.name ?? "Unknown"}
                    </p>

                    <p className="mt-1">
                      Status: {request.status ?? "Unknown"}
                    </p>

                    <p className="mt-1">
                      Description:{" "}
                      {request.description ?? "No description"}
                    </p>

                    <Link
                      href={`/engineer/service-requests/${request.id}`}
                      className="btn rounded-btn-outline bg-base-100 text-base-content hover:bg-base-200 btn-sm mt-4"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
