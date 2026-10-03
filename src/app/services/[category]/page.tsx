"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown, MessageCircle, Mail, CheckCircle2 } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/constants";

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

export default function ServiceCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = SERVICE_CATEGORIES.find((cat) => cat.slug === params.category);

  if (!category) {
    notFound();
  }

  const [activeTab, setActiveTab] = useState(category.services[0].slug);
  const [openAccordion, setOpenAccordion] = useState(0);

  const activeService = category.services.find((s) => s.slug === activeTab) || category.services[0];

  // Other categories for "Explore More" section
  const otherCategories = SERVICE_CATEGORIES.filter((c) => c.slug !== category.slug).slice(0, 3);

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
          <Link href="/services" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#C8BDB7] hover:text-[#D6B65A] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> All Services
          </Link>
          <span className="text-[#C8BDB7]/40 mx-2 text-xs">/</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D6B65A]">{category.title}</span>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pb-20 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-[#F4EEE5] uppercase tracking-wide leading-tight"
          >
            {category.title}<br />
            
            <span className="text-[#D6B65A]">For Ambitious Brands</span>
          </motion.h1>
        </div>
      </div>

      {/* ── STICKY TAB BAR ── */}
      <div className="sticky top-0 z-40 bg-[#0C040E]/95 backdrop-blur-xl border-b border-[rgba(214,182,90,0.2)] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-6 flex overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {category.services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(service.slug)}
              className={`flex-shrink-0 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] border-b-2 transition-all duration-300 whitespace-nowrap ${
                activeTab === service.slug
                  ? "border-[#D6B65A] text-[#D6B65A]"
                  : "border-transparent text-[#C8BDB7] hover:text-[#F4EEE5] hover:border-[rgba(214,182,90,0.3)]"
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>
      </div>

      {/* ── INTRO TEXT ── */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 text-center space-y-5">
        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em] text-[#D6B65A]">
          Strategic Guidance for Every Stage of Your Brand&#39;s Journey
        </h2>
        <p className="text-sm md:text-base text-[#C8BDB7] font-light leading-relaxed">
          {category.description} Whether you&#39;re launching a new label, redefining your market position, or expanding into new territories, OVO&#39;s expertise gives you the tools and insights to succeed.
        </p>
      </div>

      {/* ── ZIG-ZAG SERVICES ── */}
      <div className="max-w-7xl mx-auto px-6 pb-16 md:pb-24 space-y-16 md:space-y-28">
        {category.services.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={service.id}
              id={service.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col lg:flex-row gap-8 lg:gap-20 items-center scroll-mt-24 ${!isEven ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <Link href={`/services/${category.slug}/${service.slug}`} className="block group relative aspect-[4/3] rounded-2xl overflow-hidden border border-[rgba(214,182,90,0.15)] hover:border-[#D6B65A]/50 shadow-2xl transition-all duration-500">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover brightness-[0.7] group-hover:brightness-[0.85] group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C040E]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-[#D6B65A] flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-[#10070F]" />
                    </div>
                  </div>
                </Link>
              </div>

              {/* Text */}
              <div className="w-full lg:w-1/2 space-y-5 md:space-y-6">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#F4EEE5] uppercase tracking-wide leading-tight">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-[#C8BDB7] leading-relaxed font-light">
                  {service.fullDescription}
                </p>

                {service.features.length > 0 && (
                  <ul className="space-y-2.5 pt-2">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs text-[#C8BDB7]">
                        <CheckCircle2 className="w-4 h-4 text-[#D6B65A] shrink-0 mt-0.5" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex items-center gap-6 pt-4">
                  <Link
                    href={`/services/${category.slug}/${service.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D6B65A] hover:text-[#F4EEE5] transition-colors group"
                  >
                    Explore Service
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] border border-[rgba(214,182,90,0.3)] text-[#C8BDB7] hover:border-[#D6B65A] hover:text-[#D6B65A] px-5 py-2.5 rounded-full transition-all"
                  >
                    Book Consultation
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── HOW WE WORK ── */}
      <div className="bg-[#170B15] border-y border-[rgba(214,182,90,0.15)] py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4 space-y-5 md:space-y-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#F4EEE5] uppercase tracking-wide">
              How We Work
            </h2>
            <p className="text-sm text-[#C8BDB7] leading-relaxed font-light">
              At OVO, we guide fashion brands from the spark of an idea to a successful market launch. Every strategy is built on a deep understanding of your vision, values, and audience.
            </p>
            <Link href="/book" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D6B65A] border border-[#D6B65A]/40 px-6 py-3 rounded-full hover:bg-[#D6B65A] hover:text-[#10070F] transition-all">
              Book a Session <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="lg:col-span-8 space-y-3">
            {HOW_WE_WORK.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#10070F] border border-[rgba(214,182,90,0.2)] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setOpenAccordion(openAccordion === idx ? -1 : idx)}
              >
                <div className="flex items-center justify-between px-6 py-5">
                  <div className="flex items-center gap-5">
                    <span className="text-[#D6B65A]/50 font-mono text-sm font-bold">0{idx + 1}</span>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#F4EEE5]">{step.title}</h4>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#D6B65A] transition-transform duration-300 ${openAccordion === idx ? "rotate-180" : ""}`} />
                </div>
                <AnimatePresence>
                  {openAccordion === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-5"
                    >
                      <div className="h-px bg-[rgba(214,182,90,0.1)] mb-4" />
                      <p className="text-xs text-[#C8BDB7] leading-relaxed ml-9">{step.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EXPLORE MORE CATEGORIES ── */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#C8BDB7] mb-10 text-center">Explore More Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/services/${cat.slug}`}
              className="group relative aspect-[3/2] rounded-xl overflow-hidden border border-[rgba(214,182,90,0.15)] hover:border-[#D6B65A]/50 transition-all duration-500"
            >
              <img src={cat.services[0].image} alt={cat.title} className="w-full h-full object-cover brightness-[0.4] group-hover:brightness-[0.6] group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C040E]/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#D6B65A] mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Explore</p>
                <h4 className="text-sm font-serif text-[#F4EEE5] group-hover:text-[#D6B65A] transition-colors">{cat.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── FOOTER CTA ── */}
      <div className="py-20 text-center border-t border-[rgba(214,182,90,0.15)] space-y-10 px-6">
        <Link
          href="/book"
          className="inline-flex items-center gap-3 text-2xl font-serif text-[#D6B65A] hover:text-[#F4EEE5] transition-colors group"
        >
          BOOK YOUR APPOINTMENT
          <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </Link>

        <div className="pt-6 border-t border-[rgba(214,182,90,0.15)] max-w-sm mx-auto">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8BDB7] mb-6">For More Contact Us</h4>
          <div className="flex items-center justify-center gap-4">
            <a href="https://wa.me/971561166811" target="_blank" rel="noreferrer" className="flex items-center justify-center w-32 py-3 bg-[rgba(214,182,90,0.08)] border border-[#D6B65A]/30 text-[#D6B65A] hover:bg-[#D6B65A] hover:text-[#10070F] rounded-lg transition-all">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="mailto:info@ovosignature.com" className="flex items-center justify-center w-32 py-3 bg-[rgba(214,182,90,0.08)] border border-[#D6B65A]/30 text-[#D6B65A] hover:bg-[#D6B65A] hover:text-[#10070F] rounded-lg transition-all">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
