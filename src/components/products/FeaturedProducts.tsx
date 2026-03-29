import Link from "next/link";
export default function FeaturedProducts() {
  return (
    <section className="py-3 md:py-6">
      {/* Featured Products Section */}
      <div className="mt-16 md:mt-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            Featured Products
          </h2>
          <Link
            href="/products"
            className="text-gray-600 hover:text-black transition-colors text-sm font-medium"
          >
            View all
          </Link>
        </div>
      </div>
    </section>
  );
}
