"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, Play, Pause } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/constants";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  colSpan: string;
  height: string;
}

const GALLERY: GalleryItem[] = [
  {
    id: "c1",
    title: "Cinematic Fashion Editorial Film",
    category: "Cinematic Videography",
    videoUrl: "/media/fashion/story-01.mp4",
    colSpan: "md:col-span-7",
    height: "h-[400px] md:h-[500px]",
  },
  {
    id: "c2",
    title: "Elegant Studio Model",
    category: "Social Media Content",
    videoUrl: "/media/fashion/story-02.mp4",
    colSpan: "md:col-span-5",
    height: "h-[400px] md:h-[500px]",
  },
  {
    id: "c3",
    title: "Fashion Photoshoot Behind the Scenes",
    category: "Fashion Photoshoot",
    videoUrl: "/media/fashion/story-03.mp4",
    colSpan: "md:col-span-5",
    height: "h-[380px] md:h-[420px]",
  },
  {
    id: "c4",
    title: "Fashion Craftsmanship & Atelier",
    category: "Fashion Campaign",
    videoUrl: "/media/fashion/story-04.mp4",
    colSpan: "md:col-span-7",
    height: "h-[380px] md:h-[420px]",
  },
  {
    id: "c5",
    title: "Luxury Runway — Model in Motion",
    category: "Runway & Campaign",
    videoUrl: "/media/fashion/story-05.mp4",
    colSpan: "md:col-span-12",
    height: "h-[380px] md:h-[460px]",
  },
];

// ─── Single Video Card ────────────────────────────────────────────────────────
function VideoCard({
  item,
  index,
  isActive,
  onCardClick,
}: {
  item: GalleryItem;
  index: number;
  isActive: boolean;
  onCardClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (isActive) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
      setPlaying(true);

      timerRef.current = setTimeout(() => {
        vid.pause();
        setPlaying(false);
      }, 3000);
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
      vid.pause();
      vid.currentTime = 0;
      setPlaying(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1 }}
      onClick={onCardClick}
      className={`relative w-full h-full rounded-2xl overflow-hidden bg-[#1A1518] border cursor-pointer group transition-all duration-500 ${
        isActive
          ? "border-[rgba(214,182,90,0.6)] shadow-[0_0_45px_rgba(214,182,90,0.15)]"
          : "border-white/5 hover:border-white/20"
      }`}
      data-cursor="play"
    >
      {/* Video */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          playing ? "opacity-100" : "opacity-80 group-hover:opacity-95"
        }`}
      >
        <source src={item.videoUrl} type="video/mp4" />
      </video>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20 pointer-events-none z-10" />

      {/* Scroll progress bar */}
      {isActive && (
        <motion.div
          key={`progress-${item.id}`}
          className="absolute top-0 left-0 h-[3px] bg-[#D6B65A] z-30 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 3, ease: "linear" }}
        />
      )}

      {/* Top-left Luxury Signature badge */}
      <div className="absolute top-5 left-5 z-20 w-8 h-8 rounded-full bg-[#F4EEE5] text-[#10070F] flex items-center justify-center text-[10px] font-bold font-serif">
        LS
      </div>

      {/* Top-right play/pause */}
      <div
        className={`absolute top-5 right-5 z-20 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
          playing
            ? "bg-[#D6B65A] border-[#D6B65A] text-[#10070F]"
            : "bg-black/50 border-white/15 text-white group-hover:border-[#D6B65A]/60 group-hover:text-[#D6B65A]"
        }`}
      >
        {playing ? (
          <Pause className="w-3.5 h-3.5 fill-current" />
        ) : (
          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
        )}
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-6 left-6 right-6 z-20 space-y-1">
        <motion.p
          animate={{ color: isActive ? "#D6B65A" : "rgba(214,182,90,0.85)" }}
          className="text-[10px] uppercase tracking-[0.2em] font-bold font-sans"
        >
          {item.category}
        </motion.p>
        <h3 className="font-serif text-xl sm:text-2xl text-white leading-snug">
          {item.title}
        </h3>
      </div>
    </motion.div>
  );
}

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-[#10070F]/95 backdrop-blur-2xl flex items-center justify-center p-6 sm:p-10"
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-[#21101E] border border-[rgba(214,182,90,0.35)] shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#10070F]/90 border border-white/10 flex items-center justify-center text-white hover:text-[#D6B65A] hover:border-[#D6B65A]/50 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <video
          autoPlay
          controls
          muted
          loop
          playsInline
          className="w-full max-h-[72vh] object-contain bg-black"
        >
          <source src={item.videoUrl} type="video/mp4" />
        </video>

        <div className="p-6 space-y-1">
          <span className="text-[10px] uppercase tracking-[0.22em] text-[#D6B65A] font-semibold font-sans">
            {item.category} · Luxury Signature Studio
          </span>
          <h3 className="font-serif text-2xl text-[#F4EEE5]">{item.title}</h3>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function ContentCreationSection() {
  const category = SERVICE_CATEGORIES[4];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const sequenceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSequencing = useRef(false);

  const runSequence = useCallback(() => {
    if (isSequencing.current) return;
    isSequencing.current = true;
    let idx = 0;

    const playNext = () => {
      if (idx >= GALLERY.length) {
        setActiveIdx(null);
        isSequencing.current = false;
        return;
      }
      setActiveIdx(idx++);
      sequenceTimer.current = setTimeout(playNext, 3200);
    };

    playNext();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isSequencing.current) {
          runSequence();
        }
        if (!entry.isIntersecting) {
          if (sequenceTimer.current) clearTimeout(sequenceTimer.current);
          isSequencing.current = false;
          setActiveIdx(null);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (sequenceTimer.current) clearTimeout(sequenceTimer.current);
    };
  }, [runSequence]);

  return (
    <section
      id={category.slug}
      ref={sectionRef}
      className="section-padding bg-[#0A0709] relative overflow-hidden border-t border-white/5"
    >
      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4a1840]/8 rounded-full blur-[220px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        {/* Header */}
        <div className="mb-16 sm:mb-20 space-y-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-[#D2B48C] label-uppercase"
          >
            <Camera className="w-4 h-4" />
            <span>Category 05</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl text-white uppercase tracking-wide leading-tight"
          >
            We Create{" "}
            <span className="italic text-[#D6B65A] font-light block">
              Visual Stories.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed font-sans font-light"
          >
            From fashion photoshoots to cinematic storytelling, we create visual
            experiences that embody your brand.
          </motion.p>

          {/* Sequence dots */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 pt-1"
          >
            <span className="text-[10px] uppercase tracking-widest text-gray-600 font-bold font-sans">
              Scroll to play
            </span>
            <div className="flex gap-1.5 items-center">
              {GALLERY.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: activeIdx === i ? 28 : 6,
                    backgroundColor:
                      activeIdx === i
                        ? "#D6B65A"
                        : activeIdx !== null && i < activeIdx
                        ? "rgba(214,182,90,0.35)"
                        : "rgba(255,255,255,0.1)",
                  }}
                  className="h-1.5 rounded-full"
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {GALLERY.map((item, index) => (
            <div
              key={item.id}
              className={`col-span-1 ${item.colSpan} ${item.height}`}
            >
              <VideoCard
                item={item}
                index={index}
                isActive={activeIdx === index}
                onCardClick={() => setLightboxItem(item)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
