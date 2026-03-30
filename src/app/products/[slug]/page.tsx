import StockIndicator from "@/components/products/StockIndicator";
import AddToCartButton from "@/components/shopping-cart/AddToCartButton";
import { Skeleton } from "@/components/ui/skeleton";
import { getStoreConfiguration } from "@/lib/swag-store/config";
import { getAllProducts, getProductBySlug } from "@/lib/swag-store/product";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type ProductDetailProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () => {
  const products = await getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }
  const storeConfiguration = await getStoreConfiguration();
  const title = storeConfiguration.seo.titleTemplate.replace(
    "%s",
    product.name
  );
  return {
    title: title,
    description:
      product.description || storeConfiguration.seo.defaultDescription,
    openGraph: {
      title: title,
      description:
        product.description || storeConfiguration.seo.defaultDescription,
    },
  };
};

export default async function ProductDetailPage({
  params,
}: ProductDetailProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price / 100);

  return (
    <main className="flex-1 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Main product image */}
          <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={800}
              height={800}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-6">
            <div>
              <Suspense fallback={<Skeleton className="w-full h-10" />}>
                <StockIndicator slug={product.slug} />
              </Suspense>
              <h1 className="text-3xl md:text-4xl font-bold text-black">
                {product.name}
              </h1>
              <p className="text-2xl text-gray-700 mt-3">{formattedPrice}</p>
              <p className="text-gray-700 mt-3">{product.description}</p>
            </div>

            <Suspense fallback={<Skeleton className="w-full h-10" />}>
              <AddToCartButton product={product} />
            </Suspense>
            {/* Thumbnail gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((src, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 rounded-md overflow-hidden border border-gray-200"
                  >
                    <Image
                      src={src}
                      alt={`${product.name} view ${i + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
