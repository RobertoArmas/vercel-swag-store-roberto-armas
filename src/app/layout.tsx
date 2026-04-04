import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigation/Header";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/navigation/Footer";
import PromotionalBanner from "@/components/banners/PromotionalBanner";
import Providers from "@/Providers";
import { getStoreConfiguration } from "@/lib/swag-store/config";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react";

// Optimize font loading with display strategy
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap", // Prevent FOUT - show fallback while loading
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const generateMetadata = async () => {
  const storeConfiguration = await getStoreConfiguration();
  const title = storeConfiguration.seo.defaultTitle;
  return {
    title: title,
    description: storeConfiguration.seo.defaultDescription,
    openGraph: {
      title: title,
      description: storeConfiguration.seo.defaultDescription,
    },
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          <Suspense fallback={null}>
            <PromotionalBanner />
          </Suspense>
          <main className="flex flex-1 w-full max-w-7xl mx-auto flex-col px-4 sm:px-8 bg-white dark:bg-black pb-16 md:pb-32">
            {children}
          </main>
          <Analytics />
          <SpeedInsights />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
