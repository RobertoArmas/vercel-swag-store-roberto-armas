import { formatPrice } from "@/lib/utils";
import { Product } from "@/types/products/product";
import Image from "next/image";
import Link from "next/link";

export default function ProductSearchResult({
  product,
  currency,
}: {
  product: Product;
  currency: string;
}) {
  const formattedPrice = formatPrice(product.price, currency);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex gap-4 sm:gap-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-3 sm:p-4 transition-shadow hover:shadow-md"
    >
      <div className="relative h-28 w-28 sm:h-36 sm:w-36 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
        <Image
          preload
          src={product.images[0]}
          alt={product.name}
          quality={75}
          fill
          placeholder="blur"
          sizes="(max-width: 640px) 112px, 144px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between py-0.5 min-w-0">
        <div>
          <span className="inline-block text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1">
            {product.category}
          </span>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {product.description}
          </p>
        </div>

        <span className="mt-2 text-base font-semibold text-gray-900 dark:text-gray-100">
          {formattedPrice}
        </span>
      </div>
    </Link>
  );
}
