"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before animation starts (ms). Useful for staggering sibling elements. */
  delay?: number;
  /** How much of the element must be visible before triggering (0–1). Default 0.15 */
  threshold?: number;
  /** Direction the element slides in from. Default "up" */
  direction?: "up" | "down" | "left" | "right" | "none";
}

/**
 * ScrollReveal
 * Wraps any content and reveals it via a fade + slide when it enters the viewport.
 * Uses IntersectionObserver — animates once, never replays on re-scroll.
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.15,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // animate once only
        }
      },
      { threshold: Math.min(threshold, (window.innerHeight / Math.max(el.offsetHeight, 1)) * threshold) }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const translateMap = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "",
  };

  const initial =
    direction !== "none"
      ? `opacity-0 ${translateMap[direction]}`
      : "opacity-0";

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-x-0 translate-y-0" : initial
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
