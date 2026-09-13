import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h1 className="text-2xl font-bold">
        Service Request Not Found
      </h1>

      <p className="mt-2 text-gray-500">
        The service request could not be found.
      </p>

      <Link
        href="/engineer/service-requests"
        className="mt-4 underline"
      >
        Back to Service Requests
      </Link>
    </div>
  );
}