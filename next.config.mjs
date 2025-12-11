import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
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
