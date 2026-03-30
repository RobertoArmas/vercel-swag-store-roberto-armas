type HealthzResponse = {
  status: string;
  timestamp: string;
  services: {
    redis: string;
  };
};

export default async function healthz() {
  const response = await fetch(`${process.env.BASE_URL}/api/health`);
  const { data }: { success: true; data: HealthzResponse } =
    await response.json();
  return data;
}
