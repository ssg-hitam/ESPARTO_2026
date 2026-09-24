import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";

/**
 * IdeaSection Component — The Idea / About ESPARTO Preview
 * 
 * Concise, high-impact festival philosophy:
 * - Statement: "EVERYTHING STARTS WITH AN IDEA."
 * - Concise manifesto: "ESPARTO is a platform where ideas become innovation, and innovation creates impact."
 * - Visual Triad: 01 IDEA → 02 INNOVATION → 03 IMPACT
 * - Action CTA: [ ABOUT ESPARTO → ]
 * - Cropped sculptural ESPARTO motif as subtle ambient background
 */
export function IdeaSection() {
  return (
    <section
      id="about"
      aria-label="The ESPARTO Idea"
      className="relative py-20 sm:py-28 bg-[#050212] overflow-hidden border-b border-brand-violet/15"
    >
      {/* Subtle Atmospheric Aura */}
      <div 
        className="absolute top-1/2 -left-20 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-brand-purple/10 blur-[140px] pointer-events-none mix-blend-screen"
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/3 -right-20 w-[400px] h-[400px] rounded-full bg-brand-magenta/10 blur-[130px] pointer-events-none mix-blend-screen"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">
        <div className="relative p-8 sm:p-12 lg:p-16 rounded-3xl border border-brand-violet/25 bg-[#08041d]/80 backdrop-blur-md overflow-hidden">
          
          {/* Subtle Cropped ESPARTO Visual Motif as Ambient Identity Anchor */}
          <div 
            className="absolute -right-8 -bottom-10 w-[240px] sm:w-[320px] lg:w-[380px] opacity-15 pointer-events-none select-none mix-blend-screen"
            aria-hidden="true"
          >
            <Image
              src="/images/hero/esparto-hero-character.webp"
              alt=""
              width={400}
              height={400}
              className="w-full h-auto object-contain filter grayscale contrast-125"
              priority={false}
            />
          </div>

          <div className="relative z-10 max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-violet/30 bg-surface/80 mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" aria-hidden="true" />
              <span className="font-mono text-xs font-bold tracking-widest text-text-secondary uppercase">
                THE IDEA
              </span>
            </div>

            {/* Dominant Headline */}
            <h2 className="font-display font-black text-3xl xs:text-4xl sm:text-5xl lg:text-6xl text-text-primary tracking-tight leading-[1.05] uppercase mb-5">
              EVERYTHING STARTS <br />
              WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">AN IDEA.</span>
            </h2>

            {/* Concise Manifesto */}
            <p className="text-text-secondary text-base sm:text-lg md:text-xl font-body leading-relaxed max-w-2xl mb-10 border-l-2 border-brand-magenta/40 pl-4 py-0.5">
              ESPARTO is a platform where ideas become innovation, and innovation creates impact. A collaborative technical arena where curiosity transforms into engineering reality.
            </p>

            {/* Progression Triad: 01 IDEA → 02 INNOVATION → 03 IMPACT */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 max-w-2xl">
              
              {/* 01 IDEA */}
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm group hover:border-brand-orange/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-xs text-brand-orange">01</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">GENESIS</span>
                </div>
                <h3 className="font-display font-bold text-lg text-text-primary uppercase tracking-wide">
                  IDEA
                </h3>
                <p className="text-text-muted text-xs font-body mt-1">
                  The spark of creative curiosity.
                </p>
              </div>

              {/* 02 INNOVATION */}
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm group hover:border-brand-magenta/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-xs text-brand-magenta">02</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">BUILD</span>
                </div>
                <h3 className="font-display font-bold text-lg text-text-primary uppercase tracking-wide">
                  INNOVATION
                </h3>
                <p className="text-text-muted text-xs font-body mt-1">
                  Rigorous engineering & code.
                </p>
              </div>

              {/* 03 IMPACT */}
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm group hover:border-brand-violet/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-xs text-brand-violet">03</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">OUTCOME</span>
                </div>
                <h3 className="font-display font-bold text-lg text-text-primary uppercase tracking-wide">
                  IMPACT
                </h3>
                <p className="text-text-muted text-xs font-body mt-1">
                  Scalable real-world solutions.
                </p>
              </div>

            </div>

            {/* CTA Link to /about */}
            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-display font-bold text-xs sm:text-sm tracking-wider uppercase text-white border border-brand-violet/50 bg-brand-purple/20 hover:bg-brand-purple/40 hover:border-brand-magenta/60 transition-all group"
              >
                <span>ABOUT ESPARTO</span>
                <ArrowRight className="w-4 h-4 text-brand-magenta transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
