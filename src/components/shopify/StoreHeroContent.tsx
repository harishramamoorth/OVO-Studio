"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, ShoppingBag } from "lucide-react";

export default function StoreHeroContent() {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 text-center space-y-6">
      {/* Floating Animated Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#1A0B1E]/90 border border-[#D6B65A]/35 backdrop-blur-xl shadow-xl shadow-[#D6B65A]/10"
      >
        <div className="w-2 h-2 rounded-full bg-[#D6B65A] animate-ping" />
        <span className="text-[10px] font-bold font-mono tracking-[0.3em] uppercase text-[#D6B65A]">
          DUBAI ATELIER &bull; SHOPIFY STOREFRONT
        </span>
        <Sparkles className="w-3.5 h-3.5 text-[#D6B65A]" />
      </motion.div>

      {/* Main Staggered Title */}
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl sm:text-5xl lg:text-7xl font-extrabold uppercase tracking-[0.14em] text-[#F4EEE5] max-w-5xl mx-auto leading-[1.15]"
      >
        Haute Couture &amp; <br className="hidden sm:inline" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4EEE5] via-[#D6B65A] to-[#B9974B]">
          Luxury Store
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="text-sm sm:text-base lg:text-lg text-[#C8BDB7]/90 max-w-2xl mx-auto font-light leading-relaxed"
      >
        Discover our curated Dubai collection of handcrafted silk garments, fine jewelry, niche fragrances, bespoke footwear, and private consulting passes.
      </motion.p>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-[#C8BDB7]/80 font-mono"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D6B65A]" />
          <span>Shopify 256-Bit SSL Checkout</span>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#D6B65A]/40 hidden sm:block" />
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-[#D6B65A]" />
          <span>Worldwide GCC Express Shipping</span>
        </div>
      </motion.div>
    </div>
  );
}
