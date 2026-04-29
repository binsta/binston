import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  outputFileTracingIncludes: {
    "/audits/**": ["./content/**/*"],
    "/audits":    ["./content/**/*"],
    "/writing/**":["./content/**/*"],
    "/writing":   ["./content/**/*"],
    "/projects/**":["./content/**/*"],
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
