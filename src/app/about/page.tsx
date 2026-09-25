"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { FEST_INFO } from "@/lib/constants";
import { ArrowLeft, ArrowRight, Lightbulb, Target, Rocket } from "lucide-react";

export default function AboutPage() {
  const pillars = [
    {
      icon: <Lightbulb className="w-6 h-6 text-brand-orange" />,
      color: "brand-orange",
      label: "01 // VISION",
      title: "IGNITE CREATIVITY",
      desc: "Fostering an ecosystem where raw creative ideas are given the platform, mentorship, and space to take shape.",
    },
    {
      icon: <Target className="w-6 h-6 text-brand-magenta" />,
      color: "brand-magenta",
      label: "02 // MISSION",
      title: "RIGOROUS ENGINEERING",
      desc: "Pushing boundaries through intense hackathons, hardware robotics battles, and deep technical challenges.",
    },
    {
      icon: <Rocket className="w-6 h-6 text-brand-violet" />,
      color: "brand-violet",
      label: "03 // IMPACT",
      title: "COMMUNITY REACH",
      desc: "Connecting students, industry mentors, and innovative tech leaders in a collaborative festival experience.",
    },
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[#040210] relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-brand-purple/10 blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">
        {/* Back link */}
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
        <FadeUp delay={0.1} distance={50}>
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-violet/30 bg-surface/80 mb-5">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" aria-hidden="true" />
              <span className="font-mono text-xs font-bold tracking-widest text-text-secondary uppercase">
                THE MANIFESTO
              </span>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-text-primary tracking-tight leading-[1.05] uppercase mb-6">
              ABOUT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">
                ESPARTO 2026
              </span>
            </h1>
            <p className="text-text-secondary text-base sm:text-lg font-body leading-relaxed border-l-2 border-brand-magenta/40 pl-5">
              {FEST_INFO.name} is the premier annual technical festival of{" "}
              {FEST_INFO.institution.name} ({FEST_INFO.institution.shortName}).
              Engineered as a launchpad for future technologists, innovators, and creators.
            </p>
          </div>
        </FadeUp>

        {/* 3 Pillars — staggered */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pillars.map((p, i) => (
            <FadeUp key={p.label} delay={0.1 + i * 0.12} distance={50}>
              <div className="p-8 rounded-2xl border border-white/10 bg-[#08041d]/80 backdrop-blur-md h-full">
                <div className={`w-12 h-12 rounded-xl border border-${p.color}/40 bg-${p.color}/10 flex items-center justify-center mb-6`}>
                  {p.icon}
                </div>
                <span className={`font-mono text-xs font-bold text-${p.color} tracking-widest uppercase`}>
                  {p.label}
                </span>
                <h2 className="font-display font-bold text-2xl text-text-primary uppercase mt-2 mb-3">
                  {p.title}
                </h2>
                <p className="text-text-secondary text-sm font-body leading-relaxed">{p.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* CTA */}
        <FadeUp delay={0.1} threshold={0.2}>
          <div className="p-10 rounded-2xl border border-brand-violet/30 bg-gradient-to-r from-[#0d0728] to-[#08031a] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-2xl text-text-primary uppercase mb-2">
                READY TO EXPLORE EVENTS?
              </h3>
              <p className="text-text-secondary text-sm font-body">
                Browse all technical tracks, workshops, and competitions.
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-display font-bold text-xs sm:text-sm tracking-wider uppercase text-white bg-gradient-to-r from-brand-orange to-brand-magenta shadow-[0_0_20px_rgba(255,94,0,0.3)] hover:brightness-110 transition-all shrink-0"
            >
              <span>VIEW ALL EVENTS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeUp>
      </Container>
    </main>
  );
}
