import { StoreConfiguration } from "@/types/store";

export const getStoreConfiguration = async (): Promise<StoreConfiguration> => {
  const response = await fetch(`${process.env.BASE_URL}/api/store/config`);
  const { data }: { data: StoreConfiguration } = await response.json();
  return data;
};
