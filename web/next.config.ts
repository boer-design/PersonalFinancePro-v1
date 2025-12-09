// web/next.config.ts
import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // if you already use compiler, keep it here
  },
};

export default withVanillaExtract(nextConfig);
