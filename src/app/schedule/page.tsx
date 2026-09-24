import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

export const metadata = {
  title: "Schedule & Timeline | ESPARTO 2026",
  description: "Festival itinerary and schedule breakdown for ESPARTO 2026 at HITAM.",
};

export default function SchedulePage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-[#040210] relative overflow-hidden">
      <Container size="lg" className="relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>BACK TO HOME</span>
        </Link>

        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-violet/30 bg-surface/80 mb-5">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" aria-hidden="true" />
            <span className="font-mono text-xs font-bold tracking-widest text-text-secondary uppercase">
              FESTIVAL TIMELINE
            </span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-text-primary tracking-tight leading-[1.05] uppercase mb-6">
            EVENT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">
              SCHEDULE
            </span>
          </h1>
          <p className="text-text-secondary text-base sm:text-lg font-body leading-relaxed border-l-2 border-brand-magenta/40 pl-5">
            Two days of non-stop coding, hardware engineering, keynote panels, and project demonstrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Day 1 */}
          <div className="p-8 rounded-3xl border border-white/10 bg-[#08041d]/80 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-5 h-5 text-brand-orange" />
              <span className="font-mono text-sm font-bold text-brand-orange uppercase tracking-wider">DAY 01 // OCT 09, 2026</span>
            </div>
            <h2 className="font-display font-bold text-2xl text-text-primary uppercase mb-4">INAUGURATION & SPRINT LAUNCH</h2>
            <div className="space-y-4 font-mono text-xs text-text-secondary">
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-magenta" />
                <span>09:00 AM — Opening Ceremony & Keynote</span>
              </div>
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-magenta" />
                <span>11:00 AM — 24-Hour Hackathon Commences</span>
              </div>
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-magenta" />
                <span>02:00 PM — Technical Competitions (Round 1)</span>
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="p-8 rounded-3xl border border-white/10 bg-[#08041d]/80 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-5 h-5 text-brand-magenta" />
              <span className="font-mono text-sm font-bold text-brand-magenta uppercase tracking-wider">DAY 02 // OCT 10, 2026</span>
            </div>
            <h2 className="font-display font-bold text-2xl text-text-primary uppercase mb-4">SHOWDOWN & VALEDICTORY</h2>
            <div className="space-y-4 font-mono text-xs text-text-secondary">
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-violet" />
                <span>11:00 AM — Hackathon Code Freeze & Jury Demos</span>
              </div>
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-violet" />
                <span>01:30 PM — Robotics Arena Grand Finals</span>
              </div>
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-violet" />
                <span>04:30 PM — Awards & Valedictory Ceremony</span>
              </div>
            </div>
          </div>

        </div>

      </Container>
    </main>
  );
}
