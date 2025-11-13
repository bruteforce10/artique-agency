import { cn } from "@/lib/utils";
import HeroSection from "./HeroSection";

/**
 * ServicesHero section - wrapper untuk HeroSection dengan konfigurasi khusus services
 */
export default function ProjectsSection({
  className,
  backgroundImage = "/bg-projects.webp",
}) {
  return (
    <HeroSection
      sectionId="projects-hero"
      className={cn("pt-20 sm:pt-24", className)}
      backgroundImage={backgroundImage}
      badge="Our Projects"
      title="We Build Projects That Last"
      titleAs="h1"
    />
  );
}
