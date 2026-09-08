import type { NextConfig } from "next";

// Pin the workspace root. Without this Turbopack walks up and finds a stray
// package-lock.json in the home directory, outside this repo.

const nextConfig: NextConfig = {
  // Sanity Studio is a client-only bundle. Keeping it out of the server graph
  // avoids Turbopack resolving swr's "react-server" condition, which has no
  // default export and breaks the `import useSWR from "swr"` inside sanity.
  turbopack: { root: process.cwd() },

  serverExternalPackages: ["sanity", "@sanity/vision"],

  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
