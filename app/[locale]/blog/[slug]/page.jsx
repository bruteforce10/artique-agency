import { NavbarComponent } from "@/components/Navbar";
import { NavbarProvider } from "@/components/NavbarContext";
import Footer from "@/components/Footer";
import BlogDetailSection from "@/components/BlogDetailSection";
import { notFound } from "next/navigation";
import { dummyBlogPosts } from "@/lib/blog-data";
import { findPostBySlug, generateSlug } from "@/lib/blog-utils";
import CTASection from "@/components/CTASection";

export async function generateStaticParams() {
  return dummyBlogPosts.map((post) => ({
    slug: generateSlug(post.title),
  }));
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = findPostBySlug(slug, dummyBlogPosts);

  if (!post) {
    notFound();
  }

  return (
    <NavbarProvider>
      <div>
        <NavbarComponent />
        <BlogDetailSection post={post} />
        <CTASection />
        <Footer />
      </div>
    </NavbarProvider>
  );
}
