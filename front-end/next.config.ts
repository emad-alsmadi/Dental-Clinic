import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "images.pexels.com",
      "cdn.dummyjson.com",
      "i.dummyjson.com"
    ]
  }
};

export default nextConfig;
