"use client";

import Image from "next/image";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import { Marquee } from "@/components/ui/marquee";
import { useNavbarSection } from "./NavbarContext";
import { useLocale } from "next-intl";

export default function PartnerSection({ partners: partnersData }) {
  const locale = useLocale();
  const sectionRef = useNavbarSection("partners", false);

  // Use data from API if available, otherwise fallback to empty array
  const partnerLogos =
    partnersData && Array.isArray(partnersData) && partnersData.length > 0
      ? partnersData.map((partner, index) => ({
          id: index + 1,
          src: partner.url,
        }))
      : [];

  return (
    <section
      ref={sectionRef}
      className="relative bg-primary w-full overflow-hidden"
    >
      <div className="absolute inset-x-0 top-36">
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <ScrollVelocityContainer>
            <ScrollVelocityRow baseVelocity={10} direction={1}>
              <div className="text-6xl font-extrabold opacity-40 uppercase tracking-tight">
                <svg
                  className="h-45 w-full"
                  viewBox="0 0 620 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="transparent"
                    stroke="black"
                    strokeWidth="0.6"
                    fontSize="80"
                    fontFamily="Helvetica, Arial, sans-serif"
                    fontWeight="900"
                    letterSpacing="0"
                  >
                    PARTNERS OUR
                  </text>
                </svg>
              </div>
            </ScrollVelocityRow>
          </ScrollVelocityContainer>
          <div className="from-primary pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
          <div className="from-primary pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-24 relative z-2">
        <h3 className="text-4xl sm:text-5xl font-bold text-gray-800 tracking-tight mb-12">
          {locale === "id" ? "Partner Kami" : "Our Partners"}
        </h3>

        <Marquee pauseOnHover className="[--duration:30s]">
          {partnerLogos.map((logo) => (
            <div key={logo.id} className="group relative mx-4 flex-shrink-0">
              {/* Glassmorphism Card */}
              <div className="relative rounded-2xl p-6 sm:p-8 bg-white/1 border border-white backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer h-[150px] sm:h-[180px] w-[200px] sm:w-[240px] flex items-center justify-center">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-yellow-400/0 group-hover:bg-yellow-400/10 blur-xl transition-all duration-300" />
                {/* Gradient border */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-yellow-400/20 via-transparent to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Partner Logo */}
                <div className="relative z-10 w-full h-20 flex items-center justify-center filter grayscale group-hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={logo.src}
                    alt={`Partner logo ${logo.id}`}
                    width={120}
                    height={60}
                    className="object-contain max-h-32"
                  />
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
