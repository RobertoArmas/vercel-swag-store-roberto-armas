import { Category } from "@/types/categories";
import { headers } from "./utils";

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${process.env.BASE_URL}/api/categories`, {
    headers: headers(),
  });
  const { data }: { data: Category[] } = await response.json();
  return data.sort((a, b) => a.name.localeCompare(b.name));
};
