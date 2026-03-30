"use client";

import CartContextProvider from "./components/shopping-cart/CartContextProvider.client";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <CartContextProvider>{children}</CartContextProvider>;
}
