"use client";

import ProductSearchResult from "../products/ProductSearchResult";
import { useSearch } from "./SearchProvider";
import SearchResultsSkeleton from "./SearchResultsSkeleton";
import { Product } from "@/types/products/product";

export default function SearchResultsClient({
  products,
}: {
  products: Product[];
}) {
  const { isLoading } = useSearch();

  if (isLoading) {
    return <SearchResultsSkeleton />;
  }

  return (
    <>
      {products.map((product) => (
        <ProductSearchResult key={product.id} product={product} />
      ))}
    </>
  );
}
