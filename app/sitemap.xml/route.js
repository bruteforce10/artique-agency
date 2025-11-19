import { NextResponse } from "next/server";
import { gql, GraphQLClient } from "graphql-request";

const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cmguqxtwt008w07w963j4v364/master";
const graphQLClient = new GraphQLClient(HYGRAPH_ENDPOINT);

// Static routes that don't require dynamic data
const staticRoutes = [
  "",
  "about-us",
  "services",
  "projects",
  "contact",
  "blog",
];

// Locales supported
const locales = ["en", "id"];

// Fetch blog slugs from Hygraph
async function fetchBlogSlugs(locale) {
  try {
    let hygraphLocale = locale === "id" ? "id_ID" : "en";
    const query = gql`
      query GetBlogSlugs {
        blogs(locales: ${hygraphLocale}) {
          slug
          updatedAt
        }
      }
    `;

    const response = await graphQLClient.request(query);
    return response.blogs || [];
  } catch (error) {
    console.error(`Error fetching blog slugs for locale ${locale}:`, error);
    return [];
  }
}

// Generate sitemap XML
function generateSitemap(urls) {
  const urlsXml = urls
    .map(
      (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    ${url.alternates ? url.alternates : ""}
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlsXml}
</urlset>`;
}

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

  const urls = [];
  const currentDate = new Date().toISOString().split("T")[0];

  // Generate URLs for static routes
  for (const locale of locales) {
    for (const route of staticRoutes) {
      const path = route ? `/${locale}/${route}` : `/${locale}`;
      const alternates = locales
        .map(
          (altLocale) =>
            `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}/${altLocale}${
              route ? `/${route}` : ""
            }"/>`
        )
        .join("\n");

      urls.push({
        loc: `${baseUrl}${path}`,
        lastmod: currentDate,
        changefreq:
          route === "" ? "daily" : route === "blog" ? "weekly" : "monthly",
        priority: route === "" ? "1.0" : route === "blog" ? "0.8" : "0.7",
        alternates: alternates,
      });
    }

    // Fetch and add blog post URLs
    const blogs = await fetchBlogSlugs(locale);
    for (const blog of blogs) {
      const blogPath = `/${locale}/blog/${blog.slug}`;
      const blogLastmod = blog.updatedAt
        ? new Date(blog.updatedAt).toISOString().split("T")[0]
        : currentDate;

      const blogAlternates = locales
        .map(
          (altLocale) =>
            `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}/${altLocale}/blog/${blog.slug}"/>`
        )
        .join("\n");

      urls.push({
        loc: `${baseUrl}${blogPath}`,
        lastmod: blogLastmod,
        changefreq: "monthly",
        priority: "0.6",
        alternates: blogAlternates,
      });
    }
  }

  // Add root URL (default locale - en)
  const rootAlternates = locales
    .map(
      (altLocale) =>
        `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}/${altLocale}"/>`
    )
    .join("\n");

  urls.push({
    loc: `${baseUrl}/en`,
    lastmod: currentDate,
    changefreq: "daily",
    priority: "1.0",
    alternates: rootAlternates,
  });

  const sitemap = generateSitemap(urls);

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
    },
  });
}
