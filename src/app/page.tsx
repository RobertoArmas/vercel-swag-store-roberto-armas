import { HeroSection } from "@/components/home/HeroSection";

export default function Home() {
  return (
    <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      <HeroSection
        title="Wear the framework you ship with."
        copy="Premium swag for developers who build with Vercel. From tees to tech gear, reprsent the tools you love."
      />
    </main>
  );
}
