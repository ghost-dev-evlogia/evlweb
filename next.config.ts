import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The site is a single-page journey now; old route URLs land on their
    // corresponding stop so nothing 404s.
    return [
      { source: "/services", destination: "/#fields", permanent: true },
      { source: "/work", destination: "/#valley", permanent: true },
      { source: "/research", destination: "/#quests", permanent: true },
      { source: "/about", destination: "/#team", permanent: true },
      { source: "/contact", destination: "/#hi", permanent: true },
    ];
  },
};

export default nextConfig;
