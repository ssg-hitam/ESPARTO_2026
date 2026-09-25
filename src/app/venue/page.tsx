"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { FEST_INFO } from "@/lib/constants";
import { ArrowLeft, MapPin, Navigation, Compass, Globe } from "lucide-react";

const directions = [
  {
    from: "From Rajiv Gandhi Int'l Airport (HYD)",
    desc: "Direct transit via Outer Ring Road (ORR) towards Medchal / Gowdavelly.",
  },
  {
    from: "From Secunderabad Railway Station",
    desc: "Local MMTS or bus transit to Gowdavelly / Medchal highway junction.",
  },
];

export default function VenuePage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-[#040210] relative overflow-hidden">
      <div
        className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-brand-orange/8 blur-[160px] pointer-events-none"
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
              FESTIVAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">
                VENUE
              </span>
            </h1>
            <p className="text-text-secondary text-base sm:text-lg font-body leading-relaxed border-l-2 border-brand-orange/40 pl-5">
              Hosted at the green, sustainable campus of {FEST_INFO.institution.name} in Hyderabad.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Campus card */}
          <FadeUp delay={0.15} distance={50}>
            <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-[#08041d]/80 backdrop-blur-md flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-brand-orange" />
                  <h2 className="font-display font-bold text-2xl text-text-primary uppercase">HITAM CAMPUS</h2>
                </div>
                <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">ADDRESS</p>
                <p className="text-text-secondary text-sm font-body leading-relaxed mb-6">
                  {FEST_INFO.institution.address}
                </p>
                <div className="space-y-3 font-mono text-xs text-text-muted">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-brand-magenta" />
                    <span>Eco-friendly Green Campus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-brand-violet" />
                    <span>State-of-the-art Innovation Centers &amp; Auditoriums</span>
                  </div>
                </div>
              </div>
              <div className="pt-8 border-t border-white/10 mt-8">
                <a
                  href="https://maps.google.com/?q=HITAM+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-orange to-brand-magenta hover:brightness-110 transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>OPEN IN GOOGLE MAPS</span>
                </a>
              </div>
            </div>
          </FadeUp>

          {/* Directions card */}
          <FadeUp delay={0.25} distance={50}>
            <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-[#08041d]/80 backdrop-blur-md flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-6 h-6 text-brand-magenta" />
                  <h2 className="font-display font-bold text-2xl text-text-primary uppercase">HOW TO REACH</h2>
                </div>
                <ul className="space-y-4 text-sm font-body text-text-secondary leading-relaxed">
                  {directions.map((d, i) => (
                    <FadeUp key={i} delay={0.3 + i * 0.1} distance={20} threshold={0.05}>
                      <li className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                        <strong className="text-text-primary block font-display uppercase text-xs mb-1">
                          {d.from}
                        </strong>
                        {d.desc}
                      </li>
                    </FadeUp>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>
        </div>
      </Container>
    </main>
  );
}
