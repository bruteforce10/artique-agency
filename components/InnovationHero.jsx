"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { useNavbarSection } from "./NavbarContext";

export default function InnovationHero({ title, description }) {
  const sectionRef = useNavbarSection("innovation", false);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-32"
    >
      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-full "
          >
            <h1 className="text-3xl md:text-4xl text-center lg:text-left lg:text-5xl font-bold text-gray-800 leading-[1.1] tracking-tight">
              {title || "DRIVING INNOVATION & BUILDING CONNECTIONS"}
            </h1>
            <div className="absolute max-lg:hidden inset-0 blur-[1px] opacity-10 -bottom-32 rotate-180 ">
              <Image
                src="/element-dotted-2.avif"
                alt="Dotted pattern background"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          </motion.div>

          {/* Right Side - Body Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6 sm:space-y-8"
            >
              <p className="text-gray-700 max-lg:text-center text-sm sm:text-base lg:text-lg leading-relaxed">
                {description ||
                  "At Artique, we specialize in crafting impactful strategies and executing high level projects across various industries, from startup challenges to global brand expansions, our expertise spans event management, strategic partnerships, and marketing outreach. <br /> <br /> With a proven track record of success, we have collaborated with world renowned organizations to drive innovation and business growth. Let's explore our key projects and discover how we bring visions to life through creativity, strategy, and execution."}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
