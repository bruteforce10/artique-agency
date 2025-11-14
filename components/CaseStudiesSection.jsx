"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useNavbarSection } from "./NavbarContext";

const projects = [
  {
    name: "NTT Startup Challenge",
    image: "/project/ntt.webp",
    description:
      "Regional startup event terbesar di Asia Tenggara dengan 7.000+ peserta, diselenggarakan di Indonesia, Malaysia, dan Vietnam. Artique menangani perwakilan lokal, lead generation, kemitraan strategis, eksekusi event, serta media & social media management.",
  },
  {
    name: "Huawei & CXO Engine",
    image: "/project/huawei.webp",
    description:
      "Program eksklusif yang mendorong kolaborasi antar pemimpin industri untuk percepatan transformasi digital Indonesia. Artique mendukung pengembangan konsep, outreach mitra strategis, telemarketing, email marketing, dan eksekusi acara.",
  },
  {
    name: "Erspo",
    image: "/project/erspo.webp",
    description:
      "Brand sports & lifestyle terbaru dari ERIGO Group yang melakukan ekspansi ke Jepang. Artique membantu strategi penetrasi pasar melalui koneksi dengan klub sepak bola dan agensi hiburan Jepang serta mendukung eksekusi media & social media.",
  },
  {
    name: "Juventus",
    image: "/project/juventus.webp",
    description:
      "Representasi komersial Juventus di Asia Tenggara dengan fokus pada outreach C-Level executives di berbagai industri. Termasuk kampanye email, telemarketing strategis, dan koordinasi meeting 1:1 yang menghasilkan peluang bisnis bernilai tinggi.",
  },
  {
    name: "MM Partners",
    image: "/project/mmm.webp",
    description:
      "Agensi sports marketing terkemuka dari Spanyol yang mewakili klub besar seperti Real Madrid, Manchester United, dan Juventus. Artique bertindak sebagai perwakilan APAC dalam IP management, email outreach, meeting coordination, dan deal facilitation.",
  },
];

const CaseStudiesSection = () => {
  const sectionRef = useNavbarSection("case-studies", false);
  // Start at a high index so we can scroll forward infinitely
  const [currentIndex, setCurrentIndex] = useState(projects.length * 10);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [popupIndex, setPopupIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [shouldSkipAnimation, setShouldSkipAnimation] = useState(false);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  // Create many duplicates for seamless infinite scroll
  // We'll create enough duplicates so we can scroll continuously
  const createInfiniteArray = () => {
    const duplicates = 20; // Create 20 copies for smooth infinite scroll
    const result = [];
    for (let i = 0; i < duplicates; i++) {
      result.push(...projects);
    }
    return result;
  };

  const infiniteProjects = createInfiniteArray();

  // Track window width for responsive carousel
  useEffect(() => {
    const updateWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (selectedImage !== null) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Prevent body scroll
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        // Restore scroll position when popup closes
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [selectedImage]);

  // Auto-loop carousel - continues infinitely without jumping back
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          // If we're getting too far, reset to middle without animation
          if (prev >= projects.length * 18) {
            setShouldSkipAnimation(true);
            setTimeout(() => setShouldSkipAnimation(false), 100);
            return projects.length * 10;
          }
          return prev + 1;
        });
      }, 3000); // Change slide every 3 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, projects.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const handleImageClick = (index) => {
    // Convert infinite array index to real project index using modulo
    const realIndex = index % projects.length;
    setPopupIndex(realIndex);
    setSelectedImage(true);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  const handlePopupNavigation = (direction) => {
    if (direction === "next") {
      setPopupIndex((prev) => (prev + 1) % projects.length);
    } else {
      setPopupIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="max-w-6xl mx-auto px-6 sm:px-8 py-24"
      >
        <div className="space-y-2 mb-12">
          <div className="flex items-center gap-2 text-xs tracking-widest uppercase">
            <span className="inline-block w-2.5 h-2.5 bg-yellow-400 rounded-sm animate-pulse" />{" "}
            Recent Projects
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            Case Studies
          </h2>
          <button className="relative font-medium text-[17px] h-[2.4em] flex items-center overflow-hidden cursor-pointer group mt-12 bg-transparent border-none outline-none">
            <span className="mr-12 uppercase">More Projects</span>
            <div className="absolute right-[0.3em] bg-[#FFD800] h-[1.8em] w-[1.8em] rounded-[0.7em] flex items-center justify-center transition-all duration-300 group-hover:w-[calc(100%-0.3em)] active:scale-95">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="w-[1.1em] transition-transform duration-300 text-black group-hover:translate-x-[0.1em]"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                ></path>
              </svg>
            </div>
          </button>
        </div>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="relative w-full overflow-hidden sm:mx-0"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Carousel Track */}
          <div className="relative overflow-hidden w-full">
            <motion.div
              className="flex gap-0 sm:gap-4 lg:gap-6 will-change-transform"
              style={{
                width: windowWidth > 0 && windowWidth < 640 ? "100%" : "auto",
              }}
              animate={{
                x:
                  windowWidth === 0
                    ? 0
                    : windowWidth < 640
                    ? `-${currentIndex * 100}%`
                    : `-${
                        currentIndex *
                        (100 /
                          (windowWidth >= 1024
                            ? 3
                            : windowWidth >= 640
                            ? 2
                            : 1))
                      }%`,
              }}
              transition={
                shouldSkipAnimation
                  ? { duration: 0, ease: "linear" }
                  : { duration: 0.5, ease: "easeInOut" }
              }
            >
              {infiniteProjects.map((project, index) => {
                const offset = index - currentIndex;
                const isActive = offset === 0;
                // Di mobile (< 640px) selalu tampilkan 1 card
                const cardsPerView =
                  windowWidth === 0
                    ? 1
                    : windowWidth >= 1024
                    ? 3
                    : windowWidth >= 640
                    ? 2
                    : 1;

                const isMobile = windowWidth > 0 && windowWidth < 640;

                return (
                  <motion.div
                    key={`${project.name}-${index}`}
                    className="relative flex-shrink-0"
                    style={{
                      width: isMobile
                        ? "100%"
                        : `calc((100% - ${
                            (cardsPerView - 1) * 1.5
                          }rem) / ${cardsPerView})`,
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      // Di mobile, semua card yang terlihat harus opacity 1 dan scale 1
                      opacity: isMobile
                        ? Math.abs(offset) <= 1
                          ? 1
                          : 1
                        : Math.abs(offset) <= 1
                        ? 1
                        : 0.3,
                      scale: isMobile ? 1 : isActive ? 1 : 0.95,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    whileHover={
                      isMobile
                        ? {}
                        : {
                            scale: 1.05,
                            zIndex: 10,
                          }
                    }
                    onClick={() => handleImageClick(index)}
                  >
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer group">
                      {/* Image with parallax zoom effect - hanya di desktop */}
                      <motion.div
                        className="absolute inset-0"
                        whileHover={{
                          scale: 1.2,
                          transition: { duration: 0.6, ease: "easeOut" },
                        }}
                        style={{
                          pointerEvents:
                            windowWidth > 0 && windowWidth < 640
                              ? "none"
                              : "auto",
                        }}
                      >
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </motion.div>

                      {/* Overlay gradient - hidden di mobile, visible di desktop */}
                      <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Project name overlay - hidden di mobile, visible di desktop */}
                      <motion.div
                        className="hidden sm:block absolute bottom-0 left-0 right-0 p-6 text-white"
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-xl sm:text-2xl font-bold mb-2">
                          {project.name}
                        </h3>
                      </motion.div>

                      {/* Expand icon - hidden di mobile, visible di desktop */}
                      <motion.div
                        className="hidden sm:flex absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Maximize2 className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => {
              setCurrentIndex((prev) => {
                // If we're getting too low, reset to middle without animation
                if (prev <= projects.length * 2) {
                  setShouldSkipAnimation(true);
                  setTimeout(() => setShouldSkipAnimation(false), 100);
                  return projects.length * 10;
                }
                return prev - 1;
              });
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              setCurrentIndex((prev) => {
                // If we're getting too far, reset to middle without animation
                if (prev >= projects.length * 18) {
                  setShouldSkipAnimation(true);
                  setTimeout(() => setShouldSkipAnimation(false), 100);
                  return projects.length * 10;
                }
                return prev + 1;
              });
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => {
              // Calculate real index for dots using modulo
              const realIndex = currentIndex % projects.length;
              const isActive = index === realIndex;

              return (
                <button
                  key={index}
                  onClick={() => {
                    // Jump to corresponding position in middle of infinite array
                    setCurrentIndex(projects.length * 10 + index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive ? "bg-yellow-400 w-8" : "bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Full Screen Popup */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center overflow-hidden"
            onClick={closePopup}
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="fixed sm:absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Left Navigation Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePopupNavigation("prev");
              }}
              className="fixed sm:absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Right Navigation Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePopupNavigation("next");
              }}
              className="fixed sm:absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Content Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-7xl mx-auto my-4 sm:my-8 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 min-h-0"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Section */}
              <div className="relative w-full lg:w-1/2 h-[250px] sm:h-[350px] lg:h-[600px] flex-shrink-0">
                <Image
                  src={projects[popupIndex].image}
                  alt={projects[popupIndex].name}
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Text Section */}
              <div className="w-full lg:w-1/2 flex flex-col justify-start bg-white/10 backdrop-blur-md rounded-lg px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 text-white max-h-[60vh] lg:max-h-[600px] overflow-y-auto">
                <div className="mb-3 sm:mb-4 lg:mb-6">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                    {projects[popupIndex].name}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80">
                    {popupIndex + 1} / {projects.length}
                  </p>
                </div>

                <div className="flex-1">
                  <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white/90">
                    {projects[popupIndex].description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Keyboard Navigation */}
            <div
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Escape") closePopup();
                if (e.key === "ArrowLeft") handlePopupNavigation("prev");
                if (e.key === "ArrowRight") handlePopupNavigation("next");
              }}
              className="absolute inset-0"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CaseStudiesSection;
