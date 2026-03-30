import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigation/Header";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/navigation/Footer";
import PromotionalBanner from "@/components/banners/PromotionalBanner";
import Providers from "@/Providers";
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
          <PromotionalBanner />
          <main className="flex flex-1 w-full max-w-7xl mx-auto flex-col px-4 sm:px-8 bg-white dark:bg-black pb-16 md:pb-32">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
