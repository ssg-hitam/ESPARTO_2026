"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { 
  ArrowLeft, 
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
  ExternalLink
} from "lucide-react";
import { 
  facultyCoordinators, 
  ssgLeadership, 
  chapterCommittees,
  eventSupportWings 
} from "@/data/team";

export default function TeamPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "student-core" | "faculty" | "chapters">("all");

  const getHandlingIcon = (text?: string) => {
    if (!text) return <Sparkles className="w-3.5 h-3.5 text-brand-orange" />;
    const h = text.toLowerCase();
    if (h.includes("stage") || h.includes("program")) return <Mic2 className="w-3.5 h-3.5 text-purple-400" />;
    if (h.includes("public relations") || h.includes("pr") || h.includes("outreach")) return <Megaphone className="w-3.5 h-3.5 text-blue-400" />;
    if (h.includes("finance") || h.includes("stall")) return <Wallet className="w-3.5 h-3.5 text-emerald-400" />;
    if (h.includes("logistics") || h.includes("infrastructure")) return <Truck className="w-3.5 h-3.5 text-amber-400" />;
    if (h.includes("registration")) return <ClipboardCheck className="w-3.5 h-3.5 text-brand-orange" />;
    if (h.includes("decoration") || h.includes("design")) return <Palette className="w-3.5 h-3.5 text-pink-400" />;
    if (h.includes("discipline") || h.includes("protocol")) return <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />;
    if (h.includes("photo") || h.includes("video") || h.includes("media") || h.includes("branding")) return <Camera className="w-3.5 h-3.5 text-cyan-400" />;
    if (h.includes("sponsor") || h.includes("direction") || h.includes("lead")) return <Handshake className="w-3.5 h-3.5 text-amber-400" />;
    return <Layers className="w-3.5 h-3.5 text-brand-orange" />;
  };

  const leadOrganizer = ssgLeadership.find(m => m.id === "tejal-iiic");
  const coreStudentLeaders = ssgLeadership.filter(m => m.id !== "tejal-iiic");

  return (
    <main className="min-h-screen pt-28 pb-28 bg-[#05020d] relative overflow-hidden text-text-primary selection:bg-brand-orange/30 selection:text-white">
      {/* Designer Ambient Lighting */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full bg-gradient-to-b from-brand-orange/[0.12] via-brand-magenta/[0.08] to-transparent blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute top-[35%] -left-32 w-[600px] h-[600px] rounded-full bg-brand-violet/[0.08] blur-[180px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute top-[65%] -right-32 w-[600px] h-[600px] rounded-full bg-brand-orange/[0.06] blur-[180px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle architectural background grid */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">
        
        {/* Navigation Breadcrumb */}
        <FadeUp delay={0}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-brand-orange" />
            <span>BACK TO HOME</span>
          </Link>
        </FadeUp>

        {/* Hero Header */}
        <FadeUp delay={0.06} distance={20}>
          <div className="max-w-4xl mb-12">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-brand-orange font-mono font-bold text-[11px] uppercase tracking-wider">
                HITAM STUDENT SELF GOVERNANCE
              </span>
              <span className="text-white/20 text-xs">•</span>
              <span className="text-[11px] font-mono tracking-wider text-text-muted uppercase">
                ESPARTO 2026
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[0.98] mb-5">
              THE ARCHITECTS OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#ff7347] to-brand-magenta">
                ESPARTO 2026
              </span>
            </h1>

            <p className="text-text-secondary text-base sm:text-lg font-body leading-relaxed max-w-2xl font-light">
              Meet the executive student directors, student deans, and faculty mentorship council orchestrating Hyderabad Institute of Technology and Management&apos;s flagship national technical festival.
            </p>

            {/* Quick Metrics Ribbon */}
            <div className="flex items-center gap-6 sm:gap-10 pt-8 mt-8 border-t border-white/10 flex-wrap">
              <div>
                <span className="font-display font-black text-2xl sm:text-3xl text-white block">10</span>
                <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider">Core Student Deans</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
              <div>
                <span className="font-display font-black text-2xl sm:text-3xl text-white block">2</span>
                <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider">Faculty Advisors</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
              <div>
                <span className="font-display font-black text-2xl sm:text-3xl text-white block">11</span>
                <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider">Technical Chapters</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
              <div>
                <span className="font-display font-black text-2xl sm:text-3xl text-brand-orange block">OCT 9–10</span>
                <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider">Festival Dates</span>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Refined Segmented Control Filter */}
        <FadeUp delay={0.1}>
          <div className="flex items-center p-1 rounded-2xl bg-[#0b061e] border border-white/10 w-fit mb-14 overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeFilter === "all"
                  ? "bg-gradient-to-r from-brand-orange to-brand-magenta text-white shadow-[0_0_20px_rgba(255,94,0,0.35)]"
                  : "text-text-muted hover:text-white"
              }`}
            >
              All Directory (23)
            </button>
            <button
              onClick={() => setActiveFilter("student-core")}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeFilter === "student-core"
                  ? "bg-gradient-to-r from-brand-orange to-brand-magenta text-white shadow-[0_0_20px_rgba(255,94,0,0.35)]"
                  : "text-text-muted hover:text-white"
              }`}
            >
              Student Core (10)
            </button>
            <button
              onClick={() => setActiveFilter("faculty")}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeFilter === "faculty"
                  ? "bg-gradient-to-r from-brand-orange to-brand-magenta text-white shadow-[0_0_20px_rgba(255,94,0,0.35)]"
                  : "text-text-muted hover:text-white"
              }`}
            >
              Faculty Mentors (2)
            </button>
            <button
              onClick={() => setActiveFilter("chapters")}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeFilter === "chapters"
                  ? "bg-gradient-to-r from-brand-orange to-brand-magenta text-white shadow-[0_0_20px_rgba(255,94,0,0.35)]"
                  : "text-text-muted hover:text-white"
              }`}
            >
              Chapters &amp; Clubs (11)
            </button>
          </div>
        </FadeUp>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 1: STUDENT ORGANIZING CORE
        ═══════════════════════════════════════════════════════════════════════ */}
        {(activeFilter === "all" || activeFilter === "student-core") && (
          <section className="mb-24">
            
            {/* Section Header */}
            <div className="flex items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange">
                  <Users2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-brand-orange font-bold block">
                    EXECUTIVE STUDENT GOVERNANCE
                  </span>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                    STUDENT ORGANIZING CORE
                  </h2>
                </div>
              </div>

              <span className="hidden sm:inline-block text-xs font-mono text-text-muted uppercase">
                10 Core Leadership Positions
              </span>
            </div>

            {/* Featured Lead Fest Organizer Card: Tejal */}
            {leadOrganizer && (
              <div className="relative mb-10 rounded-3xl bg-gradient-to-br from-[#12092b] via-[#09041a] to-[#040210] border border-brand-orange/40 shadow-[0_0_50px_rgba(255,94,0,0.12)] overflow-hidden group">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  
                  {/* Photo Studio Frame */}
                  <div className="lg:col-span-5 relative h-[360px] sm:h-[420px] lg:h-[460px] bg-gradient-to-b from-[#1b0c38] via-[#0e0622] to-[#070314] overflow-hidden flex items-end justify-center">
                    {/* Atmospheric radial studio spotlight behind cutout */}
                    <div className="absolute inset-0 bg-radial from-brand-orange/20 via-brand-magenta/15 to-transparent blur-2xl pointer-events-none" />
                    
                    {leadOrganizer.image ? (
                      <div className="relative w-full h-full flex items-end justify-center pt-6">
                        <Image
                          src={leadOrganizer.image}
                          alt={leadOrganizer.name}
                          width={450}
                          height={550}
                          className="object-contain object-bottom h-[92%] w-auto max-w-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-out group-hover:scale-105"
                          priority
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-3xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange mb-16">
                        <Sparkles className="w-12 h-12" />
                      </div>
                    )}

                    {/* Gradient fade to prevent harsh bottom cutoff */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#09041a] to-transparent pointer-events-none" />

                    {/* Floating pill badge on photo */}
                    <div className="absolute top-5 left-5">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-brand-orange/40 text-brand-orange font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-brand-orange" />
                        LEAD FEST ORGANIZER
                      </span>
                    </div>
                  </div>

                  {/* Editorial Text Content */}
                  <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-brand-magenta font-semibold">
                          Student Self Governance Council
                        </span>
                        <span className="text-white/20">•</span>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted">
                          Official Convener
                        </span>
                      </div>

                      <h3 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-2">
                        {leadOrganizer.name}
                      </h3>

                      <p className="text-sm sm:text-base font-mono text-text-secondary mb-6">
                        {leadOrganizer.role}
                      </p>

                      <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 mb-8 max-w-xl">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-brand-orange font-bold block mb-1.5 flex items-center gap-1.5">
                          <Handshake className="w-3.5 h-3.5" />
                          EVENT RESPONSIBILITY &amp; MANDATE
                        </span>
                        <p className="text-xs sm:text-sm font-body text-white/90 leading-relaxed font-light">
                          Directing overall festival vision, inter-wing alignment, administrative clearances, corporate industry partnerships, and flagship sponsorships for ESPARTO 2026.
                        </p>
                      </div>
                    </div>

                    {/* Official Contact Strip */}
                    <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/10">
                      {leadOrganizer.socials?.email && (
                        <a
                          href={`mailto:${leadOrganizer.socials.email}`}
                          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-orange/40 text-xs font-mono text-white transition-all group/btn"
                        >
                          <Mail className="w-4 h-4 text-brand-orange transition-transform group-hover/btn:scale-110" />
                          <span>{leadOrganizer.socials.email}</span>
                        </a>
                      )}
                      {leadOrganizer.contact && (
                        <a
                          href={`tel:${leadOrganizer.contact.replace(/\s+/g, '')}`}
                          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-mono text-emerald-400 transition-all group/btn"
                        >
                          <Phone className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                          <span>{leadOrganizer.contact}</span>
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Core Student Leaders Grid (9 Members with Official Photos) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {coreStudentLeaders.map((member) => (
                <div
                  key={member.id}
                  className="rounded-3xl bg-gradient-to-b from-[#0c0624] to-[#070316] border border-white/10 hover:border-white/20 transition-all duration-300 group overflow-hidden flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_35px_rgba(255,94,0,0.12)]"
                >
                  {/* Portrait Canvas */}
                  <div className="relative aspect-[4/5] bg-gradient-to-b from-[#180d36] via-[#0d0724] to-[#070316] overflow-hidden flex items-end justify-center">
                    
                    {/* Ambient spotlight behind cutout */}
                    <div className="absolute inset-0 bg-radial from-brand-orange/15 via-brand-violet/10 to-transparent blur-xl pointer-events-none" />

                    {/* Member Photo */}
                    {member.image ? (
                      <div className="relative w-full h-full flex items-end justify-center pt-4">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={380}
                          height={500}
                          className="object-contain object-bottom h-[94%] w-auto max-w-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted mb-12">
                        <Users2 className="w-8 h-8" />
                      </div>
                    )}

                    {/* Bottom Vignette */}
                    <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#070316] to-transparent pointer-events-none" />

                    {/* SSG Role Pill on top */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/90 font-bold uppercase tracking-wider truncate">
                        {member.role}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-brand-orange/70 shrink-0" />
                    </div>
                  </div>

                  {/* Information Base Card */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-display font-black text-2xl text-white tracking-tight group-hover:text-brand-orange transition-colors mb-2">
                        {member.name}
                      </h3>

                      {/* Event Handling Credit */}
                      {member.handling && (
                        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 mb-4">
                          <div className="flex items-center gap-1.5 mb-1 text-brand-orange">
                            {getHandlingIcon(member.handling)}
                            <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
                              HANDLING
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-white/90 leading-snug pl-5 font-body">
                            {member.handling}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Footer Contact Action */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      {member.socials?.email && (
                        <a
                          href={`mailto:${member.socials.email}`}
                          className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white transition-colors truncate max-w-full group/mail"
                        >
                          <Mail className="w-3.5 h-3.5 text-brand-orange shrink-0 group-hover/mail:scale-110 transition-transform" />
                          <span className="truncate">{member.socials.email}</span>
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Supporting Event Wings (Photography/Media & Collective Sponsorships) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#09051c] border border-white/10">
              <div className="flex items-center gap-2.5 mb-4">
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
                        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
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

          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 2: FACULTY COORDINATORS
        ═══════════════════════════════════════════════════════════════════════ */}
        {(activeFilter === "all" || activeFilter === "faculty") && (
          <section className="mb-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange">
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
                  className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c0628] via-[#08041d] to-[#040112] border border-white/10 hover:border-brand-orange/40 transition-all duration-300 group shadow-[0_4px_25px_rgba(0,0,0,0.3)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange group-hover:scale-105 transition-transform shrink-0">
                          <GraduationCap className="w-7 h-7" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-orange block">
                            {faculty.role}
                          </span>
                          <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                            {faculty.name}
                          </h3>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider shrink-0">
                        Faculty Mentor
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 mb-6">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted block font-semibold mb-0.5">
                        DEPARTMENT
                      </span>
                      <p className="text-xs font-mono text-white/90">
                        {faculty.department}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
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
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 3: STUDENT CHAPTERS & CLUBS
        ═══════════════════════════════════════════════════════════════════════ */}
        {(activeFilter === "all" || activeFilter === "chapters") && (
          <section className="mb-20">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                    EVENT HUBS &amp; CLUSTERS
                  </span>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                    STUDENT CHAPTERS &amp; CLUBS
                  </h2>
                </div>
              </div>

              <span className="hidden sm:inline-block text-xs font-mono text-text-muted uppercase">
                11 Active Technical Bodies
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {chapterCommittees.map((chapter) => (
                <div
                  key={chapter.id}
                  className="p-5 rounded-2xl bg-gradient-to-b from-[#0b0620] to-[#060314] border border-white/10 hover:border-cyan-400/40 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    {/* Chapter Logo Canvas */}
                    <div className="relative w-full h-32 rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden flex items-center justify-center mb-4 p-4 group-hover:border-cyan-400/30 transition-colors">
                      {chapter.image ? (
                        <Image
                          src={chapter.image}
                          alt={chapter.name}
                          width={140}
                          height={90}
                          className="object-contain max-h-20 w-auto filter contrast-105 group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <Cpu className="w-10 h-10 text-cyan-400/60" />
                      )}
                    </div>

                    <h3 className="font-display font-black text-lg text-white tracking-tight group-hover:text-cyan-400 transition-colors mb-1">
                      {chapter.name}
                    </h3>

                    <p className="text-xs font-mono text-text-muted mb-2">
                      {chapter.role}
                    </p>

                    <p className="text-[11px] font-body text-text-secondary leading-relaxed">
                      {chapter.department}
                    </p>
                  </div>

                  <div className="pt-3 mt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">
                      Organizing Partner
                    </span>
                    <ExternalLink className="w-3 h-3 text-text-muted group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </Container>
    </main>
  );
}
