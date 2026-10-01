"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { ArrowLeft, UserCheck } from "lucide-react";

export default function GuestsPage() {
  return (
    <main className="min-h-screen pt-6 sm:pt-8 pb-24 bg-[#040210] relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-brand-magenta/8 blur-[180px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">
        <FadeUp delay={0}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-brand-orange" />
            <span>BACK TO HOME</span>
          </Link>
        </FadeUp>

        <FadeUp delay={0.1} distance={55}>
          <div className="max-w-3xl mb-16">
            <h1 className="font-display font-black text-4xl sm:text-6xl text-text-primary tracking-tight leading-[1.05] uppercase mb-6">
              DISTINGUISHED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">
                GUESTS
              </span>
            </h1>
            <p className="text-text-secondary text-base sm:text-lg font-body leading-relaxed border-l-2 border-brand-magenta/40 pl-5">
              Industry visionaries, engineering leaders, and academic pioneers joining ESPARTO 2026.
              Official lineup announcements dropping soon.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.2} distance={50}>
          <div className="p-12 rounded-3xl border border-brand-violet/30 bg-[#08041d]/80 backdrop-blur-md text-center max-w-2xl mx-auto">
            <FadeUp delay={0.3} distance={30}>
              <div className="w-16 h-16 rounded-2xl border border-brand-magenta/40 bg-brand-magenta/10 flex items-center justify-center mx-auto mb-6">
                <UserCheck className="w-8 h-8 text-brand-magenta" />
              </div>
            </FadeUp>
            <FadeUp delay={0.38} distance={20}>
              <h2 className="font-display font-bold text-2xl text-text-primary uppercase mb-3">
                LINEUP REVEAL IN PROGRESS
              </h2>
            </FadeUp>
            <FadeUp delay={0.44} distance={20}>
              <p className="text-text-secondary text-sm font-body leading-relaxed mb-8">
                The full guest and keynote speaker roster will be announced closer to the festival dates.
                Follow our official channels for real-time updates.
              </p>
            </FadeUp>
            <FadeUp delay={0.5} distance={20}>
              <Link
                href="/#about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-xs uppercase tracking-wider text-white border border-white/20 bg-white/5 hover:bg-brand-purple/20 transition-all"
              >
                <UserCheck className="w-4 h-4" />
                <span>LEARN ABOUT ESPARTO</span>
              </Link>
            </FadeUp>
          </div>
        </FadeUp>
      </Container>
    </main>
  );
}
