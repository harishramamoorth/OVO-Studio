"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/constants";

// Specific marketing campaign images per service
const MARKETING_IMAGES = [
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1600&auto=format&fit=crop", // Digital Advertising
  "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1600&auto=format&fit=crop", // Campaign Management
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1600&auto=format&fit=crop", // Influencer & Media
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop", // PR & Events
];

export default function MarketingSection() {
  const category = SERVICE_CATEGORIES[3];
  const [activeIdx, setActiveIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const currentService = category.services[activeIdx];
  const currentImg = MARKETING_IMAGES[activeIdx] || currentService.image;

  // Auto-cycle services
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % category.services.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [category.services.length]);

  return (
    <section
      id={category.slug}
      ref={ref}
      className="section-padding bg-[#10070F] relative overflow-hidden border-t border-[rgba(244,238,229,0.08)]"
    >
      {/* Parallax ambient glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute right-0 top-1/4 w-[700px] h-[700px] bg-[#4a1840]/15 rounded-full blur-[180px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="mb-16 sm:mb-24 space-y-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-champagne-400 label-uppercase"
          >
            <TrendingUp className="w-4 h-4" />
            <span>CATEGORY 04</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif font-normal text-beige-50 heading-h2 tracking-tight"
          >
            MARKETING &{" "}
            <span className="italic font-display text-champagne-400 font-light block">
              PROMOTION.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-beige-200/80 font-sans font-light max-w-xl"
          >
            Transform attention into meaningful brand growth and international
            retail presence.
          </motion.p>
        </div>

        {/* Feature Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT: Service Accordion */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-3"
          >
            {category.services.map((service, index) => {
              const isActive = activeIdx === index;
              return (
                <motion.div
                  key={service.id}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`rounded-2xl border transition-all duration-400 overflow-hidden cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-br from-[#21101E] to-[#170B15] border-[rgba(214,182,90,0.45)] shadow-xl shadow-[#10070F]"
                      : "bg-[#170B15]/60 border-[rgba(244,238,229,0.07)] hover:border-[rgba(214,182,90,0.2)]"
                  }`}
                  onClick={() => setActiveIdx(index)}
                >
                  <div className="flex items-center justify-between p-6 sm:p-7">
                    <div className="flex items-center gap-5">
                      <span
                        className={`font-serif text-2xl sm:text-3xl font-light leading-none ${
                          isActive ? "text-champagne-400" : "text-beige-200/25"
                        }`}
                      >
                        0{index + 1}
                      </span>
                      <h4
                        className={`font-serif text-xl sm:text-2xl transition-colors ${
                          isActive ? "text-beige-50" : "text-beige-200/55"
                        }`}
                      >
                        {service.title}
                      </h4>
                    </div>
                    <ArrowRight
                      className={`w-5 h-5 shrink-0 transition-all duration-300 ${
                        isActive ? "text-champagne-400 translate-x-1" : "text-beige-200/20"
                      }`}
                    />
                  </div>

                  {/* Progress bar */}
                  {isActive && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 5, ease: "linear" }}
                      className="h-[1px] bg-champagne-400 origin-left mx-7"
                    />
                  )}

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                      className="px-7 pb-6 space-y-4"
                    >
                      <p className="text-sm text-beige-200/80 font-sans font-light leading-relaxed pt-3">
                        {service.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.slice(0, 4).map((f, fi) => (
                          <span
                            key={fi}
                            className="text-[10px] uppercase tracking-[0.12em] font-semibold text-champagne-400 bg-[rgba(214,182,90,0.08)] border border-[rgba(214,182,90,0.15)] rounded-full px-3 py-1"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/services/${category.slug}/${service.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-champagne-400 hover:text-white transition-colors group"
                      >
                        <span>Learn More About {service.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* RIGHT: Big image panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div
              className="relative rounded-2xl overflow-hidden bg-[#21101E] border border-[rgba(214,182,90,0.18)]"
              style={{ height: "clamp(440px, 60vh, 620px)" }}
              data-cursor="view"
            >
              {MARKETING_IMAGES.map((img, i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: activeIdx === i ? 1 : 0,
                    scale: activeIdx === i ? 1 : 1.04,
                  }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={img}
                    alt={category.services[i]?.title || "Marketing"}
                    className="w-full h-full object-cover object-center brightness-75"
                  />
                </motion.div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#10070F] via-[#10070F]/25 to-transparent z-10" />

              {/* Floating info chip */}
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-8 left-8 right-8 z-20 space-y-1"
              >
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-champagne-400 block">
                  Campaign Adviser · World-Fast & Global
                </span>
                <h3 className="font-serif text-3xl text-beige-50 font-normal">
                  {currentService.title}
                </h3>
              </motion.div>

              {/* Service counter */}
              <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5">
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
        </div>
      </div>
    </section>
  );
}
