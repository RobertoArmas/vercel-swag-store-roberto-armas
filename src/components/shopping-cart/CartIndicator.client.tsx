"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-manager/hooks/use-cart";
import { useEffect, useState } from "react";

export function CartIndicatorStaticLoadingState() {
  return (
    <>
      <button
        aria-label="View Cart"
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group"
      >
        <ShoppingCart className="w-5 h-5 text-gray-700" />
      </button>
    </>
  );
}

export default function CartIndicator({ itemCount }: { itemCount: number }) {
  const [localCartItemCount, setItemCount] = useState(itemCount);
  const { setIsOpen, isOpen, itemCount: cartItemCount } = useCart();

  useEffect(() => {
    if (cartItemCount != null) {
      setTimeout(() => {
        setItemCount(cartItemCount);
      }, 0);
    }
  }, [cartItemCount]);

  return (
    <>
      <button
        aria-label="View Cart"
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ShoppingCart className="w-5 h-5 text-gray-700" />
        {localCartItemCount > 0 && (
          <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center group-hover:bg-gray-800">
            {localCartItemCount > 99 ? "99+" : localCartItemCount}
          </span>
        )}
      </button>
    </>
  );
}
