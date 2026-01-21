"use client";
import Image from "next/image";
import { useState } from "react";

export const CardAbout = ({ title, description, image, className = "" }) => {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(() => {
    // Validasi dan normalisasi image source
    if (typeof image === "string" && image.trim() !== "") {
      // Jika string, pastikan itu URL yang valid
      if (image.startsWith("http://") || image.startsWith("https://")) {
        return image;
      }
      // Jika string tapi bukan URL, anggap sebagai path lokal
      return image.startsWith("/") ? image : `/${image}`;
    }
    // Fallback numeric -> gunakan asset yang memang ada di /public (foto landscape)
    const idx = Number(image) || 1;
    const fallbackMap = {
      1: "/bg.webp",
      2: "/bg-services.webp",
      3: "/bg-projects.webp",
    };
    return fallbackMap[idx] || "/bg.webp";
  });

  const handleImageError = () => {
    // Jika error, coba fallback ke placeholder atau icon default
    if (!imageError) {
      setImageError(true);
      setImageSrc("/logo.webp"); // Fallback ke logo atau placeholder
    }
  };

  const noiseSvg = encodeURIComponent(`
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
          <filter id='n'>
            <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch' />
          </filter>
          <rect width='100%' height='100%' filter='url(%23n)' opacity='0.06' fill='%23ffffff' />
        </svg>
      `);

  return (
    <div
      className={`p-[2px] rounded-2xl ${className}`}
    >
      <div className="rounded-2xl bg-gradient-to-b from-white to-white/0 flex flex-col relative overflow-hidden">
        {/* grain overlay (non-interactive) */}
        <div
          aria-hidden
          className="absolute inset-0 z-[99] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,${noiseSvg}")`,
            backgroundRepeat: "repeat",
            opacity: 0.06,
          }}
        />

        {/* Content wrapper with relative positioning */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Top image (reference layout) */}
          <div className="px-6 sm:px-8 pt-6 sm:pt-8">
            <div className="relative w-full h-44 sm:h-48 lg:h-55 rounded-sm overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
              <Image
                src={imageSrc}
                alt={`about-image-${title || image || "default"}`}
                fill
                className="object-cover"
                onError={handleImageError}
                unoptimized={imageError}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={false}
              />
            </div>
          </div>

          {/* Text content */}
          <div className="px-6 sm:px-8 pb-8 pt-6 flex flex-col flex-1">
            <h4 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-3 uppercase">
              {title}
            </h4>

            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {description}
            </p>

            <div className="mt-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};
