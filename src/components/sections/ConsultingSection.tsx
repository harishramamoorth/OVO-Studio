"use client";

import { motion, Variants, useSpring, useTransform, useMotionValue } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, TrendingUp, Sparkles, Target, Globe, ArrowRight } from "lucide-react";
import { SERVICE_CATEGORIES, VIDEO_ASSETS } from "@/lib/constants";

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
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
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

export default function ConsultingSection() {
  const category = SERVICE_CATEGORIES[0]; // Fashion Business Consulting

  const consultingImages = [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop", // Haute Couture Red Silk Evening Dress
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop", // Luxury Runway Emerald Couture Gown
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1400&auto=format&fit=crop", // Gold Embroidered High-Fashion Dress & Product
  ];

  const cardMeta = [
    { icon: Target, tags: ["Market Entry", "Couture Identity", "Roadmap"] },
    { icon: TrendingUp, tags: ["Wholesale", "Retail Penetration", "Scaling"] },
    { icon: Globe, tags: ["Luxury Pricing", "Equity", "Positioning"] },
  ];

  return (
    <section id={category.slug} className="relative py-32 lg:py-48 bg-[#0C040E] text-[#F4EEE5] overflow-hidden">
      
      {/* Subtle Video Background for the entire section */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.1]">
        <video src={VIDEO_ASSETS.contentCreation} autoPlay muted loop playsInline className="w-full h-full object-cover blur-md" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C040E] via-[#0C040E]/60 to-[#0C040E]" />
      </div>

      {/* Ambient Rich Radial Background Glows */}
      <div className="absolute top-0 right-0 w-[650px] h-[650px] bg-[#D6B65A]/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-[#581c4e]/30 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[450px] h-[450px] bg-[#2b0d27]/40 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Decorative vertical gold guideline */}
      <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[rgba(214,182,90,0.2)] to-transparent pointer-events-none hidden md:block z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-20 space-y-5">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[rgba(214,182,90,0.08)] border border-[rgba(214,182,90,0.2)]"
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#D6B65A]" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#D6B65A] font-sans">
              CATEGORY 01 &mdash; STRATEGIC ADVISORY
            </span>
          </motion.div>
          
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-normal text-[#F4EEE5] tracking-tight uppercase leading-[1.05]">
            <AnimatedText text="Fashion Business" delay={0.1} />
            <br />
            <span className="italic text-[#D6B65A] font-light">
              <AnimatedText text="Consulting." delay={0.3} />
            </span>
          </h2>

          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-[1px] bg-gradient-to-r from-[#D6B65A] to-transparent origin-left my-4"
          />

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-base sm:text-lg lg:text-xl text-[#C8BDB7]/85 font-sans font-light leading-relaxed max-w-2xl"
          >
            From launching your brand to scaling it globally, we provide the strategy, insight, and high-impact commercial frameworks needed to thrive in the luxury market.
          </motion.p>
        </div>

        {/* 3 Luxury Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20" style={{ perspective: 2000 }}>
          {category.services.map((service, index) => {
            const cardImg = consultingImages[index] || service.image;
            const meta = cardMeta[index] || cardMeta[0];

            return (
              <ConsultingCard3D 
                key={service.id} 
                service={service} 
                index={index} 
                cardImg={cardImg} 
                meta={meta} 
                categorySlug={category.slug} 
              />
            );
          })}
        </div>

        {/* Category Footer Link */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-[#150914] border border-[rgba(214,182,90,0.15)]"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#D6B65A]" />
            <span className="text-sm font-serif text-[#F4EEE5]">
              Looking for bespoke brand architecture or high-end retail launch support?
            </span>
          </div>
          <Link 
            href={`/services/${category.slug}`}
            className="group inline-flex items-center gap-2.5 bg-[#D6B65A] text-[#10070F] px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#F4EEE5] transition-all duration-300 shrink-0"
          >
            <span>Explore All Consulting Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

function ConsultingCard3D({ service, index, cardImg, meta, categorySlug }: any) {
  const IconComp = meta.icon;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col h-[480px] sm:h-[520px]"
    >
      <Link
        href={`/services/${categorySlug}/${service.slug}`}
        className="relative flex-1 flex flex-col justify-between rounded-2xl overflow-hidden bg-[#170B15]/70 backdrop-blur-xl border border-[rgba(214,182,90,0.15)] hover:border-[#D6B65A]/40 transition-all duration-700 hover:shadow-[0_22px_60px_rgba(0,0,0,0.6)]"
        data-cursor="view"
      >
        {/* Glossy overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none z-10" />

        {/* Image Container */}
        <div className="relative h-[58%] w-full overflow-hidden" style={{ transform: "translateZ(20px)" }}>
          <img
            src={cardImg}
            alt={service.title}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#170B15] via-[#170B15]/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
          
          {/* Top-left number badge */}
          <span className="absolute top-4 left-4 font-serif text-sm font-light text-[#D6B65A] bg-[#10070F]/80 backdrop-blur-md w-9 h-9 rounded-full border border-[rgba(214,182,90,0.3)] flex items-center justify-center">
            0{index + 1}
          </span>

          {/* Top-right floating ArrowUpRight badge */}
          <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#10070F]/60 backdrop-blur-md border border-[rgba(214,182,90,0.25)] flex items-center justify-center text-[#D6B65A] group-hover:bg-[#D6B65A] group-hover:text-[#10070F] transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Text Container */}
        <div className="relative z-10 p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-4" style={{ transform: "translateZ(40px)" }}>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#D6B65A] font-semibold">
              <IconComp className="w-3.5 h-3.5" />
              <span>Module 0{index + 1}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F4EEE5] group-hover:text-[#D6B65A] transition-colors duration-300 leading-snug">
              {service.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#C8BDB7]/80 font-sans font-light leading-relaxed line-clamp-2">
              {service.shortDescription}
            </p>
          </div>

          {/* Tag Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[rgba(244,238,229,0.06)]">
            {meta.tags.map((tag: string) => (
              <span key={tag} className="text-[9px] uppercase tracking-[0.12em] font-semibold text-[#D6B65A]/90 bg-[rgba(214,182,90,0.06)] border border-[rgba(214,182,90,0.15)] rounded-full px-2.5 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Gold Line Sweep Effect on Hover */}
        <div className="w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-[#D6B65A] via-[#F4EEE5] to-[#D6B65A] transition-all duration-500 absolute bottom-0 left-0" />
      </Link>
    </motion.div>
  );
}

