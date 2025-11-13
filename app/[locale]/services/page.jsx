import ServicesSection from "@/components/ServicesSection";
import { NavbarComponent } from "@/components/Navbar";
import { NavbarProvider } from "@/components/NavbarContext";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <NavbarProvider>
      <div>
        <NavbarComponent />
        <div className="pt-20 sm:pt-24">
          <ServicesSection />
        </div>
        <Footer />
      </div>
    </NavbarProvider>
  );
}

