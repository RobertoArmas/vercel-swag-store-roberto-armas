import Link from "next/link";
import ProductCard from "./ProductCard";
import { getFeaturedProducts } from "@/lib/swag-store/product";
export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();
  return (
    <section className="w-full py-3 md:py-6">
      <div className="mt-16 md:mt-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            Featured Products
          </h2>
          <Link
            href="/search"
            className="text-gray-600 hover:text-black transition-colors text-sm font-medium"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
