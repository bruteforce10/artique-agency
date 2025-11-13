import { cn } from "@/lib/utils";
import HeroSection from "./HeroSection";

/**
 * WhyChooseUs section - wrapper untuk HeroSection dengan konfigurasi khusus why choose us
 */
export default function WhyChooseUs({
  className,
  backgroundImage = "/bg.webp",
}) {
  return (
    <HeroSection
      sectionId="why-choose-us"
      className={cn("mt-24", className)}
      backgroundImage={backgroundImage}
      badge="About"
      title="Why Choose Us?"
      titleAs="h2"
      description="Artique collaborates with clients from various countries, including Spain, Japan, China, Indonesia, and Malaysia, while overseeing projects in six cities: Tokyo, Jakarta, Bali, Malang, Bandung, Yogyakarta, and Kuala Lumpur. We are also managing campaigns for clients across Indonesia, Singapore, Japan, Malaysia, Vietnam, and Thailand. Our team is known for its creative and strategic approach, excelling in both commercially driven projects and outstanding activations."
      button={{
        href: "#learn-more",
        text: "Learn more",
        icon: "→",
      }}
      contentClassName="py-24 sm:py-28 lg:py-32"
      parallaxConfig={{
        scaleRange: {
          sm: [1.04, 1.1],
          md: [1.06, 1.14],
          lg: [1.08, 1.18],
        },
      }}
    />
  );
}
