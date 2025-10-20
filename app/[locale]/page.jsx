import ContentHero from '@/components/ContentHero';
import Hero from '@/components/Hero';
import { NavbarComponent } from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-[100000px]">
      <NavbarComponent />
      
      <Hero
        videoUrl={"/bg-video.webm"}
        classNameContainer={"sm:h-[calc(100vh-3.5rem)] max-sm:h-screen"}
        className={
          "sm:h-[360px] max-sm:h-[255px] mb-12 pl-32"
        }
      >
        <ContentHero />
        </Hero>
      
    </div>
  );
}