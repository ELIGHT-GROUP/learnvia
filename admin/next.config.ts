import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shorturl.at",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
