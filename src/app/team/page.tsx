import React from "react";
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
  ExternalLink,
  Instagram
} from "lucide-react";
import { FEST_INFO } from "@/lib/constants";
import { 
  facultyCoordinators, 
  ssgLeadership, 
  chapterCommittees,
  eventSupportWings 
} from "@/data/team";

export default function TeamPage() {
  const getHandlingIcon = (text?: string) => {
    if (!text) return <Layers className="w-3.5 h-3.5 text-brand-orange" />;
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
    <main className="min-h-screen pt-6 sm:pt-8 pb-28 bg-[#05020d] relative overflow-hidden text-text-primary selection:bg-brand-orange/30 selection:text-white">
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
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-brand-orange" />
            <span>BACK TO HOME</span>
          </Link>
        </FadeUp>

        {/* Hero Header */}
        <FadeUp delay={0.06} distance={20}>
          <div className="max-w-4xl mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono tracking-wider text-brand-orange uppercase font-bold">
                ESPARTO 2026
              </span>
              {FEST_INFO.officialLinks.instagram && (
                <>
                  <span className="text-white/20 text-xs">•</span>
                  <a
                    href={FEST_INFO.officialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-400 text-[11px] font-mono transition-all"
                    title="Official ESPARTO Instagram (@esparto_hitam)"
                  >
                    <Instagram className="w-3 h-3" />
                    <span>@esparto_hitam</span>
                  </a>
                </>
              )}
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[0.98] mb-5">
              THE ARCHITECTS OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#ff7347] to-brand-magenta">
                ESPARTO 2026
              </span>
            </h1>

            <p className="text-text-secondary text-base sm:text-lg font-body leading-relaxed max-w-2xl font-light">
              Meet the faculty coordinators, executive student directors, student deans, and technical chapter core teams driving Hyderabad Institute of Technology and Management&apos;s flagship national technical festival.
            </p>
          </div>
        </FadeUp>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 1: FACULTY COORDINATORS (COMES FIRST)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="mb-24">
          <div className="flex items-center justify-between gap-4 mb-10 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange shrink-0">
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
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {facultyCoordinators.map((faculty) => (
              <div
                key={faculty.id}
                className="relative rounded-3xl bg-gradient-to-br from-[#0e072b] via-[#08041c] to-[#040110] border border-white/10 hover:border-brand-orange/40 transition-all duration-300 group shadow-[0_4px_30px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col sm:flex-row"
              >
                {/* Faculty Photo Frame - Uniform Grounded Alignment */}
                <div className="relative w-full sm:w-52 h-72 sm:h-auto sm:min-h-[280px] bg-gradient-to-b from-[#180a33] via-[#0d0520] to-[#070214] overflow-hidden flex items-end justify-center shrink-0 border-b sm:border-b-0 sm:border-r border-white/10 group-hover:border-brand-orange/30 transition-colors">
                  <div className="absolute inset-0 bg-radial from-brand-orange/20 via-brand-magenta/10 to-transparent blur-2xl pointer-events-none" />

                  <div className="relative w-full h-[95%] flex items-end justify-center z-10 pt-3">
                    {faculty.image ? (
                      <Image
                        src={faculty.image}
                        alt={faculty.name}
                        width={260}
                        height={320}
                        className="object-contain max-h-full w-auto object-bottom filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                        priority
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange mb-8">
                        <GraduationCap className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Details & Actions */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-md bg-brand-orange/10 border border-brand-orange/30 text-brand-orange font-mono text-[10px] font-bold uppercase tracking-wider">
                        Faculty Coordinator
                      </span>
                    </div>

                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight group-hover:text-brand-orange transition-colors">
                      {faculty.name}
                    </h3>

                    <p className="text-xs sm:text-sm font-mono text-brand-orange/90 font-semibold mt-1">
                      {faculty.role}
                    </p>

                    <p className="text-xs sm:text-sm font-mono text-text-secondary mt-1 leading-relaxed">
                      {faculty.department}
                    </p>
                    {faculty.affiliation && (
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{faculty.affiliation}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2.5 pt-5 border-t border-white/10 mt-6">
                    {faculty.socials?.email && (
                      <a
                        href={`mailto:${faculty.socials.email}`}
                        className="inline-flex items-center gap-2.5 text-xs font-mono text-text-secondary hover:text-white transition-colors group/link"
                      >
                        <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-orange group-hover/link:border-brand-orange/50 transition-colors shrink-0">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <span className="truncate">{faculty.socials.email}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 2: STUDENT ORGANIZING CORE
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="mb-24">
          
          {/* Section Header */}
          <div className="flex items-center justify-between gap-4 mb-10 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange shrink-0">
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

            {FEST_INFO.officialLinks.ssgInstagram && (
              <div className="flex items-center gap-3">
                <a
                  href={FEST_INFO.officialLinks.ssgInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-400 text-xs font-mono transition-all group/ssg"
                  aria-label="SSG HITAM Instagram"
                  title="Follow SSG HITAM (@ssg_hitam)"
                >
                  <Instagram className="w-3.5 h-3.5 transition-transform group-hover/ssg:scale-110" />
                  <span className="hidden sm:inline">@ssg_hitam</span>
                </a>
              </div>
            )}
          </div>

          {/* Featured First: Tejal (Student Dean — IIIC & Lead Fest Organizer) */}
          {leadOrganizer && (
            <div className="relative mb-10 rounded-3xl bg-gradient-to-br from-[#12092b] via-[#09041a] to-[#040210] border border-brand-orange/40 shadow-[0_0_50px_rgba(255,94,0,0.12)] overflow-hidden group">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">

                {/* Photo Studio Frame - Enlarged, Grounded & Prominent */}
                <div className="lg:col-span-5 relative h-[420px] sm:h-[460px] lg:h-[480px] bg-gradient-to-b from-[#1b0c38] via-[#0e0622] to-[#070314] overflow-hidden flex items-end justify-center">
                  {/* Studio radial backlight glow */}
                  <div className="absolute inset-0 bg-radial from-brand-orange/25 via-brand-magenta/15 to-transparent blur-3xl pointer-events-none" />

                  {/* Floating pill badge on photo */}
                  <div className="absolute top-5 left-5 z-20">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-brand-orange/40 text-brand-orange font-mono text-[10px] font-bold uppercase tracking-wider shadow-lg">
                      LEAD FEST ORGANIZER
                    </span>
                  </div>

                  {/* Large Prominent Photo */}
                  <div className="relative w-full h-[95%] flex items-end justify-center z-10 pt-4">
                    {leadOrganizer.image ? (
                      <Image
                        src={leadOrganizer.image}
                        alt={leadOrganizer.name}
                        width={480}
                        height={600}
                        className="object-contain object-bottom h-full w-auto max-w-full filter drop-shadow-[0_18px_35px_rgba(0,0,0,0.85)] transition-transform duration-700 ease-out group-hover:scale-105"
                        priority
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange mb-12">
                        <Users2 className="w-10 h-10" />
                      </div>
                    )}
                  </div>

                  {/* Smooth bottom gradient fade */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#09041a] via-[#09041a]/60 to-transparent pointer-events-none z-10" />
                </div>

                {/* Editorial Content */}
                <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-brand-magenta font-semibold">
                        Student Self Governance
                      </span>
                      <span className="text-white/20">•</span>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted">
                        Lead Organizer
                      </span>
                    </div>

                    <h3 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-2">
                      {leadOrganizer.name}
                    </h3>

                    <p className="text-sm sm:text-base font-mono text-text-secondary mb-6">
                      {leadOrganizer.role}
                    </p>

                    {leadOrganizer.handling && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 mb-8 max-w-xl flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5 text-brand-orange">
                          <Handshake className="w-4 h-4" />
                        </div>
                        <p className="text-xs sm:text-sm font-body text-white/90 leading-relaxed font-light">
                          {leadOrganizer.handling}
                        </p>
                      </div>
                    )}
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

          {/* Unified Core Student Leaders Grid (Large, Grounded, Prominent Portraits) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {coreStudentLeaders.map((member) => (
              <div
                key={member.id}
                className="rounded-3xl bg-gradient-to-b from-[#0e0728] via-[#09041d] to-[#050212] border border-white/10 hover:border-brand-orange/40 transition-all duration-300 group overflow-hidden flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_35px_rgba(255,94,0,0.18)]"
              >
                {/* Large Grounded Portrait Canvas */}
                <div className="relative w-full h-[380px] sm:h-[420px] bg-gradient-to-b from-[#180d38] via-[#0e0728] to-[#070318] overflow-hidden flex items-end justify-center">

                  {/* Studio ambient backlight glow */}
                  <div className="absolute inset-0 bg-radial from-brand-orange/18 via-brand-magenta/10 to-transparent blur-2xl pointer-events-none" />

                  {/* Role Pill Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-20">
                    <span className="px-3 py-1 rounded-full backdrop-blur-md border border-white/15 bg-black/70 text-white/90 text-[10px] font-mono font-bold uppercase tracking-wider truncate shadow-md">
                      {member.role}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-brand-orange/80 shrink-0 shadow-[0_0_8px_#ff5e00]" />
                  </div>

                  {/* Enlarged Prominent Portrait */}
                  {member.image ? (
                    <div className="relative w-full h-[95%] flex items-end justify-center z-10 pt-4 px-2">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={440}
                        height={600}
                        className="object-contain object-bottom h-full w-auto max-w-full filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted mb-12">
                      <Users2 className="w-8 h-8" />
                    </div>
                  )}

                  {/* Bottom Vignette to blend cutout base smoothly into card */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#09041a] via-[#09041a]/60 to-transparent pointer-events-none z-10" />
                </div>

                {/* Content Base Card */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow bg-[#09041a]/80">
                  <div>
                    <h3 className="font-display font-black text-2xl text-white tracking-tight group-hover:text-brand-orange transition-colors mb-2.5">
                      {member.name}
                    </h3>

                    {/* Responsibility Text */}
                    {member.handling && (
                      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 mb-4 flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5 text-brand-orange">
                          {getHandlingIcon(member.handling)}
                        </div>
                        <p className="text-xs sm:text-sm font-body text-white/90 leading-snug font-medium">
                          {member.handling}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Contact Action Footer */}
                  <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
                    {member.socials?.email && (
                      <a
                        href={`mailto:${member.socials.email}`}
                        className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white transition-colors truncate max-w-full group/mail"
                      >
                        <Mail className="w-3.5 h-3.5 text-brand-orange shrink-0 group-hover/mail:scale-110 transition-transform" />
                        <span className="truncate">{member.socials.email}</span>
                      </a>
                    )}
                    {member.contact && (
                      <a
                        href={`tel:${member.contact.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono transition-colors shrink-0"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{member.contact}</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 3: SUPPORTING OPERATIONAL TEAMS (REDESIGNED)
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="mb-24">
          <div className="flex items-center justify-between gap-4 mb-10 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                  COLLECTIVE DIVISIONS
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  SUPPORTING FEST WINGS
                </h2>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eventSupportWings.map((wing) => (
              <div
                key={wing.id}
                className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c0628] via-[#08041d] to-[#040112] border border-white/10 hover:border-cyan-400/40 transition-all duration-300 group shadow-[0_4px_25px_rgba(0,0,0,0.3)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                      {wing.role}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 text-cyan-400 group-hover:scale-110 transition-transform">
                      {getHandlingIcon(wing.name)}
                    </div>
                  </div>

                  <h3 className="font-display font-black text-2xl text-white tracking-tight mb-2">
                    {wing.name}
                  </h3>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 mb-4">
                    <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider font-semibold">
                      LEAD:
                    </span>
                    <span className="text-xs font-mono text-brand-orange font-bold">
                      {wing.lead}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-body text-text-secondary leading-relaxed font-light">
                    {wing.handling}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 4: STUDENT CHAPTERS & CLUBS
        ═══════════════════════════════════════════════════════════════════════ */}
        <section className="mb-20">
          <div className="flex items-center justify-between gap-4 mb-10 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
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
                  {chapter.socials?.instagram ? (
                    <a
                      href={chapter.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-400 hover:text-pink-300 flex items-center justify-center transition-all group/insta"
                      aria-label={`${chapter.name} Instagram`}
                      title="Instagram"
                    >
                      <Instagram className="w-3.5 h-3.5 transition-transform group-hover/insta:scale-110" />
                    </a>
                  ) : (
                    <ExternalLink className="w-3 h-3 text-text-muted group-hover:text-white transition-colors" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

      </Container>
    </main>
  );
}
