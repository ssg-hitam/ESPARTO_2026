"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { FEST_INFO } from "@/lib/constants";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, Calendar, MapPin } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */

const FORMATS = [
  {
    tag: "01",
    title: "Hackathons",
    desc: "Time-boxed build sprints where teams design, develop, and present functional solutions for complex engineering problems.",
    accent: "from-brand-orange to-brand-amber",
  },
  {
    tag: "02",
    title: "Technical Workshops",
    desc: "Hands-on sessions led by industry practitioners, introducing modern frameworks, developer tools, and practical workflows.",
    accent: "from-brand-magenta to-brand-purple",
  },
  {
    tag: "03",
    title: "Engineering Contests",
    desc: "Competitive arenas spanning robotics battles, coding challenges, circuit design, and mechanical design showcases.",
    accent: "from-brand-violet to-brand-purple",
  },
];

const VMI = [
  {
    word: "Vision",
    statement: "One fest. Every club. One banner.",
    body: "Unite every technical club and professional chapter of HITAM under a single national-level platform, creating the definitive showcase of HITAM's engineering culture.",
    topBar: "from-brand-orange to-brand-amber",
    glowColor: "rgba(255,94,0,0.06)",
  },
  {
    word: "Mission",
    statement: "Learn by doing, not by watching.",
    body: "Advance HITAM's 'Doing Engineering' philosophy through active participation: live build sprints, intensive workshops, and hands-on technical contests that turn theory into working systems.",
    topBar: "from-brand-magenta to-brand-purple",
    glowColor: "rgba(255,0,122,0.06)",
  },
  {
    word: "Impact",
    statement: "Collaborate. Compete. Grow.",
    body: "Bridge students across institutions to cultivate innovation, teamwork, and lifelong engineering curiosity in line with HITAM's founding principles.",
    topBar: "from-brand-violet to-brand-purple",
    glowColor: "rgba(121,80,242,0.06)",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-[#040210] relative overflow-hidden">

      {/* Subtle Ambient Background */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-brand-purple/10 blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-brand-magenta/[0.06] blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">

        {/* ── BACK LINK ──────────────────────────────────────────────── */}
        <FadeUp delay={0}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-text-muted hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
        </FadeUp>

        {/* ── §1 HEADER + OVERVIEW & ESPARTO LOGO ───────────────────── */}
        <FadeUp delay={0.08} distance={30}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
            
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-7">
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-text-primary tracking-tight leading-[1.05] uppercase mb-6">
                About <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">
                  ESPARTO 2026
                </span>
              </h1>
              <p className="text-text-secondary text-base sm:text-lg font-body leading-relaxed border-l-2 border-brand-magenta/40 pl-5">
                {FEST_INFO.name} is a national-level technical fest that unites all the technical clubs
                and professional chapters of {FEST_INFO.institution.shortName} under one banner. It
                reflects {FEST_INFO.institution.shortName}&apos;s &lsquo;Doing Engineering&rsquo; approach by
                encouraging hands-on learning through workshops, hackathons, and competitions. The fest
                gives students an opportunity to collaborate and compete with peers from diverse
                institutions, promoting innovation, teamwork, and continuous learning in line with{" "}
                {FEST_INFO.institution.shortName}&apos;s vision and values.
              </p>
            </div>

            {/* Right Column: ESPARTO Official Logo Showcase */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden">
                {/* Ambient glow behind logo */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 via-brand-magenta/15 to-brand-violet/20 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" 
                  aria-hidden="true" 
                />
                
                <Image
                  src="/images/brand/esparto-logo.png"
                  alt="ESPARTO 2026 Official Festival Logo"
                  width={420}
                  height={280}
                  className="relative z-10 w-full h-auto object-contain filter drop-shadow-[0_4px_24px_rgba(255,94,0,0.35)] group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>

          </div>
        </FadeUp>

        {/* ── §2 DATES, TIMINGS & ABOUT HITAM ───────────────────────── */}
        <FadeUp delay={0.12} distance={20}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">

            {/* DATES */}
            <div className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <div className="p-3 rounded-xl border border-brand-magenta/30 bg-brand-magenta/10 shadow-[0_0_16px_rgba(255,0,122,0.15)] shrink-0">
                <Calendar className="w-5 h-5 text-brand-magenta" />
              </div>
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-0.5">Festival Dates</p>
                <p className="font-display font-bold text-base text-text-primary uppercase">Oct 9 &amp; 10, 2026</p>
                <p className="text-xs text-text-muted font-body">Two Days</p>
              </div>
            </div>

            {/* TIMINGS */}
            <div className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <div className="p-3 rounded-xl border border-brand-violet/30 bg-brand-violet/10 shadow-[0_0_16px_rgba(121,80,242,0.15)] shrink-0">
                <Clock className="w-5 h-5 text-brand-violet" />
              </div>
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-0.5">Festival Timings</p>
                <p className="font-display font-bold text-base text-text-primary uppercase">9:30 AM – 4:30 PM</p>
                <p className="text-xs text-text-muted font-body">Daily (Both Days)</p>
              </div>
            </div>

            {/* ABOUT HITAM */}
            <Link
              href="/hitam"
              className="group flex items-center justify-between gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-500/40 backdrop-blur-sm transition-all duration-300 cursor-pointer sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-14 rounded-xl overflow-hidden shadow-md shrink-0 border border-emerald-500/30 bg-[#388e3c]">
                  <Image
                    src="/images/hitam/hitam_logo.jpg"
                    alt="HITAM Official Logo"
                    fill
                    sizes="48px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-0.5">
                    Our Institution
                  </p>
                  <p className="font-display font-bold text-base text-text-primary uppercase group-hover:text-emerald-300 transition-colors">
                    About HITAM
                  </p>
                  <p className="text-xs text-text-muted font-body">Annual Flagship Tech Fest</p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-all">
                <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>

          </div>
        </FadeUp>


        {/* ── §3 VISION · MISSION · IMPACT ───────────────────────────── */}
        <FadeUp delay={0.16} distance={20}>
          <div className="mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary tracking-tight">
              Vision, Mission &amp; Impact
            </h2>
            <p className="text-text-secondary text-sm font-body mt-1">
              The foundational pillars guiding ESPARTO 2026.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {VMI.map((v, i) => (
            <FadeUp key={v.word} delay={0.18 + i * 0.08} distance={20}>
              <div
                className="relative flex flex-col h-full rounded-2xl border border-white/10 bg-[#07041c]/70 backdrop-blur-md overflow-hidden group hover:border-white/20 transition-colors"
                style={{ boxShadow: `0 0 30px ${v.glowColor}` }}
              >
                {/* Colored top accent bar */}
                <div className={`h-[3px] w-full bg-gradient-to-r ${v.topBar} shrink-0`} />

                {/* Card body */}
                <div className="flex flex-col gap-3.5 p-7 flex-1">
                  <h3 className="font-display font-black text-2xl text-text-primary tracking-tight uppercase">
                    {v.word}
                  </h3>

                  <p className="font-display font-semibold text-sm text-text-secondary leading-snug">
                    &ldquo;{v.statement}&rdquo;
                  </p>

                  <div className="h-px bg-white/[0.08] w-full my-1" />

                  <p className="text-text-secondary text-sm font-body leading-relaxed flex-1">
                    {v.body}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* ── §4 WHAT HAPPENS AT ESPARTO ─────────────────────────────── */}
        <FadeUp delay={0.16} distance={20}>
          <div className="mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary tracking-tight">
              Event Formats
            </h2>
            <p className="text-text-secondary text-sm font-body mt-1">
              Diverse avenues to build, learn, and compete across two intensive days.
            </p>
          </div>
        </FadeUp>

        <div className="flex flex-col gap-px mb-24">
          {FORMATS.map((f, i) => (
            <FadeUp key={f.tag} delay={0.18 + i * 0.06} distance={16}>
              <div
                className={[
                  "group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 px-6 sm:px-8 py-6",
                  "border border-white/10 bg-[#07041c]/50 hover:bg-[#0c0828]/70 transition-colors",
                  i === 0 ? "rounded-t-2xl" : "",
                  i === FORMATS.length - 1 ? "rounded-b-2xl" : "",
                ].join(" ")}
              >
                <span className="text-xs font-semibold text-text-muted shrink-0 w-8">
                  {f.tag}
                </span>
                <div className="hidden sm:block h-6 w-px bg-white/10 shrink-0" aria-hidden="true" />
                <h3 className={`font-display font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r ${f.accent} tracking-tight uppercase shrink-0 sm:w-56`}>
                  {f.title}
                </h3>
                <p className="text-text-secondary text-sm font-body leading-relaxed flex-1">{f.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* ── ABOUT HITAM ─────────────────────────────────────────── */}
        <FadeUp delay={0.16} distance={20}>
          <div className="mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary tracking-tight">
              About HITAM
            </h2>
            <p className="text-text-secondary text-sm font-body mt-1">
              ESPARTO is the annual flagship technical festival of Hyderabad Institute of Technology &amp; Management.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.18} distance={20}>
          <Link
            href="/hitam"
            className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 p-7 sm:p-8 rounded-2xl border border-white/10 bg-[#07041c]/60 hover:bg-[#0c0828]/80 hover:border-emerald-500/40 transition-all duration-300 mb-20 cursor-pointer shadow-lg"
          >
            {/* Official HITAM Logo */}
            <div className="relative w-18 h-22 sm:w-20 sm:h-24 rounded-xl border border-white/10 bg-[#388e3c] flex items-center justify-center shrink-0 overflow-hidden shadow-md">
              <Image
                src="/images/hitam/hitam_logo.jpg"
                alt="HITAM Logo"
                fill
                sizes="80px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs text-emerald-400 font-semibold">
                <span>UGC Autonomous</span>
                <span className="text-white/20">·</span>
                <span>NAAC Grade &apos;A+&apos;</span>
                <span className="text-white/20">·</span>
                <span>NBA Accredited</span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary uppercase mb-2">
                Hyderabad Institute of Technology &amp; Management
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  Medchal, Hyderabad, Telangana
                </span>
                <span className="text-emerald-400 font-medium">hitam.org</span>
                <span>· Estd. 2001 · Affiliated to JNTUH</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 group-hover:gap-3 transition-all shrink-0">
              <span className="uppercase tracking-wider">Explore HITAM</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>
        </FadeUp>

        {/* ── CTA ────────────────────────────────────────────────────── */}
        <FadeUp delay={0.1} threshold={0.2}>
          <div className="p-8 sm:p-10 rounded-2xl border border-white/10 bg-gradient-to-r from-[#0d0728] to-[#08031a] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-2xl text-text-primary uppercase mb-2">
                Ready to Explore Events?
              </h3>
              <p className="text-text-secondary text-sm font-body">
                Browse all technical tracks, workshops, and competitions.
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-display font-bold text-xs sm:text-sm tracking-wider uppercase text-white bg-gradient-to-r from-brand-orange to-brand-magenta shadow-md hover:brightness-110 transition-all shrink-0"
            >
              <span>View All Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeUp>

      </Container>
    </main>
  );
}
