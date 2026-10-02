"use client";

import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useIntro } from "@/context/IntroContext";
import { IntroVideoOverlay } from "@/components/home/IntroVideoOverlay";
import { HeroSection } from "@/components/home/HeroSection";
import { CountdownSection } from "@/components/home/CountdownSection";
import { IdeaSection } from "@/components/home/IdeaSection";
import { ChaptersMarqueeSection } from "@/components/home/ChaptersMarqueeSection";
import { SponsorsPreviewSection } from "@/components/home/SponsorsPreviewSection";
import { RegisterCtaSection } from "@/components/home/RegisterCtaSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * ESPARTO 2026 — Homepage
 *
 * Flow:
 *   IntroVideoOverlay exits (AnimatePresence) → onExitComplete →
 *   markIntroComplete() → IntroContext updates → LayoutShell reveals
 *   Navbar + Footer → motion.main fades in with HeroSection →
 *   user scrolls → below-fold sections reveal via IntersectionObserver.
 *
 * Key points:
 *  • IntroContext is the single source of truth — page.tsx + LayoutShell both read it.
 *  • Navbar + Footer are visibility:hidden (not removed) during intro,
 *    so the flex shell holds full height and footer can't float up.
 *  • Only the hero has a mount animation. All other sections are scroll-triggered.
 *  • style.y (MotionValue) and initial.opacity are on separate axes — no conflict.
 */
export default function Home() {
  const { introComplete, markIntroComplete } = useIntro();

  // Scroll-linked hero parallax
  const { scrollY } = useScroll();
  const heroYRaw = useTransform(scrollY, [0, 500], [0, -55]);
  const heroY = useSpring(heroYRaw, { stiffness: 55, damping: 22, mass: 1 });

  // STATE 1 — Show intro video overlay
  if (!introComplete) {
    return <IntroVideoOverlay onComplete={markIntroComplete} />;
  }

  // STATE 2 — Homepage
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Hero — opacity animates on mount; y driven by scroll spring */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: heroY }}
      >
        <HeroSection />
      </motion.div>

      {/* Below-fold — scroll-triggered only, never on mount */}
      <ScrollReveal threshold={0.12} direction="up">
        <CountdownSection />
      </ScrollReveal>

      <ScrollReveal threshold={0.1} direction="up">
        <IdeaSection />
      </ScrollReveal>

      <ScrollReveal threshold={0.08} direction="up">
        <ChaptersMarqueeSection />
      </ScrollReveal>

      <ScrollReveal threshold={0.1} direction="up">
        <SponsorsPreviewSection />
      </ScrollReveal>

      <ScrollReveal threshold={0.1} direction="up">
        <RegisterCtaSection />
      </ScrollReveal>
    </motion.div>
  );
}
