import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve responsive sizes only — reduces payload on mobile
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Cache optimized images for 1 year at the CDN
    minimumCacheTTL: 31536000,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "thecohostcompany.com" },
      // Guesty Cloudinary CDN — all paths allowed
      { protocol: "https", hostname: "assets.guesty.com", pathname: "/**" },
      // Cloudinary (Guesty property photos are served from here)
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },
  // Compress responses
  compress: true,
};

export default nextConfig;
