"use server";

import {
  addToCart as addToCartApi,
  removeItem as removeItemApi,
  updateQuantity as updateQuantityApi,
} from "@/lib/swag-store/cart";
import { Cart } from "@/types/cart";

export async function addToCart(
  productId: string,
  formData: FormData
): Promise<Cart> {
  console.log("formData", formData);
  return await addToCartApi(
    productId,
    Number(formData.get("quantity")),
    formData.get("token") as string
  );
}

export async function removeItem(
  productId: string,
  formData: FormData
): Promise<Cart> {
  return await removeItemApi(productId, formData.get("token") as string);
}

export async function updateQuantity(
  productId: string,
  quantity: number,
  formData: FormData
): Promise<Cart> {
  return await updateQuantityApi(
    productId,
    quantity,
    formData.get("token") as string
  );
}
