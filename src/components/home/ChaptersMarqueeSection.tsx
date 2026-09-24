import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { TECHNICAL_CHAPTERS } from "@/data/chapters";

/**
 * ChaptersMarqueeSection Component
 * 
 * Clean, high-impact institutional marquee section:
 * - Organised by SSG (Student Self Governance)
 * - In collaboration with HITAM Technical Council
 * - Prominent SSG official emblem card balancing the header
 * - Multi-chapter infinite marquee showcasing all technical chapters & student clubs
 */
export function ChaptersMarqueeSection() {
  // Infinite repetition for seamless 120fps CSS hardware-accelerated scroll
  const marqueeChapters = [
    ...TECHNICAL_CHAPTERS,
    ...TECHNICAL_CHAPTERS,
    ...TECHNICAL_CHAPTERS,
    ...TECHNICAL_CHAPTERS,
  ];

  return (
    <section
      id="chapters"
      aria-label="Organisers and Partner Technical Chapters"
      className="relative py-16 sm:py-24 bg-[#050212] overflow-hidden border-b border-brand-violet/15"
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
        <div className="relative p-6 sm:p-10 lg:p-12 rounded-3xl border border-brand-violet/25 bg-[#08041d]/85 backdrop-blur-md overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
          
          {/* Subtle Cyber Grid Background */}
          <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" aria-hidden="true" />

          {/* Header & Enlarged SSG Logo Layout */}
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 lg:gap-10 mb-10 sm:mb-12">
            
            {/* Left Content Column */}
            <div className="max-w-xl lg:max-w-2xl">
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

            {/* Enlarged Pure SSG Logo (Only the official emblem, no extra text) */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 p-3 rounded-3xl bg-white border border-white/40 flex items-center justify-center shrink-0 shadow-[0_0_40px_rgba(255,94,0,0.3)] hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/brand/ssg-logo.png"
                alt="SSG - Student Self Governance"
                width={190}
                height={190}
                className="w-full h-full object-contain"
                priority
              />
            </div>

          </div>

          {/* MARQUEE CONTAINER: Clean, high-contrast partner chapter cards */}
          <div className="relative -mx-6 sm:-mx-10 lg:-mx-12 overflow-hidden">
            
            {/* Top & Bottom Hairline Accents */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Linear Mask for Seamless Edge Fading */}
            <div 
              className="relative w-full overflow-hidden py-3"
              style={{
                maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              }}
            >
              <div className="flex items-center gap-5 sm:gap-6 w-max animate-marquee hover:[animation-play-state:paused] py-2">
                {marqueeChapters.map((chapter, index) => (
                  <div
                    key={`${chapter.id}-${index}`}
                    className="group relative flex items-center gap-4 px-5 py-3.5 rounded-2xl border border-white/10 bg-[#0d0726]/90 backdrop-blur-md hover:border-brand-magenta/60 hover:shadow-[0_0_24px_rgba(255,0,122,0.25)] hover:scale-[1.02] transition-all duration-300 cursor-default shrink-0 min-w-[310px] sm:min-w-[340px]"
                  >
                    {/* Chapter Logo Square */}
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 p-2 rounded-xl bg-white border border-white/20 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <Image
                        src={chapter.logo}
                        alt={chapter.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-col text-left overflow-hidden pr-2">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-magenta" />
                        <span className="font-mono text-[10px] uppercase tracking-wider text-brand-orange font-semibold">
                          {chapter.category}
                        </span>
                      </div>
                      <span className="font-display font-extrabold text-sm sm:text-base text-text-primary tracking-wide group-hover:text-white transition-colors truncate">
                        {chapter.shortName}
                      </span>
                      <span className="font-mono text-[11px] text-text-muted truncate">
                        {chapter.domain}
                      </span>
                    </div>

                    {/* Corner Tag */}
                    <span className="absolute top-2.5 right-3 font-mono text-[9px] text-white/20 uppercase tracking-widest group-hover:text-brand-violet/60 transition-colors">
                      TECHNICAL CLUB
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}


