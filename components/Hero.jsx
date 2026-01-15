"use client";
import { cn } from "@/lib/utils";
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
          "relative h-[400px]  sm:min-h-[calc(80vh-3.5rem)] z-[2] flex flex-col justify-center w-full "
        )}
      >
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
    </section>
  );
}
