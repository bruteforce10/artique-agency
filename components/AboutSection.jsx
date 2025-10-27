"use client";
import React from "react";
import { CardAbout } from "./CardAbout";

const AboutSection = () => {
  const cardData = [
    {
      title: "MISSION",
      description:
        "Our mission is to help enterprises, brands, and thought leaders flourish and become trendsetters, transforming their products and companies into beloved brands within the market.",
      image: 2,
    },
    {
      title: "GOALS",
      description:
        "At Artique, we believe that creativity has no bounds, and we are committed to helping our clients unlock the full potential of their ideas. We work closely with them to bring their vision to life, providing guidance, support, and expertise every step of the way.",
      image: 1,
    },

    {
      title: "EXPERTISE",
      description:
        "Our expertise lies in the vibrant and dynamic Southeast Asian markets, where we have a deep understanding of the cultural nuances and business landscape. We infuse this knowledge into our strategies, creating works that resonate with the local audiences and deliver impactful results.",
      image: 3,
    },
  ];

  return (
    <section className="-mt-6 relative z-[50] rounded-3xl bg-white pt-20 w-full">
      <div className="w-24 h-1 inset-x-0 mx-auto absolute top-4 bg-gray-300 rounded-full" />

      <div className="max-w-5xl mx-auto w-full px-6 sm:px-8">
        <div className="text-center">
          <span className="text-sm text-gray-400 tracking-wider">About</span>
        </div>

        {/* description — large, light-gray, centered and constrained width */}
        <div className="mt-6">
          <p className="mx-auto text-right text-lg sm:text-2xl text-gray-500 font-light max-w-3xl leading-relaxed">
            At <span className="font-bold text-gray-800">Artique</span>, we
            believe that{" "}
            <span className="font-bold text-gray-800">
              creativity has no bounds
            </span>
            , and{" "}
            <span className="font-bold text-gray-800">
              we are committed to helping our clients unlock the full potential
              of their ideas.
            </span>{" "}
            <span className="font-bold text-gray-800">We work closely</span>{" "}
            with them to bring{" "}
            <span className="font-bold text-gray-800">
              their vision to life
            </span>
            , providing{" "}
            <span className="font-bold text-gray-800">
              guidance, support, and expertise
            </span>{" "}
            every step of the way.
          </p>
        </div>

        <div className="mt-36 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((card, index) => {
            let marginClass = "";
            if (index === 0) marginClass = "mt-0";
            else if (index === 1) marginClass = "-mt-10";
            else if (index === 2) marginClass = "-mt-20";

            return (
              <CardAbout
                key={index}
                title={card.title}
                description={card.description}
                image={card.image}
                className={marginClass}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
