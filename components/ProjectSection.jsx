"use client";

import { motion } from "motion/react";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import { useNavbarSection } from "./NavbarContext";
import ButtonArrow from "./ui/ButtonArrow";
import { useLocale } from "next-intl";

export default function ProjectSection({ clients: clientsData }) {
  const locale = useLocale();
  const sectionRef = useNavbarSection("projects", false);

  // Use data from API if available, otherwise fallback to empty array
  const displayClients =
    clientsData && Array.isArray(clientsData) && clientsData.length > 0
      ? clientsData.map((client, index) => ({
          name: `Client ${index + 1}`,
          logo: client.url,
        }))
      : [];

  return (
    <section
      ref={sectionRef}
      className="relative bg-neutral-200 w-full overflow-hidden"
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
                    CLIENTS OUR
                  </text>
                </svg>
              </div>
            </ScrollVelocityRow>
          </ScrollVelocityContainer>
          <div className="from-neutral-200 pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
          <div className="from-neutral-200 pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-24 relative z-1">
        <h3 className="text-4xl sm:text-5xl font-bold text-gray-800 tracking-tight">
          {locale === "id" ? "Klien Kami" : "Our Clients"}
        </h3>

        {/* Client Logos Grid */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {displayClients.map((client, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.1, y: -10 }}
              className="group relative"
            >
              {/* Glassmorphism Card */}
              <div className="relative rounded-2xl p-6 sm:p-8 bg-white/1 border border-white backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer h-[150px] sm:h-[180px] flex items-center justify-center">
                {/* Glow effect on hover */}
                <motion.div className="absolute inset-0 rounded-2xl bg-yellow-400/0 group-hover:bg-yellow-400/10 blur-xl transition-all duration-300" />
                {/* Gradient border */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-yellow-400/20 via-transparent to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Client Logo */}
                <div className="relative z-10 w-full h-20 flex items-center justify-center filter grayscale group-hover:grayscale-0 transition-all duration-300">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="object-contain max-h-24 w-auto h-auto"
                    style={{ maxHeight: '96px' }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-sm sm:text-base mb-6">
            {locale === "id"
              ? "Diharapkan oleh merek terkemuka di Asia Tenggara"
              : "Trusted by leading brands across Southeast Asia"}
          </p>
          <ButtonArrow
            href="#contact"
            text={locale === "id" ? "Jadi Partner" : "Become a Partner"}
          />
        </motion.div>
      </div>
    </section>
  );
}
