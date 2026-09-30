"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { FEST_INFO } from "@/lib/constants";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, Calendar, MapPin, BookOpen } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */


const FORMATS = [
  {
    tag: "FORMAT 01",
    title: "HACKATHONS",
    desc: "Time-boxed, high-pressure build sprints where teams design, code, and pitch working solutions from scratch.",
    accent: "from-brand-orange to-brand-amber",
    border: "border-brand-orange/30",
  },
  {
    tag: "FORMAT 02",
    title: "WORKSHOPS",
    desc: "Hands-on sessions led by practitioners — covering emerging tech, real-world tools, and engineering workflows.",
    accent: "from-brand-magenta to-brand-purple",
    border: "border-brand-magenta/30",
  },
  {
    tag: "FORMAT 03",
    title: "COMPETITIONS",
    desc: "Head-to-head technical contests — robotics battles, coding duels, design challenges, and more.",
    accent: "from-brand-violet to-brand-purple",
    border: "border-brand-violet/30",
  },
];

const VMI = [
  {
    num: "01",
    word: "VISION",
    statement: "One fest. Every club. One banner.",
    body: "Unite every technical club and professional chapter of HITAM under a single, high-impact national-level platform — making ESPARTO the definitive showcase of HITAM's engineering culture.",
    topBar: "from-brand-orange to-brand-amber",
    numColor: "text-brand-orange",
    labelColor: "text-brand-orange",
    borderClass: "border-brand-orange/20",
    glowColor: "rgba(255,94,0,0.08)",
  },
  {
    num: "02",
    word: "MISSION",
    statement: "Learn by doing, not by watching.",
    body: "Drive HITAM's 'Doing Engineering' philosophy — every event at ESPARTO is built around real participation: build sprints, live workshops, and head-to-head technical contests that turn theory into working practice.",
    topBar: "from-brand-magenta to-brand-purple",
    numColor: "text-brand-magenta",
    labelColor: "text-brand-magenta",
    borderClass: "border-brand-magenta/20",
    glowColor: "rgba(255,0,122,0.08)",
  },
  {
    num: "03",
    word: "IMPACT",
    statement: "Collaborate. Compete. Grow.",
    body: "Connect students from diverse institutions, promoting innovation, teamwork, and continuous learning. ESPARTO builds bridges — between clubs, between colleges, and between where you are and where you want to be.",
    topBar: "from-brand-violet to-brand-purple",
    numColor: "text-brand-violet",
    labelColor: "text-brand-violet",
    borderClass: "border-brand-violet/20",
    glowColor: "rgba(121,80,242,0.08)",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-[#040210] relative overflow-hidden">

      {/* Ambient glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-brand-purple/10 blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-brand-magenta/[0.08] blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">

        {/* ── BACK LINK ──────────────────────────────────────────────── */}
        <FadeUp delay={0}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>BACK TO HOME</span>
          </Link>
        </FadeUp>

        {/* ── §1 HEADER + OVERVIEW ───────────────────────────────────── */}
        <FadeUp delay={0.1} distance={50}>
          <div className="max-w-3xl mb-12">
            <h1 className="font-display font-black text-4xl sm:text-6xl text-text-primary tracking-tight leading-[1.05] uppercase mb-6">
              ABOUT <br />
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
        </FadeUp>

        {/* ── §2 DATES, TIMINGS & ESPARTO EMBLEM ─────────────────────── */}
        <FadeUp delay={0.15} distance={40}>
          <div className="flex flex-col lg:flex-row gap-6 mb-16">

            {/* Info Cards */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex items-center gap-4 flex-1 p-5 rounded-2xl border border-brand-magenta/30 bg-brand-magenta/5 backdrop-blur-sm">
                <div className="p-3 rounded-xl border border-brand-magenta/40 bg-brand-magenta/10 shadow-[0_0_16px_rgba(255,0,122,0.25)] shrink-0">
                  <Calendar className="w-5 h-5 text-brand-magenta" />
                </div>
                <div>
                  <p className="font-mono text-[10px] font-bold tracking-widest uppercase text-text-muted mb-0.5">DATES</p>
                  <p className="font-display font-bold text-base text-text-primary tracking-wide uppercase">OCT 9 &amp; 10, 2026</p>
                  <p className="font-mono text-xs text-text-muted">Two Days</p>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-1 p-5 rounded-2xl border border-brand-violet/30 bg-brand-violet/5 backdrop-blur-sm">
                <div className="p-3 rounded-xl border border-brand-violet/40 bg-brand-violet/10 shadow-[0_0_16px_rgba(121,80,242,0.25)] shrink-0">
                  <Clock className="w-5 h-5 text-brand-violet" />
                </div>
                <div>
                  <p className="font-mono text-[10px] font-bold tracking-widest uppercase text-text-muted mb-0.5">TIMINGS</p>
                  <p className="font-display font-bold text-base text-text-primary tracking-wide uppercase">9:30 AM – 4:30 PM</p>
                  <p className="font-mono text-xs text-text-muted">Daily (both days)</p>
                </div>
              </div>
            </div>

            {/* ESPARTO Emblem Visual */}
            <div className="relative flex items-center justify-center w-full lg:w-64 h-40 lg:h-auto rounded-2xl border border-brand-orange/20 bg-gradient-to-br from-brand-orange/10 via-brand-magenta/10 to-brand-violet/10 backdrop-blur-sm overflow-hidden shrink-0">
              {/* Animated ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border border-brand-orange/20 animate-spin" style={{ animationDuration: "12s" }} />
                <div className="absolute w-24 h-24 rounded-full border border-brand-magenta/20 animate-spin" style={{ animationDuration: "8s", animationDirection: "reverse" }} />
                <div className="absolute w-16 h-16 rounded-full border border-brand-violet/30 animate-spin" style={{ animationDuration: "5s" }} />
              </div>
              {/* Center text */}
              <div className="relative z-10 text-center">
                <p className="font-display font-black text-2xl tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-br from-brand-orange via-brand-magenta to-brand-violet leading-none">ESP</p>
                <p className="font-display font-black text-2xl tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-br from-brand-magenta via-brand-violet to-brand-orange leading-none">ARTO</p>
                <p className="font-mono text-[9px] tracking-[0.2em] text-text-muted mt-1">2026</p>
              </div>
              {/* Corner glow */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-brand-magenta/20 blur-xl" aria-hidden="true" />
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-brand-orange/20 blur-xl" aria-hidden="true" />
            </div>

          </div>
        </FadeUp>


        {/* ── §4 VISION · MISSION · IMPACT ───────────────────────────── */}
        <FadeUp delay={0.22} distance={30}>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="font-mono text-[11px] font-bold tracking-[0.3em] text-text-muted uppercase px-4">
              VISION · MISSION · IMPACT
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {VMI.map((v, i) => (
            <FadeUp key={v.word} delay={0.24 + i * 0.1} distance={36}>
              <div
                className={`relative flex flex-col h-full rounded-2xl border ${v.borderClass} bg-[#07041c]/80 backdrop-blur-md overflow-hidden group hover:scale-[1.015] transition-transform duration-300`}
                style={{ boxShadow: `0 0 40px ${v.glowColor}` }}
              >
                {/* Colored top accent bar */}
                <div className={`h-[3px] w-full bg-gradient-to-r ${v.topBar} shrink-0`} />

                {/* Ghost numeral watermark */}
                <span
                  className={`absolute -bottom-4 -right-2 font-display font-black text-[8rem] leading-none select-none pointer-events-none opacity-[0.05] ${v.numColor} tracking-tighter`}
                  aria-hidden="true"
                >
                  {v.num}
                </span>

                {/* Card body */}
                <div className="relative z-10 flex flex-col gap-4 p-7 flex-1">

                  {/* Mono label */}
                  <span className={`font-mono text-[10px] font-bold tracking-[0.35em] uppercase ${v.labelColor}`}>
                    {v.word}
                  </span>

                  {/* Large gradient word heading */}
                  <h2
                    className={`font-display font-black text-3xl sm:text-4xl tracking-tight uppercase leading-none text-transparent bg-clip-text bg-gradient-to-br ${v.topBar}`}
                  >
                    {v.word}
                  </h2>

                  {/* Punchy quoted statement */}
                  <p className="font-display font-semibold text-base text-text-primary leading-snug">
                    &ldquo;{v.statement}&rdquo;
                  </p>

                  {/* Hairline rule */}
                  <div className="h-px bg-white/[0.08] w-full" />

                  {/* Body copy */}
                  <p className="text-text-secondary text-sm font-body leading-relaxed flex-1">
                    {v.body}
                  </p>

                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* ── §5 WHAT HAPPENS AT ESPARTO ─────────────────────────────── */}
        <FadeUp delay={0.3} distance={30}>
          <p className="font-mono text-[11px] font-bold tracking-[0.25em] text-text-muted uppercase mb-5">
            WHAT HAPPENS AT ESPARTO
          </p>
        </FadeUp>

        <div className="flex flex-col gap-px mb-24">
          {FORMATS.map((f, i) => (
            <FadeUp key={f.tag} delay={0.32 + i * 0.08} distance={24}>
              <div
                className={[
                  "group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 px-6 sm:px-8 py-6 sm:py-7",
                  `border ${f.border}`,
                  "bg-[#07041c]/60 hover:bg-[#0e0830]/80 transition-all duration-300",
                  i === 0 ? "rounded-t-2xl" : "",
                  i === FORMATS.length - 1 ? "rounded-b-2xl" : "",
                ].join(" ")}
              >
                <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-text-muted uppercase shrink-0 w-24">
                  {f.tag}
                </span>
                <div className="hidden sm:block h-8 w-px bg-white/10 shrink-0" aria-hidden="true" />
                <h2
                  className={`font-display font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r ${f.accent} tracking-tight uppercase shrink-0 sm:w-52`}
                >
                  {f.title}
                </h2>
                <p className="text-text-secondary text-sm font-body leading-relaxed">{f.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>


        {/* ── ABOUT THE HOST INSTITUTION ───────────────────────────── */}
        <FadeUp delay={0.28} distance={30}>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="font-mono text-[11px] font-bold tracking-[0.3em] text-text-muted uppercase px-4">
              HOST INSTITUTION
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </FadeUp>

        <FadeUp delay={0.3} distance={24}>
          <Link
            href="/hitam"
            className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 p-8 rounded-2xl border border-emerald-500/25 bg-gradient-to-r from-emerald-950/20 via-[#07041c]/60 to-brand-violet/10 hover:border-emerald-500/50 hover:from-emerald-950/30 transition-all duration-300 mb-20 cursor-pointer shadow-[0_0_30px_rgba(16,185,129,0.06)]"
          >
            {/* Official HITAM Logo */}
            <div className="relative w-20 h-24 sm:w-22 sm:h-28 rounded-2xl border border-emerald-500/40 bg-[#43a047] flex items-center justify-center shrink-0 overflow-hidden shadow-xl">
              <Image
                src="/images/hitam/hitam_logo.jpg"
                alt="HITAM Logo - Find your path"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-[9px] font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full uppercase">
                  HOST INSTITUTION
                </span>
                <span className="font-mono text-[9px] font-bold tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full uppercase">
                  NAAC A+
                </span>
                <span className="font-mono text-[9px] font-bold tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded-full uppercase">
                  NBA ACCREDITED
                </span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary uppercase mb-2">
                Hyderabad Institute of Technology &amp; Management
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="flex items-center gap-1.5 font-mono text-xs text-text-muted">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  Medchal, Hyderabad, Telangana
                </span>
                <span className="font-mono text-xs text-emerald-400 font-semibold">hitam.org</span>
                <span className="font-mono text-xs text-text-muted">· Est. 2001 · UGC Autonomous · Affiliated to JNTUH</span>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 group-hover:gap-3 transition-all shrink-0">
              <span className="uppercase tracking-widest font-bold">Explore HITAM</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>
        </FadeUp>

        {/* ── CTA ────────────────────────────────────────────────────── */}
        <FadeUp delay={0.1} threshold={0.2}>
          <div className="p-10 rounded-2xl border border-brand-violet/30 bg-gradient-to-r from-[#0d0728] to-[#08031a] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-2xl text-text-primary uppercase mb-2">
                READY TO EXPLORE EVENTS?
              </h3>
              <p className="text-text-secondary text-sm font-body">
                Browse all technical tracks, workshops, and competitions.
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-display font-bold text-xs sm:text-sm tracking-wider uppercase text-white bg-gradient-to-r from-brand-orange to-brand-magenta shadow-[0_0_20px_rgba(255,94,0,0.3)] hover:brightness-110 transition-all shrink-0"
            >
              <span>VIEW ALL EVENTS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeUp>

      </Container>
    </main>
  );
}
