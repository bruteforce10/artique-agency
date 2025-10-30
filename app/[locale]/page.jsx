import AboutSection from "@/components/AboutSection";
import ContentHero from "@/components/ContentHero";
import Hero from "@/components/Hero";
import { NavbarComponent } from "@/components/Navbar";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div className="min-h-[100000px]">
      <NavbarComponent />

      <Hero
        videoUrl={"/bg-video.webm"}
        classNameContainer={"sm:h-[calc(100vh-1.5rem)] max-sm:h-screen"}
        className={
          "sm:h-[360px] max-sm:h-[255px] max-w-5xl mt-12 mx-auto w-full"
        }
      >
        <ContentHero />
      </Hero>
      <AboutSection />
      <WhyChooseUs />
    </div>
  );
}
