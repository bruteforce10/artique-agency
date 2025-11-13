"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { Button } from "@/components/ui/button";

const artiqueServices = [
  {
    id: 1,
    title: "Event Planning",
    description:
      "Our mission is to help enterprises, brands, and thought leaders flourish and become trendsetters, transforming their products and companies into beloved brands within the market.",
  },
  {
    id: 2,
    title: "Marketing Consultant",
    description:
      "At Artique, we specialize in creating effective marketing strategies that set your brand apart in a competitive market. Our services include thorough research and A/B testing to ensure campaign success. As your marketing consultants, we develop tailored strategies that resonate with your audience, turning your vision into impactful results. Partner with Artique to enhance your brand's presence and performance.",
  },
  {
    id: 3,
    title: "Expansion Consultant",
    description:
      "At Artique, we leverage our global expertise combined with a localized understanding of each region to empower our clients in expanding their business effectively. Our approach encompasses the establishment of robust databases and strategic partnerships, equipping our clients to identify and engage with distributors, clients, and customers beyond their domestic markets.",
  },
  {
    id: 4,
    title: "Corporate Event Organising",
    description:
      "At Artique, we specialize in organizing events for B2B and B2C clients, delivering strategic content that enhances executive presentations and invitations. Our goal is to support your sales and marketing efforts, creating engaging experiences that drive business success. Let us help make your next event a success.",
  },
  {
    id: 5,
    title: "Representative Team",
    description:
      "At Artique, we believe that creativity has no bounds, and we are committed to helping our clients unlock the full potential of their ideas. We work closely with them to bring their vision to life, providing guidance, support, and expertise every step of the way.",
  },
  {
    id: 6,
    title: "Creative Team",
    description:
      "Our creative team crafts visually stunning and engaging content to captivate and engage your target audience. We offer seamless digital campaign and event management services, ensuring the smooth execution of your campaigns and events, leaving no room for hiccups.",
  },
  {
    id: 7,
    title: "Market Research",
    description:
      "Market research is essential for understanding consumer behavior, trends, and demographics in Southeast Asia and emerging markets. Our team conducts thorough market research to help our clients develop effective marketing strategies tailored to the specific needs of their target audience.",
  },
  {
    id: 8,
    title: "Digital Marketing",
    description:
      "We offer paid media digital marketing services, using digital platforms for advertising, social media marketing, content creation, SEO, and PPC campaigns to reach your target audience in Southeast Asia and emerging markets.",
  },
  {
    id: 9,
    title: "Influencer Marketing",
    description:
      "Influencer marketing is a popular strategy in Southeast Asia and emerging markets. Our team collaborates with local influencers with a significant following to promote your campaigns or services.",
  },
  {
    id: 10,
    title: "Local Partnership",
    description:
      "At Artique, we believe that creativity has no bounds, and we are committed to helping our clients unlock the full potential of their ideas. We work closely with them to bring their vision to life, providing guidance, support, and expertise every step of the way.",
  },
  {
    id: 11,
    title: "Data Analytics",
    description:
      "At Artique, we recognize the power of data in today's creative landscape. Our data analytics service transforms raw data into valuable insights, helping clients make informed decisions and refine their strategies. By blending creativity with data-driven analysis, we uncover trends, predict outcomes, and optimize performance, ensuring every project exceeds expectations.",
  },
  {
    id: 12,
    title: "Post Event Analysis",
    description:
      "We provide post-event analysis to gauge the success of each event. We collect participant feedback, measure key performance indicators, and provide comprehensive event reports, helping you fine-tune future events.",
  },
];

const ServicesSection = () => {
  const ctaRef = useRef(null);
  const isInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <>
      <section className="w-full py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase mb-4">
              <span className="inline-block w-2.5 h-2.5 bg-yellow-400 rounded-sm animate-pulse" />
              Our Services
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
              Services
            </h1>
          </div>

          {/* Services Grid */}
          <div className="space-y-12">
            {artiqueServices.map((service, index) => {
              const isOdd = service.id % 2 === 1;
              const imagePath = `/services/${service.id}.webp`;

              return (
                <div
                  key={service.id}
                  className="relative w-full rounded-2xl sm:h-[350px] overflow-hidden border-b border-white/30 last:border-b-0"
                >
                  {/* Background Image with Grayscale and Blur Effect */}
                  <div className="absolute inset-0">
                    <Image
                      src={imagePath}
                      alt={service.title}
                      fill
                      className="object-cover grayscale"
                      sizes="100vw"
                      priority={index < 2}
                    />
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/50" />
                  </div>

                  {/* Content Container */}
                  <div className="relative h-full flex flex-col sm:flex-row items-center justify-center">
                    {/* Mobile Layout: Stacked */}
                    <div className="w-full sm:hidden flex flex-col items-center justify-center  h-full">
                      {/* Title Section - Mobile */}
                      <div className="sm:flex-1 flex items-center justify-center p-8">
                        <h2 className="text-3xl font-bold text-white text-center leading-tight px-4">
                          {service.title.toUpperCase()}
                        </h2>
                      </div>

                      {/* Description Section - Mobile */}
                      <div className="p-6">
                        <p className="text-white text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Desktop Layout: Side by Side */}
                    {/* Left Side - Description (ganjil) or Title (genap) */}
                    <div className="hidden sm:flex flex-1 h-full items-center justify-center p-8 lg:p-12 xl:p-16">
                      {isOdd ? (
                        // Ganjil: Description on left
                        <div className="p-6 lg:p-8 xl:p-10 max-w-lg w-full">
                          <p className="text-white text-base lg:text-lg leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      ) : (
                        // Genap: Title on left
                        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                          {service.title.toUpperCase()}
                        </h2>
                      )}
                    </div>

                    {/* Right Side - Title (ganjil) or Description (genap) */}
                    <div className="hidden sm:flex flex-1 h-full items-center justify-center p-8 lg:p-12 xl:p-16">
                      {isOdd ? (
                        // Ganjil: Title on right
                        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight text-right">
                          {service.title.toUpperCase()}
                        </h2>
                      ) : (
                        // Genap: Description on right
                        <div className="p-6 lg:p-8 xl:p-10 max-w-lg w-full">
                          <p className="text-white text-base lg:text-lg leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden"
      >
        {/* Background Yellow */}
        <div className="absolute inset-0 bg-[#FFD800]" />

        {/* Dotted Element Overlay */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/element-dotted.webp"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center space-y-8">
            {/* Text */}
            <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 max-w-4xl">
              GET AN ESTIMATE FOR YOUR UPCOMING PROJECT
            </h2>

            {/* Button with Slide-up Animation */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Button
                className="bg-black text-[#FFD800] hover:bg-gray-900 px-8 py-6 text-base sm:text-lg font-semibold rounded-md uppercase tracking-wide transition-colors"
                size="lg"
              >
                CONTACT
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
