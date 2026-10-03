"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, MapPin, Star, Award, Sparkles } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

// Word-by-word reveal for luxury headings
function AnimatedText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 16,
        stiffness: 90,
      },
    },
    hidden: {
      opacity: 0,
      y: "110%",
      transition: {
        type: "spring",
        damping: 16,
        stiffness: 90,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap justify-center gap-x-[0.25em] ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
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

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Auto advance every 7 seconds
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const handleNext = () => {
    setIsAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setIsAutoplay(false);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  const clientBadges = [
    "VOGUE ARABIA FEATURED",
    "PARIS FASHION WEEK RTW",
    "MILAN HAUTE COUTURE",
  ];

  return (
    <section className="relative py-28 lg:py-36 bg-[#0D050C] text-[#F4EEE5] overflow-hidden border-t border-[rgba(244,238,229,0.08)] selection:bg-[#D6B65A]/30 selection:text-[#D6B65A]">
      
      {/* Background Ambient Radial Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D6B65A]/5 rounded-full blur-[180px] pointer-events-none animate-pulse" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4a1840]/20 rounded-full blur-[160px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#D6B65A 1px, transparent 1px)`, backgroundSize: '36px 36px' }}
      />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(214,182,90,0.08)] border border-[rgba(214,182,90,0.2)] mb-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D6B65A]" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#D6B65A] font-sans">
              ENDORSEMENTS &amp; PRAISE
            </span>
          </motion.div>
          
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#F4EEE5] tracking-tight uppercase leading-tight">
            <AnimatedText text="DON'T TAKE OUR WORD FOR IT." delay={0.15} />
          </h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-xs sm:text-sm lg:text-base text-[#C8BDB7]/80 font-sans font-light max-w-xl mx-auto leading-relaxed pt-1"
          >
            Hear from visionary founders, creative directors, and fashion executives who scaled their labels with Luxury Signature.
          </motion.p>
        </div>

        {/* Showcase Quote Card */}
        <div className="relative rounded-3xl bg-[#160A15]/90 border border-[rgba(214,182,90,0.2)] p-8 sm:p-14 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.7)] overflow-hidden">
          
          {/* Subtle Top Accent Beam */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D6B65A] to-transparent opacity-80" />

          {/* Large Watermark Quote Mark */}
          <Quote className="w-20 h-20 text-[#D6B65A]/10 absolute top-8 left-8 sm:top-10 sm:left-12 pointer-events-none" />

          {/* Top Badge (e.g. VOGUE ARABIA FEATURED) */}
          <div className="flex items-center justify-between gap-4 mb-8 relative z-10 border-b border-[rgba(244,238,229,0.06)] pb-5">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#D6B65A]">
              <Award className="w-3.5 h-3.5 text-[#D6B65A]" />
              <span>{clientBadges[currentIndex]}</span>
            </div>

            {/* 5-Star Rating */}
            <div className="flex items-center gap-1 text-[#D6B65A]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#D6B65A]" />
              ))}
            </div>
          </div>

          {/* Animated Quote Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8 relative z-10"
            >
              {/* Quote Body */}
              <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F4EEE5] font-normal leading-[1.28] tracking-[-0.01em]">
                &ldquo;{current.quote}&rdquo;
              </p>

              {/* Author Details Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-[rgba(244,238,229,0.08)] pt-8">
                <div className="flex items-center gap-4">
                  
                  {/* Avatar with Gold Ring Border */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#D6B65A] p-0.5 shadow-[0_0_15px_rgba(214,182,90,0.3)] shrink-0">
                    <img
                      src={current.image}
                      alt={current.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#F4EEE5] font-normal">
                      {current.name}
                    </h3>
                    <p className="text-xs text-[#D6B65A] font-sans font-medium mt-0.5">
                      {current.role} &bull; <span className="text-[#C8BDB7]/90">{current.company}</span>
                    </p>
                  </div>
                </div>

                {/* Location Badge */}
                <div className="inline-flex items-center gap-2 text-xs text-[#C8BDB7] bg-[#0D050C]/90 px-4 py-2 rounded-full border border-[rgba(214,182,90,0.18)] self-start sm:self-center">
                  <MapPin className="w-3.5 h-3.5 text-[#D6B65A]" />
                  <span className="font-sans font-medium">{current.location}</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Interactive Thumbnails & Controls Footer Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 mt-8 border-t border-[rgba(244,238,229,0.08)] relative z-10">
            
            {/* Interactive Client Thumbnails Selector */}
            <div className="flex items-center gap-3">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAutoplay(false);
                    setCurrentIndex(idx);
                  }}
                  className={`group relative rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? "ring-2 ring-[#D6B65A] ring-offset-2 ring-offset-[#160A15] scale-110" 
                      : "opacity-40 hover:opacity-100 hover:scale-105"
                  }`}
                  aria-label={`View testimonial from ${t.name}`}
                >
                  <img 
                    src={t.image} 
                    alt={t.name} 
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Progress Readout & Prev/Next Arrow Buttons */}
            <div className="flex items-center gap-5">
              <span className="font-serif text-sm font-light text-[#D6B65A] tracking-wider">
                0{currentIndex + 1} / 0{TESTIMONIALS.length}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-[#0D050C] border border-[rgba(214,182,90,0.2)] flex items-center justify-center text-[#F4EEE5] hover:bg-[#D6B65A] hover:text-[#0D050C] hover:scale-105 active:scale-95 transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-[#0D050C] border border-[rgba(214,182,90,0.2)] flex items-center justify-center text-[#F4EEE5] hover:bg-[#D6B65A] hover:text-[#0D050C] hover:scale-105 active:scale-95 transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Autoplay Progress Timer Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[rgba(244,238,229,0.06)]">
            {isAutoplay && (
              <motion.div
                key={currentIndex}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 7, ease: "linear" }}
                className="h-full bg-gradient-to-r from-[#D6B65A] via-[#F4EEE5] to-[#D6B65A]"
              />
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
