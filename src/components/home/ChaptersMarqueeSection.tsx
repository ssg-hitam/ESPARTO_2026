import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { TECHNICAL_CHAPTERS } from "@/data/chapters";

/**
 * ChaptersMarqueeSection Component
 * 
 * Smooth infinite auto-scrolling marquee of technical chapters & student societies:
 * - Seamless looping CSS marquee animation
 * - Gradient edge fade masks
 * - Polished dark glass cards with hover glow and title/category tooltips
 * - Pause-on-hover interaction
 */
export function ChaptersMarqueeSection() {
  // Duplicate the array to create a seamless infinite loop
  const marqueeChapters = [
    ...TECHNICAL_CHAPTERS,
    ...TECHNICAL_CHAPTERS,
    ...TECHNICAL_CHAPTERS,
    ...TECHNICAL_CHAPTERS,
  ];

  return (
    <section
      id="chapters"
      aria-label="Participating Technical Chapters & Clubs"
      className="relative py-16 sm:py-20 bg-[#04010e] overflow-hidden border-b border-brand-violet/15"
    >
      {/* Background Subtle Ambient Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] rounded-full bg-brand-purple/10 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10 text-center mb-8 sm:mb-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-brand-orange/30 bg-surface/80 mb-3 shadow-[0_0_12px_rgba(255,94,0,0.15)]">
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" aria-hidden="true" />
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-text-primary uppercase">
            [ COMMUNITY ALLIANCE // TECHNICAL SOCIETIES ]
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-text-primary tracking-tight uppercase mb-2">
          ORGANISERS & PARTNER CHAPTERS
        </h2>

        {/* Subtitle */}
        <p className="font-mono text-xs sm:text-sm text-text-muted max-w-xl mx-auto">
          Brought to you by student chapters and technical societies across HITAM.
        </p>
      </Container>

      {/* Infinite Auto-Scrolling Marquee Rail */}
      <div 
        className="relative w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="flex items-center gap-6 sm:gap-8 w-max animate-marquee hover:[animation-play-state:paused] py-4">
          {marqueeChapters.map((chapter, index) => (
            <div
              key={`${chapter.id}-${index}`}
              className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl border border-white/10 bg-[#08041c]/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-brand-magenta/60 hover:shadow-[0_0_25px_rgba(255,0,122,0.25)] hover:scale-105 transition-all duration-300 group cursor-default"
            >
              {/* Logo Tile */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 p-2 rounded-xl bg-white/95 border border-white/20 flex items-center justify-center shrink-0 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all">
                <Image
                  src={chapter.logo}
                  alt={chapter.name}
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Text Meta */}
              <div className="flex flex-col text-left pr-2">
                <span className="font-display font-bold text-xs sm:text-sm text-text-primary uppercase tracking-wide group-hover:text-white transition-colors whitespace-nowrap">
                  {chapter.shortName}
                </span>
                <span className="font-mono text-[10px] text-text-muted tracking-wider uppercase whitespace-nowrap">
                  {chapter.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
