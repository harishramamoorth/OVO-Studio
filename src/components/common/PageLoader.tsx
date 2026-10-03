"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LuxuryLogoEmblem from "./LuxuryLogoEmblem";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show loader once per session to make navigation feel instantaneous
    const hasLoaded = sessionStorage.getItem("ovo_has_loaded");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    let start = performance.now();
    const duration = 1200; // 1.2 seconds of buttery smooth loading

    const animateProgress = (time: number) => {
      const elapsed = time - start;
      const progressValue = Math.min((elapsed / duration) * 100, 100);
      
      // Easing function for smooth slowdown at the end
      const easeOutQuart = 1 - Math.pow(1 - progressValue / 100, 4);
      
      setProgress(easeOutQuart * 100);

      if (elapsed < duration) {
        requestAnimationFrame(animateProgress);
      } else {
        sessionStorage.setItem("ovo_has_loaded", "true");
        setTimeout(() => setLoading(false), 300);
      }
    };

    requestAnimationFrame(animateProgress);
  }, []);

  const brandWords = ["LUXURY", "SIGNATURE"];

  if (!loading) return null;

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100vh", 
            opacity: 0,
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#090308] text-[#F4EEE5] overflow-hidden select-none"
        >
          {/* Ambient Lighting Glow - No circles */}
          <div className="absolute w-[600px] h-[600px] bg-[#D6B65A]/12 rounded-full blur-[170px] animate-pulse pointer-events-none" />
          <div className="absolute w-[400px] h-[400px] bg-[#4a1840]/30 rounded-full blur-[140px] pointer-events-none" />
          
          {/* Subtle background grid texture */}
          <div 
            className="absolute inset-0 opacity-[0.025] pointer-events-none" 
            style={{ backgroundImage: `radial-gradient(#D6B65A 1px, transparent 1px)`, backgroundSize: '36px 36px' }}
          />

          {/* Floating Gold Light Sparks */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: "100vh", opacity: 0, scale: 0.5 }}
                animate={{ 
                  y: "-10vh", 
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1.2, 0.5]
                }}
                transition={{
                  duration: 3.5 + i * 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
                className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#FFF7E6] to-[#D6B65A] blur-[0.5px]"
                style={{ left: `${10 + i * 12}%` }}
              />
            ))}
          </div>

          {/* Main Pop-up Content Container */}
          <div className="relative flex flex-col items-center justify-center z-10 space-y-8 max-w-md w-full px-6">
            
            {/* Pop-up Spring Animation Box for Logo Emblem */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0, y: 30 }}
              animate={{ 
                scale: [0.3, 1.12, 1], 
                opacity: 1, 
                y: 0 
              }}
              transition={{ 
                duration: 0.9, 
                ease: [0.34, 1.56, 0.64, 1], // Spring popup bounce
              }}
              className="relative flex items-center justify-center py-4"
            >
              {/* Shimmering Light Beam Behind Emblem */}
              <motion.div
                animate={{ 
                  scale: [0.9, 1.15, 0.9],
                  opacity: [0.5, 0.9, 0.5]
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D6B65A]/20 to-transparent blur-xl pointer-events-none"
              />

              {/* Vector SVG Gold Emblem Only - No outer circles, no pink image */}
              <LuxuryLogoEmblem size={130} glow={true} />
            </motion.div>

            {/* Word-by-Word Pop-up Title */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-3 font-serif text-2xl sm:text-3xl tracking-[0.32em] uppercase text-[#F4EEE5]">
                {brandWords.map((word, wordIdx) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.35 + wordIdx * 0.18,
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                    className={wordIdx === 1 ? "text-[#D6B65A] font-light" : "font-normal"}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-[9px] sm:text-[10px] uppercase tracking-[0.45em] text-[#C8BDB7]/70 font-sans"
              >
                DUBAI &bull; HAUTE COUTURE ADVISORY
              </motion.p>
            </div>

            {/* Minimalist Gold Progress Bar & Percentage */}
            <div className="w-full max-w-xs space-y-3 pt-4">
              <div className="relative h-[2px] w-full bg-[rgba(244,238,229,0.08)] rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#D6B65A] via-[#FFF7E6] to-[#D6B65A] shadow-[0_0_12px_#D6B65A]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono tracking-[0.2em] text-[#D6B65A]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6B65A] animate-ping" />
                  INITIALIZING
                </span>
                <span className="font-bold text-[#F4EEE5]">{Math.floor(progress)}%</span>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
