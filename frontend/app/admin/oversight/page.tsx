import axios from "axios";
import OversightPageClient from "@/components/admin/oversight/OversightPageClient";
import { cookies } from "next/headers";

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
  searchParams: Promise<{
    companyId?: string;
    showTable?: string;
  }>;
};

export default async function OversightPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const companyId = params.companyId || "";
  const showTable = params.showTable === "true";

  let oversights: Oversight[] = [];

  if (showTable && companyId) {
    try {
      const cookieStore = await cookies();
      const accessToken = cookieStore.get("access_token")?.value;
      const response = await axios.get<Oversight[]>(
        `http://localhost:3000/admin/oversight/company/${companyId}`,
        {
          headers: {Cookie: `access_token=${accessToken}`}
        }
      );

      oversights = response.data;
    } catch (error) {
      console.error("Failed to load oversights:", error);
    }
  }

  return (
    <OversightPageClient
      initialOversights={oversights}
      initialCompanyId={companyId}
      initialShowTable={showTable}
    />
  );
}