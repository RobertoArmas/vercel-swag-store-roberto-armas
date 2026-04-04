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

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400",
          },
        ],
      },
      // Static assets caching
      {
        source: "/font/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
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
