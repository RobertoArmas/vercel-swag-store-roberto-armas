"use client";

import { useCart } from "@/lib/cart-manager";
import type { FeaturedProduct } from "@/types/products/featured-product";
import { Check, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { addToCart } from "./actions/cart-actions";
import { Cart } from "@/types/cart";

export default function AddToCartButtonClient({
  product,
  stock,
}: {
  stock: number;
  product: FeaturedProduct;
}) {
  const { reloadCart, token } = useCart();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isCartReady, setIsCartReady] = useState(false);

  useEffect(() => {
    if (token) {
      console.log("token", token);
      setTimeout(() => setIsCartReady(true), 100);
    }
  }, [token]);

  function handleAdd(data: Cart) {
    reloadCart(data);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuantity(1);
    }, 1500);
  }

  return (
    <form
      action={async (formData: FormData) => {
        const data = await addToCart(product.id, formData);
        handleAdd(data);
      }}
      className="flex flex-col gap-3"
    >
      <input type="hidden" name="token" value={token ?? ""} />
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
        disabled={!isCartReady}
        className={`w-full bg-black text-white py-3.5 px-6 rounded-lg font-medium hover:bg-gray-800 active:bg-gray-900 transition-colors flex items-center justify-center gap-2 cursor-pointer ${
          !isCartReady ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {added ? (
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
    </form>
  );
}
