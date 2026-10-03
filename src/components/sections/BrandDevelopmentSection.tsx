"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Scissors } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/constants";

const BRAND_DEV_IMAGES = [
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1600&auto=format&fit=crop", // Design & Dev
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop", // Bespoke Design
  "https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=1600&auto=format&fit=crop", // Tech Pack
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop", // Production
];

export default function BrandDevelopmentSection() {
  const category = SERVICE_CATEGORIES[1];
  const [activeIdx, setActiveIdx] = useState(0);
  const currentService = category.services[activeIdx];
  const currentImg = BRAND_DEV_IMAGES[activeIdx] || currentService.image;

  return (
    <section
      id={category.slug}
      className="section-padding bg-[#10070F] relative overflow-hidden border-t border-[rgba(244,238,229,0.08)]"
    >
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D6B65A]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4a0f3a]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="mb-16 sm:mb-24 space-y-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-champagne-400 label-uppercase"
          >
            <Scissors className="w-4 h-4" />
            <span>CATEGORY 02</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif font-normal text-beige-50 heading-h2 tracking-tight max-w-3xl"
          >
            BUILD THE BRAND{" "}
            <span className="italic font-display text-champagne-400 font-light">
              BEYOND THE GARMENT.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-beige-200/80 font-sans font-light max-w-xl"
          >
            Building a strong, cohesive brand is essential for standing out in a
            competitive fashion industry.
          </motion.p>
        </div>

        {/* Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT: Animated Image Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <div
              className="relative rounded-2xl overflow-hidden bg-[#21101E] border border-[rgba(214,182,90,0.18)]"
              style={{ height: "clamp(420px, 55vh, 600px)" }}
              data-cursor="view"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 1.06, clipPath: "inset(0 0 100% 0)" }}
                  animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0)" }}
                  exit={{ opacity: 0, scale: 0.97, clipPath: "inset(100% 0 0 0)" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={currentImg}
                    alt={currentService.title}
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Bottom gradient + label */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10070F] via-[#10070F]/30 to-transparent" />
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-8 left-8 right-8 space-y-2"
                  >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-champagne-400 font-semibold block">
                      0{activeIdx + 1} / Atelier Scope
                    </span>
                    <h3 className="font-serif text-3xl text-beige-50 font-normal">
                      {currentService.title}
                    </h3>
                    <p className="text-xs text-beige-200/80 font-sans leading-relaxed max-w-xs">
                      {currentService.shortDescription}
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Floating Pager Dots */}
              <div className="absolute top-5 right-5 flex items-center gap-1.5">
                {category.services.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeIdx
                        ? "w-6 h-1.5 bg-champagne-400"
                        : "w-1.5 h-1.5 bg-beige-50/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Vertical Selection List */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-6 order-1 lg:order-2 space-y-3"
          >
            {category.services.map((service, index) => {
              const isActive = activeIdx === index;
              return (
                <motion.button
                  key={service.id}
                  onMouseEnter={() => setActiveIdx(index)}
                  onClick={() => setActiveIdx(index)}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`w-full text-left rounded-2xl border transition-all duration-400 overflow-hidden ${
                    isActive
                      ? "bg-[#21101E] border-[rgba(214,182,90,0.4)] shadow-2xl shadow-[#10070F]"
                      : "bg-[#170B15]/70 border-[rgba(244,238,229,0.07)] hover:border-[rgba(214,182,90,0.2)]"
                  }`}
                >
                  <div className="flex items-center justify-between p-6 sm:p-7">
                    <div className="flex items-center gap-5">
                      <span
                        className={`font-serif text-2xl sm:text-3xl font-light leading-none ${
                          isActive ? "text-champagne-400" : "text-beige-200/30"
                        }`}
                      >
                        0{index + 1}
                      </span>
                      <h4
                        className={`font-serif text-xl sm:text-2xl transition-colors ${
                          isActive ? "text-beige-50" : "text-beige-200/60"
                        }`}
                      >
                        {service.title}
                      </h4>
                    </div>
                    <ArrowRight
                      className={`w-5 h-5 shrink-0 transition-all duration-300 ${
                        isActive
                          ? "text-champagne-400 translate-x-1"
                          : "text-beige-200/25 opacity-40"
                      }`}
                    />
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35 }}
                        className="px-7 pb-6 border-t border-[rgba(244,238,229,0.07)] space-y-4"
                      >
                        <div className="pt-4 space-y-2">
                          {service.features.slice(0, 3).map((f, fi) => (
                            <div key={fi} className="flex items-start gap-2 text-xs text-beige-200/80">
                              <span className="text-champagne-400 mt-0.5 shrink-0">✦</span>
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                        <Link
                          href={`/services/${category.slug}/${service.slug}`}
                          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-champagne-400 hover:text-white transition-colors group"
                        >
                          <span>Explore {service.title}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
