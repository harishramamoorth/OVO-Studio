"use client";

import { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { VIDEO_ASSETS, IMAGE_ASSETS } from "@/lib/constants";

// Helper for luxury word-by-word masked reveal
function HeroAnimatedText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 90,
      },
    },
    hidden: {
      opacity: 0,
      y: "110%",
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 90,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap justify-center gap-x-[0.25em] ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block py-1">
          <motion.span variants={child} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[#10070F] selection:bg-[#D6B65A]/30 selection:text-[#D6B65A]">

      {/* 1. Cinematic Background Video with Continuous Ken Burns Ambient Zoom & Scroll Parallax */}
      <motion.div
        initial={{ opacity: 0, scale: 1.18 }}
        animate={{
          opacity: 1,
          scale: [1.02, 1.16, 1.02]
        }}
        transition={{
          opacity: { duration: 1.5, ease: "easeOut" },
          scale: { duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
        }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        {!prefersReducedMotion && !videoError ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={IMAGE_ASSETS.heroPoster}
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover object-center transform scale-105"
          >
            <source src={VIDEO_ASSETS.heroFallback} type="video/mp4" />
            <source src={VIDEO_ASSETS.heroPrimary} type="video/mp4" />
          </video>
        ) : (
          <img
            src={IMAGE_ASSETS.heroPoster}
            alt="Luxury Fashion Campaign"
            className="w-full h-full object-cover object-center transform scale-105"
          />
        )}

        {/* Cinematic Multi-Layer Gradient Overlays */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(16,7,15,0.15) 0%, rgba(16,7,15,0.65) 65%, rgba(16,7,15,0.95) 100%)"
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#10070F]/50 via-transparent to-[#10070F]"
        />
      </motion.div>

      {/* 2. Floating Ambient Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D6B65A]/8 rounded-full blur-[180px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#581c4e]/20 rounded-full blur-[150px] pointer-events-none" />

      {/* 3. Main Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 text-center flex flex-col items-center pt-16">

        {/* Animated Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#170B15]/85 border border-[rgba(214,182,90,0.25)] shadow-[0_0_20px_rgba(214,182,90,0.12)] mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D6B65A]" />
          </motion.div>
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-[#D6B65A] font-sans">
            360° LUXURY FASHION AGENCY &bull; DUBAI
          </span>
        </motion.div>

        {/* H1 Heading with Staggered Word Reveal */}
        <h1 className="font-serif font-normal text-[#F4EEE5] text-[clamp(2.8rem,6.5vw,7.5rem)] leading-[1.04] tracking-[-0.01em] max-w-5xl mb-8">
          <span className="block">
            <HeroAnimatedText text="WE TRANSCEND" delay={0.3} />
          </span>
          <span className="block">
            <HeroAnimatedText text="FASHION" delay={0.55} />
          </span>
          <span className="block">
            <HeroAnimatedText text="TO CREATE A" delay={0.8} />{" "}
            <span className="italic font-display text-[#D6B65A] font-light inline-block">
              <HeroAnimatedText text="LIFESTYLE." delay={1.05} />
            </span>
          </span>
        </h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-base sm:text-xl text-[#C8BDB7]/90 font-sans font-light max-w-2xl leading-relaxed mb-12 text-balance"
        >
          From strategy to design, production to digital presence &mdash; everything your fashion brand needs to grow, evolve, and stand apart.
        </motion.p>

        {/* Action CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <Link
            href="/book"
            className="w-full sm:w-auto px-9 py-4 rounded-full text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#10070F] bg-gradient-to-r from-[#F4EEE5] via-[#D6B65A] to-[#B9974B] shadow-[0_0_30px_rgba(214,182,90,0.3)] hover:shadow-[0_0_45px_rgba(214,182,90,0.5)] hover:scale-[1.04] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <span>BOOK A CONSULTATION</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="#services"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] text-[#F4EEE5] bg-[#170B15]/80 border border-[rgba(244,238,229,0.18)] hover:border-[#D6B65A]/60 hover:bg-[#21101E] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>EXPLORE SERVICES</span>
            <ChevronDown className="w-4 h-4 text-[#D6B65A] group-hover:translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

      </div>

      {/* 4. Thin Vertical Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-10 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.22em] text-[#C8BDB7]/70 font-sans font-medium">SCROLL</span>
        <div className="w-[1px] h-10 bg-[rgba(244,238,229,0.15)] relative overflow-hidden rounded-full">
          <motion.div
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-1/2 bg-gradient-to-b from-[#D6B65A] to-[#F4EEE5] rounded-full shadow-[0_0_8px_#D6B65A]"
          />
        </div>
      </motion.div>

    </section>
  );
}
