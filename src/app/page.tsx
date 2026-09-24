"use client";

import React, { useState, useEffect } from "react";
import { IntroVideoOverlay } from "@/components/home/IntroVideoOverlay";
import { HeroSection } from "@/components/home/HeroSection";
import { CountdownSection } from "@/components/home/CountdownSection";
import { IdeaSection } from "@/components/home/IdeaSection";
import { ChaptersMarqueeSection } from "@/components/home/ChaptersMarqueeSection";
import { RegisterCtaSection } from "@/components/home/RegisterCtaSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * ESPARTO 2026 — Strict Two-State Homepage
 *
 * STATE 1 → IntroVideoOverlay (only this is rendered — homepage does NOT exist in DOM)
 * STATE 2 → Homepage with scroll-triggered progressive section reveals
 *
 * The transition between states is:
 *   Video ends (or skip) → 700ms black hold → homepage fades in → scroll to explore
 *
 * NEVER renders both states simultaneously.
 */
export default function Home() {
  /**
   * introComplete: tracks whether we should show homepage.
   * Defaults to `true` if already seen this session (skip video on revisit).
   */
  const [introComplete, setIntroComplete] = useState<boolean | null>(null);
  const [homepageVisible, setHomepageVisible] = useState(false);

  useEffect(() => {
    const alreadySeen =
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem("esparto_2026_intro_played") === "true";

    if (alreadySeen) {
      // Skip intro — go straight to homepage
      setIntroComplete(true);
      setHomepageVisible(true);
    } else {
      // Show intro first
      setIntroComplete(false);
    }
  }, []);

  const handleIntroComplete = () => {
    // Mark session so revisits skip the intro
    sessionStorage.setItem("esparto_2026_intro_played", "true");
    setIntroComplete(true);
    // Small delay for fade transition, then reveal homepage
    requestAnimationFrame(() => {
      setHomepageVisible(true);
    });
  };

  // While we haven't determined state yet (SSR/hydration moment), show black screen
  if (introComplete === null) {
    return <div className="fixed inset-0 bg-black z-[99999]" />;
  }

  // STATE 1 — INTRO ONLY. Homepage does not exist in the DOM.
  if (!introComplete) {
    return <IntroVideoOverlay onComplete={handleIntroComplete} />;
  }

  // STATE 2 — HOMEPAGE (fade in once intro is done)
  return (
    <main
      className={`transition-opacity duration-700 ease-out ${
        homepageVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* 1. Hero — immediately visible above fold */}
      <HeroSection />

      {/* 2. Countdown — revealed on scroll */}
      <ScrollReveal threshold={0.1} delay={0} direction="up">
        <CountdownSection />
      </ScrollReveal>

      {/* 3. ESPARTO Identity — revealed on scroll */}
      <ScrollReveal threshold={0.1} delay={0} direction="up">
        <IdeaSection />
      </ScrollReveal>

      {/* 4. Chapters Marquee — revealed on scroll */}
      <ScrollReveal threshold={0.08} delay={0} direction="up">
        <ChaptersMarqueeSection />
      </ScrollReveal>

      {/* 5. Register CTA — revealed on scroll */}
      <ScrollReveal threshold={0.1} delay={0} direction="up">
        <RegisterCtaSection />
      </ScrollReveal>
    </main>
  );
}
