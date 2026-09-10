import axios from "axios";
import UsersClient from "@/components/admin/users/UsersClient";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  company?: {
    id: number;
    name: string;
  };
};

export default async function UsersPage() {
  let users: User[] = [];

  try {
    const response = await axios.get("http://localhost:3000/admin/users");
    users = response.data;
  } catch (err: unknown) {
    console.error(err);
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage platform users</p>
      </div>

      <UsersClient users={users} />

    </div>
  );
}