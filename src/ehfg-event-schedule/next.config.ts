import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.ehfg.org',
        port: '',
        pathname: '/fileadmin/**',
      },
    ],
  },
};

export default nextConfig;
