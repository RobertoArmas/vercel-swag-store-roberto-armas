"use client";

import { useCart } from "@/lib/cart-manager";
import { CircleAlert, Loader2, Minus, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { removeItem, updateQuantity } from "./actions/cart-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatPrice } from "@/lib/utils";

export default function ViewCart({ onClose }: { onClose: () => void }) {
  const { items, reloadCart, subtotal, itemCount } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleRemoveItem = async (productId: string) => {
    try {
      const data = await removeItem(productId);
      reloadCart(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    try {
      const data = await updateQuantity(productId, quantity);
      if (typeof data === "string") {
        setError(data);
        return data;
      }
      reloadCart(data);
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

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
            Your Cart{itemCount !== null && itemCount > 0 && ` (${itemCount})`}
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
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-2">
              <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />
              <p className="text-lg font-medium">Loading your cart...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-2">
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm">Add some items to get started</p>
            </div>
          ) : (
            <>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <CircleAlert className="h-4 w-4" />
                  <AlertTitle className="flex items-center justify-between">
                    Error
                    <button
                      onClick={() => setError(null)}
                      className="p-0.5 rounded hover:bg-destructive/10 transition-colors"
                      aria-label="Dismiss error"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.productId} className="flex gap-4">
                    <Link
                      href={`/products/${item.product.slug}`}
                      onClick={onClose}
                      className="w-20 h-20 shrink-0 bg-neutral-100 rounded-md overflow-hidden"
                    >
                      <Image
                        quality={75}
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
                        {formatPrice(item.product.price, item.product.currency)}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-gray-200 rounded-md">
                          <form
                            onSubmit={() => {
                              setIsLoading(true);
                            }}
                            action={async () => {
                              setIsLoading(true);
                              await handleUpdateQuantity(
                                item.productId,
                                item.quantity - 1
                              );
                            }}
                          >
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
                            onSubmit={() => {
                              setIsLoading(true);
                            }}
                            action={async () => {
                              await handleUpdateQuantity(
                                item.productId,
                                item.quantity + 1
                              );
                            }}
                          >
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
                            {formatPrice(
                              item.product.price * item.quantity,
                              item.product.currency
                            )}
                          </span>
                          <form
                            onSubmit={() => {
                              setIsLoading(true);
                            }}
                            action={async () => {
                              await handleRemoveItem(item.productId);
                            }}
                          >
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
            </>
          )}
        </div>

        {/* Footer with subtotal */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-black">Subtotal</span>
              <span className="text-lg font-semibold text-black">
                {subtotal}
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
