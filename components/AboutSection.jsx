"use client";
import React, { useEffect, useState, useMemo } from "react";
import { CardAbout } from "./CardAbout";
import { useNavbarSection } from "./NavbarContext";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { useLocale } from "next-intl";

const AboutSection = ({ about, mision }) => {
  const locale = useLocale();
  const sectionRef = useNavbarSection("about", false);
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, margin: "-100px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isInView && mounted && scope.current) {
      animate(
        "span[data-word]",
        {
          opacity: 1,
          filter: "blur(0px)",
        },
        {
          duration: 0.3,
          delay: stagger(0.15),
        }
      );
    }
  }, [isInView, animate, mounted, scope]);

  // Parse about text and add bold spans for key phrases
  const parseAboutText = useMemo(() => {
    if (!about) {
      return [];
    }

    // Define key phrases to bold (case insensitive)
    // Order matters: longer phrases first to avoid partial matches
    const keyPhrases =
      locale === "id"
        ? [
            "Di Artique",
            "kreativitas tidak memiliki batas",
            "mewujudkan visi mereka",
            "potensi penuh ",
            "ide-ide mereka",
            "berkomitmen ",
            "panduan",
            "dukungan",
            "keahlian ",
          ]
        : [
            "Artique",
            "creativity has no bounds",
            "we are committed to helping our clients unlock the full potential of their ideas",
            "work closely",
            "their vision to life",
            "guidance, support, and expertise",
          ];

    const parts = [];
    let currentIndex = 0;
    let partKey = 0;

    // Find and wrap key phrases with bold spans
    while (currentIndex < about.length) {
      let bestMatch = null;
      let bestIndex = -1;
      let bestLength = 0;

      // Find the earliest matching key phrase (prioritize longer matches)
      for (const phrase of keyPhrases) {
        const escapedPhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(escapedPhrase, "gi");
        const remainingText = about.substring(currentIndex);
        const match = remainingText.match(regex);

        if (match) {
          const matchText = match[0];
          const matchIndex = about
            .toLowerCase()
            .indexOf(matchText.toLowerCase(), currentIndex);

          // Prioritize longer matches and earlier positions
          if (
            matchIndex !== -1 &&
            (bestIndex === -1 ||
              matchIndex < bestIndex ||
              (matchIndex === bestIndex && matchText.length > bestLength))
          ) {
            bestMatch = about.substring(
              matchIndex,
              matchIndex + matchText.length
            );
            bestIndex = matchIndex;
            bestLength = matchText.length;
          }
        }
      }

      if (bestMatch && bestIndex !== -1) {
        // Add text before the match
        if (bestIndex > currentIndex) {
          parts.push(about.substring(currentIndex, bestIndex));
        }

        // Add the span for the match
        parts.push(
          <span key={`bold-${partKey++}`} className="font-normal text-black">
            {bestMatch}
          </span>
        );

        currentIndex = bestIndex + bestMatch.length;
      } else {
        // No more matches, add the rest of the text
        parts.push(about.substring(currentIndex));
        break;
      }
    }

    return parts.length > 0 ? parts : [about];
  }, [about, locale]);

  // Transform mision data from GraphQL to cardData format
  const cardData = useMemo(() => {
    if (mision && Array.isArray(mision) && mision.length > 0) {
      // Map mision data from GraphQL to cardData format
      return mision.map((item, index) => ({
        title: item.title || "",
        description: item.description || "",
        image: item.image?.url || index + 1, // Use URL if available, fallback to index+1
      }));
    }

    // Fallback to hardcoded data if no mision data
    return [
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
  }, [mision]);

  return (
    <section
      ref={sectionRef}
      className="-mt-6 relative z-[2] rounded-3xl bg-white pt-20 w-full"
      suppressHydrationWarning
    >
      <div
        className="w-24 h-1 inset-x-0 mx-auto absolute top-4 bg-gray-300 rounded-full"
        suppressHydrationWarning
      />

      <div
        className="max-w-5xl mx-auto w-full px-6 sm:px-8"
        suppressHydrationWarning
      >
        <div className="text-center" suppressHydrationWarning>
          <h3 className="text-4xl sm:text-5xl font-bold text-gray-800 tracking-tight">
            {locale === "id" ? "Tentang Kami" : "About Us"}
          </h3>
        </div>

        <div className="mt-6" suppressHydrationWarning>
          <div
            ref={scope}
            className="mx-auto text-center font-normal text-lg sm:text-xl text-black max-w-4xl leading-relaxed"
            suppressHydrationWarning
          >
            {parseAboutText.flatMap((part, idx) => {
              if (typeof part === "string") {
                return part.split(" ").map((word, wordIdx) => {
                  if (word) {
                    return (
                      <React.Fragment key={`str-${idx}-${wordIdx}`}>
                        <motion.span
                          data-word
                          initial={{ opacity: 0, filter: "blur(10px)" }}
                          className="inline font-normal text-black"
                        >
                          {word}
                        </motion.span>
                        {wordIdx < part.split(" ").length - 1 && " "}
                      </React.Fragment>
                    );
                  }
                  return null;
                });
              }
              // For React elements, process their text content
              const text =
                typeof part.props.children === "string"
                  ? part.props.children
                  : "";
              if (text) {
                const words = text.split(" ");
                return words.map((word, wordIdx) => {
                  if (word) {
                    return (
                      <React.Fragment key={`${part.key}-${wordIdx}`}>
                        <motion.span
                          data-word
                          initial={{ opacity: 0, filter: "blur(10px)" }}
                          className="inline font-normal text-black"
                        >
                          {word}
                        </motion.span>
                        {wordIdx < words.length - 1 && " "}
                      </React.Fragment>
                    );
                  }
                  return null;
                });
              }
              return part;
            })}
          </div>
        </div>

        <div
          className="sm:mt-36 mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          suppressHydrationWarning
        >
          {cardData.map((card, index) => {
            const classes = [];
            // Card terakhir full width di tablet (2 kolom), kembali normal di desktop (3 kolom)
            if (index === 2) classes.push("sm:col-span-2 lg:col-span-1");

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full"
              >
                <CardAbout
                  title={card.title}
                  description={card.description}
                  image={card.image}
                  className={`h-full ${classes.join(" ")}`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
