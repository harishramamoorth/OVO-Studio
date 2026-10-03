"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/constants";
import { Award, ShieldCheck, Star } from "lucide-react";

function Counter({ value, display }: { value: number; display: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = Math.ceil(value / (duration / 16));

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const suffix = display.replace(/[0-9]/g, "");

  return (
    <span ref={ref} className="font-serif text-5xl sm:text-7xl lg:text-8xl text-champagne-400 font-normal">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const icons = [Award, ShieldCheck, Star];

  return (
    <section className="section-padding bg-[#170B15] relative overflow-hidden border-t border-[rgba(244,238,229,0.08)]">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-[11px] uppercase tracking-[0.18em] text-champagne-400 font-semibold block">
            TRACK RECORD OF EXCELLENCE
          </span>
          
          <h2 className="font-serif font-normal text-beige-50 heading-h2 tracking-tight">
            YOU'RE IN GOOD HANDS.
          </h2>

          <p className="text-base text-beige-200/80 font-sans font-light">
            Empowering luxury fashion creators across Dubai, Milan, Paris, and London.
          </p>
        </div>

        {/* 3 Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STATS.map((stat, idx) => {
            const IconComp = icons[idx % icons.length];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-[#21101E] rounded-2xl p-10 border border-[rgba(214,182,90,0.14)] hover:border-champagne-400/40 text-center space-y-4 group transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-full bg-[#10070F] border border-[rgba(214,182,90,0.18)] flex items-center justify-center mx-auto text-champagne-400 group-hover:scale-110 transition-transform">
                  <IconComp className="w-5 h-5 text-champagne-400" />
                </div>

                <div>
                  <Counter value={stat.value} display={stat.display} />
                  <h3 className="font-serif text-2xl text-beige-50 font-normal mt-2">
                    {stat.label}
                  </h3>
                </div>

                <p className="text-xs text-beige-200/70 font-sans font-light">
                  {stat.sub}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
