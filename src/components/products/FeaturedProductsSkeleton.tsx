import { ProductCardSkeleton } from "./ProductCard";

export function FeaturedProductsSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i}>
          <ProductCardSkeleton />
        </div>
      ))}
    </>
  );
}
