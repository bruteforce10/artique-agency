import { NavbarComponent } from "@/components/Navbar";
import { NavbarProvider } from "@/components/NavbarContext";
import Footer from "@/components/Footer";
import BlogSection from "@/components/BlogSection";

export default function BlogPage() {
  return (
    <NavbarProvider>
      <div>
        <NavbarComponent />
        <BlogSection />
        <Footer />
      </div>
    </NavbarProvider>
  );
}
