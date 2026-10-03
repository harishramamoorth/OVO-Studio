"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Globe } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/constants";

// Mapped intentional Unsplash images per Digital Presence service
const DIGITAL_IMAGES = [
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop", // E-commerce
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop", // Website Design
  "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop", // Branding
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop", // Social Media
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop", // Inventory
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop", // Packaging
];

// Grid config: [col-span-md, height-class]
const GRID_CONFIG = [
  { col: "md:col-span-8", h: "h-[460px]" },  // E-commerce – big feature
  { col: "md:col-span-4", h: "h-[460px]" },  // Website Design
  { col: "md:col-span-4", h: "h-[380px]" },  // Branding
  { col: "md:col-span-4", h: "h-[380px]" },  // Social Media
  { col: "md:col-span-4", h: "h-[380px]" },  // Inventory
  { col: "md:col-span-8", h: "h-[380px]" },  // Packaging – big feature
];

export default function DigitalPresenceSection() {
  const category = SERVICE_CATEGORIES[2];

  return (
    <section
      id={category.slug}
      className="section-padding bg-[#170B15] relative overflow-hidden border-t border-[rgba(244,238,229,0.08)]"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-[#D6B65A]/4 rounded-full blur-[200px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 sm:mb-24 items-end">
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-champagne-400 label-uppercase"
            >
              <Globe className="w-4 h-4" />
              <span>CATEGORY 03</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif font-normal text-beige-50 heading-h2 tracking-tight"
            >
              YOUR BRAND,{" "}
              <span className="italic font-display text-champagne-400 font-light block">
                AMPLIFIED DIGITALLY.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-beige-200/80 font-sans font-light leading-relaxed lg:pb-3"
          >
            Your brand deserves a digital presence as distinctive as your
            collection — from a high-converting luxury e-store to editorial
            social aesthetics.
          </motion.p>
        </div>

        {/* Asymmetrical 12-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {category.services.map((service, index) => {
            const cfg = GRID_CONFIG[index] ?? { col: "md:col-span-4", h: "h-[380px]" };
            const img = DIGITAL_IMAGES[index] || service.image;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (index % 3) * 0.12 }}
                className={`${cfg.col} col-span-1 group`}
              >
                <Link
                  href={`/services/${category.slug}/${service.slug}`}
                  className={`relative block rounded-2xl overflow-hidden bg-[#21101E] border border-[rgba(214,182,90,0.14)] hover:border-[rgba(214,182,90,0.5)] transition-all duration-500 ${cfg.h} flex flex-col justify-between p-7 sm:p-8`}
                  data-cursor="view"
                >
                  {/* BG Image */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={img}
                      alt={service.title}
                      className="w-full h-full object-cover object-center brightness-[0.65] group-hover:brightness-[0.45] group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#21101E] via-[#21101E]/50 to-transparent" />
                  </div>

                  {/* Top: Category badge + arrow icon */}
                  <div className="relative z-10 flex items-start justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne-400 bg-[#10070F]/70 px-2.5 py-1 rounded-full border border-[rgba(214,182,90,0.2)] backdrop-blur-sm">
                      0{index + 1}
                    </span>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 rounded-full bg-[#10070F]/70 border border-[rgba(244,238,229,0.12)] flex items-center justify-center text-beige-50 group-hover:bg-champagne-400 group-hover:border-champagne-400 group-hover:text-[#10070F] transition-all duration-300"
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.div>
                  </div>

                  {/* Bottom: Text (slides up on hover) */}
                  <div className="relative z-10 space-y-2 transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="font-serif text-2xl sm:text-3xl text-beige-50 group-hover:text-champagne-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-beige-200/85 font-sans font-light leading-relaxed line-clamp-2">
                      {service.shortDescription}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
