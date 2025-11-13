import ProjectsSection from "@/components/ProjectsSection";
import { NavbarComponent } from "@/components/Navbar";
import { NavbarProvider } from "@/components/NavbarContext";
import Footer from "@/components/Footer";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import CTASection from "@/components/CTASection";

export default function ProjectsPage() {
  return (
    <NavbarProvider>
      <div>
        <NavbarComponent />
        <ProjectsSection />
        <CaseStudiesSection />
        <CTASection />
        <Footer />
      </div>
    </NavbarProvider>
  );
}
