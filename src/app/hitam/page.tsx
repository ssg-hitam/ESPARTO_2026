"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import {
  ArrowLeft,
  ArrowUpRight,
  FlaskConical,
  Globe2,
  GraduationCap,
  Layers,
  Lightbulb,
  Microscope,
  Award,
  Building2,
  Users,
  CheckCircle2,
  MapPin,
  ExternalLink,
} from "lucide-react";

const STATS = [
  { value: "2001", label: "Established", icon: Building2, accent: "text-brand-orange" },
  { value: "A+", label: "NAAC Grade", icon: Award, accent: "text-brand-amber" },
  { value: "4th", label: "Rank in Telangana (TOI)", icon: Award, accent: "text-brand-magenta" },
  { value: "101–150", label: "NIRF Innovation Band", icon: Award, accent: "text-brand-violet" },
];

const ACCREDITATIONS_SHOWCASE = [
  {
    title: "NAAC Grade A+",
    subtitle: "National Assessment & Accreditation Council",
    description: "Awarded top-tier 'A+' grade accreditation by NAAC, recognizing HITAM's commitment to curriculum quality, innovative teaching methodologies, research excellence, and state-of-the-art infrastructure.",
    badge: "GRADE A+",
    image: "/images/hitam/naac_a_plus.png",
    accent: "from-amber-500/20 via-yellow-500/10 to-transparent",
    border: "border-amber-500/30",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  },
  {
    title: "NBA Accredited",
    subtitle: "National Board of Accreditation",
    description: "Engineering programs accredited under NBA standards, fulfilling Washington Accord criteria ensuring globally recognized engineering degrees and graduate competence.",
    badge: "ACCREDITED BY NBA",
    image: "/images/hitam/nba_accredited.png",
    accent: "from-cyan-500/20 via-sky-500/10 to-transparent",
    border: "border-cyan-500/30",
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
  },
  {
    title: "NIRF Innovation Rankings 2023",
    subtitle: "Ministry of Education, Govt. of India",
    description: "Ranked in the 101–150 Rank Band across India among privately funded institutions in NIRF Innovation Rankings 2023, reflecting a robust culture of patent filing, startup incubation, and practical R&D.",
    badge: "101–150 RANK BAND",
    image: "/images/hitam/nirf_ranking.png",
    accent: "from-rose-500/20 via-red-500/10 to-transparent",
    border: "border-rose-500/30",
    badgeColor: "text-rose-400 bg-rose-500/10 border-rose-500/30",
  },
  {
    title: "4th Rank in Telangana",
    subtitle: "TIMES Engineering Rankings 2025 [TOI]",
    description: "Recognized as the 4th top private engineering college in Telangana by Times of India (TOI) Engineering Colleges Ranking 2025, driven by placement quality, student satisfaction, and cutting-edge labs.",
    badge: "4TH RANK TELANGANA",
    image: "/images/hitam/times_ranking.png",
    accent: "from-amber-400/20 via-orange-500/10 to-transparent",
    border: "border-amber-400/30",
    badgeColor: "text-amber-300 bg-amber-400/10 border-amber-400/30",
  },
];

const PROGRAMS = [
  { name: "Computer Science & Engineering", short: "CSE", color: "from-brand-orange to-brand-amber" },
  { name: "CSE (Artificial Intelligence & Machine Learning)", short: "AI & ML", color: "from-brand-magenta to-brand-purple" },
  { name: "CSE (Data Science)", short: "Data Science", color: "from-brand-violet to-brand-purple" },
  { name: "Electrical & Electronics Engineering", short: "EEE", color: "from-brand-amber to-brand-orange" },
  { name: "Electronics & Communication Engineering", short: "ECE", color: "from-brand-purple to-brand-violet" },
  { name: "Mechanical Engineering", short: "MECH", color: "from-brand-magenta to-brand-violet" },
];

const INITIATIVES = [
  {
    icon: FlaskConical,
    title: "Doing Engineering",
    desc: "HITAM's signature learning approach: moving away from conventional rote memorization to active, project-based engineering. From Day 1, students tackle real engineering problems with physical prototyping and collaborative build sprints.",
    border: "border-brand-orange/30",
    glow: "rgba(255,94,0,0.08)",
    iconColor: "text-brand-orange",
    barClass: "from-brand-orange to-brand-amber",
  },
  {
    icon: Globe2,
    title: "Integrated Twinning Program",
    desc: "A globally recognized academic pathway enabling students to begin their B.Tech at HITAM and complete credits at top-ranked universities abroad, gaining global dual exposure and international credentials.",
    border: "border-brand-magenta/30",
    glow: "rgba(255,0,122,0.08)",
    iconColor: "text-brand-magenta",
    barClass: "from-brand-magenta to-brand-purple",
  },
  {
    icon: Microscope,
    title: "Research & Innovation (IIIC)",
    desc: "The Industry-Institute-Incubation Centre (IIIC) spearheads research papers in Scopus-indexed journals, student patents, and technology transfer, nurturing entrepreneurial mindsets on campus.",
    border: "border-brand-violet/30",
    glow: "rgba(121,80,242,0.08)",
    iconColor: "text-brand-violet",
    barClass: "from-brand-violet to-brand-purple",
  },
  {
    icon: Lightbulb,
    title: "Experiential Learning Labs",
    desc: "Modern multi-disciplinary fabrication labs, IoT research setups, robotics arenas, and high-performance computing clusters that give students unconstrained access to tools and technologies.",
    border: "border-brand-amber/30",
    glow: "rgba(255,165,0,0.08)",
    iconColor: "text-brand-amber",
    barClass: "from-brand-amber to-brand-orange",
  },
  {
    icon: Users,
    title: "Inclusive & Green Campus",
    desc: "Recognized as one of India's greenest campuses with LEED Silver certification, eco-friendly infrastructure, student welfare chapters, and over 15+ active student-led technical and cultural clubs.",
    border: "border-brand-purple/30",
    glow: "rgba(155,81,224,0.08)",
    iconColor: "text-brand-purple",
    barClass: "from-brand-purple to-brand-violet",
  },
  {
    icon: Layers,
    title: "Industry Partnerships & MoUs",
    desc: "Strong ties with multinational engineering giants and tech enterprises for continuous internships, industry-vetted course electives, hackathon sponsorships, and dedicated recruitment drives.",
    border: "border-brand-magenta/30",
    glow: "rgba(255,0,122,0.06)",
    iconColor: "text-brand-magenta",
    barClass: "from-brand-magenta to-brand-violet",
  },
];

const GLOBAL_PARTNERS = [
  { name: "University of Alabama Huntsville", country: "USA", short: "UAH", desc: "Ranked Tier-1 Research University" },
  { name: "Milwaukee School of Engineering", country: "USA", short: "MSOE", desc: "Premier Applied Engineering Institution" },
  { name: "George Mason University", country: "USA", short: "GMU", desc: "Top National Research University" },
  { name: "Knowledge Foundation Reutlingen University", country: "Germany", short: "KFRU", desc: "World-Class European Applied Sciences" },
];

export default function HitamPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-[#040210] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-brand-violet/[0.07] blur-[180px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-brand-orange/[0.06] blur-[160px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-2/3 -right-40 w-[500px] h-[500px] rounded-full bg-brand-magenta/[0.06] blur-[160px] pointer-events-none" aria-hidden="true" />

      <Container size="lg" className="relative z-10">

        {/* BACK BUTTON */}
        <FadeUp delay={0}>
          <Link href="/about" className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>BACK TO ABOUT ESPARTO</span>
          </Link>
        </FadeUp>

        {/* ── §1 HERO & OFFICIAL LOGO ───────────────────────────── */}
        <FadeUp delay={0.1} distance={40}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 p-8 sm:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c0722]/90 to-[#060317]/90 backdrop-blur-xl relative overflow-hidden shadow-[0_0_50px_rgba(255,94,0,0.05)]">
            
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-brand-orange to-brand-magenta" />

            {/* Left: Text & Badges (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  UGC AUTONOMOUS
                </span>
                <span className="px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  NAAC A+ GRADE
                </span>
                <span className="px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  NBA ACCREDITED
                </span>
                <span className="px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-widest uppercase bg-brand-violet/10 text-brand-violet border border-brand-violet/30">
                  AFFILIATED TO JNTUH
                </span>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-text-primary tracking-tight leading-[1.08] uppercase">
                HYDERABAD INSTITUTE OF{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-brand-orange to-brand-magenta">
                  TECHNOLOGY &amp; MANAGEMENT
                </span>
              </h1>

              <p className="text-text-secondary text-base sm:text-lg font-body leading-relaxed border-l-2 border-emerald-500/40 pl-5">
                Established in 2001, HITAM is an autonomous engineering institution renowned for its unique
                &lsquo;Doing Engineering&rsquo; philosophy, nurturing future innovators through project-centric
                experiential learning, international academic collaborations, and active research incubation.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Medchal, Hyderabad, Telangana, India</span>
                </div>
                <a
                  href="https://hitam.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400 hover:text-emerald-300 transition-colors group"
                >
                  <span>hitam.org</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Right: Official HITAM Emblem with Tree (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="relative group p-3 rounded-3xl border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:border-emerald-500/50 transition-all duration-300">
                <div className="relative w-48 h-60 sm:w-56 sm:h-68 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-[#43a047]">
                  <Image
                    src="/images/hitam/hitam_logo.jpg"
                    alt="HITAM - Find your path Logo"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
                <div className="text-center mt-3">
                  <p className="font-mono text-[10px] tracking-[0.25em] text-emerald-400 uppercase font-bold">OFFICIAL LOGO</p>
                  <p className="font-display font-medium text-xs text-text-secondary">find your path</p>
                </div>
              </div>
            </div>

          </div>
        </FadeUp>

        {/* ── §2 STATS ──────────────────────────────────────────── */}
        <FadeUp delay={0.15} distance={30}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.05] transition-colors">
                <s.icon className={`w-5 h-5 ${s.accent} mb-3 opacity-80`} />
                <p className={`font-display font-black text-2xl sm:text-3xl ${s.accent} mb-1`}>{s.value}</p>
                <p className="font-mono text-[10px] tracking-widest text-text-muted uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* ── §3 ACCREDITATIONS & RANKINGS SECTION ──────────────── */}
        <FadeUp delay={0.18} distance={24}>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="font-mono text-[11px] font-bold tracking-[0.3em] text-text-muted uppercase px-4">
              ACCREDITATIONS, RANKINGS &amp; RECOGNITIONS
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </FadeUp>

        {/* Official Banner Card */}
        <FadeUp delay={0.2} distance={30}>
          <div className="relative mb-12 rounded-3xl border border-emerald-500/20 bg-[#06140b]/80 backdrop-blur-md overflow-hidden p-6 sm:p-8">
            <div className="text-center mb-6">
              <span className="font-mono text-[10px] font-bold tracking-[0.35em] text-emerald-400 uppercase">
                OFFICIAL RECOGNITIONS BENCHMARK
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-text-primary uppercase mt-1">
                EXCELLENCE RECOGNIZED NATIONALLY
              </h2>
            </div>
            
            <div className="relative w-full aspect-[3/1] max-w-4xl mx-auto rounded-2xl overflow-hidden border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.12)]">
              <Image
                src="/images/hitam/hitam_rankings_banner.png"
                alt="HITAM Accreditations and Rankings Banner: NAAC A+, NBA, NIRF Innovation 101-150, 4th Rank in Telangana by Times"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </FadeUp>

        {/* Detailed 4-Grid Cards with Logos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {ACCREDITATIONS_SHOWCASE.map((item, i) => (
            <FadeUp key={item.title} delay={0.22 + i * 0.08} distance={24}>
              <div className={`relative flex flex-col sm:flex-row items-center sm:items-start gap-6 p-7 rounded-2xl border ${item.border} bg-gradient-to-br ${item.accent} backdrop-blur-md h-full hover:scale-[1.01] transition-transform duration-300`}>
                
                {/* Logo Frame */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-2 bg-white/95 border border-white/20 shadow-lg flex items-center justify-center shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 text-center sm:text-left">
                  <span className={`inline-block font-mono text-[9px] font-bold tracking-widest px-2.5 py-0.5 rounded-full border mb-2 ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                  <h3 className="font-display font-bold text-xl text-text-primary leading-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="font-mono text-[11px] text-text-muted mb-2">
                    {item.subtitle}
                  </p>
                  <p className="text-text-secondary text-xs sm:text-sm font-body leading-relaxed">
                    {item.description}
                  </p>
                </div>

              </div>
            </FadeUp>
          ))}
        </div>

        {/* ── §4 UNIQUE INITIATIVES ─────────────────────────────── */}
        <FadeUp delay={0.2} distance={24}>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="font-mono text-[11px] font-bold tracking-[0.3em] text-text-muted uppercase px-4">
              UNIQUE INITIATIVES &amp; PHILOSOPHY
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {INITIATIVES.map((item, i) => (
            <FadeUp key={item.title} delay={0.22 + i * 0.06} distance={30}>
              <div
                className={`relative flex flex-col h-full rounded-2xl border ${item.border} bg-[#07041c]/80 backdrop-blur-md overflow-hidden group hover:scale-[1.015] transition-transform duration-300`}
                style={{ boxShadow: `0 0 40px ${item.glow}` }}
              >
                <div className={`h-[3px] w-full bg-gradient-to-r ${item.barClass} shrink-0`} />
                <div className="relative z-10 flex flex-col gap-3 p-6 flex-1">
                  <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-text-primary leading-tight">{item.title}</h3>
                  <p className="text-text-secondary text-sm font-body leading-relaxed flex-1">{item.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* ── §5 ACADEMIC PROGRAMS ──────────────────────────────── */}
        <FadeUp delay={0.2} distance={24}>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="font-mono text-[11px] font-bold tracking-[0.3em] text-text-muted uppercase px-4">
              B.TECH ACADEMIC PROGRAMS
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </FadeUp>

        <div className="flex flex-col gap-px mb-20">
          {PROGRAMS.map((prog, i) => (
            <FadeUp key={prog.short} delay={0.22 + i * 0.05} distance={20}>
              <div className={[
                "group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 px-6 sm:px-8 py-5 sm:py-6",
                "border border-white/[0.08] bg-[#07041c]/60 hover:bg-[#0e0830]/80 transition-all duration-300",
                i === 0 ? "rounded-t-2xl" : "",
                i === PROGRAMS.length - 1 ? "rounded-b-2xl" : ""
              ].join(" ")}>
                <span className={`font-display font-black text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r ${prog.color} shrink-0 sm:w-36`}>
                  {prog.short}
                </span>
                <div className="hidden sm:block h-6 w-px bg-white/10 shrink-0" aria-hidden="true" />
                <p className="text-text-secondary text-sm font-body font-medium flex-1">{prog.name}</p>
                <span className="font-mono text-xs text-text-muted shrink-0 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>4-Year Autonomous Degree</span>
                </span>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* ── §6 GLOBAL PARTNER UNIVERSITIES ────────────────────── */}
        <FadeUp delay={0.2} distance={24}>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="font-mono text-[11px] font-bold tracking-[0.3em] text-text-muted uppercase px-4">
              GLOBAL PARTNER UNIVERSITIES (TWINNING PROGRAM)
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
          {GLOBAL_PARTNERS.map((p, i) => (
            <FadeUp key={p.short} delay={0.24 + i * 0.06} distance={20}>
              <div className="flex items-start gap-4 p-5 rounded-2xl border border-white/[0.08] bg-[#07041c]/80 hover:bg-[#0e0830]/80 transition-colors">
                <div className="w-12 h-12 rounded-xl border border-brand-violet/30 bg-brand-violet/10 flex items-center justify-center shrink-0">
                  <Globe2 className="w-5 h-5 text-brand-violet" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-[10px] font-bold tracking-widest text-brand-violet uppercase">{p.country}</span>
                    <span className="text-white/20">·</span>
                    <span className="font-mono text-[10px] text-text-muted">{p.short}</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-text-primary leading-snug">{p.name}</h4>
                  <p className="font-body text-xs text-text-muted mt-1">{p.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* ── §7 CTA ────────────────────────────────────────────── */}
        <FadeUp delay={0.1} threshold={0.2}>
          <div className="p-8 sm:p-10 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-[#06180e] via-[#0d0728] to-[#08031a] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="font-mono text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
                HOST CAMPUS
              </span>
              <h3 className="font-display font-bold text-2xl text-text-primary uppercase mt-1 mb-2">
                JOIN US AT HITAM FOR ESPARTO 2026
              </h3>
              <p className="text-text-secondary text-sm font-body">
                October 09–10, 2026 · HITAM Campus, Medchal, Hyderabad, Telangana
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/about"
                className="px-6 py-3.5 rounded-full font-display font-bold text-xs tracking-wider uppercase text-text-secondary border border-white/10 hover:border-white/30 hover:text-white transition-all"
              >
                ABOUT FEST
              </Link>
              <Link
                href="/venue"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-display font-bold text-xs sm:text-sm tracking-wider uppercase text-white bg-gradient-to-r from-emerald-500 to-brand-magenta shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:brightness-110 transition-all"
              >
                <span>CAMPUS VENUE</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </FadeUp>

      </Container>
    </main>
  );
}
