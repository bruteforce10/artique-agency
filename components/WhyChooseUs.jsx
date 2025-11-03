"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import { useNavbarSection } from "./NavbarContext";

/**
 * WhyChooseUs section with:
 * - Parallax background image that moves slower than scroll
 * - Overlayed content and glassmorphism info cards
 */
export default function WhyChooseUs({
  className,
  backgroundImage = "/bg.webp",
}) {
  const sectionRef = useNavbarSection("why-choose-us", true);

  // Responsive breakpoints + reduced-motion
  const [bp, setBp] = useState("lg");
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setBp(w < 640 ? "sm" : w < 1024 ? "md" : "lg");
    };
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(rm.matches);
    rm.addEventListener?.("change", (e) => setReduced(e.matches));
    compute();
    window.addEventListener("resize", compute, { passive: true });
    return () => window.removeEventListener("resize", compute);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Parallax ranges by breakpoint
  const rangeBg = reduced
    ? [0, 0]
    : bp === "sm"
    ? [-80, 80]
    : bp === "md"
    ? [-160, 160]
    : [-240, 240];
  const rangeLeft = reduced
    ? [0, 0]
    : bp === "sm"
    ? [60, -80]
    : bp === "md"
    ? [120, -180]
    : [200, -300];
  const scaleRange = reduced
    ? [1, 1]
    : bp === "sm"
    ? [1.04, 1.1]
    : bp === "md"
    ? [1.06, 1.14]
    : [1.08, 1.18];

  const y = useTransform(scrollYProgress, [0, 1], rangeBg);
  const yLeft = useTransform(scrollYProgress, [0, 1], rangeLeft);
  const scaleBg = useTransform(scrollYProgress, [0, 1], scaleRange);

  return (
    <section
      ref={sectionRef}
      className={cn("relative w-full overflow-hidden mt-24", className)}
    >
      {/* Parallax background using Motion */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          y,
          scale: scaleBg,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 -z-10 bg-black/55" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-24 sm:py-28 lg:py-32">
        {/* Left copy (parallax) */}
        <motion.div style={{ y: yLeft, willChange: "transform" }}>
          <div className="flex items-center gap-2 text-white/80 text-xs tracking-widest uppercase">
            <span className="inline-block w-2.5 h-2.5 bg-yellow-400 rounded-sm animate-pulse" />{" "}
            About
          </div>
          <h2 className="mt-4 text-4xl sm:text-5xl font-semibold text-yellow-400 tracking-tight">
            Why Choose Us?
          </h2>
          <p className="mt-6 text-white/85 leading-relaxed text-base max-w-2xl">
            Artique collaborates with clients from various countries, including
            Spain, Japan, China, Indonesia, and Malaysia, while overseeing
            projects in six cities: Tokyo, Jakarta, Bali, Malang, Bandung,
            Yogyakarta, and Kuala Lumpur. We are also managing campaigns for
            clients across Indonesia, Singapore, Japan, Malaysia, Vietnam, and
            Thailand. Our team is known for its creative and strategic approach,
            excelling in both commercially driven projects and outstanding
            activations.
          </p>

          <a
            href="#learn-more"
            className="inline-flex items-center gap-3 mt-8 text-sm font-bold uppercase tracking-wider bg-yellow-400 text-gray-900 px-5 py-3 rounded-full border-2 border-yellow-300 hover:bg-yellow-300 transition-colors"
          >
            Learn more
            <span className="inline-flex w-7 h-7 items-center justify-center bg-gray-900 text-yellow-400 rounded-md">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
