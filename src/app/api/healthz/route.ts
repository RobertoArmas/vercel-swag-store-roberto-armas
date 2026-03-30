import { NextResponse } from "next/server";
import healthz from "@/lib/swag-store/healthz";

export async function GET() {
  try {
    const healthzResponse = await healthz();
    return NextResponse.json({ success: true, swagStoreApi: healthzResponse });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "unhealthy" },
      { status: 500 }
    );
  }
}
