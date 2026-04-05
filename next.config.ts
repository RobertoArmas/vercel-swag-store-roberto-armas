import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    qualities: [75, 85, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
    // Enable modern formats for faster delivery (WebP)
    formats: ["image/webp"],
    // Optimize image loading with better caching
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache for static images
  },

  async rewrites() {
    return [
      {
        source: "/healthz",
        destination: "/api/healthz",
      },
    ];
  },
};

export default nextConfig;
