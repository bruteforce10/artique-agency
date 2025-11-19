import { cn } from "@/lib/utils";
import HeroSection from "./HeroSection";
import BlogListClient from "./BlogListClient";

async function fetchBlogs(locale) {
  try {
    // Convert locale format for API
    let apiLocale = locale || "en";
    if (apiLocale === "id") {
      apiLocale = "id_ID";
    }

    // Get base URL - prioritize environment variables
    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    // During build on Vercel, use VERCEL_URL if available
    if (!baseUrl && process.env.VERCEL_URL) {
      baseUrl = `https://${process.env.VERCEL_URL}`;
    }
    
    // If still no base URL, try to construct from headers (runtime only)
    // For build time, we'll need to handle this differently
    if (!baseUrl) {
      // During build, we can't make external requests
      // Return empty array to allow build to proceed
      if (process.env.NODE_ENV === 'production' && !process.env.VERCEL_URL) {
        console.warn("No base URL available during build, returning empty blogs array");
        return [];
      }
      // For local development
      baseUrl = "http://localhost:3000";
    }

    // Fetch from API route with revalidation
    const response = await fetch(
      `${baseUrl}/api/blogs?locale=${apiLocale}`,
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    }

    const blogs = await response.json();
    return blogs || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    // Return empty array to allow page to render
    return [];
  }
}

export default async function BlogSection({
  className,
  backgroundImage = "/bg-blog.webp",
  locale = "en",
}) {
  // Fetch blogs data on the server for SEO
  const blogs = await fetchBlogs(locale);

  // Extract unique categories for SEO meta
  const categories = [
    "All",
    ...new Set(blogs.map((blog) => blog.category).filter(Boolean)),
  ];

  return (
    <div className={cn("w-full", className)}>
      {/* Hero Section */}
      <HeroSection
        sectionId="blog-hero"
        className={cn("pt-20 sm:pt-24")}
        backgroundImage={backgroundImage}
        badge="Blog"
        title="Explore Various Activities, Events, And Everything About Us."
        titleAs="h1"
      />

      {/* Blog Content Section - Client Component for Interactivity */}
      <BlogListClient blogs={blogs} categories={categories} />
    </div>
  );
}
