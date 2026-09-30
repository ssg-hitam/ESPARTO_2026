"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FEST_EVENTS, FestEventItem, EventCategoryType } from "@/data/events";
import { UNSTOP_ESPARTO_PASS_URL } from "@/lib/constants";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Search, 
  Trophy, 
  CheckCircle2, 
  X, 
  Ticket,
  ChevronLeft,
  ChevronRight,
  Info
} from "lucide-react";

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

const ITEMS_PER_PAGE = 6;

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategoryType>("All");
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeModalEvent, setActiveModalEvent] = useState<FestEventItem | null>(null);

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

  // Reset to first page whenever filter or search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedDay, searchQuery]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / ITEMS_PER_PAGE));
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  const hasActiveFilters = selectedCategory !== "All" || selectedDay !== "all" || searchQuery.trim() !== "";

  return (
    <main className="min-h-screen pt-4 sm:pt-6 pb-20 bg-[#040210] relative text-text-primary">
      
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
        
        {/* Compact Utility Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-brand-orange" />
              <span>HOME</span>
            </Link>
            <span className="text-white/20 text-xs">/</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-orange">
                ESPARTO 2026
              </span>
              <span className="text-xs font-display font-extrabold uppercase text-white tracking-wide">
                EVENTS &amp; COMPETITIONS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white font-bold text-[11px]">
              15 TRACKS
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange font-bold text-[11px]">
              ₹90,000+ PRIZE POOL
            </span>
            <span className="hidden sm:inline-block text-[11px] text-text-tertiary">
              OCT 09–10 • HITAM
            </span>
          </div>
        </div>

        {/* ── MASTER 2-COLUMN LAYOUT: SIDEBAR + MAIN CONTENT ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ── LEFT SIDEBAR: CATEGORIES & CONTROLS ───────────────────────────── */}
          <aside className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-28 space-y-6">
            
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

            {/* ESPARTO 2-Day Pass Notice Box */}
            <div className="p-4 rounded-2xl border border-brand-orange/30 bg-gradient-to-br from-brand-orange/15 via-[#08041d] to-[#08041d] text-xs font-mono space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-brand-orange font-bold uppercase text-[11px] tracking-wider">
                  <Ticket className="w-3.5 h-3.5" />
                  <span>2-DAY PASS – ₹700</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[9px] bg-brand-orange/20 text-brand-orange font-mono">
                  ALL-ACCESS
                </span>
              </div>
              <p className="text-text-secondary font-body text-[11px] leading-relaxed">
                Attend ANY event, competition &amp; workshop across both days without paying per-event fees.
              </p>
              <a
                href={UNSTOP_ESPARTO_PASS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-brand-orange to-brand-magenta text-white font-display font-bold text-[11px] uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,94,0,0.3)]"
              >
                <span>GET PASS ON UNSTOP</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </aside>

          {/* ── RIGHT MAIN AREA: SEARCH & 2-COLUMN EVENT CARDS ───────────────── */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            
            {/* Top Search & Filter Status Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-[#08041d]/90 border border-white/10">
              
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
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
            {paginatedEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {paginatedEvents.map((event, idx) => {
                  // Calculate actual 1-based index in the filtered list
                  const globalIdx = (currentPage - 1) * ITEMS_PER_PAGE + idx + 1;
                  const passCode = `PASS #${globalIdx.toString().padStart(3, "0")}`;

                  return (
                    <div
                      key={event.id}
                      className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#08041d]/90 backdrop-blur-md overflow-hidden hover:border-brand-violet/40 hover:shadow-[0_0_25px_rgba(121,80,242,0.15)] transition-all duration-200"
                    >
                      {/* Card Content Wrapper */}
                      <div className="p-4 sm:p-5">
                        
                        {/* Top Meta Bar: PASS #XXX & Category Badge */}
                        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
                          <span className="font-mono text-xs font-bold tracking-wider text-brand-orange">
                            {passCode}
                          </span>
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-white/15 bg-white/5 text-text-secondary">
                            {event.category}
                          </span>
                        </div>

                        {/* Event Visual Banner Box */}
                        <div className="relative w-full h-36 rounded-xl overflow-hidden mb-4 border border-white/10 bg-gradient-to-br from-black/80 via-[#0e0a2b] to-[#1a0e38] flex flex-col justify-between p-3.5 group-hover:border-white/20 transition-all">
                          
                          {/* Banner Top Row: Organizing Chapter */}
                          <div className="flex items-center justify-between gap-2 z-10">
                            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                              <div className="relative w-4 h-4 rounded-full overflow-hidden bg-white shrink-0">
                                <Image
                                  src={event.clubLogo}
                                  alt={event.club}
                                  fill
                                  className="object-contain p-0.5"
                                />
                              </div>
                              <span className="font-mono text-[10px] text-text-secondary font-medium truncate max-w-[140px]">
                                {event.club}
                              </span>
                            </div>

                            {/* Prize Badge if cash prize declared */}
                            {event.prizePool && event.prizePool !== "Certifications & GDG Kits" && (
                              <div className="flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full text-amber-300 font-mono font-bold text-[10px] shrink-0">
                                <Trophy className="w-3 h-3 text-amber-400" />
                                <span>{event.prizePool}</span>
                              </div>
                            )}
                          </div>

                          {/* Banner Center: Distinct Title Representation */}
                          <div className="z-10 mt-auto">
                            <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">
                              {event.date}
                            </span>
                            <h3 className="font-display font-black text-lg text-white leading-tight drop-shadow-md truncate">
                              {event.title}
                            </h3>
                          </div>

                          {/* Subtle Graphic Grid Accent */}
                          <div 
                            className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"
                            aria-hidden="true"
                          />
                        </div>

                        {/* Title and Short Overview */}
                        <div className="mb-4">
                          <h2 className="font-display font-bold text-lg text-text-primary tracking-tight group-hover:text-white transition-colors mb-1.5">
                            {event.title}
                          </h2>
                          <p className="text-xs text-text-secondary font-body line-clamp-2 leading-relaxed">
                            {event.description}
                          </p>
                        </div>

                        {/* Registration Specs (Date, Time, Team Size, Fee) */}
                        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono p-2.5 rounded-xl bg-black/40 border border-white/5 mb-3">
                          <div>
                            <span className="text-[9px] text-text-muted uppercase block">SCHEDULE</span>
                            <span className="text-white font-medium truncate block">{event.date}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-text-muted uppercase block">TIMINGS</span>
                            <span className="text-white font-medium truncate block">{event.timings}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-text-muted uppercase block">TEAM SIZE</span>
                            <span className="text-white font-medium truncate block">{event.teamSize}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-text-muted uppercase block">HITAM ENTRY</span>
                            <span className="text-brand-orange font-bold truncate block">{event.registrationFee.hitam}</span>
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

                      {/* ── CARD BOTTOM ACTION: SOLID "REGISTER HERE ▶" BUTTON ── */}
                      <Link
                        href={`/register?event=${event.slug}`}
                        className="w-full py-3 px-4 font-mono font-black text-xs uppercase tracking-widest text-center text-white bg-gradient-to-r from-brand-orange to-brand-magenta hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-[0_-2px_10px_rgba(0,0,0,0.4)]"
                      >
                        <span>REGISTER HERE</span>
                        <span>▶</span>
                      </Link>

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

            {/* ── PAGINATION CONTROLS (AS SHOWN IN REFERENCE DESIGN) ──────────── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 p-3 rounded-2xl bg-[#08041d]/90 border border-white/10 font-mono text-xs">
                
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none text-text-secondary hover:text-white transition-all flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>PREV</span>
                </button>

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isActive = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg font-bold transition-all ${
                        isActive
                          ? "bg-brand-orange text-white shadow-[0_0_12px_rgba(255,94,0,0.4)]"
                          : "border border-white/10 bg-white/5 text-text-secondary hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {pageNum.toString().padStart(2, "0")}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none text-text-secondary hover:text-white transition-all flex items-center gap-1"
                >
                  <span>NEXT</span>
                  <ChevronRight className="w-3.5 h-3.5" />
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

            {/* Prize Pool Breakdown (if declared) */}
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

            {/* Track Overview */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-2">Track Overview</h4>
              <p className="text-sm font-body text-text-secondary leading-relaxed">
                {activeModalEvent.description}
              </p>
            </div>

            {/* Essential Registration Details */}
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

            {/* Key Highlights */}
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
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-purple hover:brightness-110 text-xs font-display font-bold text-white transition-all inline-flex items-center gap-1.5 shadow-[0_0_24px_rgba(255,94,0,0.4)]"
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
