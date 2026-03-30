"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-manager/hooks/use-cart";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

export default function CartIndicator() {
  const { itemCount, setIsOpen, isOpen } = useCart();

  return (
    <>
      <button
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ShoppingCart className="w-5 h-5 text-gray-700" />
        {itemCount > 0 && (
          <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center group-hover:bg-gray-800">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </button>
    </>
  );
}
