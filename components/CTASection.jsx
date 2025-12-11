"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLocale } from "next-intl";
/**
 * CTASection component - reusable CTA section with yellow background
 */
export default function CTASection({
  className,
  title,
  buttonHref = "/contact",
  onClick,
}) {
  const ctaRef = useRef(null);
  const isInView = useInView(ctaRef, { once: true, margin: "-100px" });
  const locale = useLocale();

  return (
    <section
      ref={ctaRef}
      className={cn(
        "relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden",
        className
      )}
    >
      {/* Background Yellow */}
      <div className="absolute inset-0 bg-[#FFD800]" />

      {/* Dotted Element Overlay */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="/element-dotted.webp"
          alt=""
          className="object-cover w-full h-full"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          {/* Text */}
          <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 max-w-4xl">
            {title}
          </h2>

          {/* Button with Slide-up Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {buttonHref ? (
              <Button
                asChild
                className="bg-black text-[#FFD800] hover:bg-gray-900 px-8 py-6 text-base sm:text-lg font-semibold rounded-md uppercase tracking-wide transition-colors"
                size="lg"
              >
                <Link href={buttonHref}>
                  {locale === "id" ? "Kontak" : "Contact"}
                </Link>
              </Button>
            ) : (
              <Link href={buttonHref}>
                <Button
                  onClick={onClick}
                  className="bg-black text-[#FFD800] hover:bg-gray-900 px-8 py-6 text-base sm:text-lg font-semibold rounded-md uppercase tracking-wide transition-colors"
                  size="lg"
                >
                  {locale === "id" ? "Kontak" : "Contact"}
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
