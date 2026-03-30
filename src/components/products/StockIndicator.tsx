import { getProductStock } from "@/lib/swag-store/product";

export default async function StockIndicator({ slug }: { slug: string }) {
  const inventory = await getProductStock(slug);

  if (!inventory.inStock) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 mb-3">
        Out of Stock
      </span>
    );
  }

  if (inventory.lowStock) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-700 mb-3">
        <span aria-hidden="true">🔥</span>
        Only {inventory.stock} left
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 mb-3">
      In Stock
    </span>
  );
}
