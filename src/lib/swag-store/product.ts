import { FeaturedProduct } from "@/types/products/featured-product";

export const getFeaturedProducts = async (): Promise<FeaturedProduct[]> => {
  const response = await fetch(
    `${process.env.BASE_URL}/api/products?featured=true&limit=6`,
    {
      headers: {
        "x-vercel-protection-bypass":
          process.env.API_BYPASS_PROTECTION_TOKEN || "",
      },
    }
  );
  const { data }: { data: FeaturedProduct[] } = await response.json();
  return data;
};
