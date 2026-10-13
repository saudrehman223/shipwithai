import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // cacheComponents is intentionally OFF: this blog relies on per-request
  // rendering so the publishDate auto-publish gate is evaluated on every
  // visit (and notFound() returns real 404s). See src/lib/articles.ts.
  cacheComponents: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
