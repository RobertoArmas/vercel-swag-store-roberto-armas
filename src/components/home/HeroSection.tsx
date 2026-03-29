import Link from "next/link";
import { ArrowRight } from "lucide-react";

type HeroSectionProps = Readonly<{
  title: string;
  copy: string;
}>;

export function HeroSection({ title, copy }: HeroSectionProps) {
  return (
    <section className="py-3 md:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Hero Title */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-black mb-4">
            {title}
          </h1>

          {/* Hero Copy */}
          <p className="text-base text-gray-600 mb-6 max-w-lg leading-normal">
            {copy}
          </p>

          {/* CTA Button */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium text-sm"
          >
            Browse All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
