import ProjectsSection from "@/components/ProjectsSection";
import { NavbarComponent } from "@/components/Navbar";
import { NavbarProvider } from "@/components/NavbarContext";
import Footer from "@/components/Footer";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import CTASection from "@/components/CTASection";
import WhyChooseUs from "@/components/WhyChooseUs";
import InnovationHero from "@/components/InnovationHero";

export default function AboutUsPage() {
  return (
    <NavbarProvider>
      <div>
        <NavbarComponent />
        <WhyChooseUs />
        <InnovationHero />
        <CTASection />
        <Footer />
      </div>
    </NavbarProvider>
  );
}
