import { cn } from "@/lib/utils";
import HeroSection from "./HeroSection";

/**
 * ServicesHero section - wrapper untuk HeroSection dengan konfigurasi khusus services
 */
export default function ServicesHero({
  className,
  backgroundImage = "/bg-services.webp",
  heading,
}) {
  return (
    <HeroSection
      sectionId="services-hero"
      className={cn("pt-20 sm:pt-24", className)}
      backgroundImage={backgroundImage}
      badge="Our Services"
      title={heading || "Diverse Solutions Tailored to Your Every Need"}
      titleAs="h1"
    />
  );
}
