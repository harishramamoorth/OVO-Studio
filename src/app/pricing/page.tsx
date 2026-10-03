"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence, useMotionValue } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight, ArrowDownRight } from "lucide-react";
import { PRICING_PLANS, VIDEO_ASSETS, IMAGE_ASSETS } from "@/lib/constants";

// Helper for masking text
const RevealText = ({ text, delay = 0, className = "", animateOnly = false }: { text: string, delay?: number, className?: string, animateOnly?: boolean }) => {
  return (
    <span className="overflow-hidden inline-flex">
      <motion.span
        initial={{ y: "110%", opacity: 0 }}
        {...(animateOnly ? { animate: { y: 0, opacity: 1 } } : { whileInView: { y: 0, opacity: 1 }, viewport: { once: true, margin: "0px" } })}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`inline-block ${className}`}
      >
        {text}
      </motion.span>
    </span>
  );
};

export default function PricingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-[#10070F] min-h-screen text-[#F4EEE5] overflow-x-hidden selection:bg-[#D6B65A]/30 selection:text-[#D6B65A]">
      {/* Page progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D6B65A] to-transparent origin-left z-50 opacity-80"
        style={{ scaleX }}
      />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[100svh] w-full flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.video
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-[0.35]"
            style={{ filter: "brightness(0.7) contrast(1.2)" }}
          >
            <source src={VIDEO_ASSETS.heroPrimary} type="video/mp4" />
          </motion.video>
          {/* Subtle multi-layer gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#10070F]/80 via-transparent to-[#10070F]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_#10070F_100%)] opacity-80" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[10px] tracking-[0.3em] uppercase text-[#D6B65A] font-semibold mb-8 flex items-center gap-3"
          >
            <span className="w-8 h-[1px] bg-[#D6B65A]/50" />
            SERVICES & INVESTMENT
            <span className="w-8 h-[1px] bg-[#D6B65A]/50" />
          </motion.div>

          <h1 className="text-[clamp(3.5rem,8vw,8.5rem)] leading-[0.95] tracking-tight font-serif text-[#F4EEE5] mb-10 max-w-5xl">
            <RevealText text="INVEST IN" delay={0.4} animateOnly={true} />
            <br />
            <span className="italic font-display text-[#D6B65A] font-light pr-4">
              <RevealText text="YOUR BRAND." delay={0.6} animateOnly={true} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="max-w-2xl text-base md:text-xl font-light text-[#C8BDB7] leading-relaxed mb-16 text-balance"
          >
            From strategy and identity to digital experiences and campaign production, we build the systems, stories and experiences that move fashion brands forward.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 items-center"
          >
            <Link
              href="#strategy"
              className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#10070F] bg-gradient-to-r from-[#F4EEE5] to-[#D6B65A] px-10 py-4 rounded-full hover:shadow-[0_0_30px_rgba(214,182,90,0.3)] hover:scale-[1.02] transition-all duration-500"
            >
              <span>EXPLORE SERVICES</span>
              <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-y-1 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 01: BRAND STRATEGY --- */}
      <section id="strategy" className="py-32 lg:py-48 max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start relative z-10">
          <div>
            <div className="text-[10px] tracking-[0.25em] text-[#D6B65A] font-bold mb-4">01</div>
            <h2 className="text-xs tracking-[0.25em] uppercase text-[#C8BDB7]/80 mb-10">BRAND STRATEGY</h2>
            <h3 className="font-serif text-5xl lg:text-7xl leading-[1.05] mb-10">
              <RevealText text="BUILD THE" />
              <br />
              <RevealText text="FOUNDATION." className="italic text-[#D6B65A]" delay={0.2} />
            </h3>
            <p className="text-[#C8BDB7] font-light leading-relaxed mb-16 max-w-md text-lg">
              Your brand begins long before the first campaign. We shape the positioning, identity and strategic direction that gives your fashion business a distinctive place in the market.
            </p>

            <div className="space-y-0 border-t border-[rgba(214,182,90,0.15)]">
              <ServiceRow num="01" title="LOGO & IDENTITY" price="From AED 1,500" />
              <ServiceRow num="02" title="BRAND STRATEGY" price="Custom Quote" />
              <ServiceRow num="03" title="BRAND POSITIONING" price="Custom Quote" />
            </div>
          </div>
          
          <div className="relative h-[60vh] lg:h-[80vh] w-full overflow-hidden group">
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0"
            >
              <img
                src="/media/fashion/price/pexels-ron-lach-8386652.jpg"
                alt="Brand Strategy"
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-out opacity-90"
              />
              <div className="absolute inset-0 bg-[#10070F]/10 group-hover:bg-transparent transition-colors duration-700" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 02: E-COMMERCE --- */}
      <section className="py-32 lg:py-48 relative overflow-hidden">
        {/* Subtle video background for the entire section */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]">
          <video src={VIDEO_ASSETS.heroFallback} autoPlay muted loop playsInline className="w-full h-full object-cover blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#10070F] via-[#10070F]/80 to-[#10070F]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-20 md:mb-32 text-center flex flex-col items-center">
            <div className="text-[10px] tracking-[0.25em] text-[#D6B65A] font-bold mb-4">02</div>
            <h2 className="text-xs tracking-[0.25em] uppercase text-[#C8BDB7]/80 mb-8">DIGITAL COMMERCE</h2>
            <h3 className="font-serif text-5xl lg:text-7xl leading-[1.05]">
              <RevealText text="TURN ATTENTION" />
              <br />
              <RevealText text="INTO DESIRE." className="italic text-[#D6B65A]" delay={0.2} />
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" style={{ perspective: 2000 }}>
            <CommerceCard
              title="ESSENTIAL"
              desc="For emerging fashion brands"
              price="From $4,500"
              features={["Responsive fashion storefront", "Product catalogue", "Mobile optimization", "Basic SEO", "Payment integration"]}
            />
            <CommerceCard
              title="SIGNATURE"
              desc="For growing fashion brands"
              price="$9,800"
              label="MOST REQUESTED"
              features={["Bespoke storefront", "Advanced UX", "Product filtering", "Analytics", "SEO", "Conversion optimization", "Support"]}
              highlight
            />
            <CommerceCard
              title="PRIVATE CLIENT"
              desc="For established brands"
              price="CUSTOM"
              features={["Bespoke commerce experience", "Custom integrations", "Advanced analytics", "Automation", "Strategic support"]}
            />
          </div>
        </div>
      </section>

      {/* --- SECTION 03: FASHION DEVELOPMENT --- */}
      <section className="py-32 lg:py-48 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 relative h-[60vh] lg:h-[80vh] w-full overflow-hidden group">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0"
            >
              <img
                src="/media/fashion/price/pexels-ron-lach-9849661.jpg"
                alt="Fashion Development"
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-out opacity-90"
              />
            </motion.div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="text-[10px] tracking-[0.25em] text-[#D6B65A] font-bold mb-4">03</div>
            <h2 className="text-xs tracking-[0.25em] uppercase text-[#C8BDB7]/80 mb-10">FASHION DEVELOPMENT</h2>
            <h3 className="font-serif text-5xl lg:text-7xl leading-[1.1] mb-12">
              <RevealText text="FROM IDEA" />
              <br />
              <RevealText text="TO FORM." className="italic text-[#D6B65A]" delay={0.2} />
            </h3>

            <div className="space-y-0 border-t border-[rgba(214,182,90,0.15)]">
              <ServiceRow num="01" title="TECH PACKS" price="Custom Quote" />
              <ServiceRow num="02" title="SAMPLING & PRODUCTION" price="Custom Quote" />
              <ServiceRow num="03" title="BESPOKE DESIGN" price="Custom Quote" />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 04: BESPOKE DESIGN --- */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="w-full h-full"
          >
            <img
              src="/media/fashion/price/pexels-silverkblack-36731169.jpg"
              alt="Bespoke Design"
              className="w-full h-full object-cover object-top opacity-50"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#10070F] via-[#10070F]/40 to-[#10070F]" />
        </div>

        <div className="relative z-10 text-center px-6 mt-20">
          <h2 className="font-serif text-[clamp(4rem,10vw,10rem)] leading-[0.85] text-[#F4EEE5] mb-8">
            DESIGNED
            <br />
            <span className="italic text-[#D6B65A] font-light">FOR YOU.</span>
          </h2>
          <p className="text-base md:text-xl font-light tracking-[0.1em] text-[#C8BDB7] mb-16 max-w-lg mx-auto">
            Your idea. Your silhouette. Your signature.
          </p>
          <Link
            href="/#consultation"
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#10070F] bg-gradient-to-r from-[#F4EEE5] to-[#D6B65A] px-10 py-5 rounded-full hover:scale-[1.03] transition-transform duration-500 shadow-[0_0_40px_rgba(214,182,90,0.25)] group"
          >
            <span>START A BESPOKE PROJECT</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* --- SECTION 06: PRICING EXPERIENCE --- */}
      <section className="py-32 lg:py-48 relative overflow-hidden">
        {/* Subtle video background for pricing */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]">
          <video src={VIDEO_ASSETS.contentCreation} autoPlay muted loop playsInline className="w-full h-full object-cover blur-md" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10070F] via-transparent to-[#10070F]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center mb-24 relative z-10">
          <div className="text-[10px] tracking-[0.25em] text-[#D6B65A] font-bold mb-4">INVESTMENT</div>
          <h2 className="font-serif text-5xl lg:text-7xl mb-6">
            <RevealText text="CHOOSE YOUR LEVEL" />
            <br />
            <RevealText text="OF AMBITION." className="italic text-[#D6B65A]" delay={0.2} />
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 relative z-10" style={{ perspective: 2000 }}>
          {PRICING_PLANS.map((plan, i) => (
            <PricingPanel3D key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </section>

    </div>
  );
}

// ---------------------------------------------------------
// Subcomponents
// ---------------------------------------------------------

function ServiceRow({ num, title, price }: { num: string, title: string, price: string }) {
  return (
    <Link href="/services" className="group block border-b border-[rgba(214,182,90,0.15)] py-8 hover:bg-[#D6B65A]/[0.03] transition-colors relative overflow-hidden">
      <div className="absolute bottom-0 left-0 h-[1.5px] bg-[#D6B65A] w-0 group-hover:w-full transition-all duration-[800ms] ease-out" />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-8">
          <span className="text-[10px] font-mono text-[#D6B65A]">{num}</span>
          <span className="text-base sm:text-lg tracking-[0.15em] font-light text-[#F4EEE5] uppercase group-hover:text-[#D6B65A] transition-colors duration-500">{title}</span>
        </div>
        <div className="flex items-center gap-6 text-[#C8BDB7]">
          <span className="text-sm font-light tracking-wide">{price}</span>
          <ArrowRight className="w-4 h-4 group-hover:text-[#D6B65A] group-hover:translate-x-2 transition-transform duration-500" />
        </div>
      </div>
    </Link>
  );
}

function CommerceCard({ title, desc, price, features, label, highlight }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

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
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
      className={`relative p-12 flex flex-col justify-between group cursor-pointer backdrop-blur-xl transition-colors duration-700 rounded-lg ${
        highlight 
          ? "bg-[#170B15]/80 border border-[#D6B65A]/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
          : "bg-[#10070F]/60 border border-[rgba(244,238,229,0.06)] hover:bg-[#170B15]/80 hover:border-[#D6B65A]/20"
      }`}
    >
      {/* Glossy overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-lg pointer-events-none" />

      <div style={{ transform: "translateZ(40px)" }}>
        {label && (
          <div className="text-[9px] tracking-[0.25em] font-bold text-[#10070F] bg-gradient-to-r from-[#F4EEE5] to-[#D6B65A] inline-block px-4 py-1.5 mb-8 uppercase rounded-full shadow-[0_0_15px_rgba(214,182,90,0.3)]">
            {label}
          </div>
        )}
        <div className="text-4xl font-serif text-[#D6B65A] mb-8 font-light italic">{title.substring(0,2)}<span className="text-2xl not-italic text-[#F4EEE5] ml-2 block mt-2 tracking-widest">{title}</span></div>
        
        <p className="text-sm text-[#C8BDB7] mb-8 min-h-[2.5rem] font-light">{desc}</p>
        <div className="text-xl font-serif text-[#D6B65A] mb-8 pb-8 border-b border-[rgba(214,182,90,0.15)]">{price}</div>
        
        <div className="text-[9px] uppercase tracking-[0.25em] text-[#C8BDB7] mb-6 font-bold">FEATURES</div>
        <ul className="space-y-4 mb-12">
          {features.map((feat: string, i: number) => (
            <li key={i} className="flex items-start gap-4 text-xs text-[#F4EEE5]/90 font-light">
              <Check className="w-3.5 h-3.5 text-[#D6B65A] mt-0.5 shrink-0" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>
      <Link href="/services" style={{ transform: "translateZ(30px)" }} className="text-[10px] tracking-[0.2em] font-bold text-[#D6B65A] hover:text-[#F4EEE5] uppercase flex items-center gap-3 transition-colors w-max relative z-10">
        EXPLORE PACKAGE <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}

function PricingPanel3D({ plan, index }: any) {
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`relative p-12 flex flex-col justify-between group cursor-pointer backdrop-blur-2xl transition-all duration-700 rounded-lg overflow-hidden ${
        plan.popular 
          ? "bg-[#170B15]/80 border border-[#D6B65A]/40 lg:-mt-6 lg:mb-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)]" 
          : "bg-[#10070F]/50 border border-[rgba(244,238,229,0.08)] hover:bg-[#170B15]/80 hover:border-[#D6B65A]/20"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />

      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className="text-[10px] text-[#D6B65A] font-bold mb-6 tracking-[0.25em]">0{index + 1}</div>
        <h4 className="text-2xl font-serif tracking-[0.15em] uppercase mb-4 text-[#F4EEE5]">{plan.name.replace('LUXURY SIGNATURE 360°', 'SIGNATURE').replace('GLOBAL SCALING HOUTE', 'PRIVATE CLIENT').replace('EMERGE & LAUNCH', 'FOUNDATION')}</h4>
        <p className="text-sm text-[#C8BDB7] leading-relaxed mb-10 min-h-[3.5rem] font-light">{plan.subtitle}</p>
        <div className="text-4xl font-serif text-[#D6B65A] mb-10">{plan.price}</div>

        <div className="text-[9px] uppercase tracking-[0.25em] text-[#C8BDB7] mb-6 border-b border-[rgba(214,182,90,0.15)] pb-3 font-bold">DELIVERABLES</div>
        <ul className="space-y-5 mb-14">
          {plan.features.slice(0, 5).map((feat: string, fIdx: number) => (
            <li key={fIdx} className="flex items-start gap-4 text-xs text-[#F4EEE5]/90 font-light leading-relaxed">
              <Check className="w-4 h-4 text-[#D6B65A] shrink-0 mt-0.5" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <Link
        href="/book"
        style={{ transform: "translateZ(30px)" }}
        className={`w-full py-5 text-[10px] font-bold uppercase tracking-[0.25em] flex justify-center items-center gap-3 transition-all duration-500 rounded-full relative z-10 ${
          plan.popular 
            ? "bg-gradient-to-r from-[#F4EEE5] to-[#D6B65A] text-[#10070F] hover:shadow-[0_0_25px_rgba(214,182,90,0.4)] hover:scale-[1.02]" 
            : "bg-transparent border border-[rgba(244,238,229,0.15)] text-[#F4EEE5] hover:border-[#D6B65A] hover:text-[#D6B65A]"
        }`}
      >
        <span>{plan.cta}</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}
