"use client";

import React from "react";
import Image from "next/image";
import CTASection from "./CTASection";

const ServicesSection = ({ listServices }) => {
  // Use data from API if available, otherwise fallback to empty array
  const artiqueServices =
    listServices && Array.isArray(listServices) && listServices.length > 0
      ? listServices.map((service, index) => ({
          id: index + 1,
          title: service.title || `Service ${index + 1}`,
          description: service.description || "",
          image: service.image || { url: `/services/${index + 1}.webp` },
        }))
      : [];

  // Don't render if no services available
  if (!artiqueServices || artiqueServices.length === 0) {
    return null;
  }

  return (
    <>
      <section className="w-full py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Services - full-width blocks, alternating layout */}
          <div className="space-y-12">
            {artiqueServices.map((service, index) => {
              const isOdd = service.id % 2 === 1;
              const imageUrl =
                service.image?.url || `/services/${service.id}.webp`;

              return (
                <div
                  key={service.id}
                  className="relative w-full rounded-2xl sm:h-[350px] overflow-hidden border-b border-white/30 last:border-b-0"
                >
                  {/* Background Image with Grayscale */}
                  <div className="absolute inset-0">
                    <Image
                      src={imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority={index < 2}
                    />
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/50" />
                  </div>

                  {/* Content Container */}
                  <div className="relative h-full flex flex-col sm:flex-row items-center justify-center">
                    {/* Mobile Layout: Stacked */}
                    <div className="w-full sm:hidden flex flex-col items-center justify-center h-full">
                      <div className="sm:flex-1 flex items-center justify-center p-8">
                        <h2 className="text-3xl font-bold text-white text-center leading-tight px-4">
                          {service.title.toUpperCase()}
                        </h2>
                      </div>
                      <div className="p-6">
                        <p className="text-white text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Desktop Layout: Side by Side */}
                    <div className="hidden sm:flex flex-1 h-full items-center justify-center p-8 lg:p-12 xl:p-16">
                      {isOdd ? (
                        <div className="p-6 lg:p-8 xl:p-10 max-w-lg w-full">
                          <p className="text-white text-base lg:text-lg leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      ) : (
                        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                          {service.title.toUpperCase()}
                        </h2>
                      )}
                    </div>

                    <div className="hidden sm:flex flex-1 h-full items-center justify-center p-8 lg:p-12 xl:p-16">
                      {isOdd ? (
                        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight text-right">
                          {service.title.toUpperCase()}
                        </h2>
                      ) : (
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
      <CTASection />
    </>
  );
};

export default ServicesSection;
