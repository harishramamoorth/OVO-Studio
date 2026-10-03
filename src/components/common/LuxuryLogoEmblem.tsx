"use client";

import { motion } from "framer-motion";

interface EmblemProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export default function LuxuryLogoEmblem({ className = "", size = 80, glow = true }: EmblemProps) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Outer ambient aura glow */}
      {glow && (
        <div 
          className="absolute inset-0 bg-[#D6B65A]/25 rounded-full blur-xl animate-pulse pointer-events-none"
          style={{ width: size * 1.4, height: size * 1.4, left: -size * 0.2, top: -size * 0.2 }}
        />
      )}

      <svg
        width={size}
        height={size * 0.6}
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 filter drop-shadow-[0_0_12px_rgba(214,182,90,0.75)]"
      >
        <defs>
          <linearGradient id="goldGradientEmblem" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7E6" />
            <stop offset="35%" stopColor="#E5C778" />
            <stop offset="70%" stopColor="#D6B65A" />
            <stop offset="100%" stopColor="#9E7B2B" />
          </linearGradient>

          <filter id="goldGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Double Loop Signature Emblem (Left & Right swoops meeting in central V) */}
        <g filter="url(#goldGlowFilter)">
          {/* Left Loop */}
          <path
            d="M 100,75 C 80,45 60,18 36,22 C 16,25 4,45 6,68 C 8,90 28,104 54,98 C 80,92 94,72 100,60"
            stroke="url(#goldGradientEmblem)"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Right Loop */}
          <path
            d="M 100,75 C 120,45 140,18 164,22 C 184,25 196,45 194,68 C 192,90 172,104 146,98 C 120,92 106,72 100,60"
            stroke="url(#goldGradientEmblem)"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />

          {/* Central V Accent Dip */}
          <path
            d="M 85,42 Q 100,78 100,78 Q 100,78 115,42"
            stroke="url(#goldGradientEmblem)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}
