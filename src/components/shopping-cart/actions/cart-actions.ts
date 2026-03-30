"use server";

import {
  addToCart as addToCartApi,
  removeItem as removeItemApi,
  updateQuantity as updateQuantityApi,
} from "@/lib/swag-store/cart";
import { getProductStock } from "@/lib/swag-store/product";
import { Cart } from "@/types/cart";
import { cookies } from "next/headers";
import { SWAG_STORE_CONSTANTS } from "@/lib/swag-store/constants";

const getCartToken = async (): Promise<string> => {
  const cookieStore = await cookies();
  const cartToken = cookieStore.get(
    SWAG_STORE_CONSTANTS.CART_TOKEN_COOKIE_NAME
  )?.value;
  if (!cartToken) {
    throw new Error("Cart token not found");
  }
  return cartToken;
};

export async function addToCart(
  productId: string,
  formData: FormData
): Promise<Cart> {
  const [cartToken, stock] = await Promise.all([
    getCartToken(),
    getProductStock(productId),
  ]);
  if (!stock.inStock || stock.stock < Number(formData.get("quantity"))) {
    throw new Error("Product is out of stock");
  }
  return await addToCartApi(
    productId,
    Number(formData.get("quantity")),
    cartToken
  );
}

export async function removeItem(productId: string): Promise<Cart> {
  const cartToken = await getCartToken();
  return await removeItemApi(productId, cartToken);
}

export async function updateQuantity(
  productId: string,
  quantity: number
): Promise<Cart> {
  const [cartToken, stock] = await Promise.all([
    getCartToken(),
    getProductStock(productId),
  ]);
  if (!stock.inStock || stock.stock < quantity) {
    throw new Error("Product is out of stock");
  }
  return await updateQuantityApi(productId, quantity, cartToken);
}
