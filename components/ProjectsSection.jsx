"use client";
import { cn } from "@/lib/utils";
import HeroSection from "./HeroSection";
import { useLocale } from "next-intl";
/**
 * ServicesHero section - wrapper untuk HeroSection dengan konfigurasi khusus services
 */
export default function ProjectsSection({
  title,
  className,
  backgroundImage = "/bg-projects.webp",
}) {
  const locale = useLocale();
  return (
    <HeroSection
      sectionId="projects-hero"
      className={cn("pt-20 sm:pt-24", className)}
      backgroundImage={backgroundImage}
      badge={locale === "id" ? "Proyek Kami" : "Our Projects"}
      title={title || "We Build Projects That Last"}
      titleAs="h1"
    />
  );
}
