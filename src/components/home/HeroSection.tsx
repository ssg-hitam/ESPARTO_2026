import React from "react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { RegisterButton } from "@/components/ui/RegisterButton";
import { Button } from "@/components/ui/Button";
import { HeroArtwork } from "@/components/home/HeroArtwork";
import { ShapeGrid } from "@/components/ui/ShapeGrid";
import { FEST_INFO } from "@/lib/constants";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

/**
 * HeroSection Component
 * 
 * Production Responsive Web Hero:
 * - Pure HTML/CSS/SVG/Canvas environment
 * - Interactive Hexagon ShapeGrid with dynamic cursor hover trail & smooth downward motion
 * - Left side: [ HITAM PRESENTS ] + 3D ESPARTO + HITAM TECHNICAL FEST + Tagline + Date/Location + CTAs
 * - Right side: Focal head artwork with orbital rings and atmospheric backlighting
 */
export function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="ESPARTO 2026 Hero"
      className="relative min-h-[calc(100vh-68px)] flex items-center justify-center pt-0 pb-6 lg:pt-0 lg:pb-4 overflow-hidden bg-[#030318]"
    >

      {/* =========================================================================
          LAYER 1: ATMOSPHERIC CSS RADIAL NEBULAS
          ========================================================================= */}
      {/* Top Left Ambient Purple Aura */}
      <div 
        className="absolute -top-[10%] left-[5%] w-[550px] h-[550px] rounded-full bg-brand-purple/20 blur-[130px] pointer-events-none mix-blend-screen"
        aria-hidden="true"
      />
      {/* Center-Right Intense Magenta/Violet Nebula */}
      <div 
        className="absolute top-[20%] right-[10%] w-[600px] h-[600px] rounded-full bg-brand-magenta/20 blur-[140px] pointer-events-none mix-blend-screen"
        aria-hidden="true"
      />
      {/* Bottom Center Cyber Orange Core */}
      <div 
        className="absolute bottom-[5%] right-[20%] w-[400px] h-[350px] rounded-full bg-brand-orange/15 blur-[100px] pointer-events-none mix-blend-screen"
        aria-hidden="true"
      />

      {/* =========================================================================
          LAYER 2: REACT BITS SHAPEGRID (Interactive Hexagon Grid with Cursor Trail)
          ========================================================================= */}
      <div 
        className="absolute inset-0 w-full h-full z-0 overflow-hidden"
        style={{
          maskImage: "radial-gradient(ellipse 92% 88% at 50% 50%, black 45%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 92% 88% at 50% 50%, black 45%, transparent 100%)",
        }}
      >
        <ShapeGrid 
          speed={0.24}
          size={34}
          direction="down"
          borderColor="rgba(121, 80, 242, 0.3)"
          hoverColor="#FF007A"
          shape="hexagon"
          hoverTrailAmount={5}
          className="opacity-80"
        />
      </div>

      {/* =========================================================================
          LAYER 3: MAIN HERO RESPONSIVE CONTENT GRID
          ========================================================================= */}
      <Container size="lg" className="relative z-10 w-full">
        
        {/* Semantic H1 for Search Engines & Screen Readers */}
        <h1 className="sr-only">
          {FEST_INFO.name} {FEST_INFO.edition} - {FEST_INFO.institution.name} Technical Fest
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
          
          {/* =====================================================================
              LEFT COLUMN: BRAND TYPOGRAPHY & CTAs (Safe Zone: 58% on Desktop)
              ===================================================================== */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            
            {/* 1. Bracketed Institutional Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-brand-violet/40 bg-surface/85 backdrop-blur-md shadow-[0_0_12px_rgba(155,81,224,0.25)] mb-3">
              <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.2em] text-text-secondary uppercase">
                [ {FEST_INFO.institution.shortName} PRESENTS ]
              </span>
            </div>

            {/* 2. Dominant 3D Neon ESPARTO Wordmark */}
            <div className="relative inline-flex flex-col items-center lg:items-start select-none max-w-full mb-2">
              <div className="tracking-tight leading-[0.9] whitespace-nowrap overflow-visible">
                <span className="esparto-hero-title block text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[6.2rem] xl:text-[7.6rem] 2xl:text-[8.6rem] pr-2 sm:pr-4">
                  {FEST_INFO.name}
                </span>
              </div>
            </div>

            {/* 3. Slanted Orange HITAM TECHNICAL FEST Banner */}
            <div className="hitam-fest-banner inline-block px-5 sm:px-7 md:px-9 py-1.5 sm:py-2.5 rounded-sm -mt-1 sm:-mt-1.5 mb-5 sm:mb-6 self-center lg:self-start shadow-xl">
              <span className="hitam-fest-banner-text block font-display font-black text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-wider text-white uppercase">
                {FEST_INFO.institution.shortName} TECHNICAL FEST
              </span>
            </div>

            {/* 4. Sub-Tagline: IDEAS -> INNOVATION -> IMPACT */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-4 font-mono text-xs sm:text-sm md:text-[15px] font-bold tracking-[0.25em] text-text-primary mb-6 sm:mb-7 uppercase">
              <span>IDEAS</span>
              <span className="text-brand-magenta font-black text-sm sm:text-base" aria-hidden="true">→</span>
              <span>INNOVATION</span>
              <span className="text-brand-magenta font-black text-sm sm:text-base" aria-hidden="true">→</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber font-extrabold">
                IMPACT
              </span>
            </div>

            {/* Mobile Only: Inline Right Artwork Placement */}
            <div className="lg:hidden w-full max-w-[280px] xs:max-w-[320px] my-6 flex items-center justify-center">
              <HeroArtwork />
            </div>

            {/* 5. Event Metadata Lockup (Date & Location) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 mb-7 sm:mb-8 font-mono">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl border border-brand-magenta/40 bg-brand-magenta/10 shadow-[0_0_12px_rgba(255,0,122,0.3)]">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-brand-magenta stroke-[2]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-text-primary font-bold tracking-wider text-xs sm:text-sm md:text-[15px]">
                    OCTOBER 09 — 10
                  </span>
                  <span className="text-text-muted text-xs">2026 · FROM 9:30 AM</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl border border-brand-violet/40 bg-brand-violet/10 shadow-[0_0_12px_rgba(155,81,224,0.3)]">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-brand-violet stroke-[2]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-text-primary font-bold tracking-wider text-xs sm:text-sm md:text-[15px]">
                    HITAM
                  </span>
                  <span className="text-text-muted text-xs">HYDERABAD</span>
                </div>
              </div>
            </div>

            {/* 6. Conversion CTA Group */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
              {/* Primary Explore Events CTA */}
              <Button
                asChild
                size="md"
                className="w-full sm:w-auto min-w-[190px] bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-purple text-white font-display font-bold text-xs sm:text-sm tracking-wider uppercase rounded-full px-8 py-3.5 shadow-[0_0_20px_rgba(255,94,0,0.45)] hover:shadow-[0_0_30px_rgba(255,0,122,0.6)] hover:brightness-110 transition-all active:scale-95"
              >
                <Link href="/events" className="flex items-center justify-center gap-2.5">
                  <span>EXPLORE EVENTS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              {/* Secondary Register CTA */}
              <div className="w-full sm:w-auto min-w-[170px]">
                <RegisterButton
                  size="md"
                  className="w-full rounded-full border-2 border-brand-purple/70 bg-[#0a061d]/90 text-white font-display font-bold text-xs sm:text-sm tracking-wider uppercase px-8 py-3.5 shadow-[0_0_18px_rgba(121,40,202,0.4)] hover:border-brand-magenta hover:shadow-[0_0_22px_rgba(255,0,122,0.5)] transition-all active:scale-95"
                />
              </div>
            </div>

          </div>

          {/* =====================================================================
              RIGHT COLUMN: PURE WEB HOLOGRAPHIC PORTAL ARTWORK (Safe Zone: 42%)
              ===================================================================== */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative w-full">
            <HeroArtwork />
          </div>

        </div>
      </Container>
    </section>
  );
}
