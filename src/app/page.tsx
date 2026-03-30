import { HeroSection } from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/products/FeaturedProducts";
import { getStoreConfiguration } from "@/lib/swag-store/config";

export const generateMetadata = async () => {
  const storeConfiguration = await getStoreConfiguration();
  const title = storeConfiguration.seo.titleTemplate.replace("%s", "Home");
  return {
    title: title,
    description: storeConfiguration.seo.defaultDescription,
    openGraph: {
      title: title,
      description: storeConfiguration.seo.defaultDescription,
    },
  };
};

export default function Home() {
  return (
    <main className="flex flex-1 w-full  flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      <HeroSection
        title="Wear the framework you ship with."
        copy="Premium swag for developers who build with Vercel. From tees to tech gear, reprsent the tools you love."
        cta={{
          url: "/search",
          label: "Browse All Products",
        }}
      />
      <FeaturedProducts
        title="Featured Products"
        viewAllUrl={{ url: "/search", text: "View All" }}
      />
    </main>
  );
}
