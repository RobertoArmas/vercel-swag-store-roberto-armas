import { getProducts } from "@/lib/swag-store/product";
import Pagination from "./Pagination";
import SearchResultsClient from "./SearchResults.client";

type SearchResultsProps = {
  searchParams: Promise<{ q?: string; category?: string; page?: number }>;
};

export default async function SearchResults({
  searchParams,
}: SearchResultsProps) {
  const { q, category, page } = await searchParams;
  const query = q ?? "";
  const isSearching = !!query;

  const products = await getProducts(query, category, page, 2);

  if (products.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <svg
          className="mb-4 h-16 w-16 text-gray-300 dark:text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          No products found
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Try adjusting your search terms or clearing the category filter.
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Showing{" "}
        {1 +
          (products.meta.pagination.page - 1) *
            products.meta.pagination.limit}{" "}
        -{" "}
        {(products.meta.pagination.page - 1) * products.meta.pagination.limit +
          products.data.length}{" "}
        of {products.meta.pagination.total} result
        {products.data.length !== 1 ? "s" : ""}
        {isSearching && (
          <>
            {" "}
            for <span className="font-bold"> {query}</span>
          </>
        )}
      </p>

      <div className="flex flex-col gap-4">
        <SearchResultsClient products={products.data} />
      </div>
      <div className="flex justify-center items-center mt-16">
        <Pagination
          pagination={products.meta.pagination}
          searchParams={searchParams}
        />
      </div>
    </>
  );
}
