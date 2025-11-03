"use client";
import { cn } from "@/lib/utils";
import { SpinningText } from "./ui/spinning-text";
import { useNavbarSection } from "./NavbarContext";

export default function Hero({
  children,
  videoUrl,
  className,
  classNameContainer,
}) {
  const heroRef = useNavbarSection("hero", true);
  
  return (
    <section ref={heroRef}>
      <div
        className={cn(
          classNameContainer,
          "relative h-[400px] sm:min-h-[calc(80vh-3.5rem)] z-[2] flex flex-col justify-center w-full "
        )}
      >
        {/* <div className="w-full h-1/7 border-white/40 border-b-[1.2px] absolute z-[99] top-0" />
        <div className="w-1/12 h-full border-white/40 border-r-[1.2px] absolute z-[99] left-0" />
        <div className="w-1/12 h-full border-white/40 border-l-[1.2px] absolute z-[99] right-0" />
        <div className="w-full h-1/7 border-white/40 border-t-[1.2px] absolute z-[99] bottom-0" /> */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoUrl} type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className={cn("relative", className)}>{children}</div>
      </div>

      <SpinningText
        reverse
        className="text-lg font-light text-white absolute bottom-[200px] right-[180px] z-[99]"
        duration={30}
        radius={6}
      >
        learn more • earn more • grow more •
      </SpinningText>
    </section>
  );
}
