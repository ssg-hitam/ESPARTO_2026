"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Mail, 
  Phone, 
  ShieldCheck, 
  GraduationCap, 
  Sparkles,
  Users2,
  Cpu,
  Layers,
  Palette,
  Handshake,
  Wallet,
  ShieldAlert,
  Mic2,
  ClipboardCheck,
  Camera,
  Megaphone,
  Truck,
  Workflow
} from "lucide-react";
import { 
  facultyCoordinators, 
  ssgLeadership, 
  chapterCommittees,
  eventSupportWings 
} from "@/data/team";

export default function TeamPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "faculty" | "student-core" | "chapters">("all");

  const getHandlingIcon = (text?: string) => {
    if (!text) return <Sparkles className="w-4 h-4 text-brand-orange" />;
    const h = text.toLowerCase();
    if (h.includes("stage") || h.includes("program")) return <Mic2 className="w-4 h-4 text-purple-400" />;
    if (h.includes("public relations") || h.includes("pr") || h.includes("outreach")) return <Megaphone className="w-4 h-4 text-blue-400" />;
    if (h.includes("finance") || h.includes("stall")) return <Wallet className="w-4 h-4 text-emerald-400" />;
    if (h.includes("logistics") || h.includes("infrastructure")) return <Truck className="w-4 h-4 text-yellow-400" />;
    if (h.includes("registration")) return <ClipboardCheck className="w-4 h-4 text-brand-orange" />;
    if (h.includes("decoration") || h.includes("design")) return <Palette className="w-4 h-4 text-pink-400" />;
    if (h.includes("discipline") || h.includes("protocol")) return <ShieldAlert className="w-4 h-4 text-rose-400" />;
    if (h.includes("photo") || h.includes("video") || h.includes("media") || h.includes("branding")) return <Camera className="w-4 h-4 text-cyan-400" />;
    if (h.includes("sponsor") || h.includes("direction") || h.includes("lead")) return <Handshake className="w-4 h-4 text-amber-400" />;
    return <Workflow className="w-4 h-4 text-brand-orange" />;
  };

  return (
    <main className="min-h-screen pt-28 pb-24 bg-[#03010b] relative overflow-hidden text-text-primary">
      {/* Ambient background glow */}
      <div 
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full bg-gradient-to-b from-brand-orange/15 via-brand-magenta/10 to-transparent blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute top-[40%] -right-20 w-[550px] h-[550px] rounded-full bg-brand-violet/10 blur-[180px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">
        
        {/* Navigation Breadcrumb */}
        <FadeUp delay={0}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-brand-orange" />
            <span>BACK TO HOME</span>
          </Link>
        </FadeUp>

        {/* Hero Header */}
        <FadeUp delay={0.06} distance={20}>
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange font-mono font-bold text-[11px] uppercase tracking-wider">
                ORGANIZING COMMITTEE
              </span>
              <span className="text-white/20 text-xs">•</span>
              <span className="text-[11px] font-mono tracking-wider text-text-muted">
                HITAM &amp; SSG
              </span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[1.05] mb-4">
              THE MINDS BEHIND <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">
                ESPARTO 2026
              </span>
            </h1>

            <p className="text-text-secondary text-sm sm:text-base font-body leading-relaxed max-w-2xl">
              Meet our institutional faculty coordinators, Student Self Governance (SSG) leadership, functional committee leads, and technical chapter core teams steering Hyderabad Institute of Technology and Management&apos;s flagship technical festival.
            </p>
          </div>
        </FadeUp>

        {/* Filter Tabs */}
        <FadeUp delay={0.1}>
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#08041d] border border-white/10 w-fit mb-12 flex-wrap">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                activeFilter === "all"
                  ? "bg-gradient-to-r from-brand-orange to-brand-magenta text-white shadow-[0_0_15px_rgba(255,94,0,0.4)]"
                  : "text-text-muted hover:text-white"
              }`}
            >
              All Committees
            </button>
            <button
              onClick={() => setActiveFilter("faculty")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                activeFilter === "faculty"
                  ? "bg-gradient-to-r from-brand-orange to-brand-magenta text-white shadow-[0_0_15px_rgba(255,94,0,0.4)]"
                  : "text-text-muted hover:text-white"
              }`}
            >
              Faculty Coordinators
            </button>
            <button
              onClick={() => setActiveFilter("student-core")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                activeFilter === "student-core"
                  ? "bg-gradient-to-r from-brand-orange to-brand-magenta text-white shadow-[0_0_15px_rgba(255,94,0,0.4)]"
                  : "text-text-muted hover:text-white"
              }`}
            >
              Student Organizing Core
            </button>
            <button
              onClick={() => setActiveFilter("chapters")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                activeFilter === "chapters"
                  ? "bg-gradient-to-r from-brand-orange to-brand-magenta text-white shadow-[0_0_15px_rgba(255,94,0,0.4)]"
                  : "text-text-muted hover:text-white"
              }`}
            >
              Student Chapters &amp; Clubs
            </button>
          </div>
        </FadeUp>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 1: FACULTY COORDINATORS
        ═══════════════════════════════════════════════════════════════════════ */}
        {(activeFilter === "all" || activeFilter === "faculty") && (
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-brand-orange font-bold block">
                  INSTITUTIONAL MENTORSHIP
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  FACULTY COORDINATORS
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {facultyCoordinators.map((faculty) => (
                <div
                  key={faculty.id}
                  className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c0628] via-[#08041d] to-[#040112] border border-white/15 hover:border-brand-orange/50 transition-all duration-300 group shadow-[0_0_30px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange group-hover:scale-105 transition-transform shrink-0">
                        <GraduationCap className="w-8 h-8" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-orange block">
                          {faculty.role}
                        </span>
                        <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                          {faculty.name}
                        </h3>
                        <p className="text-xs font-mono text-text-muted mt-0.5">
                          {faculty.department}
                        </p>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider shrink-0">
                      Faculty Lead
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 mt-6">
                    {faculty.socials?.email && (
                      <a
                        href={`mailto:${faculty.socials.email}`}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-orange/40 text-xs font-mono text-white transition-all"
                      >
                        <Mail className="w-3.5 h-3.5 text-brand-orange" />
                        <span>{faculty.socials.email}</span>
                      </a>
                    )}
                    {faculty.contact && (
                      <a
                        href={`tel:${faculty.socials?.phone || faculty.contact.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-mono text-emerald-400 transition-all"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{faculty.contact}</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 2: STUDENT ORGANIZING CORE
        ═══════════════════════════════════════════════════════════════════════ */}
        {(activeFilter === "all" || activeFilter === "student-core") && (
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-magenta/10 border border-brand-magenta/30 flex items-center justify-center text-brand-magenta">
                <Users2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-brand-magenta font-bold block">
                  STUDENT LEADERSHIP &amp; EVENT RESPONSIBILITIES
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  STUDENT ORGANIZING CORE
                </h2>
              </div>
            </div>

            {/* Tejal Spotlight Card (Lead Fest Organizer) */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#12082b] via-[#09041a] to-[#040210] border border-brand-orange/50 shadow-[0_0_40px_rgba(255,94,0,0.18)] mb-8 overflow-hidden group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-brand-orange/20 to-brand-magenta/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange shrink-0 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-brand-orange" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange font-mono font-bold text-[10px] uppercase tracking-wider">
                        LEAD FEST ORGANIZER
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-brand-magenta/15 border border-brand-magenta/30 text-brand-magenta font-mono text-[10px] font-bold uppercase">
                        STUDENT DEAN — IIIC
                      </span>
                    </div>

                    <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                      Tejal
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-text-secondary mt-0.5">
                      Student Dean — Industry Institute Incubation Centre (IIIC)
                    </p>

                    <div className="mt-3.5 p-3 rounded-xl bg-white/[0.04] border border-white/10 max-w-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <Handshake className="w-3.5 h-3.5 text-brand-orange" />
                        <span className="text-[10px] font-mono uppercase tracking-wider text-brand-orange font-bold">
                          HANDLING FOR ESPARTO 2026
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-white/90 leading-relaxed">
                        Overall Fest Direction, Lead Coordination &amp; Sponsorships
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap md:flex-col items-start gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-6">
                  <a
                    href="mailto:ssg.iiic@hitam.org"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 hover:border-brand-orange/50 text-xs font-mono text-white transition-all"
                  >
                    <Mail className="w-4 h-4 text-brand-orange" />
                    <span>ssg.iiic@hitam.org</span>
                  </a>
                  <a
                    href="tel:+919059111595"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-mono text-emerald-400 transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+91 90591 11595</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Core Student Organizers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {ssgLeadership.filter(member => member.id !== "tejal-iiic").map((member) => (
                <div
                  key={member.id}
                  className="p-6 rounded-3xl bg-gradient-to-br from-[#0c0628] via-[#08041d] to-[#040112] border border-white/10 hover:border-brand-orange/40 hover:bg-[#0e0730] transition-all duration-300 group flex flex-col justify-between shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(255,94,0,0.15)]"
                >
                  <div>
                    {/* Header with SSG Role pill */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-magenta/10 border border-brand-magenta/30 text-brand-magenta text-[10px] font-mono font-bold uppercase tracking-wider">
                        <Sparkles className="w-3 h-3 text-brand-magenta" />
                        <span>{member.role}</span>
                      </span>
                      <span className="w-2 h-2 rounded-full bg-brand-orange/60 group-hover:bg-brand-orange group-hover:scale-125 transition-all mt-1.5 shrink-0" />
                    </div>

                    {/* Student Name */}
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight group-hover:text-brand-orange transition-colors mb-3">
                      {member.name}
                    </h3>

                    {/* Event Handling Box */}
                    {member.handling && (
                      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 group-hover:border-white/20 transition-colors mb-4">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                            {getHandlingIcon(member.handling)}
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-brand-orange font-bold">
                            HANDLING FOR FEST
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-white/90 leading-snug pl-8">
                          {member.handling}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Email action footer */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    {member.socials?.email && (
                      <a
                        href={`mailto:${member.socials.email}`}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-orange/40 text-xs font-mono text-text-secondary hover:text-white transition-all max-w-full truncate"
                      >
                        <Mail className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                        <span className="truncate">{member.socials.email}</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Supporting Event Wings */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#08041d]/90 border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  SUPPORTING FEST WINGS &amp; COLLECTIVE TEAMS
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {eventSupportWings.map((wing) => (
                  <div
                    key={wing.id}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                          {wing.role}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                          {getHandlingIcon(wing.name)}
                        </div>
                      </div>

                      <h4 className="font-display font-black text-xl text-white tracking-tight mb-1">
                        {wing.name}
                      </h4>
                      <p className="text-xs font-mono text-brand-orange font-semibold mb-3">
                        Lead: {wing.lead}
                      </p>
                      <p className="text-xs font-body text-text-secondary leading-relaxed">
                        {wing.handling}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 3: STUDENT CHAPTERS & CLUBS
        ═══════════════════════════════════════════════════════════════════════ */}
        {(activeFilter === "all" || activeFilter === "chapters") && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                  TECHNICAL ORGANIZERS
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  STUDENT CHAPTERS &amp; CLUBS
                </h2>
              </div>
            </div>

            <p className="text-text-secondary text-xs sm:text-sm font-body max-w-3xl mb-8 leading-relaxed">
              The driving technical backbone of ESPARTO 2026. Student chapters and technical clubs actively design, judge, and coordinate specific flagship hackathons, coding arenas, robotics challenges, and paper symposiums.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {chapterCommittees.map((chapter) => (
                <div
                  key={chapter.id}
                  className="p-5 rounded-2xl bg-[#08041d]/80 border border-white/10 hover:border-cyan-500/40 hover:bg-[#0c0628] transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-xl bg-black/40 border border-white/10 p-2 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform overflow-hidden relative">
                      {chapter.image ? (
                        <Image
                          src={chapter.image}
                          alt={chapter.name}
                          width={48}
                          height={48}
                          className="object-contain w-full h-full"
                        />
                      ) : (
                        <Layers className="w-6 h-6 text-cyan-400" />
                      )}
                    </div>

                    <h4 className="font-display font-bold text-base text-white tracking-tight group-hover:text-cyan-400 transition-colors mb-1">
                      {chapter.name}
                    </h4>

                    <span className="text-[10px] font-mono text-cyan-400 font-semibold block uppercase">
                      {chapter.role}
                    </span>

                    <p className="text-xs font-body text-text-muted mt-2 leading-relaxed">
                      {chapter.department}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-text-muted">
                    <span>ESPARTO PARTNER</span>
                    <span className="text-emerald-400 font-semibold">Active Track</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════
            FOOTER REACH OUT CARD
        ═══════════════════════════════════════════════════════════════════════ */}
        <FadeUp delay={0.15}>
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0d072b] to-[#060317] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-orange block mb-1">
                JOIN OR CONNECT WITH THE TEAM
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                Want to collaborate or volunteer?
              </h3>
              <p className="text-text-secondary text-xs sm:text-sm font-body mt-1 max-w-xl">
                Reach out to Student Self Governance (SSG) or the Industry-Institute-Incubation Centre (IIIC) for coordination, volunteering, and event track inquiries.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="mailto:ssg@hitam.org?cc=ssg.iiic@hitam.org&subject=Inquiry for ESPARTO 2026 Organizing Committee"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-orange to-brand-magenta hover:brightness-110 shadow-[0_0_20px_rgba(255,94,0,0.35)] transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>CONTACT ORGANIZERS</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </FadeUp>

      </Container>
    </main>
  );
}
