import axios from "axios";

import CompanysClient from "@/components/admin/companies/CompanyClient";
import { cookies } from "next/headers";


type Company = {
  id:number;
  name: string;
  gstNumber:string;
  address:string;
  industry:string;
};

export default async function UsersPage() {
  let companies: Company[] = [];

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    const response = await axios.get("http://localhost:3000/admin/companies",
      {
        headers: {Cookie: `access_token=${accessToken}`}
      }
    );
    companies = response.data;
  } catch (err: unknown) {
    console.error(err);
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage platform users</p>
      </div>

      <CompanysClient companies={companies} />

    </div>
  );
}