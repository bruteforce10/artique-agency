import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.CF_PAGES ? "export" : undefined,
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: process.env.CF_PAGES ? true : false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.graphassets.com",
      },
      {
        protocol: "https",
        hostname: "**.hygraph.com",
      },
      {
        protocol: "https",
        hostname: "**.hygraphusercontent.com",
      },
    ],
    // Add fallback for image optimization errors
    formats: ["image/webp", "image/avif"],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
