"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function ContentHero({ title, description }) {
  const locale = useLocale();

  // Fallback values if props are not provided
  const defaultTitle = "The Art of Unlocking Success Beyond Borders";
  const defaultDescription =
    "At Artique, we believe that creativity has no bounds, and we are committed to helping our clients unlock the full potential of their ideas. We work closely with them to bring their vision to life, providing guidance, support, and expertise every step of the way.";

  const displayTitle = title || defaultTitle;
  const displayDescription = description || defaultDescription;

  // Parse title based on locale and data from GraphQL
  let firstPart = "The Art";
  let middlePart = "of Unlocking Success";
  let lastPart = "Beyond Borders";

  if (locale === "id") {
    // Format untuk bahasa Indonesia - parse dari data GraphQL
    // Format: "Seni Batas Menuju Kesuksesan" -> firstPart: "Seni", middlePart: "Batas", lastPart: "Menuju Kesuksesan"
    if (displayTitle) {
      const words = displayTitle.split(" ");

      if (words.length >= 3) {
        // Split menjadi 3 bagian
        firstPart = words[0] || "Seni";
        middlePart = words[1] || "Batas";
        lastPart = words.slice(2).join(" ") || "Menuju Kesuksesan";
      } else if (words.length === 2) {
        firstPart = words[0] || "Seni";
        middlePart = words[1] || "Batas";
        lastPart = "";
      } else if (words.length === 1) {
        firstPart = displayTitle;
        middlePart = "";
        lastPart = "";
      }
    }
  } else {
    // Format untuk bahasa Inggris - parse dari data
    if (displayTitle && displayTitle.includes(" of ")) {
      const parts = displayTitle.split(" of ");
      firstPart = parts[0] || "The Art";
      const rest = parts.slice(1).join(" of ");

      if (rest.includes("Beyond Borders")) {
        const beforeBeyond = rest.split(" Beyond Borders")[0].trim();
        middlePart = beforeBeyond
          ? `of ${beforeBeyond}`
          : "of Unlocking Success";
        lastPart = "Beyond Borders";
      } else {
        middlePart = `of ${rest}`;
        lastPart = "";
      }
    } else if (displayTitle) {
      // If no " of " found, use the whole title
      firstPart = displayTitle;
      middlePart = "";
      lastPart = "";
    }
  }

  return (
    <section className="w-full">
      {/* Content */}
      <div className="w-full">
        <div className="text-center lg:text-left">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl text-white/85  mb-4 sm:mb-6 leading-tight font-extralight"
          >
            <i className="font-sentient tracking-[-5] font-normal">
              {firstPart}{" "}
            </i>{" "}
            {lastPart ? (
              <>
                {middlePart} <br />{" "}
                <span className="font-bold tracking-[-2]">{lastPart}</span>
              </>
            ) : (
              middlePart || displayTitle
            )}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/80 text-md mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 px-4 sm:px-0 leading-relaxed"
          >
            {displayDescription}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/projects">
              <Button
                size="lg"
                className="bg-primary/90 border-orange-200 border-[2px] backdrop-blur-sm text-gray-800 px-8 hover:border-amber-50 hover:bg-gray-100 sm:text-lg font-bold rounded-full group w-full sm:w-auto uppercase"
              >
                Get started
                <ArrowUpRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
