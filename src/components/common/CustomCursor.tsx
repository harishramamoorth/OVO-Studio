"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

type CursorState = "default" | "hover" | "play" | "view" | "button";

export default function CustomCursor() {
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const stateRef = useRef<CursorState>("default");

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  // High frame-rate, zero-lag dot tracking
  const dotX = useSpring(mx, { stiffness: 1800, damping: 50, mass: 0.01 });
  const dotY = useSpring(my, { stiffness: 1800, damping: 50, mass: 0.01 });

  // Fast & fluid trailing ring
  const ringX = useSpring(mx, { stiffness: 350, damping: 28, mass: 0.1 });
  const ringY = useSpring(my, { stiffness: 350, damping: 28, mass: 0.1 });

  useEffect(() => {
    // Disable completely on mobile/touch devices
    const checkMobile = () => {
      const isTouchDevice =
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      return isTouchDevice || isSmallScreen;
    };

    if (checkMobile()) {
      setIsMobile(true);
      return;
    }

    setIsMobile(false);

    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);

      if (!visible) setVisible(true);

      // Throttled element inspection to prevent layout thrashing
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const el = e.target as HTMLElement | null;
        if (!el) return;

        let nextState: CursorState = "default";
        if (el.closest("video, [data-cursor='play']")) {
          nextState = "play";
        } else if (el.closest("img, [data-cursor='view']")) {
          nextState = "view";
        } else if (el.closest("button, [role='button'], .btn-glow")) {
          nextState = "button";
        } else if (el.closest("a, input, textarea, select, [data-cursor='hover']")) {
          nextState = "hover";
        }

        // ONLY trigger React re-render when state actually changes!
        if (nextState !== stateRef.current) {
          stateRef.current = nextState;
          setState(nextState);
        }
      });
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [mx, my, visible]);

  if (isMobile || !visible) return null;

  const isExpanded = state === "play" || state === "view";
  const isHovered = state === "hover" || state === "button";

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Trailing Ring - GPU Accelerated */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 rounded-full border border-solid will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isExpanded ? 56 : state === "button" ? 44 : state === "hover" ? 36 : 26,
          height: isExpanded ? 56 : state === "button" ? 44 : state === "hover" ? 36 : 26,
          scale: isClicking ? 0.8 : 1,
          borderColor: isExpanded
            ? "rgba(214, 182, 90, 0.85)"
            : state === "button"
            ? "rgba(214, 182, 90, 0.7)"
            : state === "hover"
            ? "rgba(244, 238, 229, 0.65)"
            : "rgba(244, 238, 229, 0.28)",
          backgroundColor: isExpanded
            ? "rgba(214, 182, 90, 0.1)"
            : state === "button"
            ? "rgba(214, 182, 90, 0.06)"
            : "rgba(0, 0, 0, 0)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      />

      {/* Instant Precision Dot - GPU Accelerated */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 rounded-full will-change-transform"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isClicking ? 4 : isExpanded ? 7 : isHovered ? 6 : 5,
          height: isClicking ? 4 : isExpanded ? 7 : isHovered ? 6 : 5,
          scale: isClicking ? 0.65 : 1,
          backgroundColor: isExpanded || state === "button"
            ? "#D6B65A"
            : state === "hover"
            ? "#F4EEE5"
            : "rgba(244, 238, 229, 0.95)",
          boxShadow: isHovered || isExpanded ? "0 0 12px rgba(214, 182, 90, 0.6)" : "none",
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 40 }}
      />
    </div>
  );
}


