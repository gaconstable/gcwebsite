import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare-only example files are not part of the Vercel application.
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
