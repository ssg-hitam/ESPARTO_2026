'use client';

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { TECHNICAL_CHAPTERS } from "@/data/chapters";

/** Readable logo cards: homepage marquee or static credits grid. */
export function ChaptersMarqueeSection({ marquee = false }: { marquee?: boolean }) {
  const [paused, setPaused] = React.useState(false);
  const logoCard = (chapter: (typeof TECHNICAL_CHAPTERS)[number]) => (
    <li key={chapter.id} className={`flex min-w-0 flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-4 ${marquee ? "w-[180px] shrink-0 sm:w-[210px]" : ""}`}>
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
        <Image src={chapter.logo} alt={chapter.name} fill sizes={marquee ? "180px" : "(max-width: 639px) 40vw, (max-width: 1023px) 26vw, 200px"} className="object-contain p-4 sm:p-5" />
      </div>
      <h3 className="mt-4 text-center font-display text-sm font-bold leading-snug text-white sm:text-base">{chapter.shortName}</h3>
      <p className="mt-1 text-center text-xs leading-relaxed text-text-secondary">{chapter.domain}</p>
    </li>
  );
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

          {/* Header & SSG Logo Layout — tight, balanced, zero vertical waste */}
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-4 sm:mb-6">
            
            {/* Left Content Column */}
            <div className="max-w-2xl">
              <h2 className="font-display font-black text-2xl xs:text-3xl sm:text-4xl text-text-primary tracking-tight leading-[1.15] uppercase mb-2">
                OVERALL ORGANISED BY <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">SSG</span> <br />
                <span className="text-lg xs:text-xl sm:text-2xl text-text-secondary font-extrabold">
                  WITH OUR STUDENT CHAPTERS &amp; CLUBS
                </span>
              </h2>

              <p className="text-text-secondary text-xs sm:text-sm font-body leading-relaxed border-l-2 border-brand-magenta/40 pl-3">
                ESPARTO 2026 was led and organised by <strong className="text-text-primary font-semibold">SSG (Student Self Governance)</strong> with the support of the <strong className="text-text-primary font-semibold">HITAM Technical Council</strong>. To every student chapter and club: thank you for bringing your expertise, enthusiasm and teamwork to the events. Together, you made the SSG-led celebration a success.
              </p>
            </div>

            {/* Compact, proportional SSG emblem badge */}
            <div className="shrink-0 flex items-center">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 p-3 rounded-2xl bg-white border border-white/40 flex items-center justify-center shadow-[0_0_35px_rgba(255,94,0,0.3)] hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/brand/ssg-logo.png"
                  alt="SSG - Student Self Governance"
                  width={128}
                  height={128}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>

          </div>

          {marquee ? (
            <div className="relative z-10 mt-8">
              <div className="mb-4 flex justify-end">
                <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-controls="chapter-marquee" className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange">{paused ? "Play logo scrolling" : "Pause logo scrolling"}</button>
              </div>
              <div id="chapter-marquee" className="chapter-logo-marquee overflow-x-auto rounded-2xl" tabIndex={0} aria-label="Scrolling student chapter and club logos">
                <div className="chapter-logo-track flex w-max" style={{ animationPlayState: paused ? "paused" : "running" }}>
                  <ul className="flex gap-4 pr-4" aria-label="Student chapters and clubs">{TECHNICAL_CHAPTERS.map(logoCard)}</ul>
                  <ul className="chapter-logo-duplicate flex gap-4 pr-4" aria-hidden="true">{TECHNICAL_CHAPTERS.map(logoCard)}</ul>
                </div>
              </div>
            </div>
          ) : (
            <ul className="relative z-10 mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" aria-label="Student chapters and clubs">{TECHNICAL_CHAPTERS.map(logoCard)}</ul>
          )}

        </div>
      </Container>
    </section>
  );
}

