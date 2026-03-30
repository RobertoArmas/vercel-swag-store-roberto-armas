import { Cart } from "@/types/cart";
import { headers } from "./utils";

export async function getCart(token: string): Promise<Cart> {
  const response = await fetch(`${process.env.BASE_URL}/api/cart`, {
    headers: {
      ...headers(),
      "x-cart-token": token,
    },
  });
  const { data }: { data: Cart } = await response.json();
  return data;
}

export async function createNewCart(): Promise<Cart> {
  const response = await fetch(`${process.env.BASE_URL}/api/cart/create`, {
    method: "POST",
    headers: headers(),
  });
  const { data }: { data: Cart } = await response.json();
  return data;
}

export async function addToCart(
  productId: string,
  quantity: number,
  token: string
): Promise<Cart> {
  const response = await fetch(`${process.env.BASE_URL}/api/cart`, {
    method: "POST",
    headers: {
      ...headers(),
      "x-cart-token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity }),
  });
  const { data }: { data: Cart } = await response.json();
  return data;
}

export async function removeItem(
  productId: string,
  token: string
): Promise<Cart> {
  const response = await fetch(
    `${process.env.BASE_URL}/api/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        ...headers(),
        "x-cart-token": token,
      },
    }
  );
  const { data }: { data: Cart } = await response.json();
  return data;
}

export async function updateQuantity(
  productId: string,
  quantity: number,
  token: string
): Promise<Cart> {
  const response = await fetch(
    `${process.env.BASE_URL}/api/cart/${productId}`,
    {
      method: "PATCH",
      headers: {
        ...headers(),
        "x-cart-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    }
  );
  const { data }: { data: Cart } = await response.json();
  return data;
}
