"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function StoreHeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.85; // Slightly slower playback rate for ultra-luxe cinematic feel
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop"
          className="w-full h-full object-cover brightness-[0.55] contrast-125 scale-105"
        >
          <source src="/media/fashion/price/sHOPPING.mp4" type="video/mp4" />
          <source src="/media/fashion/story-01.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Multi-Layered Masking Overlays for High-Contrast Text Legibility */}
      {/* Deep Center Radial Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_15%,_#0C040E_85%)]" />

      {/* Vertical Gradient Fade (Top Nav and Bottom Section Blend) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C040E]/85 via-[#0C040E]/45 to-[#0C040E]" />

      {/* Left/Right Edge Shadow Vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0C040E] via-transparent to-[#0C040E]" />

      {/* Glowing Luxury Gold Lighting Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-br from-[#D6B65A]/25 via-[#8A366F]/20 to-transparent rounded-full blur-[140px]"
      />

      {/* Floating Light Dust Sparks */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100%", opacity: 0, scale: 0.5 }}
            animate={{
              y: "-10%",
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#D6B65A] blur-[0.5px]"
            style={{ left: `${15 + i * 14}%` }}
          />
        ))}
      </div>

      {/* Geometric Luxury Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#D6B65A 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />
    </div>
  );
}
