"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function ContentHero() {
  return (
    <section className="w-full">
      {/* Content */}
      <div className="w-full">
        <div className="text-center lg:text-left">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white/85  mb-4 sm:mb-6 leading-tight font-extralight">
            <i className="font-sentient tracking-[-5] font-normal">The Art </i>{" "}
            of Unlocking <br /> Success{" "}
            <span className="font-bold tracking-[-2]">Beyond Borders</span>
          </h1>

          {/* Description */}
          <p className="text-white/80 sm:text-md  mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 px-4 sm:px-0">
            At Artique, we believe that creativity has no bounds, and we are
            committed to helping our clients unlock the full potential of their
            ideas. We work closely with them to bring their vision to life,
            providing guidance, support, and expertise every step of the way.
          </p>

          {/* CTA Button */}
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <Button
              size="lg"
              className="bg-primary/90 border-orange-200 border-[2px] backdrop-blur-sm text-gray-800 px-8 hover:border-amber-50 hover:bg-gray-100 sm:text-lg font-bold rounded-full group w-full sm:w-auto uppercase"
            >
              Get started
              <ArrowUpRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
