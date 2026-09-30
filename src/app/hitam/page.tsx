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
  { value: "2001", label: "Year Established", icon: Building2 },
  { value: "Grade A+", label: "NAAC Accreditation", icon: Award },
  { value: "4th Rank", label: "Telangana Top Colleges (TOI)", icon: Award },
  { value: "101–150", label: "NIRF Innovation Band", icon: Award },
];

const ACCREDITATIONS_SHOWCASE = [
  {
    title: "NAAC Grade 'A+' Accreditation",
    authority: "National Assessment & Accreditation Council",
    description: "Awarded top-tier 'A+' grade accreditation by NAAC, recognizing HITAM's commitment to curriculum quality, innovative teaching methodologies, research excellence, and state-of-the-art infrastructure.",
    image: "/images/hitam/naac_a_plus.png",
  },
  {
    title: "NBA Accredited Programs",
    authority: "National Board of Accreditation",
    description: "Engineering programs accredited under NBA standards, fulfilling Washington Accord criteria ensuring globally recognized engineering degrees and graduate competence.",
    image: "/images/hitam/nba_accredited.png",
  },
  {
    title: "NIRF Innovation Rankings 2023",
    authority: "Ministry of Education, Government of India",
    description: "Ranked in the 101–150 Rank Band across India among privately funded institutions in NIRF Innovation Rankings 2023, reflecting a robust culture of patent filing, startup incubation, and practical R&D.",
    image: "/images/hitam/nirf_ranking.png",
  },
  {
    title: "4th Rank in Telangana",
    authority: "TIMES Engineering Rankings 2025 [TOI]",
    description: "Recognized as the 4th top private engineering college in Telangana by Times of India (TOI) Engineering Colleges Ranking 2025, driven by placement quality, student satisfaction, and cutting-edge labs.",
    image: "/images/hitam/times_ranking.png",
  },
];

const PROGRAMS = [
  { name: "Computer Science & Engineering", short: "CSE" },
  { name: "CSE (Artificial Intelligence & Machine Learning)", short: "AI & ML" },
  { name: "CSE (Data Science)", short: "Data Science" },
  { name: "Electrical & Electronics Engineering", short: "EEE" },
  { name: "Electronics & Communication Engineering", short: "ECE" },
  { name: "Mechanical Engineering", short: "MECH" },
];

const INITIATIVES = [
  {
    icon: FlaskConical,
    title: "Doing Engineering",
    desc: "HITAM's signature learning approach: moving away from conventional rote memorization to active, project-based engineering. From Day 1, students tackle real engineering problems with physical prototyping and collaborative build sprints.",
  },
  {
    icon: Globe2,
    title: "Integrated Twinning Program",
    desc: "A globally recognized academic pathway enabling students to begin their B.Tech at HITAM and complete credits at top-ranked universities abroad, gaining global dual exposure and international credentials.",
  },
  {
    icon: Microscope,
    title: "Research & Innovation (IIIC)",
    desc: "The Industry-Institute-Incubation Centre (IIIC) spearheads research papers in Scopus-indexed journals, student patents, and technology transfer, nurturing entrepreneurial mindsets on campus.",
  },
  {
    icon: Lightbulb,
    title: "Experiential Learning Labs",
    desc: "Modern multi-disciplinary fabrication labs, IoT research setups, robotics arenas, and high-performance computing clusters that give students unconstrained access to tools and technologies.",
  },
  {
    icon: Users,
    title: "Inclusive & Green Campus",
    desc: "Recognized as one of India's greenest campuses with LEED Silver certification, eco-friendly infrastructure, student welfare chapters, and over 15+ active student-led technical and cultural clubs.",
  },
  {
    icon: Layers,
    title: "Industry Partnerships & MoUs",
    desc: "Strong ties with multinational engineering giants and tech enterprises for continuous internships, industry-vetted course electives, hackathon sponsorships, and dedicated recruitment drives.",
  },
];

const GLOBAL_PARTNERS = [
  { name: "University of Alabama Huntsville", country: "United States", short: "UAH", desc: "Ranked Tier-1 Research University" },
  { name: "Milwaukee School of Engineering", country: "United States", short: "MSOE", desc: "Premier Applied Engineering Institution" },
  { name: "George Mason University", country: "United States", short: "GMU", desc: "Top National Research University" },
  { name: "Knowledge Foundation Reutlingen University", country: "Germany", short: "KFRU", desc: "European Applied Sciences & Engineering" },
];

export default function HitamPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-[#040210] relative overflow-hidden">
      {/* Subtle Ambient Depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-emerald-500/[0.04] blur-[160px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-brand-purple/[0.05] blur-[150px] pointer-events-none" aria-hidden="true" />

      <Container size="lg" className="relative z-10">

        {/* BACK NAVIGATION */}
        <FadeUp delay={0}>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs font-medium text-text-muted hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to About ESPARTO</span>
          </Link>
        </FadeUp>

        {/* ── HERO SECTION ───────────────────────────────────────── */}
        <FadeUp delay={0.08} distance={30}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 p-8 sm:p-10 rounded-2xl border border-white/10 bg-[#070419]/70 backdrop-blur-xl">
            
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-emerald-400">
                <span>UGC Autonomous</span>
                <span className="text-white/20">·</span>
                <span>NAAC A+</span>
                <span className="text-white/20">·</span>
                <span>NBA Accredited</span>
                <span className="text-white/20">·</span>
                <span>Affiliated to JNTUH</span>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-text-primary tracking-tight leading-[1.08] uppercase">
                Hyderabad Institute of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200">
                  Technology &amp; Management
                </span>
              </h1>

              <p className="text-text-secondary text-base sm:text-lg font-body leading-relaxed border-l-2 border-emerald-500/40 pl-5">
                Established in 2001, HITAM is an autonomous engineering institution renowned for its unique
                &lsquo;Doing Engineering&rsquo; philosophy, nurturing future innovators through project-centric
                experiential learning, international academic collaborations, and active research incubation.
              </p>

              <div className="flex flex-wrap items-center gap-5 pt-1 text-xs text-text-muted">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Medchal, Hyderabad, Telangana, India</span>
                </div>
                <a
                  href="https://hitam.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  <span>hitam.org</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Right: HITAM Emblem (4 cols) */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="relative w-48 h-60 sm:w-52 sm:h-64 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#388e3c]">
                <Image
                  src="/images/hitam/hitam_logo.jpg"
                  alt="Hyderabad Institute of Technology and Management"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

          </div>
        </FadeUp>

        {/* ── STATS ROW ──────────────────────────────────────────── */}
        <FadeUp delay={0.12} distance={20}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center text-center p-6 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
              >
                <s.icon className="w-5 h-5 text-emerald-400 mb-2 opacity-80" />
                <p className="font-display font-black text-2xl sm:text-3xl text-text-primary mb-1">
                  {s.value}
                </p>
                <p className="text-xs text-text-muted font-body">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* ── ACCREDITATIONS & NATIONAL RANKINGS ─────────────────── */}
        <FadeUp delay={0.16} distance={20}>
          <div className="mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary tracking-tight">
              Accreditations &amp; National Rankings
            </h2>
            <p className="text-text-secondary text-sm font-body mt-1">
              Recognized by statutory councils, ranking frameworks, and national evaluation bodies.
            </p>
          </div>
        </FadeUp>

        {/* Official Banner */}
        <FadeUp delay={0.18} distance={20}>
          <div className="mb-10 rounded-2xl border border-white/10 bg-[#06140b]/60 backdrop-blur-md p-4 sm:p-6">
            <div className="relative w-full aspect-[3/1] max-w-4xl mx-auto rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <Image
                src="/images/hitam/hitam_rankings_banner.png"
                alt="HITAM Accreditations and Rankings Banner"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </FadeUp>

        {/* 4 Recognition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {ACCREDITATIONS_SHOWCASE.map((item, i) => (
            <FadeUp key={item.title} delay={0.2 + i * 0.05} distance={20}>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-7 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors h-full">
                
                {/* Logo Frame */}
                <div className="relative w-28 h-24 sm:w-32 sm:h-28 rounded-xl p-2 bg-white border border-white/20 shadow-md flex items-center justify-center shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-1.5"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-text-primary leading-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-emerald-400/90 mb-2">
                    {item.authority}
                  </p>
                  <p className="text-text-secondary text-xs sm:text-sm font-body leading-relaxed">
                    {item.description}
                  </p>
                </div>

              </div>
            </FadeUp>
          ))}
        </div>

        {/* ── UNIQUE INITIATIVES ─────────────────────────────────── */}
        <FadeUp delay={0.16} distance={20}>
          <div className="mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary tracking-tight">
              Unique Initiatives &amp; Academic Philosophy
            </h2>
            <p className="text-text-secondary text-sm font-body mt-1">
              Pioneering modern engineering education through active practice and global pathways.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {INITIATIVES.map((item, i) => (
            <FadeUp key={item.title} delay={0.18 + i * 0.05} distance={20}>
              <div className="flex flex-col h-full rounded-2xl border border-white/10 bg-[#07041c]/60 p-6">
                <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center shrink-0 mb-4">
                  <item.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-display font-bold text-base text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm font-body leading-relaxed flex-1">
                  {item.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* ── ACADEMIC PROGRAMS ──────────────────────────────────── */}
        <FadeUp delay={0.16} distance={20}>
          <div className="mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary tracking-tight">
              Undergraduate Engineering Programs
            </h2>
            <p className="text-text-secondary text-sm font-body mt-1">
              Four-year B.Tech degrees with autonomy in curriculum design and industry-aligned specializations.
            </p>
          </div>
        </FadeUp>

        <div className="flex flex-col gap-px mb-20">
          {PROGRAMS.map((prog, i) => (
            <FadeUp key={prog.short} delay={0.18 + i * 0.04} distance={16}>
              <div className={[
                "flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 px-6 sm:px-8 py-5",
                "border border-white/10 bg-[#07041c]/50 hover:bg-[#0c0828]/70 transition-colors",
                i === 0 ? "rounded-t-2xl" : "",
                i === PROGRAMS.length - 1 ? "rounded-b-2xl" : ""
              ].join(" ")}>
                <span className="font-display font-bold text-lg text-emerald-400 shrink-0 sm:w-32">
                  {prog.short}
                </span>
                <div className="hidden sm:block h-5 w-px bg-white/10 shrink-0" aria-hidden="true" />
                <p className="text-text-primary text-sm font-body flex-1 font-medium">
                  {prog.name}
                </p>
                <span className="text-xs text-text-muted shrink-0 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>4-Year Autonomous B.Tech</span>
                </span>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* ── GLOBAL PARTNERS ────────────────────────────────────── */}
        <FadeUp delay={0.16} distance={20}>
          <div className="mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary tracking-tight">
              Global Partner Universities
            </h2>
            <p className="text-text-secondary text-sm font-body mt-1">
              International academic credit transfer and twinning pathways with accredited institutions abroad.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
          {GLOBAL_PARTNERS.map((p, i) => (
            <FadeUp key={p.short} delay={0.18 + i * 0.04} distance={16}>
              <div className="flex items-start gap-4 p-5 rounded-xl border border-white/10 bg-[#07041c]/60">
                <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                  <Globe2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-text-muted mb-0.5">
                    <span className="font-semibold text-text-secondary">{p.country}</span>
                    <span>·</span>
                    <span>{p.short}</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-text-primary">
                    {p.name}
                  </h4>
                  <p className="text-xs text-text-muted mt-1 font-body">
                    {p.desc}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* ── FOOTER CTA ─────────────────────────────────────────── */}
        <FadeUp delay={0.1} threshold={0.2}>
          <div className="p-8 sm:p-10 rounded-2xl border border-white/10 bg-gradient-to-r from-[#06180e]/90 to-[#08031a]/90 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                Campus Location
              </p>
              <h3 className="font-display font-bold text-2xl text-text-primary uppercase mt-1 mb-1">
                Join us at HITAM for ESPARTO 2026
              </h3>
              <p className="text-text-secondary text-sm font-body">
                October 09–10, 2026 · HITAM Campus, Medchal, Hyderabad, Telangana
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/about"
                className="px-6 py-3 rounded-full text-xs font-semibold text-text-secondary border border-white/10 hover:border-white/30 hover:text-white transition-all uppercase tracking-wide"
              >
                About Fest
              </Link>
              <Link
                href="/venue"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors uppercase tracking-wide shadow-md"
              >
                <span>Campus Venue</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </FadeUp>

      </Container>
    </main>
  );
}
