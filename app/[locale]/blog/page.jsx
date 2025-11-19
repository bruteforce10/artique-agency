import { NavbarComponent } from "@/components/Navbar";
import { NavbarProvider } from "@/components/NavbarContext";
import Footer from "@/components/Footer";
import BlogSection from "@/components/BlogSection";

// Force dynamic rendering since we're fetching data from API
export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage({ params }) {
  const { locale } = await params;

  return (
    <NavbarProvider>
      <div>
        <NavbarComponent />
        <BlogSection locale={locale} />
        <Footer />
      </div>
    </NavbarProvider>
  );
}
