import Link from "next/link";
import DynamicFeaturedProducts from "./DynamicFeaturedProducts";
import { Suspense } from "react";
import { ProductCardSkeleton } from "./ProductCard";

type FeaturedProductsProps = {
  title: string;
  viewAllUrl: {
    url: string;
    text: string;
  };
};
export default function FeaturedProducts({
  title,
  viewAllUrl,
}: FeaturedProductsProps) {
  return (
    <section className="w-full py-3 md:py-6">
      <div className="mt-16 md:mt-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black">{title}</h2>
          <Link
            href={viewAllUrl.url}
            className="text-gray-600 hover:text-black transition-colors text-sm font-medium"
          >
            {viewAllUrl.text}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={<ProductCardSkeleton />}>
            <DynamicFeaturedProducts />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
