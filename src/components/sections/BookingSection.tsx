"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/constants";

export default function BookingSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "Fashion Business Consulting",
    date: "",
    time: "10:00 AM GST",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="consultation" className="section-padding bg-[#170B15] relative overflow-hidden border-t border-[rgba(244,238,229,0.08)]">
      
      <div className="max-w-5xl mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10070F] border border-[rgba(214,182,90,0.18)]">
            <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-champagne-400">
              PRIVATE EXECUTIVE SESSION
            </span>
          </div>

          <h2 className="font-serif font-normal text-beige-50 heading-h2 tracking-tight">
            LET'S BUILD <br />
            <span className="italic font-display text-champagne-400 font-light">SOMETHING DISTINCTIVE.</span>
          </h2>
          
          <p className="text-base sm:text-lg text-beige-200/90 font-sans font-light max-w-xl mx-auto">
            Tell us about your brand, your vision, and where you want to go next.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#21101E] rounded-3xl p-8 sm:p-14 border border-[rgba(214,182,90,0.18)] shadow-2xl">
          
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-champagne-400/20 text-champagne-400 flex items-center justify-center mx-auto border border-champagne-400/40">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl text-beige-50">Consultation Requested</h3>
              <p className="text-sm text-beige-200/80 max-w-md mx-auto">
                Thank you, {formData.firstName}. Our Senior Director of Fashion Advisory will contact you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.18em] font-semibold text-champagne-400 border border-champagne-400/30 hover:bg-champagne-400 hover:text-[#10070F] transition-all"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* First Name */}
                <div className="space-y-2 border-b border-[rgba(244,238,229,0.12)] pb-2 focus-within:border-champagne-400 transition-colors">
                  <label className="text-[11px] uppercase tracking-[0.18em] font-semibold text-champagne-400 block">
                    FIRST NAME *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="e.g. Soraya"
                    className="w-full bg-transparent text-beige-50 placeholder-beige-200/30 focus:outline-none text-base font-sans py-1"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2 border-b border-[rgba(244,238,229,0.12)] pb-2 focus-within:border-champagne-400 transition-colors">
                  <label className="text-[11px] uppercase tracking-[0.18em] font-semibold text-champagne-400 block">
                    LAST NAME *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Al-Mansoor"
                    className="w-full bg-transparent text-beige-50 placeholder-beige-200/30 focus:outline-none text-base font-sans py-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Email */}
                <div className="space-y-2 border-b border-[rgba(244,238,229,0.12)] pb-2 focus-within:border-champagne-400 transition-colors">
                  <label className="text-[11px] uppercase tracking-[0.18em] font-semibold text-champagne-400 block">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="soraya@brand.com"
                    className="w-full bg-transparent text-beige-50 placeholder-beige-200/30 focus:outline-none text-base font-sans py-1"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2 border-b border-[rgba(244,238,229,0.12)] pb-2 focus-within:border-champagne-400 transition-colors">
                  <label className="text-[11px] uppercase tracking-[0.18em] font-semibold text-champagne-400 block">
                    PHONE / WHATSAPP *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+971 50 123 4567"
                    className="w-full bg-transparent text-beige-50 placeholder-beige-200/30 focus:outline-none text-base font-sans py-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {/* Service Dropdown */}
                <div className="space-y-2 border-b border-[rgba(244,238,229,0.12)] pb-2 focus-within:border-champagne-400 transition-colors">
                  <label className="text-[11px] uppercase tracking-[0.18em] font-semibold text-champagne-400 block">
                    SERVICE INTEREST
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-[#10070F] text-beige-50 focus:outline-none text-sm font-sans py-1.5 cursor-pointer border-none"
                  >
                    {SERVICE_CATEGORIES.flatMap((c) =>
                      c.services.map((s) => (
                        <option key={s.id} value={s.title} className="bg-[#10070F] text-beige-50">
                          {s.title}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                {/* Date */}
                <div className="space-y-2 border-b border-[rgba(244,238,229,0.12)] pb-2 focus-within:border-champagne-400 transition-colors">
                  <label className="text-[11px] uppercase tracking-[0.18em] font-semibold text-champagne-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>PREFERRED DATE</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-transparent text-beige-50 focus:outline-none text-sm font-sans py-1"
                  />
                </div>

                {/* Time */}
                <div className="space-y-2 border-b border-[rgba(244,238,229,0.12)] pb-2 focus-within:border-champagne-400 transition-colors">
                  <label className="text-[11px] uppercase tracking-[0.18em] font-semibold text-champagne-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>PREFERRED TIME</span>
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-[#10070F] text-beige-50 focus:outline-none text-sm font-sans py-1.5 cursor-pointer border-none"
                  >
                    <option value="10:00 AM GST" className="bg-[#10070F]">10:00 AM GST</option>
                    <option value="02:00 PM GST" className="bg-[#10070F]">02:00 PM GST</option>
                    <option value="05:00 PM GST" className="bg-[#10070F]">05:00 PM GST</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2 border-b border-[rgba(244,238,229,0.12)] pb-2 focus-within:border-champagne-400 transition-colors">
                <label className="text-[11px] uppercase tracking-[0.18em] font-semibold text-champagne-400 block">
                  BRAND VISION & DETAILS
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your collection stage, timeline, and goals..."
                  className="w-full bg-transparent text-beige-50 placeholder-beige-200/30 focus:outline-none text-base font-sans py-1"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full text-[12px] font-bold uppercase tracking-[0.18em] text-[#10070F] bg-gradient-to-r from-[#F4EEE5] via-[#D6B65A] to-[#B9974B] shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 group"
              >
                <span>BOOK A CONSULTATION</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
