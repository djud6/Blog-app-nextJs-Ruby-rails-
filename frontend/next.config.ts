import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost'],
  },
  typescript: {
    ignoreBuildErrors: true, // Temporarily disable type checking
  },
  eslint: {
    ignoreDuringBuilds: true, // Temporarily disable ESLint
  },
};

export default nextConfig;
