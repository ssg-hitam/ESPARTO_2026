"use client";

import React from "react";
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
  ExternalLink 
} from "lucide-react";

const campusPhotos = [
  {
    title: "India's First LEED Silver Campus",
    tag: "SUSTAINABLE ARCHITECTURE",
    desc: "Designed with passive natural cooling corridors and abundant green cover.",
    src: "/images/campus/hitam_campus_main.jpg",
  },
  {
    title: "Academic & Research Wings",
    tag: "INNOVATION HUBS",
    desc: "Modern multi-disciplinary laboratories, hackathon hubs, and seminar spaces.",
    src: "/images/campus/hitam_campus_leed_1.jpg",
  },
  {
    title: "Eco-Friendly Courtyards",
    tag: "GREEN COMMONS",
    desc: "Open-air landscaped plazas and shaded corridors fostering collaborative ideation.",
    src: "/images/campus/hitam_campus_leed_2.jpg",
  },
  {
    title: "Vibrant Student Campus Life",
    tag: "CAMPUS EXPERIENCE",
    desc: "Home to active student technical chapters, creative clubs, and cultural arenas.",
    src: "/images/campus/hitam_campus_students.jpg",
  },
  {
    title: "Grand Seminar & Auditorium Halls",
    tag: "KEYNOTE ARENA",
    desc: "Acoustically treated halls equipped with high-definition projection for plenary keynotes and addresses.",
    src: "/images/campus/hitam_campus_auditorium.jpg",
  },
  {
    title: "Collaborative Maker Spaces",
    tag: "HACKATHONS & LABS",
    desc: "Dedicated incubation and prototyping arenas for multi-hour builds, robotics, and coding contests.",
    src: "/images/campus/hitam_campus_activity.jpg",
  },
];

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
                  src="/images/campus/hitam_campus_main.jpg"
                  alt="HITAM Green Campus"
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
            CAMPUS PHOTO GALLERY SECTION
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="mb-16">
          <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-brand-orange font-bold block mb-1">
                INFRASTRUCTURE &amp; ENVIRONMENT
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                CAMPUS GALLERY
              </h2>
            </div>
            <span className="text-xs font-mono text-text-muted uppercase">
              HITAM Hyderabad
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campusPhotos.map((photo, idx) => (
              <FadeUp key={photo.title} delay={0.1 + idx * 0.08} distance={25}>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0c0628] to-[#040112] overflow-hidden group hover:border-brand-orange/40 transition-all duration-300 h-full flex flex-col justify-between">
                  {/* Photo Canvas */}
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-black/40">
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center filter contrast-105 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0628] via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 text-brand-orange font-mono text-[9px] font-bold uppercase tracking-wider">
                        {photo.tag}
                      </span>
                    </div>
                  </div>

                  {/* Caption Details */}
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-display font-black text-base text-white tracking-tight mb-1.5 group-hover:text-brand-orange transition-colors">
                        {photo.title}
                      </h3>
                      <p className="text-xs font-body text-text-secondary leading-relaxed font-light">
                        {photo.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

      </Container>
    </main>
  );
}
