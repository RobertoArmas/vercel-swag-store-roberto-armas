import { Skeleton } from "../ui/skeleton";
import { ProductCardSkeleton } from "./ProductCard";

export function FeaturedProductsSkeleton() {
  return (
    <section className="w-full py-2 md:py-4">
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
           <ProductCardSkeleton />
          </div>
        ))}
      </div>
    </section>
  );
}
