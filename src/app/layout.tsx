import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigation/Header";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/navigation/Footer";
import PromotionalBanner from "@/components/banners/PromotionalBanner";
import Providers from "@/Providers";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getStoreConfiguration } from "@/lib/swag-store/config";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
          <Suspense
            fallback={<Skeleton className="w-full h-[50px] rounded-lg" />}
          >
            <PromotionalBanner />
          </Suspense>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
