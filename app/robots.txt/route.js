import { NextResponse } from "next/server";

export async function GET() {
  // Get base URL
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    if (process.env.VERCEL_URL) {
      baseUrl = `https://${process.env.VERCEL_URL}`;
    } else {
      baseUrl = "https://artique-agency.com"; // Update with your actual domain
    }
  }

  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin and API routes
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Allow all pages
Allow: /
Allow: /en/
Allow: /id/
Allow: /en/about-us
Allow: /id/about-us
Allow: /en/services
Allow: /id/services
Allow: /en/projects
Allow: /id/projects
Allow: /en/contact
Allow: /id/contact
Allow: /en/blog
Allow: /id/blog
Allow: /en/blog/*
Allow: /id/blog/*
`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
    },
  });
}
