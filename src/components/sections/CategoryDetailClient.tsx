"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown, MessageCircle, Mail, CheckCircle2 } from "lucide-react";
import { ServiceCategory } from "@/lib/constants";

const HOW_WE_WORK = [
  {
    title: "Discovery & Vision Alignment",
    desc: "We begin by understanding your goals, values, and target audience to define your brand's unique identity. Every strategy we build starts with listening.",
  },
  {
    title: "Strategic Foundation",
    desc: "Comprehensive roadmaps, financial models, and brand positioning strategies are developed to ensure long-term viability and competitive advantage.",
  },
  {
    title: "Creative Development",
    desc: "Our atelier team translates strategy into tangible assets — from tech packs and collection designs to digital identities and campaign concepts.",
  },
  {
    title: "Implementation & Launch",
    desc: "We execute with precision, managing production, marketing rollout, and digital deployment for a flawless brand entrance into the market.",
  },
];

interface CategoryDetailClientProps {
  category: ServiceCategory;
  otherCategories: ServiceCategory[];
}

export default function CategoryDetailClient({
  category,
  otherCategories,
}: CategoryDetailClientProps) {
  const [activeTab, setActiveTab] = useState(category.services[0].slug);
  const [openAccordion, setOpenAccordion] = useState(0);

  const activeService =
    category.services.find((s) => s.slug === activeTab) || category.services[0];

  return (
    <div className="bg-[#0C040E] min-h-screen text-[#F4EEE5]">
      {/* ── HERO ── */}
      <div className="relative h-[65vh] min-h-[520px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={category.services[0].image}
            alt={category.title}
            className="w-full h-full object-cover brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C040E]/60 via-transparent to-[#0C040E]" />
        </div>

        {/* Breadcrumb */}
        <div className="absolute top-28 left-6 md:left-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#C8BDB7] hover:text-[#D6B65A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Services
          </Link>
          <span className="text-[#C8BDB7]/40 mx-2 text-xs">/</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D6B65A]">
            {category.title}
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-16 w-full space-y-4">
          <span className="px-3.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-[0.2em] uppercase bg-[#D6B65A]/15 text-[#D6B65A] border border-[#D6B65A]/30 inline-block">
            Category Deep-Dive
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-[#F4EEE5]">
            {category.title}
          </h1>
          <p className="text-sm md:text-base text-[#C8BDB7]/90 max-w-2xl font-light leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* ── INTERACTIVE TABBED SERVICES ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="space-y-3 mb-8 text-center md:text-left">
          <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#D6B65A]">
            Included Specializations
          </span>
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-[#F4EEE5]">
            Explore Services in This Category
          </h2>
        </div>

        {/* Tabs Header */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 border-b border-[rgba(214,182,90,0.15)] no-scrollbar">
          {category.services.map((item) => {
            const isActive = item.slug === activeTab;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.slug)}
                className={`px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-[#F4EEE5] via-[#D6B65A] to-[#B9974B] text-[#10070F] shadow-lg shadow-[#D6B65A]/20"
                    : "bg-[#170B17] text-[#C8BDB7] border border-[rgba(214,182,90,0.2)] hover:border-[#D6B65A]"
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </div>

        {/* Active Tab Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Service Image */}
            <div className="lg:col-span-5 relative min-h-[320px] rounded-2xl overflow-hidden border border-[rgba(214,182,90,0.2)] bg-[#170B17]">
              <img
                src={activeService.image}
                alt={activeService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10070F] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-mono uppercase text-[#D6B65A] tracking-widest block mb-1">
                  Featured Deliverable
                </span>
                <h3 className="text-lg font-bold text-[#F4EEE5]">
                  {activeService.title}
                </h3>
              </div>
            </div>

            {/* Service Details */}
            <div className="lg:col-span-7 bg-[#170B17] p-8 rounded-2xl border border-[rgba(214,182,90,0.15)] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold uppercase tracking-wider text-[#F4EEE5]">
                  {activeService.title}
                </h3>
                <p className="text-sm text-[#C8BDB7] leading-relaxed font-light">
                  {activeService.fullDescription}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#D6B65A] block font-mono">
                    Key Deliverables:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeService.deliverables.map((deliv, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#C8BDB7]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B65A] shrink-0" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(214,182,90,0.15)] flex flex-wrap items-center justify-between gap-4">
                <Link
                  href={`/services/${category.slug}/${activeService.slug}`}
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-[#10070F] bg-gradient-to-r from-[#F4EEE5] via-[#D6B65A] to-[#B9974B] hover:shadow-lg hover:shadow-[#D6B65A]/20 transition-all flex items-center gap-2"
                >
                  <span>View Full Service Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/book"
                  className="text-xs font-bold uppercase tracking-widest text-[#D6B65A] hover:text-white transition-colors"
                >
                  Book Consultation →
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── HOW WE WORK ACCORDION ── */}
      <section className="border-t border-[rgba(214,182,90,0.15)] py-20 bg-[#120713]">
        <div className="max-w-5xl mx-auto px-6 md:px-10 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#D6B65A]">
              Methodology & Execution
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-wide text-[#F4EEE5]">
              How We Work With Brands
            </h2>
          </div>

          <div className="space-y-4">
            {HOW_WE_WORK.map((step, index) => {
              const isOpen = openAccordion === index;
              return (
                <div
                  key={index}
                  className="bg-[#190C1A] border border-[rgba(214,182,90,0.15)] rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenAccordion(isOpen ? -1 : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[#D6B65A] font-mono text-sm font-bold">
                        0{index + 1}
                      </span>
                      <span className="text-base font-bold text-[#F4EEE5]">
                        {step.title}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#D6B65A] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-6 pb-6 pt-0 text-xs md:text-sm text-[#C8BDB7] leading-relaxed font-light border-t border-[rgba(214,182,90,0.08)]"
                      >
                        {step.desc}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EXPLORE OTHER CATEGORIES ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="flex items-center justify-between mb-10 border-b border-[rgba(214,182,90,0.15)] pb-4">
          <h3 className="text-lg font-bold uppercase tracking-wider text-[#F4EEE5]">
            Explore Other Capabilities
          </h3>
          <Link
            href="/services"
            className="text-xs font-bold uppercase tracking-widest text-[#D6B65A] hover:text-white transition-colors"
          >
            All Services →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/services/${cat.slug}`}
              className="p-6 rounded-2xl bg-[#170B17] border border-[rgba(214,182,90,0.15)] hover:border-[#D6B65A]/50 transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <h4 className="text-base font-bold text-[#F4EEE5] group-hover:text-[#D6B65A] transition-colors">
                  {cat.title}
                </h4>
                <p className="text-xs text-[#C8BDB7]/70 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-bold text-[#D6B65A] uppercase tracking-wider">
                <span>View Category</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
