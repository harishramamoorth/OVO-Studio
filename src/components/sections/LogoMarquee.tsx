"use client";

import { CLIENT_LOGOS } from "@/lib/constants";

export default function LogoMarquee() {
  const repeatedLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="py-12 border-y border-beige-100/10 bg-plum-950/90 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <h3 className="text-xs uppercase tracking-[0.3em] font-medium text-beige-400">
          Trusted by brands that value distinction
        </h3>
      </div>

      {/* Infinite Scrolling Marquee Container with Gradient Faded Edges */}
      <div className="relative w-full overflow-hidden flex items-center py-3">
        {/* Left Fade Overlay */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-plum-950 to-transparent z-10 pointer-events-none" />
        
        {/* Right Fade Overlay */}
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-plum-950 to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex w-max animate-marquee space-x-12 sm:space-x-16 hover:[animation-play-state:paused]">
          {repeatedLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex items-center justify-center group cursor-pointer px-4"
            >
              <span className="font-serif text-lg sm:text-2xl tracking-[0.25em] uppercase text-beige-300/40 group-hover:text-champagne-300 group-hover:scale-105 transition-all duration-300 whitespace-nowrap font-light">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
