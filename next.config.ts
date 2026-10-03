import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photography is served from the Unsplash CDN; see app/lib/images.ts.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
