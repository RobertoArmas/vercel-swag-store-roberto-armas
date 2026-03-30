"use client";

import { useCallback, useEffect, useReducer, useState } from "react";
import { CartContextValue } from "./context/cart";
import { Cart, CartItem } from "@/types/cart";
import { formatPrice } from "../utils";

type CartState = {
  items: CartItem[];
  itemCount: number | null;
  subtotal: string;
  initialized: boolean;
};

type CartAction =
  | { type: "INIT"; cart: Cart; token: string }
  | { type: "CREATE_EMPTY_CART"; token: string }
  | { type: "RELOAD_CART"; data: Cart };

const STORAGE_KEY = "swag-store-cart";

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "INIT":
      return {
        items: action.cart.items,
        itemCount: action.cart.totalItems,
        subtotal: formatPrice(action.cart.subtotal, action.cart.currency),
        initialized: true,
      };

    case "RELOAD_CART":
      return {
        ...state,
        items: action.data.items,
        itemCount: action.data.totalItems,
        subtotal: formatPrice(action.data.subtotal, action.data.currency),
        initialized: true,
      };

    default:
      return state;
  }
}

export function useCartReducer() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    itemCount: null,
    initialized: false,
    subtotal: formatPrice(0),
  });

  const loadCart = useCallback(() => {
    fetch(`/api/cart`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "INIT", cart: data, token: data.token });
      });
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  useEffect(() => {
    if (state.initialized) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    }
  }, [state.items, state.initialized]);

  const itemCount = state.itemCount;
  const subtotal = state.subtotal;

  return {
    items: state.items,
    reloadCart: (data: Cart) => dispatch({ type: "RELOAD_CART", data }),
    setIsOpen,
    isOpen,
    itemCount,
    subtotal,
  } satisfies CartContextValue;
}

export { useCart } from "./hooks/use-cart";
export { CartContext } from "./context/cart";
