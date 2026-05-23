import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Covers mobile → 4K retina. Without 1920/2880/3840, a full-width banner
    // on any retina display gets upscaled from 1200px → visible blur.
    deviceSizes: [480, 828, 1080, 1200, 1440, 1920, 2400, 2880, 3840],
    imageSizes: [64, 128, 256, 384, 512, 640],
    qualities: [75, 90, 95, 100],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
