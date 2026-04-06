import { HeroSection } from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/products/FeaturedProducts";
import { getStoreConfiguration } from "@/lib/swag-store/config";
import { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  "use cache";
  cacheLife("default");
  cacheTag("home");
  const storeConfiguration = await getStoreConfiguration();
  return (
    <>
      <HeroSection
        title="Wear the framework you ship with."
        copy="Premium swag for developers who build with Vercel. From tees to tech gear, reprsent the tools you love."
        cta={{
          url: "/search",
          label: "Browse All Products",
        }}
      />
      <FeaturedProducts
        currency={storeConfiguration.currency}
        title="Featured Products"
        viewAllUrl={{ url: "/search", text: "View All" }}
      />
    </>
  );
}
