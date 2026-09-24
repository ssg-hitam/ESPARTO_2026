import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FEST_INFO } from "@/lib/constants";
import { ArrowLeft, MapPin, Navigation, Compass, Globe } from "lucide-react";

export const metadata = {
  title: "Venue & Campus | ESPARTO 2026",
  description: "Location, campus details, and directions for ESPARTO 2026 at HITAM Hyderabad.",
};

export default function VenuePage() {
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
              CAMPUS & LOCATION
            </span>
          </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-[#08041d]/80 backdrop-blur-md flex flex-col justify-between">
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
                  <span>State-of-the-art Innovation Centers & Auditoriums</span>
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

          <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-[#08041d]/80 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-6 h-6 text-brand-magenta" />
                <h2 className="font-display font-bold text-2xl text-text-primary uppercase">HOW TO REACH</h2>
              </div>
              <ul className="space-y-4 text-sm font-body text-text-secondary leading-relaxed">
                <li className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                  <strong className="text-text-primary block font-display uppercase text-xs mb-1">From Rajiv Gandhi Int&apos;l Airport (HYD)</strong>
                  Direct transit via Outer Ring Road (ORR) towards Medchal / Gowdavelly.
                </li>
                <li className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                  <strong className="text-text-primary block font-display uppercase text-xs mb-1">From Secunderabad Railway Station</strong>
                  Local MMTS or bus transit to Gowdavelly / Medchal highway junction.
                </li>
              </ul>
            </div>
          </div>
        </div>

      </Container>
    </main>
  );
}
