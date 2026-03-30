"use client";

import { useCart } from "@/lib/cart-manager";
import { Minus, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { removeItem, updateQuantity } from "./actions/cart-actions";

function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export default function ViewCart({ onClose }: { onClose: () => void }) {
  const { items, token, reloadCart, subtotal, itemCount } = useCart();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col animate-in slide-in-from-right duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-black">
            Your Cart{itemCount > 0 && ` (${itemCount})`}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-2">
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm">Add some items to get started</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-4">
                  <Link
                    href={`/products/${item.product.slug}`}
                    onClick={onClose}
                    className="w-20 h-20 shrink-0 bg-neutral-100 rounded-md overflow-hidden"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.product.slug}`}
                      onClick={onClose}
                      className="text-sm font-medium text-black hover:underline truncate block"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {formatPrice(item.product.price)}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <form
                          action={async (formData: FormData) => {
                            const data = await updateQuantity(
                              item.productId,
                              item.quantity - 1,
                              formData
                            );
                            reloadCart(data);
                          }}
                        >
                          <input
                            type="hidden"
                            name="token"
                            value={token ?? ""}
                          />
                          <button
                            type="submit"
                            className="p-1.5 hover:bg-gray-100 transition-colors"
                            aria-label={`Decrease quantity of ${item.product.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                        </form>
                        <span className="px-3 text-sm font-medium tabular-nums select-none">
                          {item.quantity}
                        </span>
                        <form
                          action={async (formData: FormData) => {
                            const data = await updateQuantity(
                              item.productId,
                              item.quantity + 1,
                              formData
                            );
                            reloadCart(data);
                          }}
                        >
                          <input
                            type="hidden"
                            name="token"
                            value={token ?? ""}
                          />
                          <button
                            type="submit"
                            className="p-1.5 hover:bg-gray-100 transition-colors"
                            aria-label={`Increase quantity of ${item.product.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Line item total */}
                        <span className="text-sm font-medium text-black">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <form
                          action={async (formData: FormData) => {
                            const data = await removeItem(
                              item.productId,
                              formData
                            );
                            reloadCart(data);
                          }}
                        >
                          <input
                            type="hidden"
                            name="token"
                            value={token ?? ""}
                          />
                          <button
                            type="submit"
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                            aria-label={`Remove ${item.product.name} from cart`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer with subtotal */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-black">Subtotal</span>
              <span className="text-lg font-semibold text-black">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Shipping and taxes calculated at checkout
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
