"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { EVENT_TRACKS } from "@/data/events";
import { ArrowLeft, ArrowUpRight, Terminal, Sparkles, Cpu, Lightbulb, CheckCircle2 } from "lucide-react";

function getTrackIcon(id: string) {
  switch (id) {
    case "hackathons": return <Terminal className="w-6 h-6 text-brand-orange" />;
    case "competitions": return <Sparkles className="w-6 h-6 text-brand-magenta" />;
    case "robotics": return <Cpu className="w-6 h-6 text-brand-violet" />;
    case "workshops": return <Lightbulb className="w-6 h-6 text-cyan-400" />;
    default: return <Terminal className="w-6 h-6 text-brand-violet" />;
  }
}

export default function EventsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-[#040210] relative overflow-hidden">
      <div
        className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-brand-magenta/10 blur-[170px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">
        {/* Back */}
        <FadeUp delay={0}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>BACK TO HOME</span>
          </Link>
        </FadeUp>

        {/* Header */}
        <FadeUp delay={0.1} distance={55}>
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-violet/30 bg-surface/80 mb-5">
              <span className="w-2 h-2 rounded-full bg-brand-magenta animate-pulse" aria-hidden="true" />
              <span className="font-mono text-xs font-bold tracking-widest text-text-secondary uppercase">
                FESTIVAL DIRECTORY
              </span>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-text-primary tracking-tight leading-[1.05] uppercase mb-6">
              ALL EVENTS &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">
                EXPERIENCES
              </span>
            </h1>
            <p className="text-text-secondary text-base sm:text-lg font-body leading-relaxed border-l-2 border-brand-orange/40 pl-5">
              Complete technical competition tracks, hackathons, and masterclasses across two days of intense engineering.
            </p>
          </div>
        </FadeUp>

        {/* Event cards — staggered grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {EVENT_TRACKS.map((track, i) => (
            <FadeUp key={track.id} delay={0.1 + i * 0.1} distance={50}>
              <div className="relative p-8 sm:p-10 rounded-3xl border border-white/10 bg-[#08041d]/80 backdrop-blur-md flex flex-col justify-between group hover:border-brand-magenta/50 hover:shadow-[0_0_30px_rgba(255,0,122,0.15)] transition-all duration-300 h-full">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl border border-white/10 bg-white/5">
                      {getTrackIcon(track.id)}
                    </div>
                    <span className="font-mono text-xs font-bold tracking-widest px-3 py-1 rounded-full border border-white/10 bg-white/5 text-text-secondary uppercase">
                      {track.category}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-brand-magenta uppercase tracking-widest">
                    TRACK {track.number}
                  </span>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-text-primary uppercase mt-1 mb-3 group-hover:text-white transition-colors">
                    {track.title}
                  </h2>
                  <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-4">
                    {track.tagline}
                  </p>
                  <p className="text-text-secondary text-sm font-body leading-relaxed mb-6">
                    {track.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {track.highlights.map((h) => (
                      <span key={h} className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-xs text-text-muted">OCTOBER 09–10, 2026</span>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-display font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-orange to-brand-magenta hover:brightness-110 transition-all"
                  >
                    <span>REGISTER</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </main>
  );
}
