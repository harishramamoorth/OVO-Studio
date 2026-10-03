"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Calendar, User, Video, MapPin, ArrowRight, ChevronLeft, ChevronRight, CalendarCheck, Clock, Building, ShieldCheck, Mail, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { VIDEO_ASSETS } from "@/lib/constants";

const TIME_SLOTS = [
  { time: "09:30 AM", period: "Morning" },
  { time: "11:00 AM", period: "Morning" },
  { time: "01:30 PM", period: "Afternoon" },
  { time: "03:00 PM", period: "Afternoon" },
  { time: "04:30 PM", period: "Late Afternoon" },
];

function getBookedSlotsForDate(date: Date | null) {
  if (!date) return new Set();
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  let s = seed;
  const rand = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return Math.abs(s) / 0xffffffff; };
  const booked = new Set<string>();
  TIME_SLOTS.forEach((slot) => { if (rand() < 0.45) booked.add(slot.time); });
  if (booked.size === TIME_SLOTS.length) booked.delete(TIME_SLOTS[Math.floor(rand() * TIME_SLOTS.length)].time);
  return booked;
}

const isDayFullyBookedBySlots = (date: Date) => getBookedSlotsForDate(date).size === TIME_SLOTS.length;

export default function BookPage() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<"office" | "online" | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", notes: "" });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  const buildCalendar = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    return cells;
  };

  const calCells = buildCalendar(calYear, calMonth);
  const monthName = new Date(calYear, calMonth, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
  };

  const isDayBooked = (date: Date) => isDayFullyBookedBySlots(date);
  const isDayWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;
  const isDayPast = (date: Date) => date < today;
  const isDayDisabled = (date: Date) => isDayPast(date) || isDayWeekend(date) || isDayBooked(date);
  const isDaySelected = (date: Date) => selectedDate && date.toDateString() === selectedDate.toDateString();

  const bookedSlotsForDay = selectedDate ? getBookedSlotsForDate(selectedDate) : new Set();
  
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setActiveStep(4); // Success step
    }, 1500);
  };

  const isFormValid = formData.name.trim() !== "" && formData.email.trim() !== "" && formData.company.trim() !== "";

  return (
    <div className="min-h-screen bg-[#0C040E] text-[#F4EEE5] pt-32 pb-24 overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.05]">
        <video src={VIDEO_ASSETS.heroFallback} autoPlay muted loop playsInline className="w-full h-full object-cover blur-lg" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C040E] via-transparent to-[#0C040E]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        {activeStep !== 4 && (
          <div className="text-center mb-16 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(214,182,90,0.08)] border border-[rgba(214,182,90,0.2)] mb-8">
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#D6B65A]">EXECUTIVE ADVISORY</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif text-[#D6B65A] mb-4">Welcome.</h1>
              <p className="text-[#C8BDB7] font-light max-w-lg mx-auto leading-relaxed text-sm md:text-base">
                Book your appointment in a few simple steps: Choose a service, pick your date and time, and fill in your details.
              </p>
            </motion.div>
          </div>
        )}

        {/* Form Steps */}
        <div className="space-y-4">
          
          {/* STEP 1: Consultation Type */}
          {activeStep !== 4 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className={`border rounded-2xl overflow-hidden transition-all duration-500 ${activeStep === 1 ? 'bg-[#170B15]/80 border-[#D6B65A]/40 backdrop-blur-xl shadow-[0_0_30px_rgba(214,182,90,0.05)]' : 'bg-[#10070F]/60 border-[rgba(214,182,90,0.15)] opacity-60'}`}
            >
              <div className="p-6 md:p-8 flex items-center gap-4 cursor-pointer" onClick={() => setActiveStep(1)}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${activeStep > 1 ? 'bg-[#D6B65A] border-[#D6B65A] text-[#10070F]' : activeStep === 1 ? 'border-[#D6B65A] text-[#D6B65A]' : 'border-[rgba(214,182,90,0.3)] text-[#C8BDB7]'}`}>
                  {activeStep > 1 ? <Check className="w-5 h-5" /> : "1"}
                </div>
                <h2 className="text-lg md:text-xl font-serif tracking-wide">Consultation Type</h2>
              </div>
              
              <AnimatePresence>
                {activeStep === 1 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 space-y-4">
                    <div className="h-[1px] w-full bg-[rgba(214,182,90,0.1)] mb-6" />
                    
                    <div onClick={() => { setSelectedType("office"); setTimeout(() => setActiveStep(2), 300); }}
                      className={`p-6 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-300 group ${selectedType === "office" ? 'border-[#D6B65A] bg-[rgba(214,182,90,0.05)]' : 'border-[rgba(214,182,90,0.2)] hover:border-[#D6B65A]/50 bg-[#10070F]'}`}>
                      <div className="flex items-center gap-5">
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${selectedType === "office" ? 'border-[#D6B65A]' : 'border-[#C8BDB7]'}`}>
                          {selectedType === "office" && <div className="w-3 h-3 bg-[#D6B65A] rounded-full" />}
                        </div>
                        <div>
                          <div className="text-base font-semibold text-[#F4EEE5] mb-1 group-hover:text-[#D6B65A] transition-colors">Office Visit</div>
                          <div className="text-xs text-[#C8BDB7] flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> d3 Dubai Design District, Dubai, UAE</div>
                        </div>
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-[#D6B65A] font-mono">30 Mins</div>
                    </div>

                    <div onClick={() => { setSelectedType("online"); setTimeout(() => setActiveStep(2), 300); }}
                      className={`p-6 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-300 group ${selectedType === "online" ? 'border-[#D6B65A] bg-[rgba(214,182,90,0.05)]' : 'border-[rgba(214,182,90,0.2)] hover:border-[#D6B65A]/50 bg-[#10070F]'}`}>
                      <div className="flex items-center gap-5">
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${selectedType === "online" ? 'border-[#D6B65A]' : 'border-[#C8BDB7]'}`}>
                          {selectedType === "online" && <div className="w-3 h-3 bg-[#D6B65A] rounded-full" />}
                        </div>
                        <div>
                          <div className="text-base font-semibold text-[#F4EEE5] mb-1 group-hover:text-[#D6B65A] transition-colors">Online Appointment</div>
                          <div className="text-xs text-[#C8BDB7] flex items-center gap-1.5"><Video className="w-3.5 h-3.5" /> Google Meet / Zoom</div>
                        </div>
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-[#D6B65A] font-mono">30 Mins</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* STEP 2: Calendar & Time */}
          {activeStep !== 4 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className={`border rounded-2xl overflow-hidden transition-all duration-500 ${activeStep === 2 ? 'bg-[#170B15]/80 border-[#D6B65A]/40 backdrop-blur-xl shadow-[0_0_30px_rgba(214,182,90,0.05)]' : 'bg-[#10070F]/60 border-[rgba(214,182,90,0.15)] opacity-60'}`}
            >
              <div className="p-6 md:p-8 flex items-center gap-4 cursor-pointer" onClick={() => { if(selectedType) setActiveStep(2) }}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${activeStep > 2 ? 'bg-[#D6B65A] border-[#D6B65A] text-[#10070F]' : activeStep === 2 ? 'border-[#D6B65A] text-[#D6B65A]' : 'border-[rgba(214,182,90,0.3)] text-[#C8BDB7]'}`}>
                  {activeStep > 2 ? <Check className="w-5 h-5" /> : "2"}
                </div>
                <h2 className="text-lg md:text-xl font-serif tracking-wide">Date & Time</h2>
              </div>

              <AnimatePresence>
                {activeStep === 2 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8">
                    <div className="h-[1px] w-full bg-[rgba(214,182,90,0.1)] mb-6" />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      
                      {/* Calendar Section */}
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <button onClick={prevMonth} disabled={calYear === today.getFullYear() && calMonth === today.getMonth()} className="w-8 h-8 flex items-center justify-center rounded border border-[rgba(214,182,90,0.2)] hover:border-[#D6B65A] disabled:opacity-30 transition-all"><ChevronLeft className="w-4 h-4" /></button>
                          <span className="text-sm font-bold tracking-widest uppercase">{monthName}</span>
                          <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded border border-[rgba(214,182,90,0.2)] hover:border-[#D6B65A] transition-all"><ChevronRight className="w-4 h-4" /></button>
                        </div>
                        <div className="grid grid-cols-7 mb-2">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                            <div key={d} className="text-center text-[9px] font-bold uppercase tracking-wider py-1 text-[#C8BDB7]">{d}</div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {calCells.map((date, idx) => {
                            if (!date) return <div key={`empty-${idx}`} />;
                            const disabled = isDayDisabled(date);
                            const booked = isDayBooked(date);
                            const selected = isDaySelected(date);
                            const isToday = date.toDateString() === today.toDateString();
                            return (
                              <button
                                key={idx} disabled={disabled} onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                                className={`relative h-10 w-full rounded-lg text-sm flex flex-col items-center justify-center transition-all duration-200 ${selected ? 'bg-[#D6B65A] text-[#10070F] font-bold shadow-[0_0_15px_rgba(214,182,90,0.4)]' : booked ? 'bg-[rgba(255,255,255,0.02)] text-white/20 cursor-not-allowed line-through' : disabled ? 'text-white/20 cursor-not-allowed' : 'text-[#F4EEE5] hover:bg-[rgba(214,182,90,0.1)] hover:text-[#D6B65A]'}`}
                              >
                                {isToday && !selected && <span className="absolute top-1 right-1 w-1 h-1 bg-[#D6B65A] rounded-full" />}
                                {date.getDate()}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time Slots Section */}
                      <div>
                        {selectedDate ? (
                          <>
                            {/* Live summary strip */}
                            <div className="mb-5 px-4 py-3 bg-[#10070F] border border-[rgba(214,182,90,0.2)] rounded-xl flex items-center justify-between">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="text-[#D6B65A] w-3 h-3" />
                                <span className="font-bold text-[#F4EEE5] text-xs">{formatDate(selectedDate)}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                {selectedTime ? (
                                  <div className="flex items-center gap-1.5 bg-[rgba(214,182,90,0.15)] border border-[#D6B65A]/30 px-3 py-1 rounded-full">
                                    <Clock className="text-[#D6B65A] w-3 h-3" />
                                    <span className="text-[#D6B65A] text-[10px] font-extrabold">{selectedTime}</span>
                                  </div>
                                ) : (
                                  <span className="text-[10px] text-[#C8BDB7] font-semibold">Pick a time ↓</span>
                                )}
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-[rgba(214,182,90,0.3)] text-[#D6B65A]">
                                  {TIME_SLOTS.length - bookedSlotsForDay.size} slot{TIME_SLOTS.length - bookedSlotsForDay.size !== 1 ? 's' : ''} left
                                </span>
                              </div>
                            </div>

                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#C8BDB7] mb-3 flex items-center gap-2">
                              <Clock className="w-3 h-3 text-[#D6B65A]" /> Select a Time Slot
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              {TIME_SLOTS.map((slot, idx) => {
                                const isSel = selectedTime === slot.time;
                                const isBooked = bookedSlotsForDay.has(slot.time);
                                return (
                                  <button
                                    key={idx} disabled={isBooked} onClick={() => setSelectedTime(slot.time)}
                                    className={`relative py-4 px-3 rounded-xl border text-sm text-center transition-all duration-300 flex flex-col items-center gap-1 overflow-hidden ${isBooked ? 'bg-[#10070F] border-[rgba(255,255,255,0.05)] cursor-not-allowed' : isSel ? 'bg-[rgba(214,182,90,0.15)] border-[#D6B65A] shadow-[0_0_15px_rgba(214,182,90,0.2)]' : 'bg-[#10070F] border-[rgba(214,182,90,0.2)] hover:border-[#D6B65A]/60 group'}`}
                                  >
                                    {isBooked && (
                                      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl">
                                        <div
                                          className="absolute top-0 left-0 w-full h-full"
                                          style={{
                                            background: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(255,255,255,0.03) 5px, rgba(255,255,255,0.03) 6px)'
                                          }}
                                        />
                                      </div>
                                    )}
                                    
                                    <span className={`font-extrabold ${isBooked ? 'line-through text-white/30' : isSel ? 'text-[#D6B65A]' : 'text-[#F4EEE5]'}`}>{slot.time}</span>
                                    
                                    {isBooked ? (
                                      <span className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-white/40 px-2 py-0.5 rounded-full mt-1">
                                        Booked
                                      </span>
                                    ) : (
                                      <span className={`text-[9px] font-medium mt-1 ${isSel ? 'text-[#D6B65A]' : 'text-[#C8BDB7] group-hover:text-[#F4EEE5]'}`}>
                                        {slot.period}
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                            {selectedTime && (
                              <button onClick={() => setActiveStep(3)} className="w-full mt-8 bg-gradient-to-r from-[#F4EEE5] via-[#D6B65A] to-[#B9974B] text-[#10070F] px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(214,182,90,0.3)] transition-all flex items-center justify-center gap-3">
                                Confirm Slot <ArrowRight className="w-4 h-4" />
                              </button>
                            )}
                          </>
                        ) : (
                          <div className="h-full flex items-center justify-center flex-col text-center opacity-50">
                            <Calendar className="w-8 h-8 mb-3 text-[#D6B65A]" />
                            <p className="text-sm font-light">Please select a date from the calendar<br/>to view available times.</p>
                          </div>
                        )}
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* STEP 3: Your Info */}
          {activeStep !== 4 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className={`border rounded-2xl overflow-hidden transition-all duration-500 ${activeStep === 3 ? 'bg-[#170B15]/80 border-[#D6B65A]/40 backdrop-blur-xl shadow-[0_0_30px_rgba(214,182,90,0.05)]' : 'bg-[#10070F]/60 border-[rgba(214,182,90,0.15)] opacity-60'}`}
            >
              <div className="p-6 md:p-8 flex items-center gap-4 cursor-pointer" onClick={() => { if(selectedType && selectedDate && selectedTime) setActiveStep(3) }}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${activeStep === 3 ? 'border-[#D6B65A] text-[#D6B65A]' : 'border-[rgba(214,182,90,0.3)] text-[#C8BDB7]'}`}>
                  <User className="w-4 h-4" />
                </div>
                <h2 className="text-lg md:text-xl font-serif tracking-wide">Client Details</h2>
              </div>
              
              <AnimatePresence>
                {activeStep === 3 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8">
                    <div className="h-[1px] w-full bg-[rgba(214,182,90,0.1)] mb-6" />
                    
                    {/* Selected Slot Summary */}
                    <div className="mb-8 p-4 bg-[rgba(214,182,90,0.05)] border border-[rgba(214,182,90,0.2)] rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#10070F] border border-[#D6B65A]/30 rounded-full flex items-center justify-center text-[#D6B65A]">
                          <CalendarCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#F4EEE5]">{formatDate(selectedDate)}</p>
                          <p className="text-[11px] text-[#C8BDB7] mt-0.5">{selectedTime} · 30 minutes · {selectedType === 'office' ? 'Office Visit' : 'Online'}</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-[rgba(214,182,90,0.1)] border border-[rgba(214,182,90,0.3)] text-[#D6B65A] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider hidden sm:block">
                        Slot Reserved
                      </span>
                    </div>

                    <form className="space-y-4" onSubmit={handleBook}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" required placeholder="Full Name *" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#10070F] border border-[rgba(214,182,90,0.2)] rounded-xl px-5 py-4 text-[#F4EEE5] text-sm focus:outline-none focus:border-[#D6B65A] transition-colors" />
                        <input type="email" required placeholder="Work Email *" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#10070F] border border-[rgba(214,182,90,0.2)] rounded-xl px-5 py-4 text-[#F4EEE5] text-sm focus:outline-none focus:border-[#D6B65A] transition-colors" />
                      </div>
                      <input type="text" required placeholder="Company / Brand Name *" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-[#10070F] border border-[rgba(214,182,90,0.2)] rounded-xl px-5 py-4 text-[#F4EEE5] text-sm focus:outline-none focus:border-[#D6B65A] transition-colors" />
                      <textarea placeholder="What would you like to discuss? (Optional)" rows={3} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full bg-[#10070F] border border-[rgba(214,182,90,0.2)] rounded-xl px-5 py-4 text-[#F4EEE5] text-sm focus:outline-none focus:border-[#D6B65A] transition-colors resize-none"></textarea>
                      
                      <button disabled={!isFormValid || isSubmitting} className="w-full mt-6 bg-gradient-to-r from-[#F4EEE5] via-[#D6B65A] to-[#B9974B] text-[#10070F] px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(214,182,90,0.3)] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-[#10070F] border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>Book Consultation <ArrowRight className="w-4 h-4" /></>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* STEP 4: Success */}
          {activeStep === 4 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto">
              <div className="bg-[#170B15]/90 backdrop-blur-xl border border-[rgba(214,182,90,0.3)] rounded-3xl p-10 md:p-14 text-center shadow-[0_0_50px_rgba(214,182,90,0.1)]">
                
                <div className="w-20 h-20 bg-[rgba(214,182,90,0.1)] border border-[#D6B65A] rounded-full flex items-center justify-center mx-auto mb-8 relative">
                  <div className="absolute inset-0 bg-[#D6B65A] rounded-full blur-xl opacity-20 animate-pulse" />
                  <CheckCircle2 className="w-10 h-10 text-[#D6B65A]" />
                </div>

                <div className="text-[10px] tracking-[0.3em] text-[#D6B65A] font-bold mb-4 uppercase">Session Confirmed</div>
                <h2 className="font-serif text-3xl md:text-5xl text-[#F4EEE5] mb-6">See You Soon, {formData.name.split(' ')[0]}.</h2>
                
                <p className="text-[#C8BDB7] text-sm md:text-base leading-relaxed mb-10 max-w-md mx-auto font-light">
                  A calendar invitation and confirmation details have been sent to <strong className="text-[#F4EEE5] font-normal">{formData.email}</strong>. 
                </p>

                <div className="bg-[#10070F] border border-[rgba(214,182,90,0.2)] rounded-2xl p-6 text-left space-y-4 mb-10">
                  <div className="flex items-center gap-4 border-b border-[rgba(214,182,90,0.1)] pb-4">
                    <CalendarCheck className="w-5 h-5 text-[#D6B65A]" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#C8BDB7] mb-1">Date & Time</div>
                      <div className="text-sm font-bold text-[#F4EEE5]">{formatDate(selectedDate)} at {selectedTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {selectedType === 'office' ? <Building className="w-5 h-5 text-[#D6B65A]" /> : <Video className="w-5 h-5 text-[#D6B65A]" />}
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#C8BDB7] mb-1">Location</div>
                      <div className="text-sm font-bold text-[#F4EEE5]">{selectedType === 'office' ? 'd3 Dubai Design District' : 'Online Appointment'}</div>
                    </div>
                  </div>
                </div>

                <Link href="/" className="inline-block border border-[rgba(214,182,90,0.5)] text-[#F4EEE5] hover:bg-[#D6B65A] hover:text-[#10070F] hover:border-[#D6B65A] px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300">
                  Return Home
                </Link>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
