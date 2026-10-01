"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { COUNTDOWN_TARGET, FEST_INFO } from "@/lib/constants";
import { useCountdown } from "@/lib/countdown";

/**
 * CountdownSection Component
 * 
 * Clean, Editorial Festival Countdown for ESPARTO 2026:
 * - High-contrast display numerals & clean typography
 * - Drift-free real-time calculation from centralized target
 * - Accessible live summary + reduced-motion support
 */
export function CountdownSection() {
  const { days, hours, minutes, seconds, isLive, isMounted } = useCountdown(COUNTDOWN_TARGET);

  // Accessible summary string for screen readers
  const accessibleCountdownText = isMounted
    ? isLive
      ? `${FEST_INFO.name} ${FEST_INFO.edition} is live now!`
      : `Countdown to ${FEST_INFO.name} 2026: ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds remaining until October 09, 2026 at 9:30 AM IST.`
    : `Countdown to ${FEST_INFO.name} 2026. Scheduled for October 09–10, 2026 starting at 9:30 AM IST.`;

  return (
    <section
      id="countdown"
      aria-label="ESPARTO 2026 Countdown"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#040212] overflow-hidden border-t border-brand-violet/15 border-b border-brand-violet/10"
    >
      {/* Background Subtle Ambient Glow */}
      <div
        className="absolute top-1/2 -left-20 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-brand-purple/10 blur-[130px] pointer-events-none mix-blend-screen"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 -right-20 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-brand-magenta/10 blur-[140px] pointer-events-none mix-blend-screen"
        aria-hidden="true"
      />

      {/* Screen reader accessible live announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {accessibleCountdownText}
      </div>

      <Container size="lg" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* =====================================================================
              LEFT COLUMN: EDITORIAL FESTIVAL IDENTITY
              ===================================================================== */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            
            {/* Editorial Heading */}
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-text-primary tracking-tight leading-[1.05] uppercase mb-5">
              THE CLOCK <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet via-brand-magenta to-brand-orange">
                IS RUNNING
              </span>
            </h2>

            {/* Supporting Context */}
            <p className="text-text-secondary text-sm sm:text-base font-body leading-relaxed max-w-sm border-l-2 border-brand-magenta/40 pl-4 py-1">
              Two days of high-stakes hackathons, competitive robotics, and breakthrough engineering at {FEST_INFO.institution.shortName}.
            </p>
          </div>

          {/* =====================================================================
              RIGHT COLUMN: DOMINANT EDITORIAL NUMERICAL COMPOSITION
              ===================================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-center" aria-hidden="true">
            
            {isLive ? (
              /* Celebration / Live Event State */
              <div className="flex flex-col items-start lg:items-center justify-center p-8 sm:p-12 rounded-2xl border border-brand-magenta/40 bg-[#0a061d]/80 shadow-[0_0_30px_rgba(255,0,122,0.25)]">
                <p className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-purple uppercase animate-pulse">
                  ESPARTO IS LIVE
                </p>
                <p className="font-mono text-xs sm:text-sm text-text-secondary mt-3 tracking-widest uppercase">
                  WELCOME TO HITAM TECHNICAL FEST
                </p>
              </div>
            ) : (
              /* Real-time Editorial Countdown Display */
              <div className="flex flex-col gap-6 sm:gap-8">
                
                {/* 1. Primary Highlight Unit: DAYS */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-white/10 pb-5 sm:pb-7">
                  <div className="flex items-baseline gap-3">
                    <span 
                      suppressHydrationWarning
                      className="font-display font-black text-6xl xs:text-7xl sm:text-8xl md:text-9xl text-text-primary tracking-tighter leading-none select-none drop-shadow-[0_0_20px_rgba(255,255,255,0.12)] tabular-nums"
                    >
                      {days}
                    </span>
                    <span className="font-mono font-bold text-xs sm:text-sm text-brand-magenta tracking-[0.2em] uppercase">
                      DAYS
                    </span>
                  </div>
                  <span className="text-xs font-mono text-text-muted tracking-wider uppercase mt-2 sm:mt-0">
                    DAYS REMAINING
                  </span>
                </div>

                {/* 2. Precision Clock Units: HOURS : MINUTES : SECONDS */}
                <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-1">
                  
                  {/* Hours */}
                  <div className="flex flex-col items-start">
                    <span 
                      suppressHydrationWarning
                      className="font-display font-extrabold text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight tabular-nums select-none"
                    >
                      {hours}
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs font-bold text-text-muted tracking-wider uppercase mt-1">
                      HOURS
                    </span>
                  </div>

                  {/* Minutes */}
                  <div className="flex flex-col items-start border-l border-white/10 pl-4 sm:pl-8">
                    <span 
                      suppressHydrationWarning
                      className="font-display font-extrabold text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight tabular-nums select-none"
                    >
                      {minutes}
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs font-bold text-text-muted tracking-wider uppercase mt-1">
                      MINUTES
                    </span>
                  </div>

                  {/* Seconds (Kinetic active accent) */}
                  <div className="flex flex-col items-start border-l border-white/10 pl-4 sm:pl-8">
                    <span 
                      suppressHydrationWarning
                      className="font-display font-extrabold text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber tracking-tight tabular-nums select-none"
                    >
                      {seconds}
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs font-bold text-brand-orange tracking-wider uppercase mt-1">
                      SECONDS
                    </span>
                  </div>

                </div>

                {/* 3. Subtle Technical Accent Line */}
                <div className="relative w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-1">
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-purple via-brand-magenta to-brand-orange w-1/3 animate-[shimmer_3s_infinite_linear]"
                    style={{
                      backgroundSize: "200% 100%",
                    }}
                  />
                </div>

              </div>
            )}

          </div>

        </div>
      </Container>
    </section>
  );
}
