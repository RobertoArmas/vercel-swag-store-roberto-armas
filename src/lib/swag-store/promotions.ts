import { Promotion } from "@/types/store/promotions";
import { headers } from "./utils";
import { cacheLife, cacheTag } from "next/cache";

export const getActivePromotion = async (): Promise<Promotion> => {
  "use cache";
  cacheLife("minutes");
  cacheTag("active-promotion");
  const response = await fetch(`${process.env.BASE_URL}/api/promotions`, {
    headers: headers(),
  });
  const { data }: { data: Promotion } = await response.json();
  return data;
};
