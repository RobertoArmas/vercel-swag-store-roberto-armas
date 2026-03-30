"use client";

import { useCart } from "@/lib/cart-manager";
import type { FeaturedProduct } from "@/types/products/featured-product";
import { Check, Loader2, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { addToCart } from "./actions/cart-actions";
import { Cart } from "@/types/cart";

export default function AddToCartButtonClient({
  product,
  stock,
}: {
  stock: number;
  product: FeaturedProduct;
}) {
  const { setIsOpen, reloadCart } = useCart();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleAdd(data: Cart) {
    reloadCart(data);
    setAdded(true);
    setTimeout(() => {
      setIsOpen(true);
      setAdded(false);
      setQuantity(1);
    }, 1500);
  }

  const handleFromAction = async (formData: FormData) => {
    try {
      const data = await addToCart(product.id, formData);
      handleAdd(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={() => setIsLoading(true)}
      action={handleFromAction}
      className="flex flex-col gap-3"
    >
      <input type="hidden" name="quantity" value={quantity} />
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">
          {stock} left in stock
        </span>
        <br />
        <span className="text-sm font-medium text-gray-700">Quantity</span>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="p-2 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-l-lg cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center text-sm font-medium tabular-nums">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
            disabled={quantity >= stock}
            className="p-2 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-r-lg cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || added}
        className={`w-full py-3.5 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
          isLoading
            ? "bg-gray-700 text-white/80 cursor-wait animate-pulse"
            : added
            ? "bg-green-600 text-white cursor-default"
            : "bg-black text-white hover:bg-gray-800 active:bg-gray-900 cursor-pointer"
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Adding...
          </>
        ) : added ? (
          <>
            <Check className="w-5 h-5" />
            Added to Cart
          </>
        ) : quantity > 1 ? (
          `Add to Cart (${quantity})`
        ) : (
          "Add to Cart"
        )}
      </button>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </form>
  );
}
