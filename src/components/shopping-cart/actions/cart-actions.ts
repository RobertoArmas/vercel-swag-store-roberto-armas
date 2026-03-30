"use server";

import {
  addToCart as addToCartApi,
  removeItem as removeItemApi,
  updateQuantity as updateQuantityApi,
} from "@/lib/swag-store/cart";
import { getProductStock } from "@/lib/swag-store/product";
import { Cart } from "@/types/cart";

export async function addToCart(
  productId: string,
  formData: FormData
): Promise<Cart> {
  const stock = await getProductStock(productId);
  if (!stock.inStock || stock.stock < Number(formData.get("quantity"))) {
    throw new Error("Product is out of stock");
  }
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
  const stock = await getProductStock(productId);
  if (!stock.inStock || stock.stock < quantity) {
    throw new Error("Product is out of stock");
  }
  return await updateQuantityApi(
    productId,
    quantity,
    formData.get("token") as string
  );
}
