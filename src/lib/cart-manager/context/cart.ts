import { Cart } from "@/types/cart";
import { createContext } from "react";

export type CartContextValue = {
  items: Cart["items"];
  reloadCart: (data: Cart) => void;
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  itemCount: number | null;
  subtotal: string;
};
export const CartContext = createContext<CartContextValue | null>(null);
