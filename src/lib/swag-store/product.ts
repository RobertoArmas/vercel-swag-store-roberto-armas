import { FeaturedProduct } from "@/types/products/featured-product";
import { ProductStock } from "@/types/products/stock";
import { cacheLife, cacheTag } from "next/cache";
import { headers } from "./utils";

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
): Promise<FeaturedProduct | null> => {
  "use cache";
  cacheLife("hours");
  cacheTag("product", `product-detail-${slug}`);
  const response = await fetch(`${process.env.BASE_URL}/api/products/${slug}`, {
    headers: headers(),
  });
  if (!response.ok) return null;
  const { data }: { data: FeaturedProduct } = await response.json();
  return data;
};

export const getAllProducts = async (): Promise<FeaturedProduct[]> => {
  const response = await fetch(`${process.env.BASE_URL}/api/products`, {
    headers: headers(),
  });
  const { data }: { data: FeaturedProduct[] } = await response.json();
  return data;
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
