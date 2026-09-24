import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowLeft, Sparkles, UserCheck } from "lucide-react";

export const metadata = {
  title: "Guests & Speakers | ESPARTO 2026",
  description: "Distinguished keynote speakers, judges, and tech leaders at ESPARTO 2026.",
};

export default function GuestsPage() {
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
            <span className="w-2 h-2 rounded-full bg-brand-magenta animate-pulse" aria-hidden="true" />
            <span className="font-mono text-xs font-bold tracking-widest text-text-secondary uppercase">
              SPEAKERS & JURY
            </span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-text-primary tracking-tight leading-[1.05] uppercase mb-6">
            DISTINGUISHED <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">
              GUESTS
            </span>
          </h1>
          <p className="text-text-secondary text-base sm:text-lg font-body leading-relaxed border-l-2 border-brand-magenta/40 pl-5">
            Industry visionaries, engineering leaders, and academic pioneers joining ESPARTO 2026. Official lineup announcements dropping soon.
          </p>
        </div>

        <div className="p-12 rounded-3xl border border-brand-violet/30 bg-[#08041d]/80 backdrop-blur-md text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl border border-brand-magenta/40 bg-brand-magenta/10 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-brand-magenta animate-pulse" />
          </div>
          <h2 className="font-display font-bold text-2xl text-text-primary uppercase mb-3">LINEUP REVEAL IN PROGRESS</h2>
          <p className="text-text-secondary text-sm font-body leading-relaxed mb-8">
            The full guest and keynote speaker roster will be announced closer to the festival dates. Follow our official channels for real-time updates.
          </p>
          <Link
            href="/#about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-xs uppercase tracking-wider text-white border border-white/20 bg-white/5 hover:bg-brand-purple/20 transition-all"
          >
            <UserCheck className="w-4 h-4" />
            <span>LEARN ABOUT ESPARTO</span>
          </Link>
        </div>

      </Container>
    </main>
  );
}
