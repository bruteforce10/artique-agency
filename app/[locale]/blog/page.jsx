import { NavbarComponent } from "@/components/Navbar";
import { NavbarProvider } from "@/components/NavbarContext";
import Footer from "@/components/Footer";
import BlogSection from "@/components/BlogSection";

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
