import { CartContext, useCartReducer } from "@/lib/cart-manager";
import dynamic from "next/dynamic";
import { memo, useCallback } from "react";

// Memoize ViewCart to prevent re-renders when context changes
const ViewCart = dynamic(() => import("./ViewCart.client"), {
  ssr: false,
});

function CartContextProviderContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = useCartReducer();
  
  // Close handler wrapped in useCallback to maintain referential equality
  const handleCloseCart = useCallback(() => {
    cart.setIsOpen(false);
  }, [cart]);

  return (
    <CartContext.Provider value={cart}>
      <>
        {children}
        {cart.isOpen && <ViewCart onClose={handleCloseCart} />}
      </>
    </CartContext.Provider>
  );
}

// Memoize provider to prevent unnecessary re-renders when props don't change
export default memo(CartContextProviderContent);
