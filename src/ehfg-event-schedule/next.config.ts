import type { NextConfig } from "next";

// When deploying a project site to GitHub Pages the site is served from
// https://<user>.github.io/<repo-name>/, so we must set a basePath and
// assetPrefix so that Next.js generated references include the repository
// segment. For local development we keep them empty.
const IS_PROD = process.env.NODE_ENV === "production";
const REPO_NAME = "ehfg-conference-schedule"; // keep in sync with repository name

const nextConfig: NextConfig = {
  // Static HTML export (generates ./out for GitHub Pages)
  output: "export",
  // Serve the app from the repository sub-path only in production
  basePath: IS_PROD ? `/${REPO_NAME}` : undefined,
  assetPrefix: IS_PROD ? `/${REPO_NAME}/` : undefined,
  // next/image optimization is disabled for static export unless you use a loader.
  images: {
    unoptimized: true,
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
