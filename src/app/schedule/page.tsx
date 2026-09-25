"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

const DAY1 = [
  "09:00 AM — Opening Ceremony & Keynote",
  "11:00 AM — 24-Hour Hackathon Commences",
  "02:00 PM — Technical Competitions (Round 1)",
];
const DAY2 = [
  "11:00 AM — Hackathon Code Freeze & Jury Demos",
  "01:30 PM — Robotics Arena Grand Finals",
  "04:30 PM — Awards & Valedictory Ceremony",
];

export default function SchedulePage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-[#040210] relative overflow-hidden">
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-violet/10 blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">
        <FadeUp delay={0}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>BACK TO HOME</span>
          </Link>
        </FadeUp>

        <FadeUp delay={0.1} distance={55}>
          <div className="max-w-3xl mb-16">
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
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Day 1 */}
          <FadeUp delay={0.15} distance={50}>
            <div className="p-8 rounded-3xl border border-white/10 bg-[#08041d]/80 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-5 h-5 text-brand-orange" />
                <span className="font-mono text-sm font-bold text-brand-orange uppercase tracking-wider">
                  DAY 01 // OCT 09, 2026
                </span>
              </div>
              <h2 className="font-display font-bold text-2xl text-text-primary uppercase mb-4">
                INAUGURATION &amp; SPRINT LAUNCH
              </h2>
              <div className="space-y-3">
                {DAY1.map((item, i) => (
                  <FadeUp key={i} delay={0.25 + i * 0.08} distance={20} threshold={0.05}>
                    <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3 font-mono text-xs text-text-secondary">
                      <Clock className="w-4 h-4 text-brand-magenta shrink-0" />
                      <span>{item}</span>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Day 2 */}
          <FadeUp delay={0.25} distance={50}>
            <div className="p-8 rounded-3xl border border-white/10 bg-[#08041d]/80 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-5 h-5 text-brand-magenta" />
                <span className="font-mono text-sm font-bold text-brand-magenta uppercase tracking-wider">
                  DAY 02 // OCT 10, 2026
                </span>
              </div>
              <h2 className="font-display font-bold text-2xl text-text-primary uppercase mb-4">
                SHOWDOWN &amp; VALEDICTORY
              </h2>
              <div className="space-y-3">
                {DAY2.map((item, i) => (
                  <FadeUp key={i} delay={0.35 + i * 0.08} distance={20} threshold={0.05}>
                    <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3 font-mono text-xs text-text-secondary">
                      <Clock className="w-4 h-4 text-brand-violet shrink-0" />
                      <span>{item}</span>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </Container>
    </main>
  );
}
