import { getCart } from "@/lib/swag-store/cart";
import CartIndicatorClient from "./CartIndicator.client";
import { cookies } from "next/headers";
import { SWAG_STORE_CONSTANTS } from "@/lib/swag-store/constants";

export default async function CartIndicator() {
  const cookieStore = await cookies();
  const cartToken = cookieStore.get(
    SWAG_STORE_CONSTANTS.CART_TOKEN_COOKIE_NAME
  )?.value;
  if (!cartToken) {
    return null;
  }
  const cart = await getCart(cartToken);
  return (
    <>
      <CartIndicatorClient itemCount={cart.totalItems} />
    </>
  );
}
