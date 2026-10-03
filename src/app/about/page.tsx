"use client";

import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { VIDEO_ASSETS } from "@/lib/constants";

const RevealText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => (
  <span className="overflow-hidden inline-flex">
    <motion.span
      initial={{ y: "110%", opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-block ${className}`}
    >
      {text}
    </motion.span>
  </span>
);

const PILLARS = [
  {
    num: "01",
    title: "PRECISION STRATEGY",
    body: "We study your market, your consumer, and your competitors before we write a single line of strategy. Our research-backed frameworks have shaped brands across the Gulf, Europe, and Southeast Asia.",
  },
  {
    num: "02",
    title: "ATELIER CRAFTSMANSHIP",
    body: "From initial concept and tech packs to master sampling and final production, we maintain couture-level attention to detail through every step of the fashion development process.",
  },
  {
    num: "03",
    title: "360° ECOSYSTEM",
    body: "We are not a consultancy that hands you a deck and leaves. From the first brand sketch to your digital flagship and PR placement, we are an embedded partner for the full journey.",
  },
  {
    num: "04",
    title: "DUBAI AT THE CENTRE",
    body: "Headquartered in the Dubai Design District (d3), we bridge the creative energy of European couture with the commercial ambition of the GCC's fastest-growing luxury market.",
  },
];

const STATS = [
  { value: "150+", label: "Brands Elevated" },
  { value: "12+", label: "Years of Expertise" },
  { value: "35+", label: "Countries Reached" },
  { value: "360°", label: "Service Coverage" },
];

const TIMELINE_DATA = [
  {
    year: "2015",
    title: "THE GENESIS",
    desc: "Born from personal struggle in the fashion industry. Our founder experienced firsthand the pain of incomplete service providers and failed brand launches.",
  },
  {
    year: "2017",
    title: "FOUNDATION BUILDING",
    desc: "Established initial infrastructure and began developing proprietary manufacturing processes with premium fabric suppliers.",
  },
  {
    year: "2019",
    title: "FIRST SUCCESS STORIES",
    desc: "Breakthrough achievements in brand creation led to the realization the market desperately needed a complete solution.",
  },
  {
    year: "2021",
    title: "INFRASTRUCTURE MASTERY",
    desc: "Established comprehensive facilities: luxury showroom, advanced sample room, and state-of-the-art manufacturing unit.",
  },
  {
    year: "2023",
    title: "MARKET LEADERSHIP",
    desc: "Achieved 95% success rate with direct retail partnerships across UAE. Expanded team to 300+ professionals.",
  },
  {
    year: "2025",
    title: "GLOBAL EXPANSION ERA",
    desc: "After 10 years of excellence, strategic partnerships secured for international market conquest with proven 90% success rate.",
  },
];

function Tilt3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="bg-[#10070F] min-h-screen text-[#F4EEE5] overflow-x-hidden selection:bg-[#D6B65A]/30 selection:text-[#D6B65A]">
      {/* Page progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D6B65A] to-transparent origin-left z-50"
        style={{ scaleX }}
      />

      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="relative h-[100svh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.video
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            autoPlay muted loop playsInline
            className="w-full h-full object-cover opacity-30"
            style={{ filter: "brightness(0.7) contrast(1.15)" }}
          >
            <source src={VIDEO_ASSETS.mobileVertical} type="video/mp4" />
          </motion.video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#10070F]/70 via-transparent to-[#10070F]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#10070F_80%)]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <span className="w-10 h-[1px] bg-[#D6B65A]/50" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#D6B65A] font-bold">Dubai • Paris • Milan</span>
            <span className="w-10 h-[1px] bg-[#D6B65A]/50" />
          </motion.div>

          <h1 className="font-serif text-[clamp(3.5rem,9vw,9rem)] leading-[0.9] tracking-tight mb-10">
            <RevealText text="ARCHITECTS" delay={0.4} />
            <br />
            <span className="italic text-[#D6B65A] font-light">
              <RevealText text="OF FASHION" delay={0.6} />
            </span>
            <br />
            <RevealText text="DISTINCTION." delay={0.8} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-lg md:text-xl font-light text-[#C8BDB7] max-w-2xl mx-auto leading-relaxed"
          >
            Luxury Signature was founded to bridge the gap between creative fashion vision and commercial global scale.
          </motion.p>
        </div>
      </section>

      {/* ─── OUR STORY ───────────────────────────────── */}
      <section className="py-16 md:py-32 lg:py-48 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="text-[10px] tracking-[0.3em] text-[#D6B65A] font-bold mb-6">OUR STORY</div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl leading-[1.05] mb-6 md:mb-10">
              <RevealText text="WHERE WE" />
              <br />
              <RevealText text="BEGAN." className="italic text-[#D6B65A]" delay={0.15} />
            </h2>
            <div className="space-y-6 text-[#C8BDB7] font-light text-base lg:text-lg leading-relaxed max-w-xl">
              <p>
                Luxury Signature was born from a simple but radical belief: that every fashion brand, regardless of size, deserves world-class strategic, creative, and commercial support.
              </p>
              <p>
                Based in the prestigious Dubai Design District (d3), we bring together European couture sensibilities with Middle Eastern luxury market intelligence. Our founders spent over a decade working inside global fashion houses before founding the agency to democratise access to that institutional knowledge.
              </p>
              <p>
                Today, we serve founders, creative directors, and brand owners across the GCC, Europe, and beyond — from first capsule collection to international department store distribution.
              </p>
            </div>
          </div>

          <div className="relative h-[50vh] md:h-[70vh] lg:h-[85vh] overflow-hidden group">
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0"
            >
          <img
                src="/media/fashion/about/pexels-ron-lach-9849319.jpg"
                alt="Luxury Signature Atelier"
                className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10070F]/60 to-transparent" />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute bottom-8 right-8 bg-[#10070F]/90 backdrop-blur-xl border border-[#D6B65A]/30 p-6 max-w-[200px]"
            >
              <div className="text-3xl font-serif text-[#D6B65A] mb-1">d3</div>
              <div className="text-[10px] tracking-[0.2em] text-[#C8BDB7] uppercase">Dubai Design<br />District</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── STATS ───────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.08]">
          <video src={VIDEO_ASSETS.heroPrimary} autoPlay muted loop playsInline className="w-full h-full object-cover blur-lg" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#10070F] via-transparent to-[#10070F]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(214,182,90,0.12)]">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="bg-[#10070F] p-6 md:p-12 lg:p-16 flex flex-col items-center text-center group hover:bg-[#170B15] transition-colors duration-500"
              >
                <div className="font-serif text-4xl md:text-5xl lg:text-7xl text-[#D6B65A] mb-4 group-hover:scale-110 transition-transform duration-500">{stat.value}</div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#C8BDB7] font-light">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ────────────────────────────────── */}
      <section className="py-16 md:py-24 lg:py-40 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-20 lg:mb-32">
            <div className="text-[10px] tracking-[0.3em] text-[#D6B65A] font-bold mb-6">HERITAGE OF EXCELLENCE</div>
            <h2 className="font-serif text-4xl lg:text-6xl text-[#F4EEE5]">
              OUR <span className="italic text-[#D6B65A] font-light">JOURNEY.</span>
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Center line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[rgba(214,182,90,0.3)] to-transparent md:-translate-x-1/2" />

            <div className="space-y-12 md:space-y-24">
              {TIMELINE_DATA.map((item, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? "md:justify-start" : "md:justify-end"}`}
                  >
                    {/* Node Dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#10070F] border border-[#D6B65A] rounded-full top-6 md:top-1/2 md:-translate-y-1/2 -translate-x-[5px] md:-translate-x-1/2 shadow-[0_0_10px_rgba(214,182,90,0.5)] z-10" />

                    {/* Content Card */}
                    <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? "md:pr-12 text-left md:text-right" : "md:pl-12 text-left"}`}>
                      <div className="bg-[#170B15]/80 backdrop-blur-md border border-[rgba(214,182,90,0.15)] hover:border-[#D6B65A]/40 transition-colors duration-500 rounded-2xl p-8 lg:p-10 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                        
                        <div className="font-serif text-3xl lg:text-4xl text-[#D6B65A] mb-2">{item.year}</div>
                        <div className="text-[10px] tracking-[0.2em] text-[#F4EEE5] uppercase font-bold mb-4">{item.title}</div>
                        <p className="text-sm text-[#C8BDB7] font-light leading-relaxed">{item.desc}</p>
                        
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#D6B65A] to-transparent group-hover:w-full transition-all duration-700" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── OUR PHILOSOPHY ──────────────────────────── */}
      <section className="py-32 lg:py-48 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-24">
          <div className="text-[10px] tracking-[0.3em] text-[#D6B65A] font-bold mb-6">OUR PHILOSOPHY</div>
          <h2 className="font-serif text-5xl lg:text-7xl leading-[1.05]">
            <RevealText text="WHAT WE" />
            <br />
            <RevealText text="BELIEVE IN." className="italic text-[#D6B65A]" delay={0.15} />
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: 2000 }}>
          {PILLARS.map((pillar, i) => (
            <Tilt3D key={pillar.num}
              className={`${i === 0 ? "md:col-span-2" : ""}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-[#10070F]/70 backdrop-blur-xl border border-[rgba(214,182,90,0.12)] hover:border-[#D6B65A]/30 transition-all duration-700 p-12 lg:p-16 group overflow-hidden"
              >
                {/* Glossy top-left reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-[#D6B65A] to-transparent group-hover:w-full transition-all duration-700" />

                <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
                  <div className="text-[10px] font-mono text-[#D6B65A] tracking-[0.25em] mb-6">{pillar.num}</div>
                  <h3 className="font-serif text-2xl lg:text-4xl mb-6 tracking-[0.05em] text-[#F4EEE5]">{pillar.title}</h3>
                  <p className="text-[#C8BDB7] font-light leading-relaxed max-w-2xl text-base lg:text-lg">{pillar.body}</p>
                </div>
              </motion.div>
            </Tilt3D>
          ))}
        </div>
      </section>

      {/* ─── EDITORIAL SPLIT: MISSION ────────────────── */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="w-full h-full"
          >
            <img
              src="/media/fashion/about/pexels-michael-burrows-7147548.jpg"
              alt="Our Mission"
              className="w-full h-full object-cover opacity-40"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#10070F] via-[#10070F]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 max-w-2xl">
          <div className="text-[10px] tracking-[0.3em] text-[#D6B65A] font-bold mb-8">OUR MISSION</div>
          <blockquote className="font-serif text-4xl lg:text-6xl leading-[1.1] text-[#F4EEE5] mb-10">
            <RevealText text={`"To turn every`} />
            <br />
            <RevealText text="fashion vision" className="italic text-[#D6B65A] font-light" delay={0.2} />
            <br />
            <RevealText text={`into a living brand."`} delay={0.4} />
          </blockquote>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[#C8BDB7] font-light text-base max-w-md leading-relaxed"
          >
            Whether you are launching your first collection or scaling into global retail, we provide the strategy, craft, and creative direction to make it real.
          </motion.p>
        </div>
      </section>

      {/* ─── TEAM APPROACH ────────────────────────────── */}
      <section className="py-32 lg:py-48 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="text-[10px] tracking-[0.3em] text-[#D6B65A] font-bold mb-6">OUR APPROACH</div>
            <h2 className="font-serif text-5xl lg:text-6xl leading-[1.05] mb-10">
              <RevealText text="WE DON'T" />
              <br />
              <RevealText text="JUST ADVISE." className="italic text-[#D6B65A]" delay={0.15} />
              <br />
              <RevealText text="WE BUILD." delay={0.3} />
            </h2>
            <p className="text-[#C8BDB7] font-light text-base lg:text-lg leading-relaxed mb-8 max-w-lg">
              Most agencies hand you a strategy deck and disappear. We stay. From the first brand audit to the 100th order shipped, our team operates as an extension of your creative and commercial leadership.
            </p>
            <p className="text-[#C8BDB7] font-light text-base leading-relaxed max-w-lg">
              Our collective of strategists, designers, technologists, and production specialists is built specifically for the luxury fashion category — with no generalist thinking, no templates, and no shortcuts.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative lg:ml-auto w-full max-w-md aspect-[4/5] overflow-hidden rounded-2xl border border-[rgba(214,182,90,0.15)] group"
          >
            <img
              src="/media/fashion/about/image.png"
              alt="Our Team Approach"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10070F]/80 via-transparent to-transparent pointer-events-none" />
            
            {/* Subtle decorative element */}
            <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-[#D6B65A]/40 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-[#D6B65A]/40 pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* ─── CONTENT GALLERY ─────────────────────────── */}
      <section className="py-24 bg-[#0C040E] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12">
          <div className="text-[10px] tracking-[0.3em] text-[#D6B65A] font-bold">BEHIND THE SCENES</div>
        </div>
        <div className="flex gap-6 px-6 lg:px-10 overflow-x-auto pb-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {[
            { img: "/media/fashion/about/image.png", label: "OUR STUDIO" },
            { img: "/media/fashion/about/pexels-ron-lach-9849319.jpg", label: "ATELIER" },
            { img: "/media/fashion/about/pexels-michael-burrows-7147548.jpg", label: "PRODUCTION" },
            { img: "/media/fashion/price/pexels-silverkblack-36731169.jpg", label: "EDITORIAL" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="w-[260px] md:w-[300px] lg:w-[340px] aspect-[4/5] relative overflow-hidden group cursor-pointer flex-shrink-0 rounded-2xl border border-[rgba(214,182,90,0.1)]"
            >
              <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out brightness-90 group-hover:brightness-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C040E] via-[#0C040E]/20 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
              
              <div className="absolute bottom-6 left-6 z-10">
                <div className="text-[10px] font-mono text-[#D6B65A] mb-3">0{i + 1}</div>
                <div className="text-xs tracking-[0.2em] text-[#F4EEE5] uppercase font-semibold group-hover:text-[#D6B65A] transition-colors duration-500">{item.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────── */}
      <section className="py-32 lg:py-48 max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="text-[10px] tracking-[0.3em] text-[#D6B65A] font-bold mb-8">YOUR BRAND AWAITS</div>
          <h2 className="font-serif text-5xl lg:text-8xl leading-[0.95] mb-10">
            READY TO
            <br />
            <span className="italic text-[#D6B65A] font-light">DISCUSS YOUR</span>
            <br />
            BRAND&#39;S FUTURE?
          </h2>
          <p className="text-[#C8BDB7] font-light max-w-xl mx-auto mb-14 text-lg leading-relaxed">
            Book a private consultation with our founding team. No templates, no formulas — just a genuine conversation about your brand's potential.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/book"
              className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#10070F] bg-gradient-to-r from-[#F4EEE5] to-[#D6B65A] px-10 py-5 rounded-full hover:shadow-[0_0_40px_rgba(214,182,90,0.35)] hover:scale-[1.02] transition-all duration-500"
            >
              <span>BOOK EXECUTIVE CONSULTATION</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/services"
              className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F4EEE5] hover:text-[#D6B65A] transition-colors duration-300"
            >
              <span>EXPLORE OUR SERVICES</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
