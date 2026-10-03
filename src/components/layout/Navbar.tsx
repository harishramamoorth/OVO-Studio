"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Menu, X, Sparkles } from "lucide-react";
import Logo from "@/components/common/Logo";
import { SERVICE_CATEGORIES, NAVIGATION_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileCategory = (catId: string) => {
    setActiveMobileCategory(activeMobileCategory === catId ? null : catId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-20 sm:h-22 flex items-center transition-all duration-500 ${
        scrolled
          ? "bg-[#10070F]/82 backdrop-blur-xl border-b border-[rgba(244,238,229,0.08)] shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full flex items-center justify-between">
        
        {/* Transparent Logo */}
        <Logo />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-10">
          {NAVIGATION_LINKS.map((link) => {
            const isActive = pathname === link.href;

            if (link.hasMegaMenu) {
              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setMegaMenuOpen(true)}
                  onMouseLeave={() => setMegaMenuOpen(false)}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                    className={`flex items-center gap-1.5 text-[12px] sm:text-[13px] uppercase tracking-[0.18em] font-medium transition-colors py-2 ${
                      megaMenuOpen || pathname.startsWith("/services")
                        ? "text-champagne-400 font-semibold"
                        : "text-beige-50/90 hover:text-white"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        megaMenuOpen ? "rotate-180 text-champagne-400" : "text-beige-200"
                      }`}
                    />
                  </Link>

                  {/* Mega-Menu Dropdown */}
                  <AnimatePresence>
                    {megaMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[920px] pointer-events-auto"
                      >
                        <div className="bg-[#170B15]/95 backdrop-blur-2xl p-8 rounded-2xl border border-[rgba(214,182,90,0.18)] shadow-2xl grid grid-cols-3 gap-8">
                          
                          <div className="col-span-2 grid grid-cols-2 gap-8 border-r border-[rgba(244,238,229,0.08)] pr-8">
                            {SERVICE_CATEGORIES.slice(0, 4).map((category) => (
                              <div key={category.id} className="space-y-3">
                                <Link
                                  href={`/services#${category.slug}`}
                                  className="group flex items-center justify-between text-[11px] tracking-[0.18em] font-semibold uppercase text-champagne-400 border-b border-champagne-400/20 pb-1.5"
                                >
                                  <span>{category.title}</span>
                                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-champagne-400" />
                                </Link>
                                <ul className="space-y-1.5">
                                  {category.services.map((item) => (
                                    <li key={item.id}>
                                      <Link
                                        href={`/services/${category.slug}/${item.slug}`}
                                        className="text-xs text-beige-200/80 hover:text-white hover:pl-1 transition-all block py-0.5"
                                      >
                                        {item.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

                          {/* 3rd Column */}
                          <div className="space-y-6">
                            <div className="space-y-3">
                              <Link
                                href={`/services#${SERVICE_CATEGORIES[4].slug}`}
                                className="group flex items-center justify-between text-[11px] tracking-[0.18em] font-semibold uppercase text-champagne-400 border-b border-champagne-400/20 pb-1.5"
                              >
                                <span>{SERVICE_CATEGORIES[4].title}</span>
                                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-champagne-400" />
                              </Link>
                              <ul className="space-y-1.5">
                                {SERVICE_CATEGORIES[4].services.map((item) => (
                                  <li key={item.id}>
                                    <Link
                                      href={`/services/${SERVICE_CATEGORIES[4].slug}/${item.slug}`}
                                      className="text-xs text-beige-200/80 hover:text-white hover:pl-1 transition-all block py-0.5"
                                    >
                                      {item.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="p-4 rounded-xl bg-[#21101E] border border-[rgba(214,182,90,0.18)]">
                              <span className="text-[10px] tracking-[0.18em] uppercase text-champagne-400 font-semibold block mb-1">
                                Dubai Advisory
                              </span>
                              <p className="text-xs text-beige-200/90 leading-snug mb-3">
                                Elevate your fashion label with global 360° strategy.
                              </p>
                              <Link
                                href="/book"
                                className="text-[11px] font-semibold text-champagne-400 hover:text-white flex items-center gap-1"
                              >
                                <span>Book Session</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[12px] sm:text-[13px] uppercase tracking-[0.18em] font-medium transition-colors relative py-2 ${
                  isActive ? "text-champagne-400 font-semibold" : "text-beige-50/90 hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-champagne-400 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/book"
            className="px-6 py-3 rounded-full text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.18em] text-[#10070F] bg-gradient-to-r from-[#F4EEE5] via-[#D6B65A] to-[#B9974B] hover:shadow-lg hover:shadow-champagne-400/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center gap-2 group"
          >
            <span>BOOK A CONSULTATION</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-beige-50 hover:text-champagne-400 focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-[#10070F]/98 backdrop-blur-2xl border-b border-[rgba(244,238,229,0.08)] overflow-hidden w-full absolute top-full left-0"
          >
            <div className="px-6 py-8 space-y-6 max-h-[85vh] overflow-y-auto">
              <nav className="flex flex-col space-y-4">
                {NAVIGATION_LINKS.map((link) => {
                  if (link.hasMegaMenu) {
                    return (
                      <div key={link.name} className="border-b border-[rgba(244,238,229,0.08)] pb-4">
                        <button
                          onClick={() => toggleMobileCategory("services-accordion")}
                          className="flex items-center justify-between w-full text-left text-sm uppercase tracking-[0.18em] text-beige-50 font-medium py-2"
                        >
                          <span>SERVICES</span>
                          <ChevronDown
                            className={`w-4 h-4 text-champagne-400 transition-transform ${
                              activeMobileCategory === "services-accordion" ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {activeMobileCategory === "services-accordion" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 mt-2 space-y-4 border-l border-champagne-400/30"
                            >
                              {SERVICE_CATEGORIES.map((cat) => (
                                <div key={cat.id} className="space-y-1.5">
                                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-champagne-400 block">
                                    {cat.title}
                                  </span>
                                  {cat.services.map((item) => (
                                    <Link
                                      key={item.id}
                                      href={`/services/${cat.slug}/${item.slug}`}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="text-xs text-beige-200 block py-1 hover:text-white"
                                    >
                                      {item.title}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm uppercase tracking-[0.18em] text-beige-50 hover:text-champagne-400 font-medium py-2 border-b border-[rgba(244,238,229,0.08)] block"
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-2">
                <Link
                  href="/book"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] text-[#10070F] bg-gradient-to-r from-[#F4EEE5] to-[#D6B65A]"
                >
                  <span>BOOK A CONSULTATION</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
