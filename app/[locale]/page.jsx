import AboutSection from "@/components/AboutSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import ContentHero from "@/components/ContentHero";
import Hero from "@/components/Hero";
import { NavbarComponent } from "@/components/Navbar";
import { NavbarProvider } from "@/components/NavbarContext";
import ProjectSection from "@/components/ProjectSection";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <NavbarProvider>
      <div className="">
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
        <ProjectSection />
        <CaseStudiesSection />
      </div>
    </NavbarProvider>
  );
}
