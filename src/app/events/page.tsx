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
  Filter,
  Sparkles
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

  // Compute dynamic counts for category tabs
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: FEST_EVENTS.length };
    FEST_EVENTS.forEach((ev) => {
      counts[ev.category] = (counts[ev.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Compute dynamic counts for day filters
  const dayCounts = useMemo(() => {
    return {
      all: FEST_EVENTS.length,
      "1": FEST_EVENTS.filter((e) => e.dayNumber === 1 || e.dayNumber === 0).length,
      "2": FEST_EVENTS.filter((e) => e.dayNumber === 2 || e.dayNumber === 0).length,
      both: FEST_EVENTS.filter((e) => e.dayNumber === 0).length,
    };
  }, []);

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

      // Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = ev.title.toLowerCase().includes(query);
        const matchesClub = ev.club.toLowerCase().includes(query);
        const matchesTagline = ev.tagline.toLowerCase().includes(query);
        const matchesDesc = ev.description.toLowerCase().includes(query);
        const matchesCategory = ev.category.toLowerCase().includes(query);

        if (!matchesTitle && !matchesClub && !matchesTagline && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedDay, searchQuery]);

  const hasActiveFilters = selectedCategory !== "All" || selectedDay !== "all" || searchQuery.trim() !== "";

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[#040210] relative overflow-hidden text-text-primary">
      
      {/* ESPARTO Brand Atmospheric Aura */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-brand-purple/10 blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full bg-brand-magenta/[0.08] blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">
        
        {/* Breadcrumb Navigation */}
        <FadeUp delay={0}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-brand-orange" />
            <span>BACK TO HOME</span>
          </Link>
        </FadeUp>

        {/* Section Header */}
        <FadeUp delay={0.08} distance={30}>
          <div className="mb-12">
            <div className="max-w-3xl mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-magenta/10 border border-brand-magenta/30 text-brand-magenta text-[11px] font-mono uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OFFICIAL FESTIVAL PROGRAM</span>
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-text-primary tracking-tight leading-[1.05] uppercase mb-4">
                TECHNICAL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">
                  EVENTS &amp; TRACKS
                </span>
              </h1>
              <p className="text-text-secondary text-base sm:text-lg font-body leading-relaxed border-l-2 border-brand-magenta/40 pl-5">
                15 official tracks organized across hackathons, ideathons, workshops, and engineering competitions at HITAM on October 09 &amp; 10, 2026. Explore team formats, check registration fees, and register directly.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl border border-white/10 bg-[#08041d]/80 backdrop-blur-md">
                <span className="text-text-muted font-mono text-[11px] uppercase block mb-1">TOTAL EVENTS</span>
                <span className="font-display font-black text-2xl text-white">15 Tracks</span>
              </div>
              <div className="p-4 rounded-2xl border border-white/10 bg-[#08041d]/80 backdrop-blur-md">
                <span className="text-text-muted font-mono text-[11px] uppercase block mb-1">PRIZE POOL</span>
                <span className="font-display font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber">₹90,000+</span>
              </div>
              <div className="p-4 rounded-2xl border border-white/10 bg-[#08041d]/80 backdrop-blur-md">
                <span className="text-text-muted font-mono text-[11px] uppercase block mb-1">FESTIVAL DATES</span>
                <span className="font-display font-black text-2xl text-white">Oct 9–10</span>
              </div>
              <div className="p-4 rounded-2xl border border-white/10 bg-[#08041d]/80 backdrop-blur-md">
                <span className="text-text-muted font-mono text-[11px] uppercase block mb-1">ELIGIBILITY</span>
                <span className="font-display font-black text-2xl text-white">All Colleges</span>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Filter & Search Toolbar */}
        <FadeUp delay={0.14} distance={25}>
          <div className="p-5 sm:p-6 rounded-3xl border border-brand-violet/25 bg-[#08041d]/90 backdrop-blur-md mb-10 shadow-[0_4px_30px_rgba(0,0,0,0.4)] space-y-4">
            
            {/* Search Row & Day Switcher */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by event title, chapter (e.g. IEEE, GDG, HHC), or keywords..."
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm font-body text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-white"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Day Filter Pills */}
              <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-xl border border-white/10 overflow-x-auto shrink-0">
                {DAYS.map((d) => {
                  const isActive = selectedDay === d.value;
                  const count = dayCounts[d.value as keyof typeof dayCounts];
                  return (
                    <button
                      key={d.value}
                      onClick={() => setSelectedDay(d.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        isActive
                          ? "bg-gradient-to-r from-brand-orange to-brand-magenta text-white shadow-[0_0_15px_rgba(255,94,0,0.35)]"
                          : "text-text-secondary hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{d.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive ? "bg-black/30 text-white" : "bg-white/10 text-text-muted"
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-white/5 pt-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted mr-1 shrink-0">
                Track:
              </span>
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                const count = categoryCounts[cat] || 0;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1 rounded-full text-xs font-mono transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                      isActive
                        ? "bg-gradient-to-r from-brand-magenta to-brand-purple text-white font-bold shadow-[0_0_15px_rgba(255,0,122,0.35)] border border-brand-magenta/40"
                        : "bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white border border-white/10"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-1 rounded-full ${
                      isActive ? "bg-black/30 text-white" : "bg-white/10 text-text-muted"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Counter & Reset */}
            <div className="flex items-center justify-between text-xs font-mono text-text-muted pt-1">
              <span>
                Showing <strong className="text-white">{filteredEvents.length}</strong> of {FEST_EVENTS.length} events
              </span>
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedDay("all");
                    setSearchQuery("");
                  }}
                  className="text-brand-orange hover:underline text-[11px] font-bold"
                >
                  Reset filters
                </button>
              )}
            </div>

          </div>
        </FadeUp>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredEvents.map((event, i) => (
              <FadeUp key={event.id} delay={0.03 * (i % 6)} distance={20}>
                <div className="group relative flex flex-col justify-between h-full p-6 sm:p-7 rounded-3xl border border-white/10 bg-[#08041d]/85 backdrop-blur-md hover:border-brand-magenta/40 hover:shadow-[0_0_30px_rgba(255,0,122,0.15)] transition-all duration-300">
                  
                  {/* Card Content Top */}
                  <div>
                    {/* Chapter & Category Row */}
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

                      {/* Category Tag */}
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shrink-0 ${
                        event.category === "Hackathon"
                          ? "text-brand-orange bg-brand-orange/15 border-brand-orange/30"
                          : event.category === "Ideathon"
                          ? "text-brand-magenta bg-brand-magenta/15 border-brand-magenta/30"
                          : event.category === "Workshop"
                          ? "text-brand-violet bg-brand-violet/15 border-brand-violet/30"
                          : event.category === "Gaming & Coding"
                          ? "text-cyan-400 bg-cyan-400/15 border-cyan-400/30"
                          : "text-amber-400 bg-amber-400/15 border-amber-400/30"
                      }`}>
                        {event.category}
                      </span>
                    </div>

                    {/* Prize Pool Pill (if cash prize available) */}
                    {event.prizePool && event.prizePool !== "Certifications & GDG Kits" && (
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
                    <p className="text-xs sm:text-sm text-text-secondary font-body leading-relaxed line-clamp-3 mb-5">
                      {event.description}
                    </p>
                  </div>

                  {/* Card Bottom: Registration Specs, Fee Box & Action CTAs */}
                  <div className="space-y-3.5 mt-auto pt-4 border-t border-white/5">
                    
                    {/* Key Registration Specs (2x2 Matrix) */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div>
                        <span className="text-[10px] text-text-muted block">SCHEDULE</span>
                        <div className="flex items-center gap-1 text-white font-medium truncate">
                          <Calendar className="w-3.5 h-3.5 text-brand-magenta shrink-0" />
                          <span className="truncate">{event.date}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted block">TIMINGS</span>
                        <div className="flex items-center gap-1 text-white font-medium truncate">
                          <Clock className="w-3.5 h-3.5 text-brand-violet shrink-0" />
                          <span className="truncate">{event.timings}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted block">TEAM FORMAT</span>
                        <div className="flex items-center gap-1 text-white font-medium truncate">
                          <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="truncate">{event.teamSize}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted block">AWARD / POOL</span>
                        <div className="flex items-center gap-1 text-amber-300 font-medium truncate">
                          <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="truncate">{event.prizePool}</span>
                        </div>
                      </div>
                    </div>

                    {/* Registration Fee Breakdown Box */}
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-brand-violet/10 to-transparent border border-brand-violet/20 flex flex-col gap-1 text-xs font-mono">
                      <div className="flex items-center justify-between">
                        <span className="text-text-muted text-[11px]">HITAM Student:</span>
                        <span className="text-text-primary font-bold">{event.registrationFee.hitam}</span>
                      </div>
                      {event.registrationFee.nonHitam && event.registrationFee.nonHitam !== event.registrationFee.hitam && (
                        <div className="flex items-center justify-between border-t border-white/5 pt-1">
                          <span className="text-text-muted text-[11px]">Outside College:</span>
                          <span className="text-brand-magenta font-semibold">{event.registrationFee.nonHitam}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => setActiveModalEvent(event)}
                        className="py-2.5 px-3 rounded-xl border border-white/15 bg-white/5 hover:bg-brand-purple/20 hover:border-brand-violet/50 text-xs font-display font-bold text-text-secondary hover:text-white transition-all text-center cursor-pointer"
                      >
                        Quick Details
                      </button>

                      <Link
                        href={`/register?event=${event.slug}`}
                        className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-purple hover:brightness-110 text-xs font-display font-bold text-white transition-all text-center inline-flex items-center justify-center gap-1 shadow-[0_0_20px_rgba(255,94,0,0.3)] hover:shadow-[0_0_28px_rgba(255,0,122,0.45)]"
                      >
                        <span>Register Now</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>

                </div>
              </FadeUp>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="p-12 text-center rounded-3xl border border-brand-violet/30 bg-[#08041d]/80 backdrop-blur-md mb-16">
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
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-orange to-brand-magenta text-white font-display font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,94,0,0.4)]"
            >
              Reset Filters
            </button>
          </div>
        )}

      </Container>

      {/* ── QUICK DETAILS MODAL ────────────────────────────────────────────── */}
      {activeModalEvent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModalEvent(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeModalEvent.title}
        >
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl border border-brand-violet/30 bg-[#08041d] shadow-[0_12px_60px_rgba(0,0,0,0.85)] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-magenta/15 border border-brand-magenta/30 text-brand-magenta">
                    {activeModalEvent.category}
                  </span>
                  <span className="text-[11px] font-mono text-text-muted">
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

            {/* Prize Pool Spotlight (if available) */}
            {activeModalEvent.prizePool && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-brand-orange/15 to-transparent border border-amber-500/30 mb-6">
                <div className="flex items-center gap-2 mb-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                    Official Prize Pool: {activeModalEvent.prizePool}
                  </span>
                </div>

                {activeModalEvent.prizeBreakup && (
                  <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-amber-500/20 text-xs font-mono">
                    {activeModalEvent.prizeBreakup.first && (
                      <div className="p-2 rounded-xl bg-black/30 border border-white/5 text-center">
                        <span className="text-text-muted text-[10px] block">1st Prize</span>
                        <strong className="text-white text-sm">{activeModalEvent.prizeBreakup.first}</strong>
                      </div>
                    )}
                    {activeModalEvent.prizeBreakup.second && (
                      <div className="p-2 rounded-xl bg-black/30 border border-white/5 text-center">
                        <span className="text-text-muted text-[10px] block">2nd Prize</span>
                        <strong className="text-white text-sm">{activeModalEvent.prizeBreakup.second}</strong>
                      </div>
                    )}
                    {activeModalEvent.prizeBreakup.third && (
                      <div className="p-2 rounded-xl bg-black/30 border border-white/5 text-center">
                        <span className="text-text-muted text-[10px] block">3rd Prize</span>
                        <strong className="text-white text-sm">{activeModalEvent.prizeBreakup.third}</strong>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Overview / Problem Statement */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-2">Track Overview</h4>
              <p className="text-sm font-body text-text-secondary leading-relaxed">
                {activeModalEvent.description}
              </p>
            </div>

            {/* Essential Registration Details (No internal room numbers) */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 mb-6 space-y-3 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-white/5">
                <div>
                  <span className="text-text-muted block text-[10px]">EVENT DATE</span>
                  <span className="text-text-primary font-semibold">{activeModalEvent.date}</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[10px]">TIMINGS &amp; SCHEDULE</span>
                  <span className="text-text-primary font-semibold">{activeModalEvent.timings}</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[10px]">TEAM STRUCTURE</span>
                  <span className="text-text-primary font-semibold">{activeModalEvent.teamSize}</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[10px]">VENUE LOCATION</span>
                  <span className="text-text-primary font-semibold">HITAM Campus, Hyderabad</span>
                </div>
              </div>

              {/* Registration Fee Breakdown Ticket */}
              <div>
                <span className="text-text-muted block text-[10px] mb-1.5 uppercase font-bold tracking-wider">
                  REGISTRATION FEES
                </span>
                <div className="flex flex-wrap items-center justify-between gap-3 bg-black/40 p-3 rounded-xl border border-white/5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-text-secondary text-[11px]">HITAM Student:</span>
                    <span className="text-brand-orange font-bold text-sm">{activeModalEvent.registrationFee.hitam}</span>
                  </div>
                  {activeModalEvent.registrationFee.nonHitam && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-text-secondary text-[11px]">Outside College:</span>
                      <span className="text-brand-magenta font-bold text-sm">{activeModalEvent.registrationFee.nonHitam}</span>
                    </div>
                  )}
                </div>
                {activeModalEvent.registrationFee.note && (
                  <p className="text-[10px] text-text-muted mt-1.5 italic font-body">
                    * {activeModalEvent.registrationFee.note}
                  </p>
                )}
              </div>
            </div>

            {/* Key Highlights Checklist */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-3">Key Highlights &amp; Inclusions</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeModalEvent.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-xs font-body text-text-secondary">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setActiveModalEvent(null)}
                className="px-5 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-display font-bold text-text-secondary hover:text-white transition-all"
              >
                Close
              </button>
              <Link
                href={`/register?event=${activeModalEvent.slug}`}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-purple hover:brightness-110 text-xs font-display font-bold text-white transition-all inline-flex items-center gap-1.5 shadow-[0_0_24px_rgba(255,94,0,0.4)] hover:shadow-[0_0_35px_rgba(255,0,122,0.6)]"
              >
                <span>Register for this Event</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}
