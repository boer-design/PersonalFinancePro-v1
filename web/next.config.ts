// web/next.config.ts
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import type { NextConfig } from "next";


const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // if you already use compiler, keep it here
  },
};

export default withVanillaExtract(nextConfig);
