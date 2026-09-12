import axios from "axios";
import CategoryManager from "./CategoryManager";
import { cookies } from "next/headers";

type Category = {
  id: number;
  name: string;
};

export default async function CategoriesPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const response = await axios.get("http://localhost:3000/admin/categories",
    {
        headers: {Cookie: `access_token=${accessToken}`}
    }
  );
  const categories: Category[] = response.data;

  return <CategoryManager categories={categories} />;
}