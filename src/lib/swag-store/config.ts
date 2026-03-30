import { StoreConfiguration } from "@/types/store";
import { cacheLife, cacheTag } from "next/cache";

export const getStoreConfiguration = async (): Promise<StoreConfiguration> => {
  "use cache";
  cacheLife("weeks");
  cacheTag("store-configuration");
  const response = await fetch(`${process.env.BASE_URL}/api/store/config`);
  const { data }: { data: StoreConfiguration } = await response.json();
  return data;
};
