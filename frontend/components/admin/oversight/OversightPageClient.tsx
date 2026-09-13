"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import OversightForm from "./OversightForm";
import OversightTable from "./OversightTable";

type Admin = {
  id: number;
  name: string;
  email: string;
  role: string | number;
};

type Company = {
  id: number;
  name: string;
};

type Oversight = {
  id: number;
  admin: Admin;
  company: Company;
};

type Props = {
  initialOversights: Oversight[];
  initialCompanyId: string;
  initialShowTable: boolean;
};

export default function OversightPageClient({
  initialOversights,
  initialCompanyId,
  initialShowTable,
}: Props) {
  const router = useRouter();

  const [admins, setAdmins] = useState<Admin[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);

  const [oversights, setOversights] =
    useState<Oversight[]>(initialOversights);

  const [companyId, setCompanyId] =
    useState(initialCompanyId);

  const [showTable, setShowTable] =
    useState(initialShowTable);

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadData() {
    try {
      const [adminsResponse, companiesResponse] =
        await Promise.all([
          axios.get<Admin[]>(
            "http://localhost:3000/admin/users",{ withCredentials: true }
          ),
          axios.get<Company[]>(
            "http://localhost:3000/admin/companies",{ withCredentials: true }
          ),
        ]);

      setAdmins(
        adminsResponse.data.filter(
          (admin) => admin.role === "ADMIN" || admin.role === 1,
        ),
      );

      setCompanies(companiesResponse.data);
    } catch (error) {
      console.error(error);
      setErrors(["Failed to load data"]);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // Update client state when page.tsx is refreshed
  useEffect(() => {
    setOversights(initialOversights);
    setCompanyId(initialCompanyId);
    setShowTable(initialShowTable);
  }, [
    initialOversights,
    initialCompanyId,
    initialShowTable,
  ]);

  async function handleAssign(
    adminId: number,
    selectedCompanyId: number,
  ) {
    try {
      setLoading(true);
      setErrors([]);

      await axios.post(
        "http://localhost:3000/admin/oversight",
        {
          adminId,
          companyId: selectedCompanyId,
        },
        { withCredentials: true }
      );

      alert("Oversight assigned successfully");

      const newCompanyId =
        String(selectedCompanyId);

      // Put companyId in the URL.
      // page.tsx will use it to load the table.
      router.push(`/admin/oversight?companyId=${newCompanyId}&showTable=true`,);
    } catch (error: unknown) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        setErrors([
          error.response?.data?.message ||
            "Failed to assign oversight",
        ]);
      } else {
        setErrors([
          "Failed to assign oversight",
        ]);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleCompanyChange(id: string) {
      setCompanyId(id);

      if (id)  router.push(`/admin/oversight?companyId=${id}&showTable=true`,);
      else setShowTable(false);
    }

  return (
    <main className="p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Company Oversight
      </h1>

      <OversightForm
        admins={admins}
        companies={companies}
        onCompanyChange={handleCompanyChange}
        onSubmit={handleAssign}
        errors={errors}
        loading={loading}
      />

      {showTable && (
        <OversightTable
          oversights={oversights}
        />
      )}
    </main>
  );
}