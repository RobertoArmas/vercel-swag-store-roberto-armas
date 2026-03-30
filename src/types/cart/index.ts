import { Product } from "../products/product";
export type Cart = {
  token: string;
  items: CartItem[];
};

export type CartItem = {
  productId: string;
  quantity: number;
  addedAt: string;
  product: Product;
};
