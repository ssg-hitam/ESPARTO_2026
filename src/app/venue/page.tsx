"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { FEST_INFO } from "@/lib/constants";
import { 
  ArrowLeft, 
  MapPin, 
  Navigation, 
  Compass, 
  Globe, 
  Building2, 
  Trees, 
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const campusPhotos = [
  {
    src: "/images/campus/hitam_campus_aerial.jpg",
    alt: "HITAM Main Campus Aerial View",
  },
  {
    src: "/images/campus/hitam_campus_greenary.jpg",
    alt: "HITAM Green Campus Architecture",
  },
  {
    src: "/images/campus/hitam_campus_mainstairs.jpg",
    alt: "HITAM Central Campus Plazas",
  },
];

function CampusAutoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % campusPhotos.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + campusPhotos.length) % campusPhotos.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % campusPhotos.length);
  };

  return (
    <section 
      className="mb-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Cinematic Main Viewport */}
      <div className="relative w-full h-72 sm:h-96 md:h-[460px] lg:h-[520px] rounded-3xl border border-white/10 overflow-hidden bg-black/60 shadow-[0_8px_40px_rgba(0,0,0,0.6)] group">
        {campusPhotos.map((photo, idx) => (
          <div
            key={photo.src}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              priority={idx === 0}
              className="object-cover object-center filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          </div>
        ))}

        {/* Prev Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-brand-orange backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-105"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-brand-orange backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-105"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bottom Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
          {campusPhotos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to image ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                idx === activeIndex
                  ? "w-8 h-2 bg-brand-orange"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Bar */}
      <div className="grid grid-cols-3 max-w-xl mx-auto gap-3 sm:gap-4 mt-4">
        {campusPhotos.map((photo, idx) => (
          <button
            key={photo.src}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Select photo ${idx + 1}`}
            className={`relative h-16 sm:h-20 md:h-24 rounded-xl overflow-hidden border transition-all duration-300 ${
              idx === activeIndex
                ? "border-brand-orange ring-2 ring-brand-orange/40 scale-[1.02]"
                : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 16vw, 160px"
              className="object-cover object-center"
            />
          </button>
        ))}
      </div>
    </section>
  );
}

const directions = [
  {
    from: "From Rajiv Gandhi Int'l Airport (HYD)",
    desc: "Direct transit via Outer Ring Road (ORR) towards Medchal / Gowdavelly exit.",
  },
  {
    from: "From Secunderabad Railway Station",
    desc: "MMTS suburban rail to Gowdavelly Station or direct TSRTC express bus to Medchal highway.",
  },
  {
    from: "From Jubilee Bus Station (JBS)",
    desc: "Direct buses along Medchal National Highway 44 directly connecting to the campus junction.",
  },
];

export default function VenuePage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-[#040210] relative overflow-hidden">
      {/* Ambient background glows */}
      <div
        className="absolute top-1/4 left-0 w-[550px] h-[550px] rounded-full bg-brand-orange/10 blur-[180px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 right-0 w-[500px] h-[500px] rounded-full bg-brand-violet/10 blur-[180px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">
        <FadeUp delay={0}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-brand-orange" />
            <span>BACK TO HOME</span>
          </Link>
        </FadeUp>

        {/* Hero Title */}
        <FadeUp delay={0.06} distance={20}>
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-mono tracking-wider text-brand-orange uppercase font-bold block mb-3">
              CAMPUS &amp; LOCATION
            </span>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-text-primary tracking-tight leading-[1.02] uppercase mb-5">
              FESTIVAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">
                VENUE
              </span>
            </h1>
            <p className="text-text-secondary text-base sm:text-lg font-body leading-relaxed border-l-2 border-brand-orange/40 pl-5 font-light">
              Held across the green, sustainable, LEED Silver-rated campus of {FEST_INFO.institution.name} (HITAM) in Hyderabad.
            </p>
          </div>
        </FadeUp>

        {/* Main Grid: Campus Info & Directions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          
          {/* Campus Card (7 cols) with Photo Preview */}
          <FadeUp delay={0.12} distance={30} className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c0628] via-[#08041c] to-[#040110] overflow-hidden flex flex-col justify-between h-full group hover:border-brand-orange/40 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
              
              {/* Featured Campus Visual Header */}
              <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-black/40">
                <Image
                  src="/images/campus/hitam_campus_aerial.jpg"
                  alt="HITAM Main Campus Aerial View"
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0628] via-transparent to-black/30" />
                
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                    LEED Silver Rated Campus
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-display font-black text-2xl text-white tracking-tight uppercase">
                        HITAM CAMPUS
                      </h2>
                      <span className="text-[11px] font-mono text-text-muted uppercase">
                        Medchal, Hyderabad, Telangana
                      </span>
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm font-body leading-relaxed mb-6 font-light">
                    {FEST_INFO.institution.address}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10 font-mono text-xs text-text-muted">
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <Trees className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Zero-Carbon Green Ambience</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <Building2 className="w-4 h-4 text-brand-orange shrink-0" />
                      <span>Advanced Labs &amp; Auditoriums</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6 flex flex-wrap items-center justify-between gap-4">
                  <a
                    href="https://maps.google.com/?q=HITAM+Hyderabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-orange to-brand-magenta hover:brightness-110 transition-all shadow-lg shadow-brand-orange/20"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>OPEN IN GOOGLE MAPS</span>
                  </a>

                  <a
                    href={FEST_INFO.institution.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-white transition-colors"
                  >
                    <span>Visit College Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Directions Card (5 cols) */}
          <FadeUp delay={0.2} distance={30} className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c0628] via-[#08041c] to-[#040110] flex flex-col justify-between h-full shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-magenta/10 border border-brand-magenta/30 flex items-center justify-center text-brand-magenta shrink-0">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-black text-2xl text-white tracking-tight uppercase">
                      HOW TO REACH
                    </h2>
                    <span className="text-[11px] font-mono text-text-muted uppercase">
                      Transit &amp; Commute Routes
                    </span>
                  </div>
                </div>

                <ul className="space-y-3.5 text-sm font-body text-text-secondary leading-relaxed">
                  {directions.map((d, i) => (
                    <li key={i} className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-brand-magenta/30 transition-colors">
                      <strong className="text-white block font-display uppercase text-xs mb-1 tracking-wide">
                        {d.from}
                      </strong>
                      <p className="text-xs font-light text-text-secondary">
                        {d.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6">
                <div className="p-4 rounded-2xl bg-brand-orange/5 border border-brand-orange/20 flex items-start gap-3">
                  <Globe className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <p className="text-xs font-body text-text-secondary leading-relaxed font-light">
                    Special fest transit shuttles and campus navigation points will be active during both festival days (October 09–10, 2026).
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            CAMPUS PHOTO AUTO-CAROUSEL
        ═══════════════════════════════════════════════════════════════════════ */}
        <CampusAutoCarousel />

      </Container>
    </main>
  );
}
