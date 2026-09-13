"use client";

import { useState } from "react";
import DeleteButton from "../DeleteButton";
import CreateEditCompanyForm from "./CreateCompany";

type Company = {
  id: number;
  name: string;
  gstNumber: string;
  address: string;
  industry: string;
};

export default function CompanysClient({
  companies,
}: {
  companies: Company[];
}) {
  const [editingCompany, setEditingCompany] =
    useState<Company | undefined>();

  return (
    <>
      <CreateEditCompanyForm
        key={editingCompany?.id ?? "create"}
        company={editingCompany}
        onCancel={() => setEditingCompany(undefined)}
      />

      <div className="overflow-x-auto rounded-lg border mt-6">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>GST Number</th>
              <th>Address</th>
              <th>Industry</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td>{company.gstNumber}</td>
                <td>{company.address}</td>
                <td>{company.industry}</td>

                <td className="p-3 space-x-2">
                  <button
                    onClick={() => setEditingCompany(company)}
                    className="px-3 py-1 rounded bg-blue-500 text-white"
                  >
                    Edit
                  </button>

                  <DeleteButton
                   id={company.id}
                   url={`http://localhost:3000/admin/company/${company.id}`}
                   name="Company"
                 />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}