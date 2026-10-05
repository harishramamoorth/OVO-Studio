"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, X, Menu, ShoppingBag } from "lucide-react";
import Logo from "@/components/common/Logo";
import { SERVICE_CATEGORIES, NAVIGATION_LINKS } from "@/lib/constants";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { totalQuantity, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-500 ${
          scrolled
            ? "bg-[#10070F]/90 backdrop-blur-xl border-b border-[rgba(244,238,229,0.08)] shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10 w-full flex items-center justify-between">

          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
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
                      className={`flex items-center gap-1.5 text-[12px] uppercase tracking-[0.18em] font-medium transition-colors py-2 ${
                        megaMenuOpen || pathname.startsWith("/services")
                          ? "text-[#D6B65A] font-semibold"
                          : "text-[#F4EEE5]/90 hover:text-white"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${megaMenuOpen ? "rotate-180 text-[#D6B65A]" : "text-[#C8BDB7]"}`} />
                    </Link>

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
                                    href={`/services/${category.slug}`}
                                    className="group flex items-center justify-between text-[11px] tracking-[0.18em] font-semibold uppercase text-[#D6B65A] border-b border-[#D6B65A]/20 pb-1.5"
                                  >
                                    <span>{category.title}</span>
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#D6B65A]" />
                                  </Link>
                                  <ul className="space-y-1.5">
                                    {category.services.map((item) => (
                                      <li key={item.id}>
                                        <Link
                                          href={`/services/${category.slug}/${item.slug}`}
                                          className="text-xs text-[#C8BDB7]/80 hover:text-white hover:pl-1 transition-all block py-0.5"
                                        >
                                          {item.title}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>

                            <div className="space-y-6">
                              <div className="space-y-3">
                                <Link
                                  href={`/services/${SERVICE_CATEGORIES[4].slug}`}
                                  className="group flex items-center justify-between text-[11px] tracking-[0.18em] font-semibold uppercase text-[#D6B65A] border-b border-[#D6B65A]/20 pb-1.5"
                                >
                                  <span>{SERVICE_CATEGORIES[4].title}</span>
                                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </Link>
                                <ul className="space-y-1.5">
                                  {SERVICE_CATEGORIES[4].services.map((item) => (
                                    <li key={item.id}>
                                      <Link
                                        href={`/services/${SERVICE_CATEGORIES[4].slug}/${item.slug}`}
                                        className="text-xs text-[#C8BDB7]/80 hover:text-white hover:pl-1 transition-all block py-0.5"
                                      >
                                        {item.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="p-4 rounded-xl bg-[#21101E] border border-[rgba(214,182,90,0.18)]">
                                <span className="text-[10px] tracking-[0.18em] uppercase text-[#D6B65A] font-semibold block mb-1">Dubai Advisory</span>
                                <p className="text-xs text-[#C8BDB7]/90 leading-snug mb-3">Elevate your fashion label with global 360° strategy.</p>
                                <Link href="/book" className="text-[11px] font-semibold text-[#D6B65A] hover:text-white flex items-center gap-1">
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
                  className={`text-[12px] uppercase tracking-[0.18em] font-medium whitespace-nowrap transition-colors relative py-2 ${
                    isActive ? "text-[#D6B65A] font-semibold" : "text-[#F4EEE5]/90 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D6B65A] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA & Cart */}
          <div className="hidden lg:flex items-center space-x-5">
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full border border-[rgba(214,182,90,0.25)] text-[#F4EEE5] hover:text-[#D6B65A] hover:border-[#D6B65A] transition-all group"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#D6B65A] text-[#10070F] font-mono text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {totalQuantity}
                </span>
              )}
            </button>

            <Link
              href="/book"
              className="px-6 py-3 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] text-[#10070F] bg-gradient-to-r from-[#F4EEE5] via-[#D6B65A] to-[#B9974B] hover:shadow-lg hover:shadow-[#D6B65A]/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center gap-2 group"
            >
              <span>BOOK A CONSULTATION</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Cart & Hamburger */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={openCart}
              className="relative w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(214,182,90,0.25)] text-[#F4EEE5] hover:border-[#D6B65A] hover:text-[#D6B65A] transition-all"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D6B65A] text-[#10070F] font-mono text-[9px] font-bold flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="relative w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(214,182,90,0.25)] text-[#F4EEE5] hover:border-[#D6B65A] hover:text-[#D6B65A] transition-all"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE FULL-SCREEN DRAWER ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-[#0C040E]/70 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[85vw] max-w-sm bg-[#0C040E] border-l border-[rgba(214,182,90,0.15)] flex flex-col lg:hidden shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(214,182,90,0.12)]">
                <Logo />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-[rgba(214,182,90,0.25)] text-[#C8BDB7] hover:border-[#D6B65A] hover:text-[#D6B65A] transition-all"
                  aria-label="Close Navigation"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Links */}
              <div className="flex-1 overflow-y-auto py-6 px-6 space-y-1">
                {NAVIGATION_LINKS.map((link) => {
                  if (link.hasMegaMenu) {
                    return (
                      <div key={link.name}>
                        <button
                          onClick={() => setServicesOpen(!servicesOpen)}
                          className="w-full flex items-center justify-between py-4 border-b border-[rgba(214,182,90,0.08)] text-left"
                        >
                          <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#F4EEE5]">Services</span>
                          <ChevronDown className={`w-4 h-4 text-[#D6B65A] transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                          {servicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="py-3 space-y-5">
                                {SERVICE_CATEGORIES.map((cat) => (
                                  <div key={cat.id} className="space-y-2">
                                    <Link
                                      href={`/services/${cat.slug}`}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D6B65A] block px-2"
                                    >
                                      {cat.title}
                                    </Link>
                                    <div className="space-y-1 pl-2">
                                      {cat.services.map((item) => (
                                        <Link
                                          key={item.id}
                                          href={`/services/${cat.slug}/${item.slug}`}
                                          onClick={() => setMobileMenuOpen(false)}
                                          className="text-xs text-[#C8BDB7] hover:text-[#F4EEE5] block py-1.5 pl-3 border-l border-[rgba(214,182,90,0.15)] hover:border-[#D6B65A]/50 transition-all"
                                        >
                                          {item.title}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
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
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between py-4 border-b border-[rgba(214,182,90,0.08)] text-sm font-bold uppercase tracking-[0.18em] transition-colors ${
                        pathname === link.href ? "text-[#D6B65A]" : "text-[#F4EEE5] hover:text-[#D6B65A]"
                      }`}
                    >
                      {link.name}
                      {pathname === link.href && <div className="w-1.5 h-1.5 rounded-full bg-[#D6B65A]" />}
                    </Link>
                  );
                })}
              </div>

              {/* Drawer Footer CTA */}
              <div className="px-6 py-6 border-t border-[rgba(214,182,90,0.12)] space-y-3">
                <Link
                  href="/book"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-[#10070F] bg-gradient-to-r from-[#F4EEE5] via-[#D6B65A] to-[#B9974B] shadow-lg hover:shadow-[#D6B65A]/30 transition-all"
                >
                  BOOK A CONSULTATION
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-center text-[10px] text-[#C8BDB7]/60 tracking-widest uppercase">
                  info@ovosignature.com
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
