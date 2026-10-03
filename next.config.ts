import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["localhost", "127.0.0.1", "172.18.20.182", "192.168.1.6"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
