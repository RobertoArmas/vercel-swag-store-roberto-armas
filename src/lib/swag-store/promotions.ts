import { Promotion } from "@/types/store/promotions";
import { headers } from "./utils";

export const getActivePromotion = async (): Promise<Promotion> => {
  const response = await fetch(`${process.env.BASE_URL}/api/promotions`, {
    headers: headers(),
  });
  const { data }: { data: Promotion } = await response.json();
  return data;
};
