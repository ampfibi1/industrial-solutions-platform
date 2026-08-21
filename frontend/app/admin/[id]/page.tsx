import AdminDashboard from "../AdminDashboard";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <AdminDashboard id={id} />;
}