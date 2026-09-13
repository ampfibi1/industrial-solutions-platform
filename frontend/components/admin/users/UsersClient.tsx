"use client";

import { useState } from "react";

import DeleteUserButton from "./DeleteUserButton";
import CreateEditUserForm from "./CreateUser";

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

export default function UsersClient({users,}: {users: User[];}) {
  const [editingUser, setEditingUser] = useState<User | undefined>();

  return (
    <>
      <CreateEditUserForm
        key={editingUser?.id ?? "create"}
        user={editingUser}
        onCancel={() => setEditingUser(undefined)}
      />

      <div className="overflow-x-auto rounded-lg border mt-6">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  {user.company?.name ?? "No company"}
                </td>
                <td className="p-3 space-x-2">
                  <button onClick={() => setEditingUser(user)} className="px-3 py-1 rounded bg-blue-500 text-white">
                    Edit
                  </button>

                  <DeleteUserButton userId={user.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}