"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    enquiry: "",
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
    <section id="contact" className="py-24 sm:py-32 bg-[#0C040E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-[#D6B65A] tracking-wider uppercase"
          >
            Contact Us
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#C8BDB7]"
          >
            Reach out, anytime, anywhere, for seamless communication
          </motion.p>
        </div>

        {/* Main Split Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="flex flex-col lg:flex-row bg-[#170B15] border border-[rgba(214,182,90,0.15)] rounded-2xl overflow-hidden mb-20 shadow-2xl shadow-black/50"
        >
          {/* Left Side: Image & Overlaid Text */}
          <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-auto bg-[#10070F]">
            <img 
              src="/media/fashion/about/pexels-michael-burrows-7147548.jpg" 
              alt="Contact Support" 
              className="absolute inset-0 w-full h-full object-cover brightness-[0.7] grayscale-[10%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C040E]/95 via-[#0C040E]/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
              <h3 className="text-3xl font-serif text-[#F4EEE5] mb-3">NEED SUPPORT?</h3>
              <p className="text-sm text-[#C8BDB7] leading-relaxed max-w-md">
                Have a question or project in mind? Share the details with us.
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-14 h-14 text-[#D6B65A] mx-auto" />
                <h3 className="text-2xl font-serif text-[#F4EEE5]">Message Sent</h3>
                <p className="text-xs sm:text-sm text-[#C8BDB7]">
                  Thank you. We will get in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-xs text-[#C8BDB7] mb-8 leading-relaxed max-w-sm">
                  We're available 24/7 to assist. Just let us know what we can help you with and we'll do our best.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text" name="firstName" required value={formData.firstName} onChange={handleChange} placeholder="First name*"
                      className="w-full px-4 py-3.5 bg-transparent border border-[rgba(214,182,90,0.3)] rounded-lg text-[#F4EEE5] text-sm focus:outline-none focus:border-[#D6B65A] placeholder-[#C8BDB7]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="text" name="lastName" required value={formData.lastName} onChange={handleChange} placeholder="Last name*"
                      className="w-full px-4 py-3.5 bg-transparent border border-[rgba(214,182,90,0.3)] rounded-lg text-[#F4EEE5] text-sm focus:outline-none focus:border-[#D6B65A] placeholder-[#C8BDB7]/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="Phone *"
                    className="w-full px-4 py-3.5 bg-transparent border border-[rgba(214,182,90,0.3)] rounded-lg text-[#F4EEE5] text-sm focus:outline-none focus:border-[#D6B65A] placeholder-[#C8BDB7]/50 transition-colors"
                  />
                  <p className="text-[9px] text-[#C8BDB7]/60 mt-1.5 ml-1 font-semibold tracking-wide">Enter phone with country code (+971)</p>
                </div>

                <div>
                  <input
                    type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Email *"
                    className="w-full px-4 py-3.5 bg-transparent border border-[rgba(214,182,90,0.3)] rounded-lg text-[#F4EEE5] text-sm focus:outline-none focus:border-[#D6B65A] placeholder-[#C8BDB7]/50 transition-colors"
                  />
                </div>

                <div>
                  <select
                    name="enquiry" value={formData.enquiry} onChange={handleChange} required
                    className={`w-full px-4 py-3.5 bg-transparent border border-[rgba(214,182,90,0.3)] rounded-lg ${formData.enquiry ? 'text-[#F4EEE5]' : 'text-[#C8BDB7]/50'} text-sm focus:outline-none focus:border-[#D6B65A] transition-colors appearance-none cursor-pointer`}
                  >
                    <option value="" disabled className="text-[#10070F]">Enquiry *</option>
                    <option value="General" className="bg-[#10070F] text-[#F4EEE5]">General Support</option>
                    <option value="Booking" className="bg-[#10070F] text-[#F4EEE5]">Booking a Consultation</option>
                    <option value="Partnership" className="bg-[#10070F] text-[#F4EEE5]">Partnerships</option>
                    <option value="Other" className="bg-[#10070F] text-[#F4EEE5]">Other</option>
                  </select>
                </div>

                <div>
                  <textarea
                    name="message" rows={4} required value={formData.message} onChange={handleChange} placeholder="Message *"
                    className="w-full px-4 py-3.5 bg-transparent border border-[rgba(214,182,90,0.3)] rounded-lg text-[#F4EEE5] text-sm focus:outline-none focus:border-[#D6B65A] placeholder-[#C8BDB7]/50 transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <button
                    type="submit" disabled={loading}
                    className="px-10 py-3 bg-[#D6B65A] text-[#10070F] text-xs font-bold uppercase tracking-widest rounded-lg transition-all hover:bg-[#F4EEE5]"
                  >
                    Send
                  </button>
                  <p className="text-[10px] text-[#C8BDB7]">We'll aim to get back to you within 24 hours.</p>
                </div>
              </form>
            )}
          </div>
        </motion.div>

        {/* Info Grid (Bottom Section) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4 max-w-5xl mx-auto border-t border-[rgba(214,182,90,0.15)] pt-16">
          
          {/* Left Col (Phone & Email) */}
          <div className="space-y-12 border-none md:border-r border-[rgba(214,182,90,0.15)]">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-[#D6B65A]/30 flex items-center justify-center text-[#D6B65A] shrink-0 bg-[rgba(214,182,90,0.05)]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#D6B65A] mb-1.5">Call Us</h4>
                <p className="text-sm font-semibold text-[#F4EEE5]">+971 561166811</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-[#D6B65A]/30 flex items-center justify-center text-[#D6B65A] shrink-0 bg-[rgba(214,182,90,0.05)]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#D6B65A] mb-1.5">Email Us</h4>
                <p className="text-sm font-semibold text-[#F4EEE5]">info@ovosignature.com</p>
              </div>
            </div>
          </div>

          {/* Right Col (Visit & Hours) */}
          <div className="space-y-12 md:pl-16">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-[#D6B65A]/30 flex items-center justify-center text-[#D6B65A] shrink-0 bg-[rgba(214,182,90,0.05)]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#D6B65A] mb-1.5">Visit Us</h4>
                <p className="text-sm text-[#C8BDB7] leading-relaxed max-w-xs">
                  Bayan building, Floor 4<br/>
                  Opposite to Bright Riders school<br/>
                  Dubai Investment Park, Dubai, UAE
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-[#D6B65A]/30 flex items-center justify-center text-[#D6B65A] shrink-0 bg-[rgba(214,182,90,0.05)]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#D6B65A] mb-1.5">Business Hours</h4>
                <p className="text-sm text-[#C8BDB7] leading-relaxed">
                  Monday - Friday: 9:00 AM - 6:00 PM<br/>
                  Saturday: 10:00 AM - 6:00 PM<br/>
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
