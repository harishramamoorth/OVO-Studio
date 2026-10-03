"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function BrandStatement() {
  return (
    <section className="section-padding bg-[#10070F] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Top Text & Heading Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16 sm:mb-24">
          
          {/* Left Column: Eyebrow + Headline */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 text-champagne-400 label-uppercase"
            >
              <Compass className="w-4 h-4 text-champagne-400" />
              <span>IDENTITY & VISION</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif font-normal text-beige-50 heading-h2 tracking-tight"
            >
              POWERING YOUR <br />
              <span className="font-display italic text-champagne-400 font-light">IDENTITY.</span>
            </motion.h2>
          </div>

          {/* Right Column: Paragraphs & CTA */}
          <div className="lg:col-span-6 space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-beige-50 font-sans font-light leading-relaxed"
            >
              Luxury Signature is a 360° fashion solutions ecosystem built for brands that want to create, evolve and lead in the global luxury market.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base text-beige-200/80 font-sans font-light leading-relaxed"
            >
              From initial collection positioning and technical pattern specifications to haute couture sampling, headless e-commerce flagships, and Middle East PR activations — we engineer every step of your brand journey.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-4"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] text-beige-50 bg-[#170B15] border border-[rgba(214,182,90,0.18)] hover:border-champagne-400 hover:text-champagne-400 transition-all duration-300 group"
              >
                <span>MORE ABOUT US</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

        </div>

        {/* Large Editorial Atelier Image Banner (70-80% width) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mx-auto max-w-5xl rounded-[16px] overflow-hidden border border-[rgba(244,238,229,0.08)] relative shadow-2xl group"
          data-cursor="view"
        >
          <div className="relative h-[380px] sm:h-[520px] w-full overflow-hidden">
            {/* Pexels Creative Studio / Fashion Designer photo (photo-36731309) */}
            <img
              src="https://images.pexels.com/photos/36731309/pexels-photo-36731309.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Luxury Fashion Atelier Studio Dubai"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
              onError={(e) => {
                // Fallback high quality fashion atelier image if needed
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1600&auto=format&fit=crop";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10070F] via-[#10070F]/30 to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-champagne-400 block mb-1">
                  ATELIER DUBAI • DIFC
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif text-beige-50 font-normal">
                  WHERE VISION MEETS ATELIER PRECISION
                </h3>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
