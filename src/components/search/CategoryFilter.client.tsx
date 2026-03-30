"use client";

import { Category } from "@/types/categories";
import { useSearchParams } from "next/navigation";
import { useSearch } from "./SearchProvider";

export default function CategoryFilter({
  categories,
}: {
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const { setQueryParameters, isLoading } = useSearch();
  const currentCategory = searchParams.get("category") ?? "all";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    const value = e.target.value;

    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }

    if (params.get("page")) {
      params.set("page", "1");
    }

    setQueryParameters(params);
  };

  return (
    <div className="relative">
      <select
        value={currentCategory}
        onChange={handleChange}
        disabled={isLoading}
        className="appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm text-black focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-white dark:focus:ring-white"
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name} ({cat.productCount})
          </option>
        ))}
      </select>

      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m19.5 8.25-7.5 7.5-7.5-7.5"
        />
      </svg>
    </div>
  );
}
