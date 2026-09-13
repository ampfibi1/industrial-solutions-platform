type AdminDashboardProps = {id: string;};

export default function AdminDashboard({id}: AdminDashboardProps) {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Admin ID: {id}</p>
    </div>
  );
}