"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * WhyChooseUs section with:
 * - Parallax background image that moves slower than scroll
 * - Overlayed content and glassmorphism info cards
 */
export default function WhyChooseUs({
  className,
  backgroundImage = "/bg.webp",
}) {
  const sectionRef = useRef(null);

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
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left copy (parallax) */}
          <motion.div style={{ y: yLeft, willChange: "transform" }}>
            <div className="flex items-center gap-2 text-white/80 text-xs tracking-widest uppercase">
              <span className="inline-block w-2.5 h-2.5 bg-yellow-400 rounded-sm" />{" "}
              About
            </div>
            <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-yellow-400 leading-tight">
              WHY CHOOSE US?
            </h2>
            <p className="mt-6 text-white/85 leading-relaxed text-base sm:text-lg max-w-2xl">
              Artique collaborates with clients from various countries,
              including Spain, Japan, China, Indonesia, and Malaysia, while
              overseeing projects in six cities: Tokyo, Jakarta, Bali, Malang,
              Bandung, Yogyakarta, and Kuala Lumpur. We are also managing
              campaigns for clients across Indonesia, Singapore, Japan,
              Malaysia, Vietnam, and Thailand. Our team is known for its
              creative and strategic approach, excelling in both commercially
              driven projects and outstanding activations.
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

          {/* Right cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 lg:mt-0">
            {[
              {
                title: "Regional Expertise",
                desc: "Deep understanding of Southeast Asian markets to craft culturally resonant work.",
              },
              {
                title: "Integrated Strategy",
                desc: "From brand to activation, we combine creativity with measurable outcomes.",
              },
              {
                title: "Trusted by Brands",
                desc: "Long-term partnerships built on reliability, quality, and agility.",
              },
              {
                title: "Borderless Execution",
                desc: "Multi-city presence enabling seamless cross-country campaign rollouts.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className={cn(
                  "relative rounded-2xl p-5 sm:p-6 min-h-[150px]",
                  "bg-white/10 border border-white/20 backdrop-blur-md",
                  "text-white shadow-[0_8px_30px_rgb(0,0,0,0.25)]",
                  i % 2 === 1 ? "sm:mt-8" : ""
                )}
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/20 via-white/0 to-transparent pointer-events-none" />
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
