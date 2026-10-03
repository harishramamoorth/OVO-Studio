"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

type CursorState = "default" | "hover" | "play" | "view";

export default function CustomCursor() {
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const isTouch = useRef(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  // Dot follows cursor exactly
  const dotX = useSpring(mx, { stiffness: 900, damping: 35, mass: 0.1 });
  const dotY = useSpring(my, { stiffness: 900, damping: 35, mass: 0.1 });

  // Ring lags behind slightly for elegant feel
  const ringX = useSpring(mx, { stiffness: 200, damping: 30, mass: 0.5 });
  const ringY = useSpring(my, { stiffness: 200, damping: 30, mass: 0.5 });

  useEffect(() => {
    // Disable on touch devices
    if (
      typeof window === "undefined" ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      isTouch.current = true;
      return;
    }
    if (window.innerWidth < 1024) {
      isTouch.current = true;
      return;
    }

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);

      const el = e.target as HTMLElement | null;
      if (!el) return;

      if (el.closest("video, [data-cursor='play']")) {
        setState("play");
      } else if (el.closest("img, [data-cursor='view']")) {
        setState("view");
      } else if (el.closest("button, a, [data-cursor='hover']")) {
        setState("hover");
      } else {
        setState("default");
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isTouch.current || !visible) return null;

  const isExpanded = state === "play" || state === "view";

  return (
    <>
      {/* Trailing ring — larger, semi-transparent */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width:  isExpanded ? 52 : state === "hover" ? 38 : 28,
          height: isExpanded ? 52 : state === "hover" ? 38 : 28,
          borderColor: isExpanded
            ? "rgba(214,182,90,0.7)"
            : state === "hover"
            ? "rgba(244,238,229,0.5)"
            : "rgba(244,238,229,0.25)",
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 26, mass: 0.4 }}
      />

      {/* Inner dot — sharp and precise */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width:  isExpanded ? 6 : 5,
          height: isExpanded ? 6 : 5,
          backgroundColor: isExpanded
            ? "#D6B65A"
            : state === "hover"
            ? "#F4EEE5"
            : "rgba(244,238,229,0.9)",
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 900, damping: 35 }}
      />

      {/* Accent arc that appears on video/image hover — a decorative outer ring */}
      {isExpanded && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full border border-[rgba(214,182,90,0.25)]"
          style={{
            x: ringX,
            y: ringY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ width: 28, height: 28, opacity: 0 }}
          animate={{ width: 80, height: 80, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 22 }}
        />
      )}
    </>
  );
}
