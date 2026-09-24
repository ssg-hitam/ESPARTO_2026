import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { TECHNICAL_CHAPTERS } from "@/data/chapters";
import { ArrowRight, ShieldCheck, Users, Cpu, Layers } from "lucide-react";

/**
 * ChaptersMarqueeSection Component
 * 
 * Cohesive, high-end institutional section that showcases:
 * - Primary Organizing Authority: SSG (Student Senate / Student Special Interest Groups HITAM)
 * - Collaborative Partner Chapters: IEEE, GDG, IUCEE-EWB, IEOM, MINDS
 * - Infinite auto-scrolling marquee with authentic logos and verified domain specializations
 * - Alliance architecture breakdown (SSG leadership + Chapter technical execution)
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
      className="relative py-20 sm:py-28 bg-[#050212] overflow-hidden border-b border-brand-violet/15"
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

          {/* Header & Hierarchy */}
          <div className="relative z-10 max-w-3xl mb-10 sm:mb-12">
            
            {/* Institutional Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-orange/30 bg-surface/80 mb-5">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" aria-hidden="true" />
              <span className="font-mono text-xs font-bold tracking-widest text-text-secondary uppercase">
                ORGANISING BODY & TECHNICAL ALLIANCE
              </span>
            </div>

            {/* Dominant Headline */}
            <h2 className="font-display font-black text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-text-primary tracking-tight leading-[1.1] uppercase mb-4">
              ORGANISED BY <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">SSG</span> <br />
              <span className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl text-text-secondary font-extrabold">
                IN COLLABORATION WITH TECHNICAL CHAPTERS & CLUBS
              </span>
            </h2>

            {/* Concise Mission Statement */}
            <p className="text-text-secondary text-sm sm:text-base font-body leading-relaxed max-w-2xl border-l-2 border-brand-magenta/40 pl-4 py-0.5">
              ESPARTO 2026 is spearheaded by the <strong className="text-text-primary font-semibold">Student Senate & Special Interest Groups (SSG)</strong> at HITAM, uniting premier international student chapters and technical clubs to curate a transformative national fest.
            </p>
          </div>

          {/* MARQUEE CONTAINER: Clean, high-contrast partner chapter cards */}
          <div className="relative -mx-6 sm:-mx-10 lg:-mx-12 mb-10 overflow-hidden">
            
            {/* Top & Bottom Hairline Accents */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Linear Mask for Seamless Edge Fading */}
            <div 
              className="relative w-full overflow-hidden py-4"
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
                    {/* Chapter Logo Square (Clean, pure white contrast container for official emblem) */}
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
                      PARTNER
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Institutional Collaboration Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            
            {/* Pillar 01: Apex Organizing Body */}
            <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-brand-orange/40 transition-colors">
              <div className="flex items-center gap-2.5 mb-2.5 text-brand-orange">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-mono font-bold text-xs uppercase tracking-wider">APEX ORGANISER</span>
              </div>
              <h3 className="font-display font-bold text-base text-text-primary uppercase mb-1">
                SSG HITAM
              </h3>
              <p className="text-text-muted text-xs font-body leading-relaxed">
                Student Senate & Special Interest Groups governing fest strategy, hackathon operations, and cross-campus coordination.
              </p>
            </div>

            {/* Pillar 02: Technical Chapters */}
            <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-brand-magenta/40 transition-colors">
              <div className="flex items-center gap-2.5 mb-2.5 text-brand-magenta">
                <Cpu className="w-5 h-5" />
                <span className="font-mono font-bold text-xs uppercase tracking-wider">TECHNICAL ALLIANCE</span>
              </div>
              <h3 className="font-display font-bold text-base text-text-primary uppercase mb-1">
                5 PREMIER CHAPTERS
              </h3>
              <p className="text-text-muted text-xs font-body leading-relaxed">
                IEEE, GDG on Campus, IUCEE-EWB, IEOM, and MINDS spearheading domain tracks, competitive arenas, and technical workshops.
              </p>
            </div>

            {/* Pillar 03: Innovation Ecosystem */}
            <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-brand-violet/40 transition-colors">
              <div className="flex items-center gap-2.5 mb-2.5 text-brand-violet">
                <Layers className="w-5 h-5" />
                <span className="font-mono font-bold text-xs uppercase tracking-wider">CAMPUS ECOSYSTEM</span>
              </div>
              <h3 className="font-display font-bold text-base text-text-primary uppercase mb-1">
                HITAM HYDERABAD
              </h3>
              <p className="text-text-muted text-xs font-body leading-relaxed">
                Providing autonomous engineering infrastructure, labs, and collaborative maker spaces for 1000+ national participants.
              </p>
            </div>

          </div>

          {/* Quick Action Footer inside Card */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-brand-orange" />
              <span className="font-mono text-xs text-text-secondary">
                Collaborative Student Leadership • HITAM Hyderabad
              </span>
            </div>

            <Link
              href="/events"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-brand-violet hover:text-white transition-colors group"
            >
              <span>EXPLORE CHAPTER EVENTS & HACKATHONS</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-magenta transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </Container>
    </section>
  );
}

