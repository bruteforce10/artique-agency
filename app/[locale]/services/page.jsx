import ServicesSection from "@/components/ServicesSection";
import ServicesHero from "@/components/ServicesHero";
import { NavbarComponent } from "@/components/Navbar";
import { NavbarProvider } from "@/components/NavbarContext";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <NavbarProvider>
      <div>
        <NavbarComponent />
        <ServicesHero />
        <ServicesSection />
        <Footer />
      </div>
    </NavbarProvider>
  );
}

