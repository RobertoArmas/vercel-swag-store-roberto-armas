"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-manager/hooks/use-cart";
import { useCallback, memo, useState, useEffect } from "react";

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

function CartIndicatorContent({ itemCount: _itemCount }: { itemCount?: number }) {
  const { setIsOpen, isOpen, itemCount } = useCart();
  const [itemCountState, setItemCount] = useState<number>(_itemCount ?? 0);

    useEffect(() => {
    if (itemCount != null) {
      setTimeout(() => {
        setItemCount(itemCount);
      }, 0);
    }
  }, [itemCount]);

  const handleOpenCart = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  return (
    <>
      <button
        aria-label="View Cart"
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group"
        onClick={handleOpenCart}
      >
        <ShoppingCart className="w-5 h-5 text-gray-700" />
        {itemCountState != null && itemCountState > 0 && (
          <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center group-hover:bg-gray-800">
            {itemCountState > 99 ? "99+" : itemCountState}
          </span>
        )}
      </button>
    </>
  );
}

// Memoize to prevent re-renders from parent
export default memo(CartIndicatorContent);
