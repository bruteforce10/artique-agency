"use client";
import React from "react";

const AboutSection = () => {
  return (
    <section className="-mt-6 relative z-[50] rounded-3xl bg-white pt-20 w-full">
      <div className="w-24 h-1 inset-x-0 mx-auto absolute top-4 bg-gray-300 rounded-full" />

      <div className="max-w-5xl mx-auto w-full px-6 sm:px-8">
        <div className="text-center">
          <span className="text-sm text-gray-400 tracking-wider">About</span>
        </div>

        {/* hero-like heading: big, stacked, mixed-weight/colors */}
        <h3 className="mt-6 text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
          <span className="block">
            We offer a great golf{" "}
            <span className="text-gray-400 font-light">experience</span>
          </span>
        </h3>

        {/* description — large, light-gray, centered and constrained width */}
        <div className="mt-6">
          <p className="mx-auto text-center text-lg sm:text-xl text-gray-500 font-light max-w-3xl leading-relaxed">
            for all skill levels, with a top course, scenic views, and simple
            booking.{" "}
            <span className="font-semibold text-gray-800">
              Whether for fun or growth,
            </span>{" "}
            a memorable golf experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
