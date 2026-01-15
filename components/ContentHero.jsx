"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function ContentHero({ title, description }) {
  const locale = useLocale();

  const displayTitle = title;
  const displayDescription = description;

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
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/85  mb-4 sm:mb-6 leading-tight "
          >
            {displayTitle}
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
                {locale === "id" ? "Mulai" : "Get started"}
                <ArrowUpRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
