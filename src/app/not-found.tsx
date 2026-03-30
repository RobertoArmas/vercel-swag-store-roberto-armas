import Link from "next/link";
import { HeroSection } from "@/components/home/HeroSection";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <HeroSection
        title="Looks like this page went out of stock."
        copy="The page you're looking for doesn't exist or may have been moved. Let's get you back to browsing the good stuff."
        cta={{
          url: "/search",
          label: "Browse All Products",
        }}
      />

      <div className="mt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
