import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowLeft, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Register Interest | ESPARTO 2026",
  description: "Register your interest for ESPARTO 2026 at HITAM.",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-[#03010b] relative overflow-hidden">
      {/* Glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-brand-orange/10 blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="md" className="relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>BACK TO HOME</span>
        </Link>

        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-orange/30 bg-surface/80 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-widest text-text-secondary uppercase">
              EARLY ACCESS & PASSES
            </span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-text-primary tracking-tight leading-[1.05] uppercase mb-4">
            JOIN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">
              ESPARTO 2026
            </span>
          </h1>
          <p className="text-text-secondary text-base font-body leading-relaxed">
            October 09–10, 2026 • HITAM Campus, Hyderabad. Register your interest for priority team registrations, hackathon tracks, and event passes.
          </p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl border border-brand-violet/30 bg-[#08041d]/90 backdrop-blur-md shadow-[0_0_40px_rgba(121,40,202,0.15)]">
          <div className="space-y-6 max-w-md mx-auto">
            <div>
              <label className="block font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta font-body text-sm"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
                College / Institution Email
              </label>
              <input
                type="email"
                placeholder="you@college.edu"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta font-body text-sm"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
                Primary Track of Interest
              </label>
              <select className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c0724] text-text-primary focus:outline-none focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta font-body text-sm">
                <option value="hackathon">Flagship 24h Hackathon</option>
                <option value="competitions">Technical Competitions & Coding</option>
                <option value="robotics">Robotics & Autonomous Systems</option>
                <option value="workshops">Masterclasses & Workshops</option>
                <option value="general">General Festival Attendee</option>
              </select>
            </div>

            <div className="pt-4">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-display font-black text-sm tracking-widest uppercase text-white bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-purple shadow-[0_0_25px_rgba(255,94,0,0.35)] hover:shadow-[0_0_35px_rgba(255,0,122,0.5)] hover:brightness-110 active:scale-95 transition-all"
              >
                <span>SUBMIT REGISTRATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-mono text-text-muted pt-2">
              <CheckCircle2 className="w-4 h-4 text-brand-orange" />
              <span>Verified HITAM Technical Fest Portal</span>
            </div>
          </div>
        </div>

      </Container>
    </main>
  );
}
