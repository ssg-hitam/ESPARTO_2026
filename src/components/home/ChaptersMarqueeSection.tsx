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
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-10 sm:mb-12">
            
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
                    className="group relative flex items-center gap-4 px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl border border-white/10 bg-[#0d0726]/90 backdrop-blur-md hover:border-brand-magenta/60 hover:shadow-[0_0_24px_rgba(255,0,122,0.25)] hover:scale-[1.03] transition-all duration-300 cursor-default shrink-0"
                  >
                    {/* Direct Logo Display (No clumsy nested box, uniform size, enlarged GDG) */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
                      <Image
                        src={chapter.logo}
                        alt={chapter.name}
                        width={64}
                        height={64}
                        className={`object-contain transition-transform duration-300 group-hover:scale-110 ${
                          chapter.id === "gdg"
                            ? "w-20 sm:w-24 max-h-12 scale-125"
                            : "w-full h-full max-h-14 max-w-14"
                        }`}
                      />
                    </div>

                    {/* Pure Chapter Name */}
                    <span className="font-display font-extrabold text-sm sm:text-base text-text-primary tracking-wide group-hover:text-white transition-colors whitespace-nowrap">
                      {chapter.shortName}
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


