"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Engineer = {
  name: string;
  email: string;
  phone?: string;
  role: string;
};

type ServiceRequest = {
  id: number;
  status?: string;
  description?: string;
  created_at?: string;
  resolved_at?: string;
  product?: {
    id: number;
    name: string;
  };
};

type Expertise = {
  id: number;
};

export default function EngineerDashboard() {
  const [engineer, setEngineer] = useState<Engineer | null>(null);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [expertiseCount, setExpertiseCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const profileResponse = await axios.get(
          "http://localhost:3000/engineer/profile",
          {
            withCredentials: true,
          }
        );

        const requestsResponse = await axios.get(
          "http://localhost:3000/engineer/service-request",
          {
            withCredentials: true,
          }
        );

        const expertiseResponse = await axios.get(
          "http://localhost:3000/engineer/expertise",
          {
            withCredentials: true,
          }
        );

        setEngineer(profileResponse.data);
        setRequests(requestsResponse.data);

        const expertise: Expertise[] = expertiseResponse.data;
        setExpertiseCount(expertise.length);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const totalRequests = requests.length;

  const openRequests = requests.filter(
    (request) => request.status === "OPEN"
  ).length;

  const inProgressRequests = requests.filter(
    (request) => request.status === "IN_PROGRESS"
  ).length;

  const completedRequests = requests.filter(
    (request) =>
      request.status === "RESOLVED" || request.status === "CLOSED"
  ).length;

  const recentRequests = [...requests]
    .sort((a, b) => {
      const dateA = new Date(a.created_at ?? 0).getTime();
      const dateB = new Date(b.created_at ?? 0).getTime();

      return dateB - dateA;
    })
    .slice(0, 5);

  const workHistory = [...requests]
    .filter(
      (request) =>
        request.status === "RESOLVED" || request.status === "CLOSED"
    )
    .sort((a, b) => {
      const dateA = new Date(a.resolved_at ?? a.created_at ?? 0).getTime();
      const dateB = new Date(b.resolved_at ?? b.created_at ?? 0).getTime();

      return dateB - dateA;
    });

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Engineer Dashboard</h1>
        <p className="mt-6 text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {engineer?.name ?? "Engineer"}
        </h1>

        <p className="mt-1 text-gray-500">
          Here is an overview of your engineering work.
        </p>
      </div>

      {/* Dashboard Summary */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Dashboard Summary</h2>

        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Metric
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Count
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              <tr>
                <td className="px-6 py-4 text-sm">Total Service Requests</td>
                <td className="px-6 py-4 text-sm font-semibold">
                  {totalRequests}
                </td>
              </tr>

              <tr>
                <td className="px-6 py-4 text-sm">Open Requests</td>
                <td className="px-6 py-4 text-sm font-semibold">
                  {openRequests}
                </td>
              </tr>

              <tr>
                <td className="px-6 py-4 text-sm">In Progress</td>
                <td className="px-6 py-4 text-sm font-semibold">
                  {inProgressRequests}
                </td>
              </tr>

              <tr>
                <td className="px-6 py-4 text-sm">Completed Requests</td>
                <td className="px-6 py-4 text-sm font-semibold">
                  {completedRequests}
                </td>
              </tr>

              <tr>
                <td className="px-6 py-4 text-sm">Areas of Expertise</td>
                <td className="px-6 py-4 text-sm font-semibold">
                  {expertiseCount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Requests */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">
          Recent Service Requests
        </h2>

        {recentRequests.length === 0 ? (
          <div className="rounded-xl border bg-white p-6 text-gray-500 shadow-sm">
            No service requests found.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Request ID
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Description
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Created
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {recentRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 text-sm font-medium">
                      #{request.id}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {request.product?.name ?? "Unknown Product"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {request.description ?? "No description"}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {request.status ?? "UNKNOWN"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {request.created_at
                        ? new Date(request.created_at).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Work History */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Work History</h2>

        {workHistory.length === 0 ? (
          <div className="rounded-xl border bg-white p-6 text-gray-500 shadow-sm">
            No completed work found.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Request ID
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Description
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Completed
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {workHistory.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 text-sm font-medium">
                      #{request.id}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {request.product?.name ?? "Unknown Product"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {request.description ?? "No description"}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {request.status ?? "UNKNOWN"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {request.resolved_at
                        ? new Date(
                            request.resolved_at
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}