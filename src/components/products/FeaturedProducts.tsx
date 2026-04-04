import Link from "next/link";
import DynamicFeaturedProducts from "./DynamicFeaturedProducts";
import { Suspense } from "react";
import { FeaturedProductsSkeleton } from "./FeaturedProductsSkeleton";

type FeaturedProductsProps = {
  currency: string;
  title: string;
  viewAllUrl: {
    url: string;
    text: string;
  };
};

// Layout component for featured products section
function FeaturedProductsLayout({
  title,
  viewAllUrl,
  children,
}: {
  title: string;
  viewAllUrl: { url: string; text: string };
  children: React.ReactNode;
}) {
  return (
    <section className="w-full py-2 md:py-4">
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
        {children}
      </div>
    </section>
  );
}

export default function FeaturedProducts({
  currency,
  title,
  viewAllUrl,
}: FeaturedProductsProps) {
  return (
    <Suspense fallback={<FeaturedProductsSkeleton />}>
      <FeaturedProductsLayout title={title} viewAllUrl={viewAllUrl}>
        <DynamicFeaturedProducts currency={currency} />
      </FeaturedProductsLayout>
    </Suspense>
  );
}
