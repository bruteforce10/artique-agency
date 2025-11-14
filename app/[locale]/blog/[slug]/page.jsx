import { NavbarComponent } from "@/components/Navbar";
import { NavbarProvider } from "@/components/NavbarContext";
import Footer from "@/components/Footer";
import BlogDetailSection from "@/components/BlogDetailSection";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import { gql, GraphQLClient } from "graphql-request";
import { routing } from "@/i18n/routing";

const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cmguqxtwt008w07w963j4v364/master";
const graphQLClient = new GraphQLClient(HYGRAPH_ENDPOINT);

async function fetchAllBlogs(locale) {
  try {
    let apiLocale = locale || "en";
    if (apiLocale === "id") {
      apiLocale = "id_ID";
    }

    // Use same format as case-studies route (string interpolation)
    // Hygraph accepts locales: ${locale} format directly
    const query = gql`
      query GetBlogs {
        blogs(locales: ${apiLocale}) {
          slug
        }
      }
    `;

    const response = await graphQLClient.request(query);
    return response.blogs || [];
  } catch (error) {
    console.error("Error fetching blogs for static params:", error);
    console.error("Error details:", {
      message: error.message,
      response: error.response,
    });
    return [];
  }
}

async function fetchBlogBySlug(slug, locale) {
  try {
    // Validate slug
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      console.error("Invalid slug provided:", slug);
      return null;
    }

    // Use API route instead of duplicating GraphQL logic
    // API route is at /api/blogs/[slug] - all GraphQL logic is centralized there
    const cleanSlug = slug.trim();

    // For server-side fetch in Next.js, we need to construct the full URL
    // Use environment variable or construct from request context
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const host = process.env.VERCEL_URL
      ? `${protocol}://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL
      ? process.env.NEXT_PUBLIC_BASE_URL
      : "http://localhost:3000";

    const apiUrl = `${host}/api/blogs/${cleanSlug}?locale=${locale}`;

    const response = await fetch(apiUrl, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      cache: "force-cache", // Cache for better performance in server components
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch blog: ${response.status}`);
    }

    const data = await response.json();
    return data.blog || null;
  } catch (error) {
    console.error("Error fetching blog from API:", error);
    return null;
  }
}

export async function generateStaticParams() {
  // Generate static params for all locales
  // Note: Next.js will automatically combine these with locale from parent route
  const allParams = [];

  for (const locale of routing.locales) {
    try {
      const blogs = await fetchAllBlogs(locale);
      const validBlogs = blogs.filter(
        (blog) =>
          blog.slug && typeof blog.slug === "string" && blog.slug.trim() !== ""
      );
      const params = validBlogs.map((blog) => ({
        slug: blog.slug.trim(),
      }));
      allParams.push(...params);
    } catch (error) {
      console.error(`Error fetching blogs for locale ${locale}:`, error);
    }
  }

  // Remove duplicates (same slug might exist in multiple locales)
  const uniqueParams = Array.from(
    new Map(allParams.map((param) => [param.slug, param])).values()
  );

  return uniqueParams;
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const blog = await fetchBlogBySlug(slug, locale);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: blog.judulBlog || "Blog Post",
    description: blog.metaDescription || "",
    openGraph: {
      title: blog.judulBlog || "Blog Post",
      description: blog.metaDescription || "",
      images: blog.cover?.url ? [blog.cover.url] : [],
      type: "article",
      publishedTime: blog.createdAt,
      authors: blog.creator?.nama ? [blog.creator.nama] : [],
      tags: blog.category ? [blog.category] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.judulBlog || "Blog Post",
      description: blog.metaDescription || "",
      images: blog.cover?.url ? [blog.cover.url] : [],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug, locale } = await params;
  const blog = await fetchBlogBySlug(slug, locale);

  if (!blog) {
    notFound();
  }

  return (
    <NavbarProvider>
      <div>
        <NavbarComponent />
        <BlogDetailSection blog={blog} />
        <CTASection />
        <Footer />
      </div>
    </NavbarProvider>
  );
}
