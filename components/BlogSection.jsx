import { cn } from "@/lib/utils";
import HeroSection from "./HeroSection";
import BlogListClient from "./BlogListClient";
import { gql, GraphQLClient } from "graphql-request";

const HYGRAPH_ENDPOINT =
  "https://ap-south-1.cdn.hygraph.com/content/cmguqxtwt008w07w963j4v364/master";
const graphQLClient = new GraphQLClient(HYGRAPH_ENDPOINT);

async function fetchBlogs(locale) {
  try {
    // Convert locale format for API
    let apiLocale = locale || "en";
    if (apiLocale === "id") {
      apiLocale = "id_ID";
    }

    // Use same format as case-studies route (string interpolation)
    // Hygraph accepts locales: ${locale} format directly
    // Fetch directly from GraphQL for server component efficiency
    // API route is still available at /api/blogs for client components
    const query = gql`
      query GetBlogs {
        blogs(locales: ${apiLocale}) {
          createdAt
          id
          judulBlog
          cover {
            url
          }
          metaDescription
          minuteRead
          slug
          category
          creator {
            avatar {
              url
            }
            nama
          }
        }
      }
    `;

    const response = await graphQLClient.request(query);
    return response.blogs || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    console.error("Error details:", {
      message: error.message,
      response: error.response,
    });
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
