import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 reactStrictMode: false,
 images: {
  domains: ["images.unsplash.com", "ik.imagekit.io"],
 },
 /* config options here */
};

export default nextConfig;
