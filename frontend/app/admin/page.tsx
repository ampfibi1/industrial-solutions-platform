import Link from "next/link";
import {Users,Building2,Boxes,Package,Eye,} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2"> Dashboard</h1>
      <p className="text-gray-500 mb-8">Manage your platform.</p>
      <h2 className="text-lg font-semibold mb-4">Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link href="/admin/users" className="border rounded-xl p-6 hover:shadow-md transition">
          <Users size={30} className="mb-4" />
          <h3 className="text-xl font-semibold">Users</h3>
          <p className="text-gray-500"> Manage users </p>
        </Link>

        <Link href="/admin/companies" className="border rounded-xl p-6 hover:shadow-md transition">
          <Building2 size={30} className="mb-4" />
          <h3 className="text-xl font-semibold">Companies</h3>
          <p className="text-gray-500">Manage companies</p>
        </Link>

        <Link href="/admin/categories" className="border rounded-xl p-6 hover:shadow-md transition" >
          <Boxes size={30} className="mb-4" />
          <h3 className="text-xl font-semibold"> Categories</h3>
          <p className="text-gray-500">Manage categories</p>
        </Link>

        <Link href="/admin/products" className="border rounded-xl p-6 hover:shadow-md transition">
          <Package size={30} className="mb-4" />
          <h3 className="text-xl font-semibold">Products</h3>
          <p className="text-gray-500">Manage products</p>
        </Link>
      </div>

      <h2 className="text-lg font-semibold mt-8 mb-4">Oversight</h2>

      <Link href="/admin/oversight"  className="block border rounded-xl p-6 hover:shadow-md transition">
        <Eye size={30} className="mb-4" />
        <h3 className="text-xl font-semibold">Company Oversight</h3>
        <p className="text-gray-500"> Assign admins to companies</p>
      </Link>
    </div>
  );
}