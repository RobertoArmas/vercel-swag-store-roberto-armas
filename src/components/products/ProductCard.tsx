import { FeaturedProduct } from "@/types/products/featured-product";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({
  product,
  currency,
}: {
  product: FeaturedProduct;
  currency: string;
}) {
  const formattedPrice = formatPrice(product.price, currency);

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden mb-3">
        <Image
          quality={85}
          loading="eager"
          src={product.images[0]}
          alt={product.name}
          width={500}
          height={500}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          priority
        />
      </div>
      <h3 className="text-sm font-medium text-black">{product.name}</h3>
      <span className="text-sm text-gray-500 mt-0.5">{formattedPrice}</span>
    </Link>
  );
}

export const ProductCardSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="aspect-square w-full rounded-lg mb-3" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/3 mt-1.5" />
        </div>
      ))}
    </>
  );
};
