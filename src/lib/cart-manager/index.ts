"use client";

import { useCallback, useEffect, useReducer, useState } from "react";
import { CartContextValue } from "./context/cart";
import { Cart, CartItem } from "@/types/cart";

type CartState = {
  token: string | null;
  items: CartItem[];
  initialized: boolean;
};

type CartAction =
  | { type: "INIT"; items: Cart["items"]; token: string }
  | { type: "CREATE_EMPTY_CART"; token: string }
  | { type: "RELOAD_CART"; data: Cart };

const STORAGE_KEY = "swag-store-cart";
const STORAGE_TOKEN = "swag-store-cart-token";

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "INIT":
      return { items: action.items, initialized: true, token: action.token };

    case "RELOAD_CART":
      return {
        ...state,
        items: action.data.items,
        token: action.data.token,
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
    initialized: false,
    token: null,
  });

  const loadCart = useCallback((token: string) => {
    fetch(`/api/cart?token=${token}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "INIT", items: data.items, token: data.token });
      });
  }, []);

  useEffect(() => {
    const cartToken = sessionStorage.getItem(STORAGE_TOKEN);
    if (!cartToken) {
      fetch(`/api/cart/create`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          sessionStorage.setItem(STORAGE_TOKEN, data.token);
          dispatch({
            type: "CREATE_EMPTY_CART",
            token: data.token,
          });
          loadCart(data.token);
        });
    } else {
      loadCart(cartToken);
    }
  }, [loadCart]);

  useEffect(() => {
    if (state.initialized) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    }
  }, [state.items, state.initialized, state.token]);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return {
    token: state.token,
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
