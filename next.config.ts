import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "px8.792.myftpupload.com",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
