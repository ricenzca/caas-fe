import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  //  https://nextjs.org/docs/pages/api-reference/config/next-config-js/output#automatically-copying-traced-files
  output: "standalone",
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js'
      }
    }
  }
};

export default nextConfig;
