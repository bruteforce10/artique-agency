import Image from "next/image";

export const CardAbout = ({ title, description, image, className = "" }) => {
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
      className={`p-[2px] rounded-2xl bg-gradient-to-b from-[#FFD800]/90 via-white to-white ${className}`}
    >
      <div className="rounded-2xl bg-gradient-to-b from-white to-white/0 p-6 sm:p-8 min-h-[300px] flex flex-col relative overflow-hidden">
        {/* Background gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E5AF5F]/50 to-white/50 opacity-90" />

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
        <div className="relative z-10">
          <div className="w-20 h-20 rounded-xl bg-white/90 flex items-center justify-center shadow mb-6">
            <Image
              src={`/about/${image}.png`}
              width={64}
              height={64}
              alt={`about-icon-${image}`}
            />
          </div>

          <h4 className="text-2xl font-extrabold text-gray-900 mb-3">
            {title}
          </h4>

          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            {description}
          </p>

          <div className="mt-auto" />
        </div>
      </div>
    </div>
  );
};
