"use client";

import Link from "next/link";
import LuxuryLogoEmblem from "./LuxuryLogoEmblem";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ 
  className = "", 
  showText = true,
  size = "md" 
}: LogoProps) {
  // Sizing mapping for SVG emblem
  const emblemSizes = {
    sm: 42,
    md: 52,
    lg: 64,
  };

  const textSizes = {
    sm: "text-xs tracking-[0.22em]",
    md: "text-sm sm:text-base tracking-[0.24em]",
    lg: "text-lg sm:text-xl tracking-[0.26em]",
  };

  return (
    <Link 
      href="/" 
      className={`group inline-flex items-center gap-3 relative transition-all duration-300 hover:opacity-90 bg-transparent ${className}`}
      aria-label="Luxury Signature Dubai Home"
    >
      {/* 100% Transparent Background Vector SVG Emblem */}
      <div className="relative flex items-center justify-center shrink-0 bg-transparent">
        <LuxuryLogoEmblem 
          size={emblemSizes[size]} 
          glow={false} 
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Clean Brand Typography */}
      {showText && (
        <div className="flex flex-col justify-center select-none bg-transparent">
          <span className={`font-serif font-normal uppercase text-[#F4EEE5] leading-none ${textSizes[size]} group-hover:text-white transition-colors`}>
            LUXURY <span className="text-[#D6B65A] font-light">SIGNATURE</span>
          </span>
          <span className="text-[8px] sm:text-[9px] tracking-[0.38em] text-[#C8BDB7]/75 uppercase font-sans mt-1">
            DUBAI
          </span>
        </div>
      )}
    </Link>
  );
}
