"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { FEST_EVENTS, EventCategoryType, getEventRegisterUrl } from "@/data/events";
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Trophy, 
  Calendar, 
  Clock, 
  Users, 
  Search, 
  ShieldCheck, 
  ChevronRight,
  Sparkles
} from "lucide-react";

const CATEGORIES: { label: string; value: EventCategoryType }[] = [
  { label: "All Tracks", value: "All" },
  { label: "Hackathons", value: "Hackathon" },
  { label: "Workshops", value: "Workshop" },
  { label: "Challenges", value: "Challenge" },
  { label: "Ideathons", value: "Ideathon" },
  { label: "Coding & Gaming", value: "Gaming & Coding" },
];

function RegisterContent() {
  const searchParams = useSearchParams();
  const initialEventQuery = searchParams.get("event") || "";

  const [selectedCategory, setSelectedCategory] = useState<EventCategoryType>("All");
  const [searchQuery, setSearchQuery] = useState(initialEventQuery);

  const filteredEvents = useMemo(() => {
    return FEST_EVENTS.filter((event) => {
      const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
      const matchesSearch = 
        searchQuery.trim() === "" ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen pt-6 sm:pt-8 pb-24 bg-[#03010b] relative overflow-hidden text-text-primary">
      
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
          <div className="max-w-3xl mb-8">
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
                EVENT REGISTRATIONS
              </span>
            </h1>
            
            <p className="text-text-secondary text-sm sm:text-base font-body leading-relaxed max-w-2xl">
              Secure your entry for Hyderabad Institute of Technology and Management&apos;s annual flagship technical fest.
              Register directly for individual hackathons, workshops, competitions, and technical challenges below.
            </p>
          </div>
        </FadeUp>

        {/* Registration Value Pillars */}
        <FadeUp delay={0.1} distance={20}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-orange/10 via-[#0a0520] to-[#08041d] border border-brand-orange/20 relative overflow-hidden group hover:border-brand-orange/40 transition-all">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center text-brand-orange shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                    15+ Verified Tracks
                  </h3>
                  <span className="text-[10px] font-mono text-brand-orange">October 09–10, 2026</span>
                </div>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed font-body">
                Participate in national hackathons, CAD modeling, autonomous robotics, AI development, ideathons, and keynote masterclasses.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-magenta/10 via-[#0a0520] to-[#08041d] border border-brand-magenta/20 relative overflow-hidden group hover:border-brand-magenta/40 transition-all">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-magenta/20 border border-brand-magenta/30 flex items-center justify-center text-brand-magenta shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                    ₹90,000+ Prize Pool
                  </h3>
                  <span className="text-[10px] font-mono text-brand-magenta">Cash Rewards &amp; Trophies</span>
                </div>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed font-body">
                Compete against elite technical talent from top colleges across India. Winners receive cash prizes, trophies, and incubation fast-tracking.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-violet/10 via-[#0a0520] to-[#08041d] border border-brand-violet/20 relative overflow-hidden group hover:border-brand-violet/40 transition-all">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-violet/20 border border-brand-violet/30 flex items-center justify-center text-brand-violet shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                    Official Credentials
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400">Verified Certificates</span>
                </div>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed font-body">
                All registered candidates receive official HITAM ESPARTO 2026 participation credentials, event ID badges, and delegate kits.
              </p>
            </div>
          </div>
        </FadeUp>

        {/* ═══════════════════════════════════════════════════════════════════════
            SECTION: EXPLORE EVENTS & INDIVIDUAL TRACK REGISTRATIONS
        ═══════════════════════════════════════════════════════════════════════ */}
        <div id="events-tracks" className="pt-2">
          
          {/* Section Sub-header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-magenta">
                  PER-EVENT REGISTRATION
                </span>
                <span className="text-white/20 text-xs">/</span>
                <span className="text-xs font-mono text-text-muted">
                  15 VERIFIED COMPETITIONS
                </span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight uppercase">
                SELECT EVENT &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">REGISTER NOW</span>
              </h2>
              <p className="text-text-secondary text-xs sm:text-sm font-body mt-1 max-w-2xl">
                Choose any hackathon, robotics challenge, workshop, or gaming tournament below to register directly with your team.
              </p>
            </div>

            {/* Note badge */}
            <div className="shrink-0 p-3 rounded-xl bg-white/[0.03] border border-white/10 max-w-xs text-[11px] font-mono text-text-muted">
              <strong className="text-white block font-bold mb-0.5">📌 Direct Event Registration</strong>
              Select any event card below to register directly on Unstop or view the complete event guidelines.
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
                placeholder="Search event, club, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#08041d] border border-white/10 text-white placeholder:text-text-muted font-mono text-xs focus:outline-none focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta transition-all"
              />
            </div>

          </div>

          {/* Event Counter & Reset */}
          <div className="flex items-center justify-between text-xs font-mono text-text-muted mb-6">
            <span>Showing <strong className="text-white">{filteredEvents.length}</strong> of {FEST_EVENTS.length} Events</span>
            {(selectedCategory !== "All" || searchQuery.trim() !== "") && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="text-brand-orange hover:underline text-[11px]"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Event Cards Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col justify-between p-5 rounded-2xl border border-white/10 bg-[#08041d]/85 hover:border-brand-violet/50 hover:bg-[#0c0628] transition-all duration-300 group"
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
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-text-muted mb-3 pt-3 border-t border-white/5">
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
                        <span>🏆 Prize Pool: {event.prizePool}</span>
                      </div>
                    </div>

                    {/* Registration Fee Breakdown */}
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-text-muted mb-4 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white/60">🎟️ HITAM Students:</span>
                        <span className="text-emerald-400 font-semibold">{event.registrationFee.hitam}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60">🎟️ Other Colleges:</span>
                        <span className="text-brand-orange font-semibold">{event.registrationFee.nonHitam}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                    <a
                      href={getEventRegisterUrl(event)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-orange to-brand-magenta hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,94,0,0.25)]"
                    >
                      <span>🎟️ REGISTER NOW</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    {event.unstopUrl && (
                      <a
                        href={event.unstopUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-mono text-[11px] uppercase tracking-wider text-text-secondary hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                      >
                        <span>REGISTER VIA UNSTOP</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}

                    <Link
                      href={`/events?event=${event.slug}`}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl font-mono text-[11px] uppercase tracking-wider text-text-secondary hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-center"
                    >
                      <span>VIEW FULL ROUNDS &amp; RULES</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 rounded-2xl bg-white/[0.02] border border-white/10 mb-14">
              <Search className="w-10 h-10 text-text-muted mx-auto mb-3 opacity-40" />
              <h3 className="font-display font-bold text-lg text-white mb-1">No matching events found</h3>
              <p className="text-text-muted text-xs font-body max-w-sm mx-auto mb-4">
                No events matched your current category or search query. Try adjusting your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Bottom Callout to Full Event Directory */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0a0524] to-[#040212] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-black text-xl text-white uppercase tracking-tight mb-1">
                NEED FULL EVENT RULES, ROUNDS &amp; COORDINATORS?
              </h3>
              <p className="text-text-secondary text-xs sm:text-sm font-body">
                Visit our official 15-event directory with comprehensive round guidelines, schedule breakdowns, and student coordinators.
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

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#03010b] flex items-center justify-center text-text-muted font-mono text-xs">
        Loading ESPARTO 2026 Registrations...
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}
