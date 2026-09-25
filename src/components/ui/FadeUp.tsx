"use client";

import React from "react";
import { motion, useInView } from "framer-motion";

interface FadeUpProps {
  children: React.ReactNode;
  /** Stagger delay offset in seconds. 0 = immediate, 0.1, 0.2… */
  delay?: number;
  /** How much of element must be visible before triggering. Default 0.15 */
  threshold?: number;
  /** Y offset to start from in px. Default 40 */
  distance?: number;
  /** Additional className on the wrapper div */
  className?: string;
  /** If true, animation replays every time element enters viewport */
  repeat?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * FadeUp — Framer Motion scroll-reveal component.
 *
 * Wraps any content and fades it up from `distance` px below as it enters
 * the viewport. Uses `useInView` (Framer) for accurate, efficient detection.
 *
 * Usage:
 *   <FadeUp delay={0.1}><MyCard /></FadeUp>
 *   <FadeUp delay={0.2} distance={60}><MySection /></FadeUp>
 */
export function FadeUp({
  children,
  delay = 0,
  threshold = 0.15,
  distance = 40,
  className = "",
  repeat = false,
}: FadeUpProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: !repeat,
    amount: threshold,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{
        duration: 0.75,
        delay,
        ease: EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeUpGroup — Wraps multiple children and staggers them automatically.
 *
 * Usage:
 *   <FadeUpGroup stagger={0.12}>
 *     <Card />  ← delay 0
 *     <Card />  ← delay 0.12
 *     <Card />  ← delay 0.24
 *   </FadeUpGroup>
 */
interface FadeUpGroupProps {
  children: React.ReactNode[];
  stagger?: number;
  threshold?: number;
  distance?: number;
  className?: string;
}

export function FadeUpGroup({
  children,
  stagger = 0.1,
  threshold = 0.1,
  distance = 40,
  className = "",
}: FadeUpGroupProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: distance }}
          animate={
            isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }
          }
          transition={{
            duration: 0.75,
            delay: i * stagger,
            ease: EASE,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
