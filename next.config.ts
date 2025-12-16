import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactCompiler: true, // Commenting out if causing issues or keeping it if it was default
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      }
    ],
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
