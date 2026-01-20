"use client";

import React, { useState } from "react";
import Image from "next/image";
import CTASection from "./CTASection";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const ServicesSection = ({ listServices }) => {
  const [selectedService, setSelectedService] = useState(null);

  console.log(listServices);

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
      <section className="w-full py-16 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Services Grid - cards like reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {artiqueServices.map((service, index) => {
              const imageUrl =
                service.image?.url || `/services/${service.id}.webp`;

              return (
                <div
                  key={service.id}
                  className="group relative shadow-lg w-full aspect-[4/3] min-h-[220px] sm:min-h-[260px] rounded-xl sm:rounded-2xl overflow-hidden"
                >
                  {/* Background Image + 45% black overlay */}
                  <div className="absolute inset-0">
                    <Image
                      src={imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover grayscale"
                      sizes="(max-width: 840px) 100vw, (max-width: 1024px) 150vw, 33vw"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-black/45" />
                  </div>

                  {/* Card content: title + learn more */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white uppercase leading-tight mb-4 drop-shadow-sm">
                      {service.title}
                    </h2>
                    <button
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className="text-white text-sm sm:text-base underline underline-offset-2 hover:opacity-90 transition-opacity"
                    >
                      Learn more
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service detail Dialog (gambar 2) */}
      <Dialog
        open={!!selectedService}
        onOpenChange={(open) => !open && setSelectedService(null)}
      >
        <DialogContent
          className="p-0 w-[calc(100%-2rem)] max-w-3xl sm:max-w-4xl sm:w-full lg:max-w-5xl xl:max-w-6xl border-0 bg-transparent overflow-hidden rounded-xl sm:rounded-2xl"
        >
          {selectedService && (
            <div className="relative min-h-[360px] sm:min-h-[420px] lg:min-h-[480px]">
              {/* Background: image + grayscale + 45% black overlay */}
              <Image
                src={
                  selectedService.image?.url ||
                  `/services/${selectedService.id}.webp`
                }
                alt={selectedService.title}
                fill
                className="object-cover grayscale"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 896px, (max-width: 1280px) 1024px, 1152px"
              />
              <div className="absolute inset-0 bg-black/45" />

              {/* Content: title (left) + description (right) - stacked on mobile */}
              <div className="relative flex flex-col sm:flex-row min-h-[360px] sm:min-h-[420px] lg:min-h-[480px]">
                {/* Title - left on desktop, top on mobile */}
                <div className="flex-1 flex items-center justify-center sm:justify-end p-6 sm:p-8 lg:p-10 xl:p-12">
                  <DialogTitle className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white uppercase leading-tight text-center sm:text-right">
                    {selectedService.title}
                  </DialogTitle>
                </div>
                {/* Description - right on desktop, below on mobile */}
                <div className="flex-1 flex items-center p-6 sm:p-8 lg:p-10 xl:p-12 pt-0 sm:pt-8 ">
                  <DialogDescription className="text-white text-base sm:text-lg leading-relaxed">
                    {selectedService.description}
                  </DialogDescription>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <CTASection />
    </>
  );
};

export default ServicesSection;
