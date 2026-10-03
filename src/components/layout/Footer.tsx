"use client";

import Link from "next/link";
import Logo from "@/components/common/Logo";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import { ArrowUp, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#10070F] text-beige-200 border-t border-[rgba(244,238,229,0.08)] relative overflow-hidden pt-24 pb-12">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-20 border-b border-[rgba(244,238,229,0.08)]">
          
          {/* Brand Identity & Vision */}
          <div className="lg:col-span-2 space-y-6">
            <Logo showText={true} />

            <p className="text-xs sm:text-sm text-beige-200/80 font-sans font-light leading-relaxed max-w-sm">
              Dubai’s premier 360° fashion solutions ecosystem empowering luxury fashion houses, couture designers, and global labels from concept to market supremacy.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#170B15] border border-[rgba(244,238,229,0.12)] flex items-center justify-center text-beige-50 hover:text-champagne-400 hover:border-champagne-400 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#170B15] border border-[rgba(244,238,229,0.12)] flex items-center justify-center text-beige-50 hover:text-champagne-400 hover:border-champagne-400 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: SERVICES */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.18em] font-semibold text-champagne-400 border-b border-champagne-400/20 pb-2 inline-block">
              SERVICES
            </h4>
            <ul className="space-y-2.5">
              {SERVICE_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/services#${cat.slug}`}
                    className="text-xs text-beige-200/80 hover:text-white transition-colors block"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: ABOUT */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.18em] font-semibold text-champagne-400 border-b border-champagne-400/20 pb-2 inline-block">
              ABOUT
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-xs text-beige-200/80 hover:text-white transition-colors block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-xs text-beige-200/80 hover:text-white transition-colors block">
                  Pricing & Plans
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-xs text-beige-200/80 hover:text-white transition-colors block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-xs text-beige-200/80 hover:text-white transition-colors block">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: CONTACT */}
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.18em] font-semibold text-champagne-400 border-b border-champagne-400/20 pb-2 inline-block">
              CONTACT
            </h4>
            <ul className="space-y-3 text-xs text-beige-200/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-champagne-400 shrink-0 mt-0.5" />
                <span>Dubai Design District (d3), UAE</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-champagne-400 shrink-0" />
                <span>concierge@luxurysignature.ae</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-champagne-400 shrink-0" />
                <span>+971 4 800 5898</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Massive Final Brand Typography: LUXURY SIGNATURE */}
        <div className="py-12 border-b border-[rgba(244,238,229,0.08)] text-center">
          <span className="font-serif text-[clamp(2.5rem,8vw,7.5rem)] font-normal uppercase tracking-[0.12em] text-beige-50/15 leading-none select-none block">
            LUXURY SIGNATURE
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-beige-200/60">
          <p>© 2026 Luxury Signature. All Rights Reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-champagne-400 hover:text-white transition-colors"
          >
            <span>BACK TO TOP</span>
            <div className="w-8 h-8 rounded-full bg-[#170B15] border border-[rgba(214,182,90,0.18)] flex items-center justify-center">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}
