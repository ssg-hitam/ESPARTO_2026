"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FEST_EVENTS, FestEventItem, EventCategoryType, getEventRegisterUrl } from "@/data/events";
import { 
  ArrowLeft, 
  ArrowRight,
  ArrowUpRight, 
  Search, 
  Trophy, 
  X, 
  Info,
  Phone,
  Mail,
  User,
  GraduationCap,
  Calendar,
  Clock,
  Users,
  MapPin,
  CreditCard,
  Sparkles
} from "lucide-react";

function cleanString(str?: string): string {
  if (!str) return "";
  return str
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{FE00}-\u{FE0F}]/gu, "")
    .trim();
}

const CATEGORIES: { label: string; value: EventCategoryType }[] = [
  { label: "ALL", value: "All" },
  { label: "HACKATHONS", value: "Hackathon" },
  { label: "IDEATHONS", value: "Ideathon" },
  { label: "CHALLENGES", value: "Challenge" },
  { label: "WORKSHOPS", value: "Workshop" },
  { label: "GAMING & CODING", value: "Gaming & Coding" },
];

const DAYS = [
  { label: "ALL DAYS", value: "all" },
  { label: "DAY 1 (OCT 09)", value: "1" },
  { label: "DAY 2 (OCT 10)", value: "2" },
  { label: "BOTH DAYS", value: "both" },
];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategoryType>("All");
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalEvent, setActiveModalEvent] = useState<FestEventItem | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!activeModalEvent) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modalRef.current?.querySelector<HTMLElement>("button")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveModalEvent(null);
      if (event.key !== "Tab") return;
      const elements = modalRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!elements?.length) return;
      const first = elements[0], last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [activeModalEvent]);

  // Dynamic counts for categories
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: FEST_EVENTS.length };
    FEST_EVENTS.forEach((ev) => {
      counts[ev.category] = (counts[ev.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Dynamic counts for days
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
    <main className="min-h-screen pt-4 sm:pt-6 pb-20 bg-[#040210] relative overflow-x-clip text-text-primary">
      
      {/* ESPARTO Brand Atmosphere */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-brand-purple/10 blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full bg-brand-magenta/[0.08] blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">
        
        {/* Clean Back Navigation */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-brand-orange" />
            <span>BACK TO HOME</span>
          </Link>
        </div>

        {/* ── EVENTS PAGE HERO / INTRO HEADER ───────────────────────────────── */}
        <div className="mb-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-brand-orange/15 text-brand-orange border border-brand-orange/30 font-mono text-xs font-bold uppercase tracking-wider">
              ESPARTO 2026
            </span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase mb-3">
            TECHNICAL EVENTS &amp; COMPETITIONS
          </h1>

          <p className="text-text-secondary text-sm sm:text-base font-body max-w-3xl leading-relaxed">
            Two days of high-stakes hackathons, competitive robotics, ideathons, and industry workshops uniting all technical clubs and professional chapters of HITAM.
          </p>
        </div>

        {/* ── MASTER 2-COLUMN LAYOUT: SIDEBAR + MAIN CONTENT ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:hidden sticky top-24 z-30 grid grid-cols-2 gap-3 p-3 rounded-2xl border border-white/10 bg-[#08041d]/95 backdrop-blur-md" aria-label="Event filters">
            <label className="min-w-0 text-xs font-mono uppercase tracking-wider">Categories
              <select aria-label="Categories" value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value as EventCategoryType)} className="mt-2 w-full min-h-11 rounded-lg border border-white/20 bg-[#08041d] px-2 text-xs text-white">
                {CATEGORIES.map((category) => <option key={category.value} value={category.value}>{category.label} ({categoryCounts[category.value] || 0})</option>)}
              </select>
            </label>
            <label className="min-w-0 text-xs font-mono uppercase tracking-wider">Schedule
              <select aria-label="Schedule" value={selectedDay} onChange={(event) => setSelectedDay(event.target.value)} className="mt-2 w-full min-h-11 rounded-lg border border-white/20 bg-[#08041d] px-2 text-xs text-white">
                {DAYS.map((day) => <option key={day.value} value={day.value}>{day.label} ({dayCounts[day.value as keyof typeof dayCounts]})</option>)}
              </select>
            </label>
          </div>

          {/* ── LEFT SIDEBAR: CATEGORIES & CONTROLS ───────────────────────────── */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-28 max-h-[calc(100dvh-8rem)] overflow-y-auto space-y-6">
            
            {/* Category Index Card */}
            <div className="rounded-2xl border border-white/10 bg-[#08041d]/90 backdrop-blur-md overflow-hidden shadow-lg">
              
              {/* Sidebar Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-text-primary">
                  CATEGORIES
                </span>
                <span className="text-[11px] font-mono text-brand-orange font-bold">
                  INDEX [{CATEGORIES.length}]
                </span>
              </div>

              {/* Vertical Category Options Stack */}
              <div className="p-2 space-y-1">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.value;
                  const count = categoryCounts[cat.value] || 0;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-mono text-xs transition-all text-left group ${
                        isActive
                          ? "bg-gradient-to-r from-brand-orange to-brand-magenta text-white font-bold shadow-[0_0_15px_rgba(255,94,0,0.35)]"
                          : "text-text-secondary hover:text-white hover:bg-white/[0.04] border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-1.5 h-1.5 rounded-xs transition-transform ${
                          isActive ? "bg-white scale-125" : "bg-text-muted group-hover:bg-brand-magenta"
                        }`} />
                        <span className="tracking-wider uppercase">{cat.label}</span>
                      </div>
                      <span className={`text-[11px] font-mono ${
                        isActive ? "text-white/90 font-bold" : "text-text-muted group-hover:text-text-secondary"
                      }`}>
                        [{count.toString().padStart(2, "0")}]
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Schedule / Day Index Card */}
            <div className="rounded-2xl border border-white/10 bg-[#08041d]/90 backdrop-blur-md overflow-hidden shadow-lg">
              
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-text-primary">
                  SCHEDULE
                </span>
                <span className="text-[11px] font-mono text-brand-magenta font-bold">
                  DAYS [02]
                </span>
              </div>

              <div className="p-2 space-y-1">
                {DAYS.map((d) => {
                  const isActive = selectedDay === d.value;
                  const count = dayCounts[d.value as keyof typeof dayCounts];
                  return (
                    <button
                      key={d.value}
                      onClick={() => setSelectedDay(d.value)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-mono text-xs transition-all text-left group ${
                        isActive
                          ? "bg-white/15 text-white font-bold border border-white/20"
                          : "text-text-secondary hover:text-white hover:bg-white/[0.04] border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-1.5 h-1.5 rounded-xs ${
                          isActive ? "bg-brand-magenta" : "bg-text-muted"
                        }`} />
                        <span className="tracking-wider">{d.label}</span>
                      </div>
                      <span className={`text-[11px] font-mono ${
                        isActive ? "text-white font-bold" : "text-text-muted"
                      }`}>
                        [{count.toString().padStart(2, "0")}]
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>

          </aside>

          {/* ── RIGHT MAIN AREA: SEARCH & 2-COLUMN EVENT CARDS ───────────────── */}
          <div className="min-w-0 lg:col-span-8 xl:col-span-9 space-y-6">
            
            {/* Top Search & Filter Status Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-[#08041d]/90 border border-white/10">
              
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  aria-label="Search events"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events by title, chapter (e.g. IEEE, GDG, HHC, Torque X)..."
                  className="w-full pl-10 pr-9 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-body text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-brand-magenta transition-all"
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

              {/* Status & Filter Reset */}
              <div className="flex items-center justify-between sm:justify-end gap-3 px-2 text-xs font-mono text-text-muted shrink-0">
                <span>
                  Showing <strong className="text-white">{filteredEvents.length}</strong> Results
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
                    Reset
                  </button>
                )}
              </div>

            </div>

            {/* ── 2-COLUMN EVENT CARDS GRID (AS IN REFERENCE DESIGN) ──────────── */}
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredEvents.map((event, idx) => {
                  // Calculate actual 1-based index in the filtered list
                  const globalIdx = idx + 1;
                  const trackCode = `TRACK #${globalIdx.toString().padStart(3, "0")}`;

                  return (
                    <div
                      key={event.id}
                      className="group relative min-w-0 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#08041d]/90 backdrop-blur-md overflow-hidden hover:border-brand-violet/40 hover:shadow-[0_0_25px_rgba(121,80,242,0.15)] transition-all duration-200"
                    >
                      {/* Card Content Wrapper */}
                      <div className="p-4 sm:p-5">
                        
                        {/* Top Meta Bar: TRACK #XXX & Category Badge */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
                          <span className="font-mono text-xs font-bold tracking-wider text-brand-orange">
                            {trackCode}
                          </span>
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-white/15 bg-white/5 text-text-secondary">
                            {event.category}
                          </span>
                        </div>

                        {/* Event Visual Banner Box */}
                        <div className={`relative w-full rounded-xl overflow-hidden mb-4 border border-white/10 bg-gradient-to-br from-black/80 via-[#0e0a2b] to-[#1a0e38] flex flex-col justify-between group-hover:border-white/20 transition-all ${event.bannerImage ? "" : "h-40 sm:h-44 p-3.5"}`}>
                          {event.bannerImage ? (
                            <>
                              <Image
                                src={event.bannerImage}
                                unoptimized={event.id === "technical-tambola" || event.id === "code-casino"}
                                alt={event.title}
                                width={1600}
                                height={600}
                                sizes="(max-width: 768px) 100vw, 450px"
                                className="block w-full h-auto"
                                priority
                              />
                            </>
                          ) : (
                            /* Subtle Graphic Grid Accent for cards without custom banner */
                            <div
                              className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"
                              aria-hidden="true"
                            />
                          )}

                          {/* Banner Top Row: Prize Badge (Pinned to Right) */}
                          <div className={`flex items-center justify-end gap-2 z-10 ${event.bannerImage ? "p-2" : ""}`}>
                            {event.prizePool && event.prizePool !== "Certifications & GDG Kits" && (
                              <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md border border-amber-400/30 px-2.5 py-1 rounded-full text-amber-300 font-mono font-semibold text-[10px] shrink-0 shadow-[0_0_12px_rgba(251,191,36,0.2)]">
                                <Trophy className="w-3 h-3 text-amber-400 shrink-0" />
                                <span>{cleanString(event.prizePool)}</span>
                              </div>
                            )}
                          </div>

                          {/* Banner Bottom: Distinct Title Representation (Only when no banner image) */}
                          {!event.bannerImage && (
                            <div className="z-10 mt-auto">
                              <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">
                                {cleanString(event.date)}
                              </span>
                              <h3 className="font-display font-black text-lg text-white leading-tight drop-shadow-md truncate">
                                {event.title}
                              </h3>
                            </div>
                          )}
                        </div>

                        {/* Title, Organizing Chapter & Overview */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-magenta/15 border border-brand-magenta/30 text-brand-magenta">
                                {event.category}
                              </span>
                              <span className="text-[10px] font-mono text-text-muted">
                                {cleanString(event.date)}
                              </span>
                            </div>

                            <h2 className="font-display font-bold text-lg text-text-primary tracking-tight group-hover:text-white transition-colors mb-1.5">
                              {event.title}
                            </h2>

                            {/* Organizing Chapter with official logo in description */}
                            <div className="flex items-center gap-2 mb-2.5">
                              <div className={`relative overflow-hidden bg-white shrink-0 rounded-sm ${event.clubId === "hhc" || event.clubId === "isnt-isampe" ? "w-6 h-3.5" : "w-4 h-4 rounded-full"}`}>
                                <Image
                                  src={event.clubLogo}
                                  alt={event.club}
                                  fill
                                  sizes="20px"
                                  className="object-contain p-0.5"
                                />
                              </div>
                              <span className="text-[11px] font-mono text-text-secondary truncate">
                                Organized by <span className="text-white font-medium">{event.club}</span>
                              </span>
                            </div>

                            <p className="text-xs text-text-secondary font-body line-clamp-2 leading-relaxed">
                              {event.description}
                            </p>
                          </div>

                        {/* Registration Specs (Date, Time, Team Size, Fee) */}
                        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono p-2.5 rounded-xl bg-black/40 border border-white/5 mb-3">
                          <div>
                            <span className="text-[9px] text-text-muted uppercase flex items-center gap-1.5 tracking-wider font-semibold">
                              <Calendar className="w-3 h-3 text-text-muted shrink-0" /> SCHEDULE
                            </span>
                            <span className="text-white font-medium truncate block">{cleanString(event.date)}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-text-muted uppercase flex items-center gap-1.5 tracking-wider font-semibold">
                              <Clock className="w-3 h-3 text-text-muted shrink-0" /> TIMINGS
                            </span>
                            <span className="text-white font-medium truncate block">{cleanString(event.timings)}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-text-muted uppercase flex items-center gap-1.5 tracking-wider font-semibold">
                              <Users className="w-3 h-3 text-text-muted shrink-0" /> TEAM FORMAT
                            </span>
                            <span className="text-white font-medium truncate block">{cleanString(event.teamSize)}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-text-muted uppercase flex items-center gap-1.5 tracking-wider font-semibold">
                              <CreditCard className="w-3 h-3 text-text-muted shrink-0" /> ENTRY FEE
                            </span>
                            <span className={`text-brand-orange font-bold block ${event.clubId === "ieee" ? "whitespace-normal" : "truncate"}`}>{cleanString(event.registrationFee.hitam)}</span>
                            {event.clubId === "ieee" && <span className="text-brand-magenta font-bold block mt-1">{cleanString(event.registrationFee.nonHitam)}</span>}
                          </div>
                        </div>

                        {/* Quick Details Trigger */}
                        <button
                          onClick={() => setActiveModalEvent(event)}
                          className="w-full text-center text-[11px] font-mono text-text-muted hover:text-white py-1 transition-colors"
                        >
                          View Full Details &amp; Prize Breakdown →
                        </button>

                      </div>

                      {/* ── CARD BOTTOM ACTION BUTTON ── */}
                      <a
                        href={getEventRegisterUrl(event)}
                        className="w-full py-3 px-4 font-mono font-bold text-xs uppercase tracking-wider text-center text-white bg-gradient-to-r from-brand-orange to-brand-magenta hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_-2px_10px_rgba(0,0,0,0.4)]"
                      >
                        <span>Register for Event</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>

                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty Search State */
              <div className="p-12 text-center rounded-2xl border border-white/10 bg-[#08041d]/80">
                <Info className="w-8 h-8 text-text-muted mx-auto mb-3 opacity-60" />
                <h3 className="font-display font-bold text-lg text-white mb-2">No matching events found</h3>
                <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto mb-5 font-body">
                  No events match the selected category, day, or search keywords.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedDay("all");
                    setSearchQuery("");
                  }}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-orange to-brand-magenta text-white font-mono font-bold text-xs"
                >
                  Reset Filters
                </button>
              </div>
            )}


          </div>

        </div>

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
            ref={modalRef}
            className="relative w-full max-w-2xl max-h-[90dvh] overflow-y-auto p-6 sm:p-8 rounded-3xl border border-brand-violet/30 bg-[#08041d] shadow-[0_12px_60px_rgba(0,0,0,0.85)] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-white/10">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
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
                <div className="flex items-center gap-2 mt-1.5">
                  <div className={`relative overflow-hidden bg-white shrink-0 rounded-sm ${activeModalEvent.clubId === "hhc" || activeModalEvent.clubId === "isnt-isampe" ? "w-6 h-3.5" : "w-4 h-4 rounded-full"}`}>
                    <Image
                      src={activeModalEvent.clubLogo}
                      alt={activeModalEvent.club}
                      fill
                      sizes="20px"
                      className="object-contain p-0.5"
                    />
                  </div>
                  <p className="text-xs font-mono text-text-muted">
                    Organized by <strong className="text-text-primary">{activeModalEvent.club}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveModalEvent(null)}
                className="p-2 rounded-full border border-white/10 bg-white/5 text-text-muted hover:text-white hover:bg-white/10 transition-colors shrink-0"
                aria-label="Close event modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Event Official Banner */}
            {activeModalEvent.bannerImage && (
              <div className="relative w-full rounded-2xl overflow-hidden mb-6 border border-white/15 bg-white/5 shadow-2xl group">
                <Image
                  src={activeModalEvent.bannerImage}
                  unoptimized={activeModalEvent.id === "technical-tambola" || activeModalEvent.id === "code-casino"}
                  alt={`${activeModalEvent.title} Official Banner`}
                  width={1600}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="block w-full h-auto"
                  priority
                />
              </div>
            )}

            {/* Prize Pool Breakdown (if declared) */}
            {activeModalEvent.prizePool && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-brand-orange/5 to-transparent border border-amber-500/20 mb-6">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                      Prize Pool
                    </span>
                  </div>
                  <span className="font-display font-extrabold text-white text-base tracking-tight">
                    {cleanString(activeModalEvent.prizePool)}
                  </span>
                </div>

                {activeModalEvent.prizeBreakup && (
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-amber-500/15 text-xs font-mono">
                    {activeModalEvent.prizeBreakup.first && (
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-amber-400/20 text-center">
                        <span className="text-amber-400 font-bold text-[10px] block mb-0.5 uppercase tracking-wider">1st Place</span>
                        <strong className="text-white text-sm font-display tracking-tight">{cleanString(activeModalEvent.prizeBreakup.first)}</strong>
                      </div>
                    )}
                    {activeModalEvent.prizeBreakup.second && (
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-slate-300/20 text-center">
                        <span className="text-slate-300 font-bold text-[10px] block mb-0.5 uppercase tracking-wider">2nd Place</span>
                        <strong className="text-white text-sm font-display tracking-tight">{cleanString(activeModalEvent.prizeBreakup.second)}</strong>
                      </div>
                    )}
                    {activeModalEvent.prizeBreakup.third && (
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-amber-600/20 text-center">
                        <span className="text-amber-500 font-bold text-[10px] block mb-0.5 uppercase tracking-wider">3rd Place</span>
                        <strong className="text-white text-sm font-display tracking-tight">{cleanString(activeModalEvent.prizeBreakup.third)}</strong>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeModalEvent.brochureUrl && (
              <a
                href={activeModalEvent.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/[0.05] p-4 text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <span><strong className="block">Official event brochure</strong><span className="text-sm text-text-secondary">Full Agentic AI Workshop &amp; Hackathon details · PDF</span></span>
                <span aria-hidden="true">↗</span>
              </a>
            )}

            {activeModalEvent.agenda && (
              <section className="mb-6 p-4 rounded-2xl border border-white/10 bg-white/[0.03]">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-3 font-bold">One Event · Two-Day Schedule</h4>
                <dl className="space-y-3 text-sm">
                  {activeModalEvent.agenda.map((item) => (
                    <div key={item.label}>
                      <dt className="font-semibold text-white">{item.label}</dt>
                      <dd className="text-text-secondary leading-relaxed mt-1">{item.detail}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {/* Track Overview */}
            <div className="mb-6">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-2 font-bold">
                Track Overview
              </h4>
              <p className="text-sm font-body text-text-secondary leading-relaxed">
                {activeModalEvent.description}
              </p>
            </div>

            {/* Essential Event Specifications Grid */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 mb-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3.5 border-b border-white/5 font-mono text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-brand-orange mt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-text-muted block text-[10px] uppercase font-bold tracking-wider">Event Date</span>
                    <span className="text-white font-medium">{cleanString(activeModalEvent.date)}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-brand-orange mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-text-muted block text-[10px] uppercase font-bold tracking-wider">Schedule &amp; Timings</span>
                    <span className="text-white font-medium">{cleanString(activeModalEvent.timings)}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-brand-magenta mt-0.5">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-text-muted block text-[10px] uppercase font-bold tracking-wider">Participation Format</span>
                    <span className="text-white font-medium">{cleanString(activeModalEvent.teamSize)}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-brand-magenta mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-text-muted block text-[10px] uppercase font-bold tracking-wider">Venue Location</span>
                    <span className="text-white font-medium">{cleanString(activeModalEvent.venue) || "HITAM Campus, Hyderabad"}</span>
                  </div>
                </div>
              </div>

              {/* Registration Fees Section */}
              <div>
                <span className="text-text-muted block text-[10px] uppercase font-bold tracking-wider mb-2 font-mono flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-text-muted" /> Registration Fees
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-xs">
                    <span className="text-text-muted text-[10px] block uppercase font-bold tracking-wider mb-1">{activeModalEvent.clubId === "ieee" ? "IEEE Members" : "HITAM Students"}</span>
                    <span className="text-brand-orange font-bold text-sm block">{cleanString(activeModalEvent.registrationFee.hitam)}</span>
                  </div>
                  {activeModalEvent.registrationFee.nonHitam && (
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-xs">
                      <span className="text-text-muted text-[10px] block uppercase font-bold tracking-wider mb-1">{activeModalEvent.clubId === "ieee" ? "Non-IEEE / Other Colleges" : "Other Colleges"}</span>
                      <span className="text-brand-magenta font-bold text-sm block">{cleanString(activeModalEvent.registrationFee.nonHitam)}</span>
                    </div>
                  )}
                </div>
                {activeModalEvent.registrationFee.note && (
                  <div className="flex items-start gap-1.5 text-[11px] text-text-muted mt-2 font-body">
                    <Info className="w-3.5 h-3.5 text-text-muted shrink-0 mt-0.5" />
                    <span>{cleanString(activeModalEvent.registrationFee.note)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Key Highlights & Inclusions */}
            <div className="mb-6">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-3 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-text-muted" /> Key Highlights &amp; Inclusions
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeModalEvent.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs font-body text-text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5 shrink-0" />
                    <span>{cleanString(h)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Event Coordinators & Inquiries */}
            {activeModalEvent.coordinators && (
              <div className="mb-8 p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-bold flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-text-muted" /> Event Coordinators &amp; Inquiries
                  </h4>
                  {activeModalEvent.coordinators.clubEmail && (
                    <a 
                      href={`mailto:${activeModalEvent.coordinators.clubEmail}`}
                      className="text-[11px] font-mono text-brand-orange hover:underline inline-flex items-center gap-1.5 bg-brand-orange/10 px-2.5 py-1 rounded-lg border border-brand-orange/20"
                    >
                      <Mail className="w-3 h-3" />
                      <span>{activeModalEvent.coordinators.clubEmail}</span>
                    </a>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Student Coordinators */}
                  {activeModalEvent.coordinators.students && activeModalEvent.coordinators.students.length > 0 && (
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-brand-orange font-bold flex items-center gap-1.5">
                        <User className="w-3 h-3 text-brand-orange" />
                        <span>Student Coordinator{activeModalEvent.coordinators.students.length > 1 ? "s" : ""}</span>
                      </span>
                      <div className="space-y-1.5">
                        {activeModalEvent.coordinators.students.map((student, idx) => (
                          <div key={idx} className="flex flex-wrap items-center justify-between gap-1 text-[11px] text-text-secondary border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                            <span className="font-semibold text-white">{student.name}</span>
                            <div className="flex items-center gap-2.5 font-mono">
                              {student.phone && (
                                <a href={`tel:${student.phone.replace(/[^0-9+]/g, '')}`} className="text-brand-orange hover:underline inline-flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  <span>{student.phone}</span>
                                </a>
                              )}
                              {student.email && (
                                <a href={`mailto:${student.email}`} className="text-text-muted hover:text-white" title={student.email}>
                                  <Mail className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeModalEvent.coordinators.additionalFaculty?.map((faculty) => (
                    <div key={faculty.name} className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2 text-[11px]">
                      <span className="text-brand-magenta font-mono uppercase">Faculty Coordinator</span>
                      <div className="font-semibold text-white">{faculty.name}</div>
                      <div className="flex flex-wrap gap-3">
                        {faculty.phone && <a className="text-brand-magenta hover:underline" href={`tel:${faculty.phone}`}>{faculty.phone}</a>}
                        {faculty.email && <a className="text-text-muted hover:underline" href={`mailto:${faculty.email}`}>{faculty.email}</a>}
                      </div>
                    </div>
                  ))}

                  {/* Faculty Coordinator */}
                  {activeModalEvent.coordinators.faculty && (
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-brand-magenta font-bold flex items-center gap-1.5">
                        <GraduationCap className="w-3 h-3 text-brand-magenta" />
                        <span>Faculty Coordinator</span>
                      </span>
                      <div className="text-[11px] text-text-secondary space-y-1.5">
                        <div className="font-semibold text-white">{activeModalEvent.coordinators.faculty.name}</div>
                        <div className="flex flex-wrap items-center gap-3 font-mono">
                          {activeModalEvent.coordinators.faculty.phone && (
                            <a href={`tel:${activeModalEvent.coordinators.faculty.phone.replace(/[^0-9+]/g, '')}`} className="text-brand-magenta hover:underline inline-flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              <span>{activeModalEvent.coordinators.faculty.phone}</span>
                            </a>
                          )}
                          {activeModalEvent.coordinators.faculty.email && (
                            <a href={`mailto:${activeModalEvent.coordinators.faculty.email}`} className="text-text-muted hover:text-white inline-flex items-center gap-1" title={activeModalEvent.coordinators.faculty.email}>
                              <Mail className="w-3 h-3" />
                              <span className="truncate max-w-[140px]">{activeModalEvent.coordinators.faculty.email}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setActiveModalEvent(null)}
                className="px-5 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-display font-bold text-text-secondary hover:text-white transition-all"
              >
                Close
              </button>
              <a
                href={getEventRegisterUrl(activeModalEvent)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-purple hover:brightness-110 text-xs font-display font-bold text-white transition-all inline-flex items-center gap-2 shadow-[0_0_24px_rgba(255,94,0,0.4)]"
              >
                <span>Register for Event</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}
