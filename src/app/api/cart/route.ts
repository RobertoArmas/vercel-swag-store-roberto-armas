import { getCart } from "@/lib/swag-store/cart";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }
  const cart = await getCart(token);
  return NextResponse.json(cart);
}
