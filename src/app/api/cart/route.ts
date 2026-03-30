import { getCart } from "@/lib/swag-store/cart";
import { SWAG_STORE_CONSTANTS } from "@/lib/swag-store/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const cartToken = cookieStore.get(
    SWAG_STORE_CONSTANTS.CART_TOKEN_COOKIE_NAME
  )?.value;
  if (!cartToken) {
    return NextResponse.json(
      { error: "Cart token not found" },
      { status: 400 }
    );
  }
  const cart = await getCart(cartToken);
  return NextResponse.json(cart);
}
