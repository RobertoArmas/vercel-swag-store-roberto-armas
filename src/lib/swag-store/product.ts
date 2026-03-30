import { FeaturedProduct } from "@/types/products/featured-product";
import { ProductStock } from "@/types/products/stock";
import { cacheLife, cacheTag } from "next/cache";
import { headers } from "./utils";
import { Product, SearchResult } from "@/types/products/product";

export const getFeaturedProducts = async (): Promise<FeaturedProduct[]> => {
  const response = await fetch(
    `${process.env.BASE_URL}/api/products?featured=true&limit=6`,
    { headers: headers() }
  );
  const { data }: { data: FeaturedProduct[] } = await response.json();
  return data;
};

export const getProductBySlug = async (
  slug: string
): Promise<Product | null> => {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `product-detail-${slug}`);
  const response = await fetch(`${process.env.BASE_URL}/api/products/${slug}`, {
    headers: headers(),
  });
  if (!response.ok) return null;
  const { data }: { data: Product } = await response.json();
  return data;
};

export const getProducts = async (
  search?: string,
  category?: string,
  page: number = 1,
  limit: number = 5
): Promise<SearchResult> => {
  const searchParams = new URLSearchParams();
  if (search) searchParams.set("search", search);
  if (category) searchParams.set("category", category);
  if (page) searchParams.set("page", page.toString());
  if (limit) searchParams.set("limit", limit.toString());
  const response = await fetch(
    `${process.env.BASE_URL}/api/products?${searchParams.toString()}`,
    {
      headers: headers(),
    }
  );
  const data = await response.json();
  return data;
};

export const getAllProducts = async (): Promise<FeaturedProduct[]> => {
  "use cache";
  cacheLife("hours");
  cacheTag("products");
  const allProducts: FeaturedProduct[] = [];
  let page = 1;

  while (true) {
    const response = await fetch(
      `${process.env.BASE_URL}/api/products?page=${page}`,
      { headers: headers() }
    );
    const { data }: { data: FeaturedProduct[] } = await response.json();

    if (!data?.length) break;

    allProducts.push(...data);
    page++;
  }

  return allProducts;
};

export const getProductStock = async (slug: string): Promise<ProductStock> => {
  const response = await fetch(
    `${process.env.BASE_URL}/api/products/${slug}/stock`,
    {
      headers: headers(),
    }
  );
  const { data }: { data: ProductStock } = await response.json();
  return data;
};
