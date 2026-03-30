import { Cart } from "@/types/cart";
import { createContext } from "react";

export type CartContextValue = {
  token: string | null;
  items: Cart["items"];
  reloadCart: (data: Cart) => void;
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
};
export const CartContext = createContext<CartContextValue | null>(null);
