import React from "react";

const CaseStudiesSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-8 py-24">
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2  text-xs tracking-widest uppercase">
          <span className="inline-block w-2.5 h-2.5 bg-yellow-400 rounded-sm animate-pulse" />{" "}
          Recent Projects
        </div>
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          Case Studies
        </h2>
      </div>

      <button class="relative font-medium text-[17px]  h-[2.4em]  flex items-center overflow-hidden cursor-pointer shadow-[inset_0_0_1.6em_-0.6em_##FFD800] group">
        <span class="mr-12 uppercase">More Projects</span>
        <div class="absolute right-[0.3em] bg-[#FFD800] h-[1.8em] w-[1.8em] rounded-[0.7em] flex items-center justify-center transition-all duration-300 group-hover:w-[calc(100%-0.3em)] shadow-[0.1em_0.1em_0.6em_0.2em_##FFD800] active:scale-95">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            class="w-[1.1em] transition-transform duration-300 text-black group-hover:translate-x-[0.1em]"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              fill="currentColor"
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
            ></path>
          </svg>
        </div>
      </button>
    </section>
  );
};

export default CaseStudiesSection;
