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

    // Fetch from API route
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/blogs?locale=${apiLocale}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    }

    const blogs = await response.json();
    return blogs || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
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
