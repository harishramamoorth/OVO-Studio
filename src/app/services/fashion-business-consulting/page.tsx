"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Briefcase, CheckCircle2, Sparkles, TrendingUp, Target, Globe } from "lucide-react";

// Helper component for luxury word-by-word text reveal
const AnimatedText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const words = text.split(" ");
  
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: "100%",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.28em] ${className || ""}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden inline-block py-1">
          <motion.span variants={child} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default function FashionBusinessConsultingPage() {
  const services = [
    {
      id: "01",
      title: "Brand Strategy & Launching",
      subtitle: "Full-spectrum market launch & identity roadmap",
      description: "360° roadmap for luxury brand establishment, business modeling, and high-impact market entry frameworks tailored for the modern elite.",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop",
      href: "/services/fashion-business-consulting/brand-strategy-launching",
      tags: ["Market Entry", "Brand Identity", "Business Model"],
      icon: Target,
    },
    {
      id: "02",
      title: "Brand Booster & Scaling",
      subtitle: "Global distribution & retail penetration",
      description: "Strategic expansion strategies, wholesale distribution pipelines, and retail penetration for sustainable global growth.",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop",
      href: "/services/fashion-business-consulting/brand-booster-scaling",
      tags: ["Wholesale Pipelines", "Retail Scaling", "Global Growth"],
      icon: TrendingUp,
    },
    {
      id: "03",
      title: "Market Positioning & Pricing",
      subtitle: "Elite pricing models & equity alignment",
      description: "Psychological luxury pricing frameworks and high-end market alignment strategy to maximize brand equity and margin performance.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
      href: "/services/fashion-business-consulting/market-positioning-pricing",
      tags: ["Luxury Pricing", "Equity Alignment", "Margin Optimization"],
      icon: Globe,
    }
  ];

  const stats = [
    { value: "120+", label: "Luxury Brands Launched" },
    { value: "18", label: "Global Fashion Capitals" },
    { value: "95%", label: "Client Retention Rate" },
    { value: "8+ Yrs", label: "Dubai & Global Expertise" },
  ];

  const processSteps = [
    { step: "01", title: "Diagnostic & Audit", desc: "In-depth positioning, market whitespace identification, and brand equity analysis." },
    { step: "02", title: "Strategic Architecture", desc: "Crafting bespoke luxury pricing models, brand DNA, and commercial roadmap." },
    { step: "03", title: "Market Penetration", desc: "Executing high-touch distributor outreach, press alignment, and pop-up launches." },
    { step: "04", title: "Sustained Scaling", desc: "Optimizing wholesale inventory pipelines, e-commerce conversion, and global expansion." },
  ];

  return (
    <main className="relative min-h-screen bg-[#0D050C] text-[#F4EEE5] font-sans pt-28 pb-36 overflow-x-hidden selection:bg-[#D6B65A]/30 selection:text-[#D6B65A]">
      
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] bg-[#D6B65A]/5 rounded-full blur-[180px] animate-pulse" />
        <div className="absolute top-1/2 -left-60 w-[600px] h-[600px] bg-[#3d1235]/20 rounded-full blur-[160px]" />
        <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] bg-[#D6B65A]/4 rounded-full blur-[170px]" />
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{ backgroundImage: `radial-gradient(#D6B65A 1px, transparent 1px)`, backgroundSize: '32px 32px' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Breadcrumb Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-12"
        >
          <Link href="/" className="text-[11px] uppercase tracking-[0.2em] text-[#C8BDB7]/50 hover:text-[#D6B65A] transition-colors">Home</Link>
          <span className="text-[#C8BDB7]/30 text-xs">/</span>
          <Link href="/services" className="text-[11px] uppercase tracking-[0.2em] text-[#C8BDB7]/50 hover:text-[#D6B65A] transition-colors">Services</Link>
          <span className="text-[#C8BDB7]/30 text-xs">/</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#D6B65A] font-semibold">Fashion Business Consulting</span>
        </motion.div>

        {/* Hero Header Section */}
        <div className="mb-20 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(214,182,90,0.08)] border border-[rgba(214,182,90,0.2)] mb-6"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B65A]" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#D6B65A]">
              Category 01 &mdash; Executive Advisory
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#F4EEE5] mb-8 uppercase tracking-[0.02em] leading-[1.03]">
            <AnimatedHeading text="Fashion Business" delay={0.1} />
            <br />
            <span className="italic text-[#D6B65A] font-light">
              <AnimatedHeading text="Consulting." delay={0.3} />
            </span>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-[#C8BDB7]/80 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-10"
          >
            From launching your brand to scaling it globally, we provide the strategy, insight, and high-impact commercial frameworks needed to thrive in the luxury market.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link 
              href="/contact" 
              className="group inline-flex items-center gap-3 bg-[#D6B65A] text-[#0D050C] px-8 py-4 rounded-full font-sans font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#F4EEE5] hover:shadow-[0_0_30px_rgba(214,182,90,0.4)] transition-all duration-300"
            >
              <span>Schedule Strategy Call</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#services-grid" 
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-[rgba(244,238,229,0.15)] hover:border-[#D6B65A]/50 text-xs uppercase tracking-[0.2em] font-semibold text-[#C8BDB7] hover:text-[#D6B65A] transition-all duration-300"
            >
              Explore Pillars ↓
            </a>
          </motion.div>
        </div>

        {/* Executive Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-[#150914]/80 border border-[rgba(214,182,90,0.15)] backdrop-blur-md mb-24"
        >
          {stats.map((item, idx) => (
            <div key={idx} className="relative group text-center md:text-left">
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#D6B65A] font-light mb-1 group-hover:scale-105 transition-transform duration-300 origin-left">
                {item.value}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#C8BDB7]/60 font-sans">
                {item.label}
              </div>
              {idx < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-[rgba(214,182,90,0.15)]" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Services Section Header */}
        <div id="services-grid" className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[rgba(244,238,229,0.08)] pb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D6B65A] font-semibold block mb-2">Pillars of Excellence</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4EEE5]">Strategic Advisory Services</h2>
          </div>
          <p className="text-[#C8BDB7]/60 text-xs sm:text-sm max-w-md">
            Tailored specifically for emerging fashion houses, heritage re-positioning, and high-growth luxury labels.
          </p>
        </div>

        {/* 3-Column Luxury Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-28">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="group flex flex-col h-full rounded-2xl overflow-hidden bg-[#150914] border border-[rgba(214,182,90,0.15)] hover:border-[#D6B65A] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
              >
                {/* Image Box */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover object-center brightness-90 group-hover:scale-108 group-hover:brightness-100 transition-all duration-700 ease-out"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#150914] via-[#150914]/20 to-transparent opacity-90" />

                  {/* Top floating ID badge */}
                  <div className="absolute top-5 left-5 w-10 h-10 rounded-full bg-[#0D050C]/70 backdrop-blur-md border border-[rgba(214,182,90,0.3)] flex items-center justify-center font-serif text-sm font-light text-[#D6B65A]">
                    {service.id}
                  </div>

                  {/* Icon badge right */}
                  <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#D6B65A]/10 border border-[#D6B65A]/20 flex items-center justify-center text-[#D6B65A] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                {/* Content Box */}
                <div className="flex-1 flex flex-col justify-between p-7 sm:p-8 space-y-6">
                  <div className="space-y-3">
                    <span className="text-[9px] uppercase tracking-[0.22em] text-[#D6B65A] font-semibold block">
                      {service.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl text-[#F4EEE5] group-hover:text-[#D6B65A] transition-colors duration-300 leading-snug flex items-start justify-between gap-2">
                      <span>{service.title}</span>
                      <ArrowUpRight className="w-5 h-5 text-[#D6B65A] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0 mt-1" />
                    </h3>
                    <p className="text-[#C8BDB7]/80 text-xs sm:text-sm font-light leading-relaxed pt-1">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[rgba(244,238,229,0.06)] space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {service.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-[9px] uppercase tracking-[0.12em] font-semibold text-[#D6B65A]/90 bg-[rgba(214,182,90,0.06)] border border-[rgba(214,182,90,0.15)] rounded-full px-2.5 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link 
                      href={service.href} 
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#D6B65A] group-hover:text-[#F4EEE5] transition-colors pt-2"
                    >
                      <span>Explore Roadmap</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Methodology / Process Section */}
        <section className="mb-28 p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-b from-[#150914] to-[#0D050C] border border-[rgba(214,182,90,0.15)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D6B65A]/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-3xl mb-14">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D6B65A] font-semibold block mb-3">Our Framework</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#F4EEE5] leading-tight">
              The Luxury Advisory Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((p, idx) => (
              <motion.div 
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative space-y-3"
              >
                <div className="font-serif text-5xl text-[#D6B65A]/30 font-light">{p.step}</div>
                <h4 className="font-serif text-xl text-[#F4EEE5]">{p.title}</h4>
                <p className="text-xs text-[#C8BDB7]/70 font-light leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* High-End Executive CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative text-center p-12 sm:p-16 rounded-3xl bg-gradient-to-r from-[#170A16] via-[#240F22] to-[#170A16] border border-[#D6B65A]/30 shadow-[0_0_60px_rgba(214,182,90,0.08)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,182,90,0.12),transparent_70%)] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6B65A]/10 border border-[#D6B65A]/30 text-[#D6B65A] text-[10px] uppercase tracking-[0.2em] font-semibold">
              <Sparkles className="w-3 h-3" /> Private Advisory
            </div>
            
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F4EEE5] leading-tight">
              Ready to position your brand at the <span className="italic text-[#D6B65A] font-light">pinnacle of luxury?</span>
            </h2>

            <p className="text-sm sm:text-base text-[#C8BDB7]/80 font-light max-w-lg mx-auto leading-relaxed">
              Book an exploratory session with our senior strategy partners in Dubai to evaluate your brand expansion path.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/contact"
                className="group inline-flex items-center gap-3 bg-[#D6B65A] text-[#0D050C] px-10 py-4 rounded-full font-sans font-semibold text-xs uppercase tracking-[0.2em] hover:bg-[#F4EEE5] hover:shadow-[0_0_30px_rgba(214,182,90,0.4)] transition-all duration-300"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}

// Helper AnimatedHeading function for section titles
function AnimatedHeading({ text, delay = 0 }: { text: string; delay?: number }) {
  return <AnimatedText text={text} delay={delay} />;
}

