import { NavbarComponent } from "@/components/Navbar";
import { NavbarProvider } from "@/components/NavbarContext";
import Footer from "@/components/Footer";
import BlogDetailSection from "@/components/BlogDetailSection";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";

// Ambil detail blog lewat API route (slug + locale)
async function fetchBlogBySlug(slug, locale) {
  try {
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      console.error("Invalid slug provided:", slug);
      return null;
    }

    const cleanSlug = slug.trim();
    const apiLocale = locale || "en";

    // Selalu gunakan absolute URL untuk fetch di server
    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      if (process.env.VERCEL_URL) {
        baseUrl = `https://${process.env.VERCEL_URL}`;
      } else {
        baseUrl = "http://localhost:3000";
      }
    }

    const url = `${baseUrl}/api/blogs/${cleanSlug}?locale=${apiLocale}`;

    const response = await fetch(url, {
      next: { revalidate: 60 },
      cache: "force-cache",
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
