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
  SlidersHorizontal,
  Info
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
    <main className="min-h-screen pt-28 pb-24 bg-[#060411] text-text-primary">
      <Container size="lg">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-text-tertiary hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO HOME</span>
          </Link>
        </div>

        {/* Section Header */}
        <div className="border-b border-white/10 pb-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-brand-orange">
                  ESPARTO 2026
                </span>
                <span className="text-white/20 text-xs">/</span>
                <span className="text-[11px] font-mono tracking-wider text-text-muted">
                  OFFICIAL EVENTS DIRECTORY
                </span>
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                Technical Events & Competitions
              </h1>
              <p className="mt-3 text-sm sm:text-base text-text-secondary max-w-2xl font-body leading-relaxed">
                15 official tracks curated across hackathons, ideathons, workshops, and engineering challenges on October 9 & 10 at HITAM. Review registration criteria, team structures, fees, and secure your team slot.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-3 shrink-0 text-xs font-mono">
              <div className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-text-tertiary block text-[10px] uppercase">TRACKS</span>
                <strong className="text-white text-sm">15 Events</strong>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-text-tertiary block text-[10px] uppercase">PRIZE POOL</span>
                <strong className="text-brand-orange text-sm">₹90,000+</strong>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-text-tertiary block text-[10px] uppercase">DATES</span>
                <strong className="text-white text-sm">Oct 9–10, 2026</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 mb-8 space-y-4">
          
          {/* Search Row & Day Toggle */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by event title, chapter (e.g. IEEE, GDG, HHC), or keywords..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm font-body text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-brand-magenta/60 focus:ring-1 focus:ring-brand-magenta/60 transition-all"
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

            {/* Day Switcher */}
            <div className="flex items-center gap-1 p-1 bg-black/40 rounded-xl border border-white/10 overflow-x-auto shrink-0">
              {DAYS.map((d) => {
                const isActive = selectedDay === d.value;
                const count = dayCounts[d.value as keyof typeof dayCounts];
                return (
                  <button
                    key={d.value}
                    onClick={() => setSelectedDay(d.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      isActive
                        ? "bg-white/15 text-white shadow-sm"
                        : "text-text-muted hover:text-text-secondary"
                    }`}
                  >
                    <span>{d.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-white/5 text-text-tertiary"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-t border-white/5 pt-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-text-tertiary mr-2 shrink-0 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" />
              <span>Category:</span>
            </span>
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? "bg-brand-magenta text-white font-semibold"
                      : "bg-white/[0.03] text-text-secondary hover:bg-white/[0.06] hover:text-white border border-white/5"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1 rounded-full ${
                    isActive ? "bg-black/25 text-white" : "bg-white/10 text-text-tertiary"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Filter Counter & Reset */}
          <div className="flex items-center justify-between text-xs font-mono text-text-tertiary pt-1">
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
                className="text-brand-orange hover:underline text-[11px] font-medium"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {filteredEvents.map((event) => {
              return (
                <div
                  key={event.id}
                  className="flex flex-col justify-between h-full p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-200"
                >
                  {/* Top: Chapter and Category */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 max-w-[70%]">
                        <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 border border-white/10 bg-white">
                          <Image
                            src={event.clubLogo}
                            alt={event.club}
                            fill
                            className="object-contain p-0.5"
                          />
                        </div>
                        <span className="font-mono text-xs text-text-secondary truncate">
                          {event.club}
                        </span>
                      </div>
                      
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border shrink-0 ${
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

                    {/* Event Title */}
                    <h2 className="font-display font-bold text-xl text-white tracking-tight leading-snug mb-2">
                      {event.title}
                    </h2>

                    {/* Tagline / Pitch */}
                    <p className="text-xs font-mono text-text-tertiary mb-3 line-clamp-1">
                      {event.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-text-secondary font-body leading-relaxed line-clamp-3 mb-4">
                      {event.description}
                    </p>
                  </div>

                  {/* Bottom: Registration Specs & Action */}
                  <div className="space-y-3.5 mt-auto pt-4 border-t border-white/5">
                    
                    {/* Key Registration Specs (2x2 Matrix) */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-black/30 p-2.5 rounded-xl border border-white/5">
                      <div>
                        <span className="text-[10px] text-text-tertiary block">SCHEDULE</span>
                        <div className="flex items-center gap-1 text-white font-medium truncate">
                          <Calendar className="w-3 h-3 text-brand-magenta shrink-0" />
                          <span className="truncate">{event.date}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-tertiary block">TIMINGS</span>
                        <div className="flex items-center gap-1 text-white font-medium truncate">
                          <Clock className="w-3 h-3 text-brand-violet shrink-0" />
                          <span className="truncate">{event.timings}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-tertiary block">TEAM FORMAT</span>
                        <div className="flex items-center gap-1 text-white font-medium truncate">
                          <Users className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span className="truncate">{event.teamSize}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-tertiary block">PRIZE POOL</span>
                        <div className="flex items-center gap-1 text-amber-300 font-medium truncate">
                          <Trophy className="w-3 h-3 text-amber-400 shrink-0" />
                          <span className="truncate">{event.prizePool}</span>
                        </div>
                      </div>
                    </div>

                    {/* Fee Structure */}
                    <div className="flex items-center justify-between text-xs font-mono px-1">
                      <div>
                        <span className="text-[10px] text-text-tertiary block">HITAM FEE</span>
                        <span className="text-text-primary font-semibold">{event.registrationFee.hitam}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-text-tertiary block">OUTSIDE COLLEGE</span>
                        <span className="text-brand-magenta font-semibold">{event.registrationFee.nonHitam}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => setActiveModalEvent(event)}
                        className="py-2 px-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono font-medium text-text-secondary hover:text-white transition-all text-center"
                      >
                        Quick Details
                      </button>

                      <Link
                        href={`/register?event=${event.slug}`}
                        className="py-2 px-3 rounded-xl bg-white text-black hover:bg-white/90 text-xs font-mono font-bold transition-all text-center inline-flex items-center justify-center gap-1"
                      >
                        <span>Register</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="p-12 text-center rounded-2xl border border-white/10 bg-white/[0.01] mb-16">
            <Info className="w-8 h-8 text-text-muted mx-auto mb-3 opacity-60" />
            <h3 className="font-display font-bold text-lg text-white mb-2">No matching events found</h3>
            <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto mb-5 font-body">
              No events matched your current category, day, or search filter. Try clearing your filters to see the full list.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedDay("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl bg-white text-black font-mono font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

      </Container>

      {/* ── EVENT DETAIL MODAL ────────────────────────────────────────────── */}
      {activeModalEvent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModalEvent(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeModalEvent.title}
        >
          <div 
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-7 rounded-2xl border border-white/15 bg-[#090717] text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-white">
                    {activeModalEvent.category}
                  </span>
                  <span className="text-xs font-mono text-text-tertiary">
                    {activeModalEvent.date}
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl text-white tracking-tight leading-snug">
                  {activeModalEvent.title}
                </h3>
                <p className="text-xs font-mono text-text-muted mt-1">
                  Organized by <strong className="text-white">{activeModalEvent.club}</strong>
                </p>
              </div>

              <button
                onClick={() => setActiveModalEvent(null)}
                className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-text-muted hover:text-white transition-colors shrink-0"
                aria-label="Close event modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Prize Pool Breakdown (if available) */}
            {activeModalEvent.prizePool && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-5">
                <div className="flex items-center gap-2 mb-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                    Prize Pool: {activeModalEvent.prizePool}
                  </span>
                </div>

                {activeModalEvent.prizeBreakup && (
                  <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-amber-500/20 text-xs font-mono">
                    {activeModalEvent.prizeBreakup.first && (
                      <div>
                        <span className="text-text-muted text-[10px] block">1st Prize</span>
                        <strong className="text-white">{activeModalEvent.prizeBreakup.first}</strong>
                      </div>
                    )}
                    {activeModalEvent.prizeBreakup.second && (
                      <div>
                        <span className="text-text-muted text-[10px] block">2nd Prize</span>
                        <strong className="text-white">{activeModalEvent.prizeBreakup.second}</strong>
                      </div>
                    )}
                    {activeModalEvent.prizeBreakup.third && (
                      <div>
                        <span className="text-text-muted text-[10px] block">3rd Prize</span>
                        <strong className="text-white">{activeModalEvent.prizeBreakup.third}</strong>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div className="mb-5">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-1.5">About This Track</h4>
              <p className="text-xs sm:text-sm font-body text-text-secondary leading-relaxed">
                {activeModalEvent.description}
              </p>
            </div>

            {/* Registration Details Matrix */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 mb-5 space-y-2.5 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3 pb-2.5 border-b border-white/5">
                <div>
                  <span className="text-text-tertiary block text-[10px]">EVENT DATE</span>
                  <span className="text-white font-medium">{activeModalEvent.date}</span>
                </div>
                <div>
                  <span className="text-text-tertiary block text-[10px]">DAILY TIMINGS</span>
                  <span className="text-white font-medium">{activeModalEvent.timings}</span>
                </div>
                <div>
                  <span className="text-text-tertiary block text-[10px]">TEAM STRUCTURE</span>
                  <span className="text-white font-medium">{activeModalEvent.teamSize}</span>
                </div>
                <div>
                  <span className="text-text-tertiary block text-[10px]">ORGANIZING CHAPTER</span>
                  <span className="text-white font-medium truncate block">{activeModalEvent.club}</span>
                </div>
              </div>

              {/* Registration Fee Breakdown */}
              <div>
                <span className="text-text-tertiary block text-[10px] mb-1">REGISTRATION FEES</span>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-text-secondary text-[11px]">HITAM Student:</span>
                    <span className="text-brand-orange font-bold">{activeModalEvent.registrationFee.hitam}</span>
                  </div>
                  {activeModalEvent.registrationFee.nonHitam && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-text-secondary text-[11px]">Outside College:</span>
                      <span className="text-brand-magenta font-bold">{activeModalEvent.registrationFee.nonHitam}</span>
                    </div>
                  )}
                </div>
                {activeModalEvent.registrationFee.note && (
                  <p className="text-[10px] text-text-muted mt-1 italic font-body">
                    * {activeModalEvent.registrationFee.note}
                  </p>
                )}
              </div>
            </div>

            {/* Key Highlights */}
            <div className="mb-6">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-2">Key Highlights</h4>
              <ul className="space-y-1.5">
                {activeModalEvent.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-xs font-body text-text-secondary">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/10">
              <button
                onClick={() => setActiveModalEvent(null)}
                className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-text-secondary hover:text-white transition-all"
              >
                Close
              </button>
              <Link
                href={`/register?event=${activeModalEvent.slug}`}
                className="px-5 py-2 rounded-xl bg-white text-black hover:bg-white/90 text-xs font-mono font-bold transition-all inline-flex items-center gap-1.5"
              >
                <span>Register for this Event</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}
