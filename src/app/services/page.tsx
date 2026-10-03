"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/constants";

const CATEGORY_ICONS: Record<string, string> = {
  "fashion-business-consulting": "01",
  "fashion-brand-development": "02",
  "digital-presence": "03",
  "marketing-and-promotion": "04",
  "content-creation": "05",
};

export default function ServicesPage() {
  return (
    <div className="bg-[#0C040E] min-h-screen text-[#F4EEE5]">

      {/* Hero */}
      <div className="relative pt-40 pb-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#D6B65A]/5 rounded-full blur-[120px]" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(214,182,90,0.08)] border border-[rgba(214,182,90,0.2)] mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D6B65A]">360° Luxury Fashion Services</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-[#F4EEE5] mb-6 leading-tight">
            Our Full Portfolio of<br />
            <span className="text-[#D6B65A] italic">Fashion Solutions</span>
          </h1>
          <p className="text-[#C8BDB7] font-light text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            From launching your first label to scaling a global luxury house — explore our complete suite of strategy, design, digital, marketing, and content services.
          </p>
        </motion.div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 pb-32 space-y-6">
        {SERVICE_CATEGORIES.map((category, catIdx) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: catIdx * 0.1 }}
          >
            {/* Category Block */}
            <Link href={`/services/${category.slug}`} className="group block">
              <div className="bg-[#170B15] border border-[rgba(214,182,90,0.15)] hover:border-[#D6B65A]/50 rounded-2xl overflow-hidden transition-all duration-500 shadow-xl hover:shadow-[0_0_40px_rgba(214,182,90,0.08)]">
                <div className="flex flex-col lg:flex-row">

                  {/* Image Strip */}
                  <div className="lg:w-2/5 relative h-64 lg:h-auto overflow-hidden">
                    <img
                      src={category.services[0].image}
                      alt={category.title}
                      className="w-full h-full object-cover brightness-[0.6] group-hover:brightness-[0.75] group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#170B15]" />
                    <div className="absolute top-6 left-6">
                      <span className="text-[#D6B65A]/50 font-mono text-5xl font-bold leading-none">
                        {CATEGORY_ICONS[category.slug]}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-3/5 p-8 lg:p-10 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <h2 className="text-2xl md:text-3xl font-serif text-[#F4EEE5] group-hover:text-[#D6B65A] transition-colors leading-tight">
                          {category.title}
                        </h2>
                        <ArrowUpRight className="w-5 h-5 text-[#D6B65A] opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0 ml-4 mt-1" />
                      </div>
                      <p className="text-sm text-[#C8BDB7] leading-relaxed font-light">
                        {category.description}
                      </p>
                    </div>

                    {/* Sub-service Tabs */}
                    <div className="mt-8 flex flex-wrap gap-2">
                      {category.services.map((service) => (
                        <span
                          key={service.id}
                          className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] border border-[rgba(214,182,90,0.25)] text-[#C8BDB7] rounded-full group-hover:border-[#D6B65A]/40 group-hover:text-[#D6B65A] transition-colors"
                        >
                          {service.title}
                        </span>
                      ))}
                      <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#D6B65A] flex items-center gap-1.5">
                        View All <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* CTA Banner */}
      <div className="bg-[#170B15] border-t border-[rgba(214,182,90,0.15)] py-24 text-center px-6">
        <h3 className="text-3xl md:text-4xl font-serif text-[#F4EEE5] mb-4">
          Need a Tailored Custom Scope?
        </h3>
        <p className="text-sm text-[#C8BDB7] max-w-lg mx-auto mb-8 leading-relaxed font-light">
          Our Dubai atelier team will design a fully customized strategy roadmap for your brand's specific requirements.
        </p>
        <Link
          href="/book"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F4EEE5] via-[#D6B65A] to-[#B9974B] text-[#10070F] px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(214,182,90,0.3)] transition-all"
        >
          Book Tailored Consultation <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
