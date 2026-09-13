import AdminDashboard from "../AdminDashboard";

export default async function AdminPage({params}: {params: Promise<{ id: string }>;}) {
  const { id } = await params;

  const response = await fetch(`http://localhost:3000/admin/users/${id}`);
  const user = await response.json();

  return (
    <div>
      <h1>User Profile</h1>

      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}