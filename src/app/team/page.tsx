import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowLeft, Users, Shield } from "lucide-react";

export const metadata = {
  title: "Organizing Team | ESPARTO 2026",
  description: "Meet the student coordinators and faculty mentors powering ESPARTO 2026 at HITAM.",
};

export default function TeamPage() {
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
              ORGANIZING COMMITTEE
            </span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-text-primary tracking-tight leading-[1.05] uppercase mb-6">
            THE TEAM BEHIND <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">
              ESPARTO 2026
            </span>
          </h1>
          <p className="text-text-secondary text-base sm:text-lg font-body leading-relaxed border-l-2 border-brand-orange/40 pl-5">
            Student coordinators, technical leads, and faculty mentors from Hyderabad Institute of Technology and Management (HITAM).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-3xl border border-white/10 bg-[#08041d]/80 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-brand-orange" />
              <h2 className="font-display font-bold text-2xl text-text-primary uppercase">FACULTY MENTORS</h2>
            </div>
            <p className="text-text-secondary text-sm font-body leading-relaxed">
              Advisors providing institutional guidance, academic excellence standards, and industry coordination across all technical disciplines.
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-white/10 bg-[#08041d]/80 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-brand-magenta" />
              <h2 className="font-display font-bold text-2xl text-text-primary uppercase">STUDENT CORE</h2>
            </div>
            <p className="text-text-secondary text-sm font-body leading-relaxed">
              The driving engine orchestrating technical competitions, hackathon infrastructure, stage production, and attendee experience.
            </p>
          </div>
        </div>

      </Container>
    </main>
  );
}
