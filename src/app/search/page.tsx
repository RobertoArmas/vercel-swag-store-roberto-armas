import { Suspense } from "react";
import { getStoreConfiguration } from "@/lib/swag-store/config";
import { getCategories } from "@/lib/swag-store/categories";
import SearchInput from "@/components/search/SearchInput.client";
import CategoryFilter from "@/components/search/CategoryFilter.client";
import SearchResults from "@/components/search/SearchResults";
import SearchResultsSkeleton from "@/components/search/SearchResultsSkeleton";
import { cacheLife, cacheTag } from "next/cache";
import SearchProvider from "@/components/search/SearchProvider";

type SearchPageProps = {
  searchParams: Promise<SearchParams>;
};

export type SearchParams = {
  q?: string;
  category?: string;
};

export const generateMetadata = async () => {
  const storeConfiguration = await getStoreConfiguration();
  const title = storeConfiguration.seo.titleTemplate.replace("%s", "Search");
  return {
    title: title,
    description: storeConfiguration.seo.defaultDescription,
    openGraph: {
      title: title,
      description: storeConfiguration.seo.defaultDescription,
    },
  };
};

export const getCategoriesData = async () => {
  "use cache";
  cacheLife("hours");
  cacheTag("categories", "categories");
  return await getCategories();
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const categories = await getCategoriesData();

  return (
    <main className="flex flex-1 w-full max-w-7xl mx-auto flex-col py-16 px-4 sm:px-8 bg-white dark:bg-black">
      <h1 className="text-3xl font-bold text-black dark:text-white mb-8">
        Search
      </h1>
      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchProvider>
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="flex-1">
              <SearchInput />
            </div>

            <CategoryFilter categories={categories} />
          </div>

          <SearchResults searchParams={searchParams} />
        </SearchProvider>
      </Suspense>
    </main>
  );
}
