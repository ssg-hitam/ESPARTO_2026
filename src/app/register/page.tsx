"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { FEST_EVENTS, EventCategoryType } from "@/data/events";
import { UNSTOP_ESPARTO_PASS_URL } from "@/lib/constants";
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  Ticket, 
  CheckCircle2, 
  Trophy, 
  Calendar, 
  Clock, 
  Users, 
  Search, 
  ShieldCheck, 
  ChevronRight
} from "lucide-react";

const CATEGORIES: { label: string; value: EventCategoryType }[] = [
  { label: "All Tracks", value: "All" },
  { label: "Hackathons", value: "Hackathon" },
  { label: "Workshops", value: "Workshop" },
  { label: "Challenges", value: "Challenge" },
  { label: "Ideathons", value: "Ideathon" },
  { label: "Coding & Gaming", value: "Gaming & Coding" },
];

export default function RegisterPage() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategoryType>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = useMemo(() => {
    return FEST_EVENTS.filter((event) => {
      const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
      const matchesSearch = 
        searchQuery.trim() === "" ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen pt-28 pb-24 bg-[#03010b] relative overflow-hidden text-text-primary">
      
      {/* Background Atmosphere Lighting */}
      <div 
        className="absolute top-16 left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full bg-gradient-to-b from-brand-orange/15 via-brand-magenta/10 to-transparent blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute top-[40%] right-0 w-[500px] h-[500px] rounded-full bg-brand-violet/10 blur-[180px] pointer-events-none"
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

        {/* Page Header */}
        <FadeUp delay={0.06} distance={20}>
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange font-mono font-bold text-[11px] uppercase tracking-wider">
                OFFICIAL REGISTRATION PORTAL
              </span>
              <span className="text-white/20 text-xs">/</span>
              <span className="text-[11px] font-mono tracking-wider text-text-muted">
                OCTOBER 09–10, 2026
              </span>
            </div>
            
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[1.05] mb-4">
              ESPARTO 2026 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">
                PASSES &amp; REGISTRATIONS
              </span>
            </h1>
            
            <p className="text-text-secondary text-sm sm:text-base font-body leading-relaxed">
              Secure your entry for Hyderabad Institute of Technology and Management&apos;s annual flagship technical fest.
              Get the <strong>Official 2-Day ESPARTO Pass</strong> for unrestricted access across all 15+ tracks, or register for individual competitions below.
            </p>
          </div>
        </FadeUp>

        {/* ═══════════════════════════════════════════════════════════════════════
            PRIMARY SPOTLIGHT CARD: THE OFFICIAL ESPARTO 2026 PASS (₹700)
        ═══════════════════════════════════════════════════════════════════════ */}
        <FadeUp delay={0.12} distance={30}>
          <div className="relative mb-20 p-1 rounded-3xl bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet shadow-[0_0_50px_rgba(255,94,0,0.25)]">
            <div className="relative rounded-[22px] bg-gradient-to-br from-[#12082b] via-[#09041a] to-[#040210] p-6 sm:p-10 lg:p-12 overflow-hidden">
              
              {/* Decorative Watermark & Cyber Grid */}
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 rounded-full bg-brand-orange/10 blur-[100px] pointer-events-none" />
              <div className="absolute right-8 bottom-6 font-display font-black text-[120px] sm:text-[180px] text-white/[0.02] select-none pointer-events-none leading-none">
                700
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left 7 Columns: Pass Details & Coverage */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange text-black font-display font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(255,94,0,0.5)]">
                      <Ticket className="w-3.5 h-3.5 fill-black" />
                      OFFICIAL ESPARTO 2026 PASS
                    </span>
                  </div>

                  {/* Main Pass Title */}
                  <div>
                    <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase leading-tight mb-2">
                      Overall 2-Day ESPARTO Pass
                    </h2>
                    <p className="text-text-secondary text-sm sm:text-base font-body leading-relaxed">
                      Attend <strong className="text-text-primary font-bold">ANY event, competition, keynote, and workshop</strong> across both Day 1 (Oct 9) &amp; Day 2 (Oct 10). With this pass, you don&apos;t need to register or pay separately for each event!
                    </p>
                  </div>

                  {/* Comprehensive Perks Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <strong className="text-white block font-medium">Universal Event Access</strong>
                        <span className="text-text-muted">Attend any of the 15+ technical tracks across both days</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <strong className="text-white block font-medium">Hackathon &amp; Challenges</strong>
                        <span className="text-text-muted">Eligible for 24h Hackathon, Webathon, Cadathon &amp; Coding</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <strong className="text-white block font-medium">Masterclasses &amp; Talks</strong>
                        <span className="text-text-muted">Direct entry to guest keynotes, workshops &amp; symposiums</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <strong className="text-white block font-medium">Verified Credentials</strong>
                        <span className="text-text-muted">Official Delegate Kit &amp; Certificate of Participation</span>
                      </div>
                    </div>
                  </div>

                  {/* Validity Info */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted pt-2 border-t border-white/10">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                      Valid: Oct 09 &amp; 10, 2026
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-magenta" />
                      Full Fest Hours (9:30 AM – 4:30 PM)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Official HITAM Fest ID Pass
                    </span>
                  </div>

                </div>

                {/* Right 5 Columns: Price Callout & Unstop Booking Button */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0522]/90 border border-brand-orange/30 shadow-[0_0_30px_rgba(255,94,0,0.15)] text-center space-y-6">
                    
                    {/* Price Header */}
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-brand-orange font-bold block mb-1">
                        ALL-INCLUSIVE PASS FEE
                      </span>
                      <div className="flex items-baseline justify-center gap-1.5">
                        <span className="font-display font-black text-5xl sm:text-6xl text-white tracking-tight">
                          ₹700
                        </span>
                        <span className="text-text-muted text-xs font-mono uppercase">
                          / Candidate
                        </span>
                      </div>
                      <p className="text-[11px] font-body text-text-muted mt-2">
                        Covers both days. No hidden charges or separate per-event fees required.
                      </p>
                    </div>

                    {/* Primary Button to Unstop */}
                    <div>
                      <a
                        href={UNSTOP_ESPARTO_PASS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-5 rounded-full font-display font-black text-sm sm:text-base tracking-widest uppercase text-white bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-purple shadow-[0_0_25px_rgba(255,94,0,0.45)] hover:shadow-[0_0_40px_rgba(255,0,122,0.65)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
                      >
                        <Ticket className="w-5 h-5 text-white transition-transform group-hover:rotate-12" />
                        <span>BOOK PASS ON UNSTOP</span>
                        <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>

                    {/* Trust Footnote */}
                    <div className="space-y-1.5 text-[11px] font-mono text-text-muted">
                      <p className="flex items-center justify-center gap-1 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Hosted on Unstop Official Platform</span>
                      </p>
                      <p className="text-white/40">
                        Instant digital pass confirmation to your registered email
                      </p>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div>
        </FadeUp>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION 2: EXPLORE EVENTS & INDIVIDUAL TRACK REGISTRATIONS
        ═══════════════════════════════════════════════════════════════════════ */}
        <div id="events-tracks" className="pt-6">
          
          {/* Section Sub-header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-magenta">
                  OR REGISTER BY SPECIFIC TRACK
                </span>
                <span className="text-white/20 text-xs">/</span>
                <span className="text-xs font-mono text-text-muted">
                  15 VERIFIED EVENTS
                </span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight uppercase">
                EXPLORE EVENTS &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">TRACK REGISTRATIONS</span>
              </h2>
              <p className="text-text-secondary text-xs sm:text-sm font-body mt-1 max-w-2xl">
                Prefer to participate in a specific hackathon, robotics battle, or workshop only? 
                Individual track registrations are powered through Unstop.
              </p>
            </div>

            {/* Note badge */}
            <div className="shrink-0 p-3 rounded-xl bg-white/[0.03] border border-white/10 max-w-xs text-[11px] font-mono text-text-muted">
              <strong className="text-white block font-bold mb-0.5">📌 Track-Wise Unstop Links</strong>
              Individual event links will be integrated here shortly. For unrestricted access to all 15 tracks, choose the ₹700 pass above!
            </div>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-brand-orange to-brand-magenta text-white font-bold shadow-[0_0_15px_rgba(255,94,0,0.4)]"
                        : "bg-white/[0.04] text-text-secondary hover:text-white hover:bg-white/[0.08] border border-white/5"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search event or club..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#08041d] border border-white/10 text-white placeholder:text-text-muted font-mono text-xs focus:outline-none focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta transition-all"
              />
            </div>

          </div>

          {/* Event Cards Grid (Starting 6 Tracks) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {filteredEvents.slice(0, 6).map((event) => (
              <div
                key={event.id}
                className="flex flex-col justify-between p-5 rounded-2xl border border-white/10 bg-[#08041d]/80 hover:border-brand-violet/50 hover:bg-[#0c0628] transition-all duration-300 group"
              >
                <div>
                  {/* Top Row: Category + Club Avatar */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-brand-violet/20 border border-brand-violet/30 text-brand-violet">
                      {event.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-text-muted truncate max-w-[130px]">
                        {event.club}
                      </span>
                      <div className="relative w-5 h-5 rounded-full bg-white p-0.5 shrink-0 overflow-hidden">
                        <Image
                          src={event.clubLogo}
                          alt={event.club}
                          width={20}
                          height={20}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-orange transition-colors leading-snug mb-1.5">
                    {event.title}
                  </h3>
                  <p className="text-text-secondary text-xs font-body line-clamp-2 leading-relaxed mb-4">
                    {event.tagline}
                  </p>

                  {/* Key Metadata Pills */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-text-muted mb-4 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                      <span className="truncate">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-brand-magenta shrink-0" />
                      <span className="truncate">{event.teamSize}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2 text-brand-orange font-bold">
                      <Trophy className="w-3.5 h-3.5 shrink-0" />
                      <span>Prize: {event.prizePool}</span>
                    </div>
                  </div>
                </div>

                {/* Individual Action / Registration */}
                <div className="pt-2">
                  {event.unstopUrl ? (
                    <a
                      href={event.unstopUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-orange to-brand-magenta hover:brightness-110 transition-all"
                    >
                      <span>REGISTER ON UNSTOP</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      href={`/events?event=${event.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-white bg-white/5 hover:bg-brand-violet/20 border border-white/10 hover:border-brand-violet/40 transition-all"
                    >
                      <span>EXPLORE EVENT DETAILS</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>

              </div>
            ))}
          </div>

          {/* Bottom Callout to Full Event Directory */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0a0524] to-[#040212] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-black text-xl text-white uppercase tracking-tight mb-1">
                NEED FULL EVENT RULES, ROUNDS &amp; COORDINATORS?
              </h3>
              <p className="text-text-secondary text-xs sm:text-sm font-body">
                Visit our official 15-event directory with comprehensive round guidelines, schedule breakdowns, and contact contacts.
              </p>
            </div>
            <Link
              href="/events"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-xs uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
            >
              <span>VIEW FULL EVENT DIRECTORY</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </Container>
    </main>
  );
}
