import { CartContext, useCartReducer } from "@/lib/cart-manager";
import dynamic from "next/dynamic";

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = useCartReducer();
  const ViewCart = dynamic(() => import("./ViewCart.client"), {
    ssr: false,
  });
  return (
    <CartContext.Provider value={cart}>
      <>
        {children}
        {cart.isOpen && <ViewCart onClose={() => cart.setIsOpen(false)} />}
      </>
    </CartContext.Provider>
  );
}
