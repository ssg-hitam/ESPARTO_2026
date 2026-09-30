"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Mail, 
  Phone 
} from "lucide-react";

const SPONSOR_PREVIEWS = [
  {
    tier: "BRONZE",
    price: "₹10,000",
    color: "from-amber-600 to-amber-700",
    badge: "border-amber-600/40 text-amber-400 bg-amber-600/10",
    desc: "Logo on all festival banners, social media promotion & 1 campus banner.",
    perks: ["Logos on all banners", "Social media promotion", "1 Display banner on campus", "Digital boards promotion"]
  },
  {
    tier: "SILVER",
    price: "₹20,000",
    slots: "Max 10 Slots",
    popular: true,
    color: "from-slate-300 via-gray-100 to-zinc-400",
    badge: "border-slate-300/40 text-slate-200 bg-slate-300/10",
    desc: "Standard exhibition stall space, 2 campus banners & priority digital display.",
    perks: ["Stall space for product demo", "2 Display banners on campus", "10s per 60s digital boards", "Memento & Certificate"]
  },
  {
    tier: "GOLD",
    price: "₹30,000",
    slots: "Max 5 Slots",
    color: "from-yellow-400 via-amber-300 to-yellow-600",
    badge: "border-amber-400/50 text-amber-300 bg-amber-400/10",
    desc: "Prime courtyard exhibition stall, stage speaking slot & 3 banners.",
    perks: ["Prime courtyard exhibition stall", "5–10 mins stage speaking slot", "3 Display banners on campus", "VIP executive delegate passes"]
  },
  {
    tier: "PLATINUM",
    price: "₹50,000",
    slots: "Max 2 Slots",
    color: "from-brand-orange via-brand-magenta to-brand-violet",
    badge: "border-brand-orange/50 text-white bg-brand-orange/20",
    desc: "Title co-branding, exclusive keynote address & 5 main stage banners.",
    perks: ["Title co-branding across fest", "15 mins keynote stage address", "5 Main stage banners", "Grand leadership felicitation"]
  }
];

export function SponsorsPreviewSection() {
  return (
    <section
      id="sponsors"
      aria-label="Sponsors and Brand Partners"
      className="relative py-20 sm:py-28 bg-[#040112] overflow-hidden border-b border-brand-violet/15"
    >
      {/* Background Lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-brand-magenta/10 blur-[150px] pointer-events-none mix-blend-screen"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-orange">
                CALL FOR PARTNERSHIPS
              </span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase leading-[1.1]">
              SPONSOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">ESPARTO 2026</span>
            </h2>

            <p className="text-text-secondary text-xs sm:text-sm font-body mt-2 max-w-2xl leading-relaxed">
              Previously part of HITAM&apos;s annual festival Elysian, ESPARTO has evolved into an independent flagship national technical festival. Showcase your brand to 2,000+ budding engineers and tech innovators.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              href="/sponsors"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-orange to-brand-magenta hover:brightness-110 shadow-[0_0_20px_rgba(255,94,0,0.35)] transition-all"
            >
              <span>VIEW FULL DELIVERABLES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Sponsorship Tier Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {SPONSOR_PREVIEWS.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col justify-between p-6 rounded-2xl bg-[#08041d]/85 border border-white/10 hover:border-brand-orange/40 hover:bg-[#0c0628] transition-all duration-300 group ${
                item.popular ? "shadow-[0_0_25px_rgba(255,94,0,0.15)] border-brand-orange/30" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider ${item.badge}`}>
                    {item.tier}
                  </span>
                  {item.slots && (
                    <span className="text-[10px] font-mono text-text-muted">
                      {item.slots}
                    </span>
                  )}
                </div>

                <div className="mb-2">
                  <span className="font-display font-black text-3xl text-white tracking-tight">
                    {item.price}
                  </span>
                </div>

                <p className="text-text-secondary text-xs font-body leading-relaxed mb-4">
                  {item.desc}
                </p>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  {item.perks.map((perk, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                      <span className="text-text-muted font-body leading-tight">
                        {perk}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-white/5">
                <a
                  href={`mailto:ssg@hitam.org?cc=ssg.iiic@hitam.org&subject=Inquiry: ${item.tier} Sponsorship for ESPARTO 2026`}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all"
                >
                  <span>CONNECT NOW</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Contact Bar */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0c0628] to-[#060317] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-4 text-text-muted">
            <span className="text-white font-bold uppercase">PARTNERSHIP DESK:</span>
            <a 
              href="mailto:ssg@hitam.org?cc=ssg.iiic@hitam.org" 
              className="flex items-center gap-1.5 hover:text-brand-orange transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-brand-orange" />
              <span>ssg@hitam.org</span>
            </a>
            <span className="text-white/20">•</span>
            <a 
              href="mailto:ssg.iiic@hitam.org" 
              className="hover:text-brand-orange transition-colors"
            >
              <span>ssg.iiic@hitam.org</span>
            </a>
            <span className="text-white/20">•</span>
            <a 
              href="tel:+919059111595" 
              className="flex items-center gap-1.5 text-emerald-400 hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Tejal: +91 90591 11595</span>
            </a>
          </div>

          <Link
            href="/sponsors"
            className="text-brand-orange font-bold uppercase tracking-wider hover:underline inline-flex items-center gap-1"
          >
            <span>LEARN MORE ABOUT SPONSORSHIP</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </Container>
    </section>
  );
}
