import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";

import { GOOGLE_APPS_SCRIPT_REGISTRATION_URL } from "@/data/events";

/**
 * RegisterCtaSection Component — Final Homepage CTA
 * 
 * High-impact festival registration invitation:
 * - Headline: "READY TO BUILD WHAT'S NEXT?"
 * - Supporting info: October 09–10, 2026 • HITAM Campus, Hyderabad
 * - Primary Action: [ REGISTER NOW → ]
 */
export function RegisterCtaSection() {
  return (
    <section
      id="register"
      aria-label="Register for ESPARTO 2026"
      className="relative py-24 sm:py-32 bg-[#03010b] overflow-hidden border-b border-brand-violet/15 text-center"
    >
      {/* Background Central Atmospheric Aura */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] rounded-full bg-brand-magenta/15 blur-[160px] pointer-events-none mix-blend-screen"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full bg-brand-orange/10 blur-[140px] pointer-events-none mix-blend-screen"
        aria-hidden="true"
      />

      <Container size="md" className="relative z-10">
        
        {/* Dominant Headline */}
        <h2 className="font-display font-black text-4xl xs:text-5xl sm:text-6xl md:text-7xl text-text-primary tracking-tight leading-[1.05] uppercase mb-6">
          READY TO BUILD <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet drop-shadow-[0_0_30px_rgba(255,0,122,0.3)]">
            WHAT&apos;S NEXT?
          </span>
        </h2>

        {/* Supporting Copy */}
        <p className="text-text-secondary text-base sm:text-lg md:text-xl font-body leading-relaxed max-w-xl mx-auto mb-10">
          Step into the arena. Experience two intense days of technical innovation, collaborative problem solving, and engineering excellence.
        </p>

        {/* Primary Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={GOOGLE_APPS_SCRIPT_REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-display font-black text-sm sm:text-base tracking-widest uppercase text-white bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-purple shadow-[0_0_30px_rgba(255,94,0,0.4)] hover:shadow-[0_0_45px_rgba(255,0,122,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>REGISTER NOW</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          <Link
            href="/events"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full font-display font-bold text-sm tracking-wider uppercase text-text-secondary hover:text-white border border-white/10 hover:border-brand-violet/50 bg-white/5 hover:bg-brand-purple/20 transition-all"
          >
            <span>EXPLORE ALL EVENTS</span>
          </Link>
        </div>

      </Container>
    </section>
  );
}
