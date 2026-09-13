
type Engineer = {
  name: string;
  email: string;
  phone?: string;
  role: string;
};

export default function ProfileCard({
  engineer,
}: {
  engineer: Engineer;
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      {/* Profile Header */}
      <div className="border-b bg-gray-50 px-6 py-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-2xl font-bold text-white">
            {engineer.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              {engineer.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Engineer
            </p>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">Full Name</p>

          <p className="mt-1 font-medium">
            {engineer.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email Address</p>

          <p className="mt-1 font-medium break-all">
            {engineer.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Phone Number</p>

          <p className="mt-1 font-medium">
            {engineer.phone ?? "Not provided"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Account Role</p>

          <span className="mt-1 inline-block rounded-full border px-3 py-1 text-xs font-medium">
            {engineer.role}
          </span>
        </div>
      </div>
    </div>
  );
}