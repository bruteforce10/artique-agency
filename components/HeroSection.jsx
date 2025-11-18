"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import { useNavbarSection } from "./NavbarContext";
import ButtonArrow from "./ui/ButtonArrow";

/**
 * HeroSection component dengan:
 * - Parallax background image yang bergerak lebih lambat dari scroll
 * - Overlayed content dengan badge, title, description, dan optional button
 * - Fully customizable dengan props
 */
export default function HeroSection({
  sectionId,
  className,
  backgroundImage = "/bg.webp",
  badge,
  title,
  titleAs = "h2",
  description,
  button,
  contentClassName,
  overlayOpacity = "55",
  parallaxConfig,
  children,
}) {
  const navbarSectionRef = useNavbarSection(sectionId, true);
  const scrollRef = useRef(null);

  const setRefs = useCallback(
    (node) => {
      if (navbarSectionRef) {
        navbarSectionRef(node);
      }
      scrollRef.current = node;
    },
    [navbarSectionRef]
  );

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

  // useScroll dengan ref object
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  // Parallax ranges by breakpoint (customizable via props)
  const defaultParallaxConfig = {
    rangeBg: {
      sm: [-80, 80],
      md: [-160, 160],
      lg: [-240, 240],
    },
    rangeContent: {
      sm: [60, -80],
      md: [120, -180],
      lg: [200, -300],
    },
    scaleRange: {
      sm: [1.04, 1.2],
      md: [1.06, 1.21],
      lg: [1.08, 1.18],
    },
  };

  // Merge parallaxConfig with defaults to allow partial overrides
  const config = {
    rangeBg: {
      ...defaultParallaxConfig.rangeBg,
      ...(parallaxConfig?.rangeBg || {}),
    },
    rangeContent: {
      ...defaultParallaxConfig.rangeContent,
      ...(parallaxConfig?.rangeContent || {}),
    },
    scaleRange: {
      ...defaultParallaxConfig.scaleRange,
      ...(parallaxConfig?.scaleRange || {}),
    },
  };

  const rangeBg = reduced
    ? [0, 0]
    : bp === "sm"
    ? config.rangeBg.sm
    : bp === "md"
    ? config.rangeBg.md
    : config.rangeBg.lg;

  const rangeLeft = reduced
    ? [0, 0]
    : bp === "sm"
    ? config.rangeContent.sm
    : bp === "md"
    ? config.rangeContent.md
    : config.rangeContent.lg;

  const scaleRange = reduced
    ? [1, 1]
    : bp === "sm"
    ? config.scaleRange.sm
    : bp === "md"
    ? config.scaleRange.md
    : config.scaleRange.lg;

  const y = useTransform(scrollYProgress, [0, 1], rangeBg);
  const yLeft = useTransform(scrollYProgress, [0, 1], rangeLeft);
  const scaleBg = useTransform(scrollYProgress, [0, 1], scaleRange);

  const TitleTag = titleAs;

  return (
    <section
      ref={setRefs}
      className={cn("relative w-full min-h-[500px] overflow-hidden", className)}
    >
      {/* Parallax background using Motion */}
      <motion.div
        className="absolute inset-0 -z-10 min-h-full"
        style={{
          y,
          scale: scaleBg,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          willChange: "transform",
        }}
      />

      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0 -z-[9]"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${parseInt(overlayOpacity) / 100})`,
        }}
      />

      <div
        className={cn(
          "max-w-6xl mx-auto px-6 sm:px-8 py-24 sm:py-28 lg:py-42",
          contentClassName
        )}
      >
        {/* Content (parallax) */}
        <motion.div style={{ y: yLeft, willChange: "transform" }}>
          {badge && (
            <div className="flex items-center gap-2 text-white/80 text-xs tracking-widest uppercase">
              <span className="inline-block w-2.5 h-2.5 bg-yellow-400 rounded-sm animate-pulse" />{" "}
              {badge}
            </div>
          )}

          {title && (
            <TitleTag
              className={cn(
                "font-semibold text-yellow-400 tracking-tight",
                badge ? "mt-4" : "",
                titleAs === "h1"
                  ? "text-4xl sm:text-5xl lg:text-6xl"
                  : "text-4xl sm:text-5xl"
              )}
            >
              {title}
            </TitleTag>
          )}

          {description && (
            <p className="mt-6 max-sm:text-sm mb-12 text-white/85 leading-relaxed text-base max-w-2xl">
              {description}
            </p>
          )}

          {button && <ButtonArrow href={button.href} text={button.text} />}

          {children}
        </motion.div>
      </div>
    </section>
  );
}
