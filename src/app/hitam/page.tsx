"use client";

import React from "react";
import Link from "next/link";
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
  BookOpen,
} from "lucide-react";

const STATS = [
  { value: "2001", label: "Established", icon: Building2, accent: "text-brand-orange" },
  { value: "6", label: "B.Tech Programs", icon: GraduationCap, accent: "text-brand-magenta" },
  { value: "4+", label: "Global Partner Universities", icon: Globe2, accent: "text-brand-violet" },
  { value: "NAAC", label: "Accredited", icon: Award, accent: "text-brand-amber" },
];

const PROGRAMS = [
  { name: "Computer Science & Engineering", short: "CSE", color: "from-brand-orange to-brand-amber" },
  { name: "CSE (AI & Machine Learning)", short: "AI & ML", color: "from-brand-magenta to-brand-purple" },
  { name: "CSE (Data Science)", short: "Data Science", color: "from-brand-violet to-brand-purple" },
  { name: "Electrical & Electronics Engineering", short: "EEE", color: "from-brand-amber to-brand-orange" },
  { name: "Electronics & Communication Engineering", short: "ECE", color: "from-brand-purple to-brand-violet" },
  { name: "Mechanical Engineering", short: "MECH", color: "from-brand-magenta to-brand-violet" },
];

const INITIATIVES = [
  {
    icon: FlaskConical,
    title: "Doing Engineering",
    desc: "HITAM's flagship learning philosophy — every student learns by building, not just studying. Hands-on projects, industry challenges, and real-world problem-solving are core to every program.",
    border: "border-brand-orange/30",
    glow: "rgba(255,94,0,0.08)",
    iconColor: "text-brand-orange",
    barClass: "from-brand-orange to-brand-amber",
  },
  {
    icon: Globe2,
    title: "Integrated Twinning Program",
    desc: "A unique academic pathway enabling students to study part of their degree at prestigious international partner universities including UAH (USA), MSOE (USA), and George Mason University (USA).",
    border: "border-brand-magenta/30",
    glow: "rgba(255,0,122,0.08)",
    iconColor: "text-brand-magenta",
    barClass: "from-brand-magenta to-brand-purple",
  },
  {
    icon: Microscope,
    title: "Research & Innovation",
    desc: "Active research ecosystem with Scopus-indexed publications, funded projects, and patents. Students and faculty collaborate on cutting-edge R&D in AI, embedded systems, and sustainable engineering.",
    border: "border-brand-violet/30",
    glow: "rgba(121,80,242,0.08)",
    iconColor: "text-brand-violet",
    barClass: "from-brand-violet to-brand-purple",
  },
  {
    icon: Lightbulb,
    title: "High Quality Learning Experience",
    desc: "Industry-driven curriculum with advanced labs, simulation centres, and collaboration with top tech companies to bridge the gap between academia and industry requirements.",
    border: "border-brand-amber/30",
    glow: "rgba(255,165,0,0.08)",
    iconColor: "text-brand-amber",
    barClass: "from-brand-amber to-brand-orange",
  },
  {
    icon: Users,
    title: "Inclusive Campus",
    desc: "A diverse, welcoming environment with active student welfare committees, sports facilities, clubs, societies, and a vibrant campus life that fosters all-round personality development.",
    border: "border-brand-purple/30",
    glow: "rgba(155,81,224,0.08)",
    iconColor: "text-brand-purple",
    barClass: "from-brand-purple to-brand-violet",
  },
  {
    icon: Layers,
    title: "Industry Collaborations",
    desc: "Strategic MoUs with leading tech firms and industry partners provide students with internship opportunities, live projects, guest lectures, and direct placement pipelines.",
    border: "border-brand-magenta/30",
    glow: "rgba(255,0,122,0.06)",
    iconColor: "text-brand-magenta",
    barClass: "from-brand-magenta to-brand-violet",
  },
];

const GLOBAL_PARTNERS = [
  { name: "University of Alabama Huntsville", country: "USA", short: "UAH" },
  { name: "Milwaukee School of Engineering", country: "USA", short: "MSOE" },
  { name: "George Mason University", country: "USA", short: "GMU" },
  { name: "Knowledge Foundation Reutlingen University", country: "Germany", short: "KFRU" },
];

const ACCREDITATIONS = [
  { name: "NAAC", desc: "National Assessment & Accreditation Council" },
  { name: "NBA", desc: "National Board of Accreditation" },
  { name: "AICTE", desc: "All India Council for Technical Education" },
  { name: "JNTUH", desc: "Jawaharlal Nehru Technological University Hyderabad" },
  { name: "UGC", desc: "University Grants Commission — Autonomous Status" },
];

export default function HitamPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-[#040210] relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-brand-violet/[0.07] blur-[180px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-brand-orange/[0.06] blur-[160px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-2/3 -right-40 w-[500px] h-[500px] rounded-full bg-brand-magenta/[0.06] blur-[160px] pointer-events-none" aria-hidden="true" />

      <Container size="lg" className="relative z-10">

        {/* BACK */}
        <FadeUp delay={0}>
          <Link href="/about" className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>BACK TO ABOUT</span>
          </Link>
        </FadeUp>

        {/* HEADER */}
        <FadeUp delay={0.1} distance={50}>
          <div className="max-w-4xl mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center shrink-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 to-brand-violet/20" />
                <BookOpen className="w-8 h-8 text-white relative z-10" />
              </div>
              <div>
                <p className="font-mono text-[10px] font-bold tracking-[0.35em] text-text-muted uppercase mb-1">ESPARTO 2026 HOST INSTITUTION</p>
                <p className="font-mono text-xs text-brand-orange">Medchal, Hyderabad, Telangana, India</p>
              </div>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl text-text-primary tracking-tight leading-[1.05] uppercase mb-6">
              ABOUT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">
                HITAM
              </span>
            </h1>

            <p className="text-text-secondary text-base sm:text-lg font-body leading-relaxed border-l-2 border-brand-orange/40 pl-5 max-w-3xl">
              The Hyderabad Institute of Technology and Management (HITAM) shapes future-ready minds
              through innovative, practical learning in a collaborative environment, fostering all-round
              growth. Established in 2001, HITAM stands as one of Hyderabad&apos;s premier engineering
              institutions under JNTUH affiliation with UGC Autonomous status.
            </p>

            <a
              href="https://hitam.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 font-mono text-xs text-brand-orange/80 hover:text-brand-orange transition-colors group"
            >
              <span>Visit hitam.org</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </FadeUp>

        {/* STATS */}
        <FadeUp delay={0.15} distance={30}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.05] transition-colors">
                <s.icon className={`w-5 h-5 ${s.accent} mb-3 opacity-80`} />
                <p className={`font-display font-black text-2xl sm:text-3xl ${s.accent} mb-1`}>{s.value}</p>
                <p className="font-mono text-[10px] tracking-widest text-text-muted uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* INITIATIVES */}
        <FadeUp delay={0.18} distance={24}>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="font-mono text-[11px] font-bold tracking-[0.3em] text-text-muted uppercase px-4">UNIQUE INITIATIVES</p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {INITIATIVES.map((item, i) => (
            <FadeUp key={item.title} delay={0.2 + i * 0.07} distance={30}>
              <div
                className={`relative flex flex-col h-full rounded-2xl border ${item.border} bg-[#07041c]/80 backdrop-blur-md overflow-hidden group hover:scale-[1.015] transition-transform duration-300`}
                style={{ boxShadow: `0 0 40px ${item.glow}` }}
              >
                <div className={`h-[3px] w-full bg-gradient-to-r ${item.barClass} shrink-0`} />
                <div className="relative z-10 flex flex-col gap-3 p-6 flex-1">
                  <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <h2 className="font-display font-bold text-lg text-text-primary leading-tight">{item.title}</h2>
                  <p className="text-text-secondary text-sm font-body leading-relaxed flex-1">{item.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* PROGRAMS */}
        <FadeUp delay={0.2} distance={24}>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="font-mono text-[11px] font-bold tracking-[0.3em] text-text-muted uppercase px-4">B.TECH PROGRAMS</p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </FadeUp>

        <div className="flex flex-col gap-px mb-20">
          {PROGRAMS.map((prog, i) => (
            <FadeUp key={prog.short} delay={0.22 + i * 0.06} distance={20}>
              <div className={["group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 px-6 sm:px-8 py-5 sm:py-6", "border border-white/[0.08] bg-[#07041c]/60 hover:bg-[#0e0830]/80 transition-all duration-300", i === 0 ? "rounded-t-2xl" : "", i === PROGRAMS.length - 1 ? "rounded-b-2xl" : ""].join(" ")}>
                <span className={`font-display font-black text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r ${prog.color} shrink-0 sm:w-28`}>{prog.short}</span>
                <div className="hidden sm:block h-6 w-px bg-white/10 shrink-0" aria-hidden="true" />
                <p className="text-text-secondary text-sm font-body">{prog.name}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* GLOBAL PARTNERS */}
        <FadeUp delay={0.2} distance={24}>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="font-mono text-[11px] font-bold tracking-[0.3em] text-text-muted uppercase px-4">GLOBAL PARTNER UNIVERSITIES</p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
          {GLOBAL_PARTNERS.map((p, i) => (
            <FadeUp key={p.short} delay={0.24 + i * 0.06} distance={20}>
              <div className="flex items-center gap-4 p-5 rounded-2xl border border-white/[0.08] bg-[#07041c]/80 hover:bg-[#0e0830]/80 transition-colors">
                <div className="w-12 h-12 rounded-xl border border-brand-violet/30 bg-brand-violet/10 flex items-center justify-center shrink-0">
                  <Globe2 className="w-5 h-5 text-brand-violet" />
                </div>
                <div>
                  <p className="font-mono text-[10px] font-bold tracking-widest text-brand-violet uppercase mb-0.5">{p.country}</p>
                  <p className="font-display font-bold text-sm text-text-primary leading-snug">{p.name}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* ACCREDITATIONS */}
        <FadeUp delay={0.2} distance={24}>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="font-mono text-[11px] font-bold tracking-[0.3em] text-text-muted uppercase px-4">ACCREDITATIONS & AFFILIATIONS</p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </FadeUp>

        <div className="flex flex-wrap gap-3 mb-20">
          {ACCREDITATIONS.map((acc, i) => (
            <FadeUp key={acc.name} delay={0.22 + i * 0.05} distance={16}>
              <div className="flex flex-col gap-1 px-5 py-4 rounded-2xl border border-brand-amber/20 bg-brand-amber/[0.04] hover:bg-brand-amber/[0.08] transition-colors cursor-default">
                <span className="font-display font-black text-xl text-brand-amber">{acc.name}</span>
                <span className="font-mono text-[10px] text-text-muted">{acc.desc}</span>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* CTA */}
        <FadeUp delay={0.1} threshold={0.2}>
          <div className="p-10 rounded-2xl border border-brand-orange/30 bg-gradient-to-r from-[#0d0728] to-[#08031a] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-2xl text-text-primary uppercase mb-2">ESPARTO 2026 IS HOSTED AT HITAM</h3>
              <p className="text-text-secondary text-sm font-body">Oct 9–10, 2026 · HITAM Campus, Medchal, Hyderabad</p>
            </div>
            <Link href="/venue" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-display font-bold text-xs sm:text-sm tracking-wider uppercase text-white bg-gradient-to-r from-brand-orange to-brand-magenta shadow-[0_0_20px_rgba(255,94,0,0.3)] hover:brightness-110 transition-all shrink-0">
              <span>VIEW VENUE</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeUp>

      </Container>
    </main>
  );
}
