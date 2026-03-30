import { Product } from "../products/product";
export type Cart = {
  token: string;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  currency: string;
  updatedAt: string;
  createdAt: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
  addedAt: string;
  product: Product;
};
