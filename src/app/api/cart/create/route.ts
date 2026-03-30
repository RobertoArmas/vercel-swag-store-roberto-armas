import { createNewCart } from "@/lib/swag-store/cart";
import { NextResponse } from "next/server";
export async function POST() {
  const cartToken = await createNewCart();
  return NextResponse.json({ token: cartToken.token });
}
