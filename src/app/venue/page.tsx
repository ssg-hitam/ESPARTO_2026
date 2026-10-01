"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { FEST_INFO } from "@/lib/constants";
import {
  ArrowLeft,
  MapPin,
  Navigation,
  Building2,
  Trees,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Play
} from "lucide-react";

type CampusMediaItem =
  | { type: "video"; src: string; poster: string; alt: string }
  | { type: "image"; src: string; alt: string };

const campusMedia: CampusMediaItem[] = [
  {
    type: "video",
    src: "/videos/hitam_campus_walkthrough.mp4",
    poster: "/images/campus/hitam_tour_poster.jpg",
    alt: "HITAM Campus Tour Video",
  },
  {
    type: "image",
    src: "/images/campus/hitam_campus_facade.jpg",
    alt: "HITAM Academic Complex & Main Facade",
  },
  {
    type: "image",
    src: "/images/campus/hitam_campus_aerial.jpg",
    alt: "HITAM Main Campus Aerial View",
  },
  {
    type: "image",
    src: "/images/campus/hitam_campus_entrance.jpg",
    alt: "HITAM Campus Entrance & Avenue Trees",
  },
  {
    type: "image",
    src: "/images/campus/hitam_campus_panorama.jpg",
    alt: "HITAM Campus Aerial Panorama",
  },
  {
    type: "image",
    src: "/images/campus/hitam_campus_greenary.jpg",
    alt: "HITAM Green Campus Architecture",
  },
  {
    type: "image",
    src: "/images/campus/hitam_campus_mainstairs.jpg",
    alt: "HITAM Central Campus Plazas",
  },
];

function CampusAutoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Play video automatically on slide 0 and pause when away
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (activeIndex === 0) {
      video.muted = isMuted;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy requires muted
          video.muted = true;
          video.play().catch(() => { });
        });
      }
    } else {
      video.pause();
    }
  }, [activeIndex, isMuted]);

  // Auto-advance: 12 seconds on video slide, 3.8s for photos
  useEffect(() => {
    if (isPaused) return;
    const intervalTime = activeIndex === 0 ? 12000 : 3800;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % campusMedia.length);
    }, intervalTime);
    return () => clearInterval(timer);
  }, [isPaused, activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + campusMedia.length) % campusMedia.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % campusMedia.length);
  };

  return (
    <section
      className="mb-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Cinematic Main Viewport */}
      <div className="relative w-full h-72 sm:h-96 md:h-[480px] lg:h-[540px] rounded-3xl border border-white/10 overflow-hidden bg-black shadow-[0_8px_40px_rgba(0,0,0,0.6)] group">
        {campusMedia.map((item, idx) => (
          <div
            key={item.src}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === activeIndex ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
              }`}
          >
            {item.type === "video" ? (
              <div className="relative w-full h-full bg-black">
                <video
                  ref={videoRef}
                  src={item.src}
                  poster={item.poster}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover object-center"
                />

                {/* Subtle sound toggle */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  className="absolute bottom-5 right-5 z-30 p-2.5 rounded-full bg-black/70 hover:bg-brand-orange backdrop-blur-md border border-white/20 text-white transition-all duration-200 hover:scale-110 shadow-lg"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  priority={idx <= 1}
                  className="object-cover object-center filter contrast-105"
                />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
          </div>
        ))}

        {/* Prev Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-brand-orange backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-105"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-brand-orange backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-105"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bottom Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
          {campusMedia.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${idx === activeIndex
                  ? "w-8 h-2 bg-brand-orange"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Bar */}
      <div className="grid grid-cols-4 sm:grid-cols-7 max-w-5xl mx-auto gap-2 sm:gap-3 mt-4">
        {campusMedia.map((item, idx) => (
          <button
            key={item.src}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Select media ${idx + 1}: ${item.alt}`}
            className={`relative h-16 sm:h-20 md:h-22 rounded-xl overflow-hidden border transition-all duration-300 ${idx === activeIndex
                ? "border-brand-orange ring-2 ring-brand-orange/40 scale-[1.03]"
                : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
              }`}
          >
            <Image
              src={item.type === "video" ? item.poster : item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 25vw, 160px"
              className="object-cover object-center"
            />
            {item.type === "video" && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-brand-orange/90 flex items-center justify-center shadow-md">
                  <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

export default function VenuePage() {
  return (
    <main className="min-h-screen pt-6 sm:pt-8 pb-24 bg-[#040210] relative overflow-hidden">
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
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-brand-orange" />
            <span>BACK TO HOME</span>
          </Link>
        </FadeUp>

        {/* Hero Title */}
        <FadeUp delay={0.06} distance={20}>
          <div className="max-w-3xl mb-12">
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

        {/* ═══════════════════════════════════════════════════════════════════════
            FIRST: CAMPUS DETAILS & GOOGLE MAPS GRID
        ═══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

          {/* Left Card: HITAM Campus with Entrance Photo */}
          <FadeUp delay={0.1} distance={30}>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c0628] via-[#08041c] to-[#040110] overflow-hidden flex flex-col justify-between h-full group hover:border-brand-orange/40 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">

              {/* Featured Campus Visual Header */}
              <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-black/40">
                <Image
                  src="/images/campus/hitam_campus_entrance.jpg"
                  alt="HITAM Campus Entrance"
                  fill
                  sizes="(max-width: 1024px) 100vw, 650px"
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
                    href="https://maps.app.goo.gl/MEkJE3oaEy7RjLqy7"
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

          {/* Right Card: Google Maps */}
          <FadeUp delay={0.16} distance={30}>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c0628] via-[#08041c] to-[#040110] overflow-hidden flex flex-col justify-between h-full group hover:border-brand-magenta/40 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">

              {/* Card Header */}
              <div className="p-6 pb-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-magenta/10 border border-brand-magenta/30 flex items-center justify-center text-brand-magenta shrink-0">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-black text-2xl text-white tracking-tight uppercase">
                      GOOGLE MAPS
                    </h2>
                    <span className="text-[11px] font-mono text-text-muted uppercase">

                    </span>
                  </div>
                </div>

                <a
                  href="https://maps.app.goo.gl/MEkJE3oaEy7RjLqy7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-brand-magenta text-white text-xs font-mono font-bold tracking-wider uppercase transition-all border border-white/15 group/btn"
                >
                  <span>Open App</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </div>

              {/* Interactive Map Iframe Container */}
              <div className="relative w-full flex-1 min-h-[360px] sm:min-h-[420px] bg-black/60">
                <iframe
                  src="https://maps.google.com/maps?q=Hyderabad%20Institute%20of%20Technology%20and%20Management&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="HITAM Campus Google Maps Navigation"
                  className="w-full h-full filter contrast-[1.02]"
                />
              </div>

            </div>
          </FadeUp>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            NEXT: CAMPUS AUTO-CAROUSEL (COLLEGE VIDEO + PHOTOS)
        ═══════════════════════════════════════════════════════════════════════ */}
        <FadeUp delay={0.2} distance={30}>
          <CampusAutoCarousel />
        </FadeUp>

      </Container>
    </main>
  );
}
