"use client";

import { RegistrationNotice } from '@/components/events/RegistrationNotice';
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { HeroSection } from "@/components/home/HeroSection";
import { CountdownSection } from "@/components/home/CountdownSection";
import { IdeaSection } from "@/components/home/IdeaSection";
import { ChaptersMarqueeSection } from "@/components/home/ChaptersMarqueeSection";
import { SponsorsPreviewSection } from "@/components/home/SponsorsPreviewSection";
import { RegisterCtaSection } from "@/components/home/RegisterCtaSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Home() {
  // Scroll-linked hero parallax
  const { scrollY } = useScroll();
  const heroYRaw = useTransform(scrollY, [0, 500], [0, -55]);
  const heroY = useSpring(heroYRaw, { stiffness: 55, damping: 22, mass: 1 });

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

      <div className="mx-auto max-w-7xl px-5 pt-6"><RegistrationNotice /></div>

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
