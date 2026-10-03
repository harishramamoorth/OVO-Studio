"use client";

import { motion } from "framer-motion";
import { Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DubaiSection() {
  const dubaiVideo = "https://videos.pexels.com/video-files/36419282/36419282-hd_1920_1080_25fps.mp4";

  return (
    <section className="relative h-[70vh] sm:h-[80vh] w-full flex items-center justify-center overflow-hidden bg-[#10070F] border-t border-[rgba(244,238,229,0.08)]">
      
      {/* Background Dubai Video / Visual Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover brightness-[0.45] contrast-[1.1]"
        >
          <source src={dubaiVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#10070F] via-[#10070F]/60 to-[#10070F]/40" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-6">
        
        {/* Small Animated Text Element: Dubai -> Global */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#170B15]/80 border border-[rgba(214,182,90,0.2)]"
        >
          <Globe className="w-4 h-4 text-champagne-400" />
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-champagne-400">
            DUBAI <span className="mx-1 text-beige-200">→</span> GLOBAL
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif font-normal text-beige-50 heading-h2 tracking-tight"
        >
          FROM DUBAI <br />
          <span className="italic font-display text-champagne-400 font-light">TO THE WORLD.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-beige-200/90 font-sans font-light max-w-xl mx-auto"
        >
          Headquartered in the Dubai Design District (d3), we scale luxury fashion houses across Europe, the Middle East, and North America.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-4"
        >
          <Link
            href="#consultation"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] text-[#10070F] bg-gradient-to-r from-[#F4EEE5] to-[#D6B65A] hover:scale-105 transition-all shadow-xl"
          >
            <span>CONNECT WITH OUR DUBAI ATELIER</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>

    </section>
  );
}
