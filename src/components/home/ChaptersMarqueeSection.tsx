'use client';

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { TECHNICAL_CHAPTERS } from "@/data/chapters";
import CircularCarousel from "@/components/ui/CircularCarousel";

/**
 * ChaptersMarqueeSection Component
 * 
 * Clean, high-impact institutional marquee section:
 * - Organised by SSG (Student Self Governance)
 * - In collaboration with HITAM Technical Council
 * - Prominent SSG official emblem card balancing the header
 * - 3D Circular Carousel showcasing all 11 technical chapters & student clubs
 */
export function ChaptersMarqueeSection() {
  const carouselItems = TECHNICAL_CHAPTERS.map((ch) => ({
    src: ch.logo,
    alt: ch.name,
    title: ch.shortName,
    subtitle: ch.domain,
  }));

  return (
    <section
      id="chapters"
      aria-label="Organisers and Partner Technical Chapters"
      className="relative py-10 sm:py-16 bg-[#050212] overflow-hidden border-b border-brand-violet/15"
    >
      {/* Ambient Lighting Gradients */}
      <div 
        className="absolute top-1/4 -left-20 w-[500px] h-[350px] rounded-full bg-brand-purple/10 blur-[150px] pointer-events-none mix-blend-screen"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-10 -right-20 w-[450px] h-[300px] rounded-full bg-brand-magenta/10 blur-[140px] pointer-events-none mix-blend-screen"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">
        
        {/* Section Container Box matching IdeaSection aesthetic */}
        <div className="relative p-6 sm:p-8 lg:p-10 rounded-3xl border border-brand-violet/25 bg-[#08041d]/85 backdrop-blur-md overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
          
          {/* Subtle Cyber Grid Background */}
          <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" aria-hidden="true" />

          {/* Header & Enlarged SSG Logo Layout */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-6 sm:mb-8">
            
            {/* Left Content Column */}
            <div className="md:col-span-8 lg:col-span-8 max-w-2xl">
              {/* Dominant Headline */}
              <h2 className="font-display font-black text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-text-primary tracking-tight leading-[1.1] uppercase mb-4">
                ORGANISED BY <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">SSG</span> <br />
                <span className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl text-text-secondary font-extrabold">
                  IN COLLABORATION WITH HITAM TECHNICAL COUNCIL
                </span>
              </h2>

              {/* Concise Mission Statement */}
              <p className="text-text-secondary text-sm sm:text-base font-body leading-relaxed border-l-2 border-brand-magenta/40 pl-4 py-0.5">
                ESPARTO 2026 is spearheaded by <strong className="text-text-primary font-semibold">SSG (Student Self Governance)</strong> in collaboration with the <strong className="text-text-primary font-semibold">HITAM Technical Council</strong>, uniting all premier student chapters and technical clubs across campus.
              </p>
            </div>

            {/* Enlarged Pure SSG Logo (Centered in the right space, brought left from the far edge) */}
            <div className="md:col-span-4 lg:col-span-4 flex justify-start md:justify-center">
              <div className="relative w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56 xl:w-60 xl:h-60 p-4 sm:p-5 rounded-3xl bg-white border border-white/40 flex items-center justify-center shrink-0 shadow-[0_0_50px_rgba(255,94,0,0.35)] hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/brand/ssg-logo.png"
                  alt="SSG - Student Self Governance"
                  width={240}
                  height={240}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>

          </div>

          {/* 3D CIRCULAR CAROUSEL: Interactive 3D cylinder showcasing all 11 technical chapters */}
          <div className="relative -mx-6 sm:-mx-10 lg:-mx-12 overflow-hidden pt-2 pb-2">
            
            {/* Top & Bottom Hairline Accents */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Ambient lighting under the 3D ring */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[220px] bg-brand-purple/15 blur-[100px] pointer-events-none rounded-full" 
              aria-hidden="true" 
            />

            <div className="w-full h-[370px] sm:h-[410px] relative">
              <CircularCarousel
                items={carouselItems}
                preset="cylinder"
                intro="rise"
                cardWidth={185}
                aspectRatio={1}
                speed={5}
                captions
                gap={16}
                tilt={-11}
                curve={0.75}
                perspective={1900}
                momentum={0.2}
                parallax={0.23}
                stretch={0.16}
                depthFade={0.25}
                fadeColor="#08041d"
                innerShade={0.3}
                cornerRadius={14}
              />
            </div>

            {/* Interactive hint */}
            <div className="relative z-10 flex items-center justify-center gap-2 mt-1 text-[11px] text-text-tertiary tracking-wider font-mono uppercase">
              <span>✦ Drag horizontally or scroll to spin</span>
              <span className="opacity-40">•</span>
              <span>Tap card to focus</span>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}


