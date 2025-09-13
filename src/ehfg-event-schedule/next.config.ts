import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use static export so we can deploy to GitHub Pages (generates ./out)
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.ehfg.org",
        port: "",
        pathname: "/fileadmin/**",
      },
    ],
  },
};

export default nextConfig;
