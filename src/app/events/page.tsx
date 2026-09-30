"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { FEST_EVENTS, FestEventItem, EventCategoryType } from "@/data/events";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Search, 
  Calendar, 
  Clock, 
  Users, 
  Trophy, 
  CheckCircle2, 
  X, 
  Sparkles,
  Filter
} from "lucide-react";

const CATEGORIES: EventCategoryType[] = [
  "All",
  "Hackathon",
  "Ideathon",
  "Challenge",
  "Workshop",
  "Gaming & Coding"
];

const DAYS = [
  { label: "All Days", value: "all" },
  { label: "Day 1 (Oct 9)", value: "1" },
  { label: "Day 2 (Oct 10)", value: "2" },
  { label: "Both Days", value: "both" },
];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategoryType>("All");
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalEvent, setActiveModalEvent] = useState<FestEventItem | null>(null);

  // Filter events based on active category, day, and search query
  const filteredEvents = useMemo(() => {
    return FEST_EVENTS.filter((ev) => {
      // Category filter
      if (selectedCategory !== "All" && ev.category !== selectedCategory) {
        return false;
      }

      // Day filter
      if (selectedDay === "1" && ev.dayNumber !== 1 && ev.dayNumber !== 0) {
        return false;
      }
      if (selectedDay === "2" && ev.dayNumber !== 2 && ev.dayNumber !== 0) {
        return false;
      }
      if (selectedDay === "both" && ev.dayNumber !== 0) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesTitle = ev.title.toLowerCase().includes(query);
        const matchesClub = ev.club.toLowerCase().includes(query);
        const matchesDesc = ev.description.toLowerCase().includes(query);
        const matchesTagline = ev.tagline.toLowerCase().includes(query);
        if (!matchesTitle && !matchesClub && !matchesDesc && !matchesTagline) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedDay, searchQuery]);

  return (
    <main className="min-h-screen pt-28 sm:pt-32 pb-24 bg-[#040210] relative overflow-hidden">
      
      {/* Ambient Lighting Gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-brand-purple/10 blur-[170px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-brand-magenta/[0.08] blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">
        
        {/* Navigation Breadcrumb */}
        <FadeUp delay={0}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>BACK TO HOME</span>
          </Link>
        </FadeUp>

        {/* Hero Header */}
        <FadeUp delay={0.06} distance={30}>
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/25 text-brand-orange text-xs font-mono tracking-wider uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Festival Schedule</span>
            </div>
            <h1 className="font-display font-black text-3xl xs:text-4xl sm:text-6xl text-text-primary tracking-tight leading-[1.05] uppercase mb-5">
              ALL EVENTS &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">
                COMPETITIONS
              </span>
            </h1>
            <p className="text-text-secondary text-sm sm:text-base lg:text-lg font-body leading-relaxed border-l-2 border-brand-magenta/40 pl-4 sm:pl-5">
              15 official competitions, hackathons, and technical workshops organized by all 11 technical chapters across two days of intense engineering.
            </p>
          </div>
        </FadeUp>

        {/* Key Metrics Summary Bar */}
        <FadeUp delay={0.1} distance={25}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10 p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#08041d]/80 backdrop-blur-md">
            <div className="p-3 border-r border-white/10 last:border-none">
              <p className="text-xs font-mono text-text-tertiary uppercase tracking-wider mb-1">Total Events</p>
              <p className="font-display font-black text-2xl sm:text-3xl text-white">15 Tracks</p>
              <p className="text-[11px] text-text-muted">Competitions &amp; Labs</p>
            </div>
            <div className="p-3 border-r border-white/10 last:border-none">
              <p className="text-xs font-mono text-text-tertiary uppercase tracking-wider mb-1">Cash Prize Pool</p>
              <p className="font-display font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-brand-orange">₹90,000+</p>
              <p className="text-[11px] text-text-muted">Cash Awards &amp; Perks</p>
            </div>
            <div className="p-3 border-r border-white/10 last:border-none">
              <p className="text-xs font-mono text-text-tertiary uppercase tracking-wider mb-1">Organisers</p>
              <p className="font-display font-black text-2xl sm:text-3xl text-white">11 Bodies</p>
              <p className="text-[11px] text-text-muted">Clubs &amp; IEEE / CSI / GDG</p>
            </div>
            <div className="p-3">
              <p className="text-xs font-mono text-text-tertiary uppercase tracking-wider mb-1">Fest Dates</p>
              <p className="font-display font-black text-2xl sm:text-3xl text-white">OCT 9 &amp; 10</p>
              <p className="text-[11px] text-text-muted">9:30 AM – 4:30 PM</p>
            </div>
          </div>
        </FadeUp>

        {/* Search & Filtering Controls */}
        <FadeUp delay={0.14} distance={20}>
          <div className="flex flex-col gap-4 mb-10">
            
            {/* Search Input Bar */}
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search events by title, chapter, technology (e.g. Kaggle, Robot, AI, Kart)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-xl border border-white/15 bg-white/[0.03] text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-magenta/60 focus:bg-white/[0.05] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white p-1"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Tabs & Day Selector */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                      selectedCategory === cat
                        ? "bg-brand-magenta text-white shadow-[0_0_16px_rgba(255,0,122,0.35)]"
                        : "bg-white/[0.04] text-text-secondary hover:bg-white/[0.08] hover:text-white border border-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Day Filter Chips */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-xs font-mono text-text-tertiary uppercase mr-1 hidden sm:inline">Day:</span>
                {DAYS.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setSelectedDay(d.value)}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-all duration-200 ${
                      selectedDay === d.value
                        ? "bg-brand-violet text-white font-bold"
                        : "bg-white/[0.03] text-text-muted hover:text-white border border-white/10"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

            </div>

            {/* Result Count Indicator */}
            <div className="flex items-center justify-between text-xs font-mono text-text-tertiary px-1">
              <span>
                SHOWING <strong className="text-white">{filteredEvents.length}</strong> OF {FEST_EVENTS.length} EVENTS
              </span>
              {(selectedCategory !== "All" || selectedDay !== "all" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedDay("all");
                    setSearchQuery("");
                  }}
                  className="text-brand-magenta hover:underline cursor-pointer"
                >
                  Reset all filters
                </button>
              )}
            </div>

          </div>
        </FadeUp>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredEvents.map((event, i) => (
              <FadeUp key={event.id} delay={0.04 * (i % 6)} distance={25}>
                <div 
                  className={`group relative flex flex-col justify-between h-full p-6 rounded-3xl border bg-[#08041d]/85 backdrop-blur-md transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)] ${
                    event.featured 
                      ? "border-brand-magenta/40 hover:border-brand-magenta shadow-[0_0_24px_rgba(255,0,122,0.12)]" 
                      : "border-white/10 hover:border-brand-violet/40 hover:shadow-[0_0_20px_rgba(121,80,242,0.12)]"
                  }`}
                >
                  
                  {/* Top Row: Club Emblem & Category Tag */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      
                      {/* Chapter Pill */}
                      <div className="flex items-center gap-2 max-w-[65%]">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 border border-white/15 bg-white">
                          <Image
                            src={event.clubLogo}
                            alt={event.club}
                            fill
                            className="object-contain p-0.5"
                          />
                        </div>
                        <span className="font-display font-bold text-xs text-text-secondary truncate">
                          {event.club}
                        </span>
                      </div>

                      {/* Category Badge */}
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shrink-0 ${
                        event.category === "Hackathon"
                          ? "text-brand-orange bg-brand-orange/10 border-brand-orange/30"
                          : event.category === "Ideathon"
                          ? "text-brand-magenta bg-brand-magenta/10 border-brand-magenta/30"
                          : event.category === "Workshop"
                          ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/30"
                          : event.category === "Gaming & Coding"
                          ? "text-purple-400 bg-purple-400/10 border-purple-400/30"
                          : "text-cyan-400 bg-cyan-400/10 border-cyan-400/30"
                      }`}>
                        {event.category}
                      </span>
                    </div>

                    {/* Prize Pool Spotlight Pill */}
                    {event.prizePool && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500/15 to-brand-orange/15 border border-amber-500/30 text-amber-300 text-xs font-display font-extrabold mb-3">
                        <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Prize Pool: {event.prizePool}</span>
                      </div>
                    )}

                    {/* Event Title */}
                    <h2 className="font-display font-black text-xl sm:text-2xl text-text-primary tracking-tight leading-snug group-hover:text-white transition-colors mb-2">
                      {event.title}
                    </h2>

                    {/* Tagline */}
                    <p className="text-xs font-body font-medium text-brand-magenta mb-3 leading-relaxed">
                      {event.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-text-secondary font-body leading-relaxed line-clamp-3 mb-4">
                      {event.description}
                    </p>

                    {/* Highlights Bullet Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {event.highlights.slice(0, 3).map((h) => (
                        <span 
                          key={h} 
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-text-muted bg-white/[0.03] border border-white/10 px-2 py-0.5 rounded-md"
                        >
                          <CheckCircle2 className="w-3 h-3 text-brand-orange shrink-0" />
                          <span>{h}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Logistics & Actions */}
                  <div className="space-y-3 mt-auto pt-4 border-t border-white/5">
                    {/* Key Registration Meta (Date, Time, Team Size) */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-text-muted">
                      <div className="flex items-center gap-1.5 truncate">
                        <Calendar className="w-3.5 h-3.5 text-brand-magenta shrink-0" />
                        <span className="truncate">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{event.teamSize}</span>
                      </div>
                      <div className="col-span-2 flex items-center gap-1.5 truncate text-[11px] text-text-muted">
                        <Clock className="w-3.5 h-3.5 text-brand-violet shrink-0" />
                        <span className="truncate">{event.timings}</span>
                      </div>
                    </div>

                    {/* Registration Fee Breakdown Box */}
                    <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col gap-1 text-xs font-mono">
                      <div className="flex items-center justify-between">
                        <span className="text-text-tertiary">HITAM Fee:</span>
                        <span className="text-text-primary font-bold">{event.registrationFee.hitam}</span>
                      </div>
                      {event.registrationFee.nonHitam && event.registrationFee.nonHitam !== event.registrationFee.hitam && (
                        <div className="flex items-center justify-between border-t border-white/5 pt-1">
                          <span className="text-text-tertiary">Outside Fee:</span>
                          <span className="text-brand-magenta font-semibold">{event.registrationFee.nonHitam}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => setActiveModalEvent(event)}
                        className="flex-1 py-2 px-3 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 text-xs font-display font-bold text-text-primary transition-all text-center cursor-pointer"
                      >
                        View Details
                      </button>

                      <Link
                        href={`/register?event=${event.slug}`}
                        className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-magenta hover:brightness-110 text-xs font-display font-bold text-white transition-all text-center inline-flex items-center justify-center gap-1"
                      >
                        <span>Register</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>

                </div>
              </FadeUp>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center rounded-3xl border border-white/10 bg-[#08041d]/60 mb-16">
            <Filter className="w-10 h-10 text-text-muted mx-auto mb-3 opacity-50" />
            <h3 className="font-display font-bold text-lg text-text-primary mb-2">No matching events found</h3>
            <p className="text-sm text-text-secondary max-w-md mx-auto mb-6">
              We couldn&apos;t find any events matching your selected category, day, or search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedDay("all");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 rounded-full bg-brand-magenta text-white font-display font-bold text-xs uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}

      </Container>

      {/* ── EVENT DETAIL MODAL ────────────────────────────────────────────── */}
      {activeModalEvent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModalEvent(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeModalEvent.title}
        >
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl border border-white/20 bg-[#08041d] shadow-[0_12px_60px_rgba(0,0,0,0.8)] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-magenta/15 border border-brand-magenta/30 text-brand-magenta">
                    {activeModalEvent.category}
                  </span>
                  <span className="text-[11px] font-mono text-text-tertiary">
                    {activeModalEvent.date}
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                  {activeModalEvent.title}
                </h3>
                <p className="text-xs font-mono text-text-muted mt-1">
                  Organized by <strong className="text-text-primary">{activeModalEvent.club}</strong>
                </p>
              </div>

              <button
                onClick={() => setActiveModalEvent(null)}
                className="p-2 rounded-full border border-white/10 bg-white/5 text-text-muted hover:text-white hover:bg-white/10 transition-colors shrink-0"
                aria-label="Close event modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Prize Spotlight */}
            {activeModalEvent.prizePool && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-brand-orange/10 to-transparent border border-amber-500/25 mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                    Prize Pool: {activeModalEvent.prizePool}
                  </span>
                </div>
                {activeModalEvent.prizeBreakup && (
                  <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-amber-500/20 text-xs font-mono">
                    {activeModalEvent.prizeBreakup.first && (
                      <div>
                        <span className="text-text-tertiary block text-[10px]">1st Winner</span>
                        <strong className="text-white">{activeModalEvent.prizeBreakup.first}</strong>
                      </div>
                    )}
                    {activeModalEvent.prizeBreakup.second && (
                      <div>
                        <span className="text-text-tertiary block text-[10px]">2nd Winner</span>
                        <strong className="text-white">{activeModalEvent.prizeBreakup.second}</strong>
                      </div>
                    )}
                    {activeModalEvent.prizeBreakup.third && (
                      <div>
                        <span className="text-text-tertiary block text-[10px]">3rd Winner</span>
                        <strong className="text-white">{activeModalEvent.prizeBreakup.third}</strong>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-2">Overview</h4>
              <p className="text-sm font-body text-text-secondary leading-relaxed">
                {activeModalEvent.description}
              </p>
            </div>

            {/* Key Registration Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs font-mono">
              <div>
                <span className="text-text-tertiary block text-[10px]">EVENT DATE</span>
                <span className="text-text-primary font-semibold">{activeModalEvent.date}</span>
              </div>
              <div>
                <span className="text-text-tertiary block text-[10px]">TIMINGS &amp; SCHEDULE</span>
                <span className="text-text-primary font-semibold">{activeModalEvent.timings}</span>
              </div>
              <div>
                <span className="text-text-tertiary block text-[10px]">TEAM STRUCTURE</span>
                <span className="text-text-primary font-semibold">{activeModalEvent.teamSize}</span>
              </div>
              <div>
                <span className="text-text-tertiary block text-[10px]">ORGANIZING CHAPTER</span>
                <span className="text-text-primary font-semibold truncate block">{activeModalEvent.club}</span>
              </div>
              <div className="sm:col-span-2 pt-3 mt-1 border-t border-white/10">
                <span className="text-text-tertiary block text-[10px] mb-1.5 font-bold uppercase tracking-wider">REGISTRATION FEE</span>
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-text-secondary text-[11px]">HITAM Student:</span>
                    <span className="text-brand-orange font-bold text-xs">{activeModalEvent.registrationFee.hitam}</span>
                  </div>
                  {activeModalEvent.registrationFee.nonHitam && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-text-secondary text-[11px]">Outside College:</span>
                      <span className="text-brand-magenta font-bold text-xs">{activeModalEvent.registrationFee.nonHitam}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-3">Key Highlights</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeModalEvent.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-xs font-body text-text-secondary">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setActiveModalEvent(null)}
                className="px-5 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-display font-bold text-text-secondary hover:text-white transition-all"
              >
                Close
              </button>
              <Link
                href={`/register?event=${activeModalEvent.slug}`}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-magenta hover:brightness-110 text-xs font-display font-bold text-white transition-all inline-flex items-center gap-1.5 shadow-[0_0_24px_rgba(255,94,0,0.3)]"
              >
                <span>Proceed to Register</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}
