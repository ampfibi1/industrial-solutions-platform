import axios from "axios";
import CategoryManager from "./CategoryManager";

type Category = {
  id: number;
  name: string;
};

export default async function CategoriesPage() {
  const response = await axios.get("http://localhost:3000/admin/categories");
  const categories: Category[] = response.data;

  return <CategoryManager categories={categories} />;
}