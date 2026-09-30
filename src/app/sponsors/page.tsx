"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Award, 
  Building2, 
} from "lucide-react";

interface SponsorshipTier {
  id: string;
  name: string;
  price: string;
  priceNumeric: number;
  slots: string;
  tagline: string;
  popular?: boolean;
  accent: string;
  badgeBg: string;
  borderCol: string;
  features: string[];
}

const TIERS: SponsorshipTier[] = [
  {
    id: "bronze",
    name: "BRONZE PARTNER",
    price: "₹10,000",
    priceNumeric: 10000,
    slots: "Available",
    tagline: "Ideal for emerging tech startups and local developer ecosystem partners.",
    accent: "from-amber-600 to-amber-700",
    badgeBg: "bg-amber-600/20 text-amber-400 border-amber-500/30",
    borderCol: "border-amber-600/30 hover:border-amber-500/60",
    features: [
      "Logo on all official ESPARTO banners & posters",
      "Social media shoutouts across official SSG & ESPARTO handles",
      "1 company promotional banner on campus grounds",
      "Digital display board promotion (5s per 60s loop)",
      "Brochure / promotional flyer distribution in delegate kits",
      "Official Sponsor Certificate of Appreciation"
    ]
  },
  {
    id: "silver",
    name: "SILVER PARTNER",
    price: "₹20,000",
    priceNumeric: 20000,
    slots: "Max: 10 Slots",
    tagline: "Balanced branding across digital and physical festival arenas with product showcase.",
    popular: true,
    accent: "from-slate-300 via-gray-100 to-zinc-400",
    badgeBg: "bg-slate-300/20 text-slate-200 border-slate-300/40",
    borderCol: "border-slate-400/40 hover:border-slate-300",
    features: [
      "Logo prominently on all ESPARTO event backdrops & banners",
      "Dedicated social media spotlight reels & feature posts",
      "2 company promotional banners across high-traffic zones",
      "Digital display boards on-campus (10s per 60s loop)",
      "Standard stall space for product & services demo",
      "Logo on website footer & official registration portal",
      "Official Memento & Certificate of Partnership"
    ]
  },
  {
    id: "gold",
    name: "GOLD PARTNER",
    price: "₹30,000",
    priceNumeric: 30000,
    slots: "Max: 5 Slots",
    tagline: "High-impact brand prominence with prime exhibition stalls and speaking slot.",
    accent: "from-yellow-400 via-amber-300 to-yellow-600",
    badgeBg: "bg-amber-400/20 text-amber-300 border-amber-400/50",
    borderCol: "border-amber-400/50 hover:border-amber-300 shadow-[0_0_35px_rgba(251,191,36,0.15)]",
    features: [
      "Priority branding: Large logo on main stage backdrop & banners",
      "Extensive campaign across all Instagram, LinkedIn & YouTube handles",
      "3 company promotional banners placed at prime central locations",
      "Digital display boards on-campus (15s per 60s loop)",
      "Prime exhibition stall space in central technical courtyard",
      "5–10 minutes stage address during prime symposium slot",
      "VIP delegate passes for company executives (4 passes)",
      "On-stage honouring & official memento presentation"
    ]
  },
  {
    id: "platinum",
    name: "PLATINUM / TITLE",
    price: "₹50,000",
    priceNumeric: 50000,
    slots: "Max: 2 Slots",
    tagline: "The premier partnership tier: co-branding across all 15+ tracks & keynote address.",
    accent: "from-brand-orange via-brand-magenta to-brand-violet",
    badgeBg: "bg-gradient-to-r from-brand-orange/20 to-brand-magenta/20 text-white border-brand-orange/40",
    borderCol: "border-brand-magenta/40 hover:border-brand-orange/80 shadow-[0_0_40px_rgba(255,0,122,0.2)]",
    features: [
      "Title Co-branding: 'ESPARTO 2026 in association with [Your Brand]'",
      "Top-tier logo dominance across all prints, banners & digital media",
      "Exclusive sponsored hackathon track or arena naming rights",
      "5 company display banners in main auditorium & quadrangle",
      "Digital display boards priority broadcast (20s per 60s loop)",
      "Premium interactive exhibition stall space with power hookups",
      "15 minutes keynote stage address for brand promotion",
      "Special felicitation ceremony with HITAM Chairman & Leadership"
    ]
  }
];

const HISTORICAL_FOOTFALL = [
  { year: "Elysian 2019", count: 400, percent: "20%", note: "Annual College Fest" },
  { year: "Elysian 2022", count: 653, percent: "33%", note: "Post-Pandemic Resurgence" },
  { year: "Elysian 2023", count: 1100, percent: "55%", note: "Multi-Campus Engagement" },
  { year: "ESPARTO 2026", count: "2,000+", percent: "100%", note: "Dedicated Flagship Technical Fest", highlight: true },
];

const MATRIX_ROWS = [
  { feature: "Logo on all official festival banners", bronze: "Yes", silver: "Yes", gold: "Yes", platinum: "Yes (Top Tier)" },
  { feature: "Virtual promotion on social media handles", bronze: "Yes", silver: "Yes", gold: "Yes", platinum: "Exclusive Reels" },
  { feature: "Company display banners on fest grounds", bronze: "1 Banner", silver: "2 Banners", gold: "3 Banners", platinum: "5 Banners" },
  { feature: "On-campus digital display board airtime", bronze: "5s / 60s", silver: "10s / 60s", gold: "15s / 60s", platinum: "20s / 60s" },
  { feature: "Exhibition stall space for product demo", bronze: "Flyer Desk", silver: "Standard Stall", gold: "Prime Courtyard Stall", platinum: "Premium Interactive Booth" },
  { feature: "Stage time for brand promotion & keynote", bronze: "—", silver: "—", gold: "5–10 Mins", platinum: "15 Mins Keynote" },
  { feature: "On-stage honouring by HITAM Leadership", bronze: "Certificate", silver: "Memento & Cert", gold: "Felicitation & Memento", platinum: "Grand Felicitation" },
  { feature: "Complimentary VIP All-Access Passes", bronze: "2 Passes", silver: "3 Passes", gold: "5 Passes", platinum: "10 Passes" },
];

export default function SponsorsPage() {
  const [activeTab, setActiveTab] = useState<"tiers" | "matrix" | "impact">("tiers");

  return (
    <main className="min-h-screen pt-28 pb-24 bg-[#03010b] relative overflow-hidden text-text-primary">
      
      {/* Background Atmosphere Lighting */}
      <div 
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full bg-gradient-to-b from-brand-orange/15 via-brand-magenta/10 to-transparent blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute top-[45%] -right-20 w-[550px] h-[550px] rounded-full bg-brand-violet/10 blur-[180px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10">
        
        {/* Navigation Breadcrumb */}
        <FadeUp delay={0}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-brand-orange" />
            <span>BACK TO HOME</span>
          </Link>
        </FadeUp>

        {/* Page Hero Header */}
        <FadeUp delay={0.06} distance={20}>
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange font-mono font-bold text-[11px] uppercase tracking-wider">
                CORPORATE &amp; BRAND PARTNERSHIPS
              </span>
              <span className="text-white/20 text-xs">/</span>
              <span className="text-[11px] font-mono tracking-wider text-text-muted">
                OCTOBER 09–10, 2026
              </span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[1.05] mb-4">
              PARTNER WITH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">
                ESPARTO 2026
              </span>
            </h1>

            <p className="text-text-secondary text-sm sm:text-base font-body leading-relaxed max-w-2xl">
              Connect your brand with over <strong>2,000+ top engineering minds, innovators, developers, and tech leaders</strong> from 50+ institutions across India. Spearheaded by <strong>SSG (Student Self Governance)</strong> and HITAM.
            </p>
          </div>
        </FadeUp>

        {/* ═══════════════════════════════════════════════════════════════════════
            THE STORY: SEPARATION FROM ELYSIAN INTO DEDICATED TECH FEST
        ═══════════════════════════════════════════════════════════════════════ */}
        <FadeUp delay={0.12} distance={25}>
          <div className="relative p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c0628]/90 via-[#070318]/90 to-[#040210] backdrop-blur-xl mb-16 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Context & Narrative */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-orange" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-orange">
                    THE EVOLUTION STORY
                  </span>
                </div>

                <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                  From Elysian to ESPARTO: A New Era of Technology
                </h2>

                <p className="text-text-secondary text-xs sm:text-sm font-body leading-relaxed">
                  Until last year, technical competitions were hosted under <strong className="text-white">Elysian</strong>, HITAM&apos;s renowned annual festival. With exponential growth in innovation, developer clubs, and research initiatives, the technical council and SSG made the landmark decision to separate the technical domain into its own independent flagship festival: <strong className="text-brand-orange">ESPARTO 2026</strong>.
                </p>

                <p className="text-text-secondary text-xs sm:text-sm font-body leading-relaxed">
                  This dedicated focus unlocks 100% technical immersion—uniting 15+ specialized tracks spanning hackathons, AI challenges, robotics arenas, and technical symposiums.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-text-muted">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    2,000+ Projected Footfall
                  </span>
                  <span className="flex items-center gap-1.5 text-white">
                    <Building2 className="w-4 h-4 text-brand-orange" />
                    50+ Engineering Colleges
                  </span>
                  <span className="flex items-center gap-1.5 text-white">
                    <Award className="w-4 h-4 text-brand-magenta" />
                    ₹90,000+ Prize Pool
                  </span>
                </div>
              </div>

              {/* Right Column: Historical Footfall Growth Bar Chart */}
              <div className="lg:col-span-5 p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-text-muted">
                    HISTORICAL ATTENDEE GROWTH
                  </span>
                  <span className="text-[10px] font-mono text-brand-orange">
                    400 → 2,000+ REACH
                  </span>
                </div>

                {HISTORICAL_FOOTFALL.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className={item.highlight ? "text-brand-orange font-bold" : "text-text-muted"}>
                        {item.year}
                      </span>
                      <span className={item.highlight ? "text-white font-extrabold" : "text-text-secondary"}>
                        {item.count} Attendees
                      </span>
                    </div>
                    
                    {/* Bar visualization */}
                    <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden p-0.5">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          item.highlight 
                            ? "bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet" 
                            : "bg-cyan-500/70"
                        }`}
                        style={{ width: item.percent }}
                      />
                    </div>
                  </div>
                ))}

                <p className="text-[10px] font-mono text-text-muted/70 text-right pt-1">
                  Source: Official HITAM SSG Fest Archives
                </p>
              </div>

            </div>
          </div>
        </FadeUp>

        {/* ═══════════════════════════════════════════════════════════════════════
            NAVIGATION TABS: TIERS CARDS VS COMPARISON MATRIX
        ═══════════════════════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-orange block mb-1">
              SPONSORSHIP PACKAGES
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
              WHAT&apos;S IN IT FOR SPONSORS?
            </h2>
          </div>

          <div className="flex items-center p-1 rounded-full bg-[#08041d] border border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveTab("tiers")}
              className={`px-4 py-1.5 rounded-full transition-all ${
                activeTab === "tiers" 
                  ? "bg-gradient-to-r from-brand-orange to-brand-magenta text-white font-bold shadow-[0_0_15px_rgba(255,94,0,0.4)]" 
                  : "text-text-muted hover:text-white"
              }`}
            >
              TIER OVERVIEW
            </button>
            <button
              onClick={() => setActiveTab("matrix")}
              className={`px-4 py-1.5 rounded-full transition-all ${
                activeTab === "matrix" 
                  ? "bg-gradient-to-r from-brand-orange to-brand-magenta text-white font-bold shadow-[0_0_15px_rgba(255,94,0,0.4)]" 
                  : "text-text-muted hover:text-white"
              }`}
            >
              FEATURE MATRIX
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            TAB 1: SPONSORSHIP TIERS CARDS (BRONZE, SILVER, GOLD, PLATINUM)
        ═══════════════════════════════════════════════════════════════════════ */}
        {activeTab === "tiers" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative flex flex-col justify-between p-6 rounded-2xl bg-[#08041d]/90 border ${tier.borderCol} backdrop-blur-md transition-all duration-300 hover:scale-[1.02] group`}
              >
                {/* Popular Pill */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-brand-orange to-brand-magenta text-white font-mono font-bold text-[10px] uppercase tracking-wider shadow-[0_0_15px_rgba(255,94,0,0.5)]">
                    RECOMMENDED
                  </div>
                )}

                <div>
                  {/* Tier Badge & Slots */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider ${tier.badgeBg}`}>
                      {tier.name}
                    </span>
                    <span className="text-[10px] font-mono text-text-muted">
                      {tier.slots}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <span className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                      {tier.price}
                    </span>
                    <span className="text-[11px] font-mono text-text-muted block mt-0.5">
                      INR • Sponsorship Contribution
                    </span>
                  </div>

                  <p className="text-text-secondary text-xs font-body leading-relaxed mb-6 border-b border-white/10 pb-4">
                    {tier.tagline}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-6">
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                        <span className="text-text-secondary font-body leading-tight">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Contact CTA */}
                <div className="pt-4 border-t border-white/5">
                  <a
                    href={`mailto:ssg@hitam.org?cc=ssg.iiic@hitam.org&subject=Sponsorship Inquiry: ${tier.name} for ESPARTO 2026`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/15 hover:border-brand-orange/50 transition-all"
                  >
                    <span>SPONSOR THIS TIER</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* ═══════════════════════════════════════════════════════════════════════
              TAB 2: DETAILED COMPARISON MATRIX (EXACT POSTER REPLICA)
          ═══════════════════════════════════════════════════════════════════════ */
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#08041d]/90 backdrop-blur-md mb-20">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/15 bg-white/[0.04]">
                  <th className="p-4 sm:p-5 text-white font-bold uppercase tracking-wider min-w-[240px]">
                    BENEFITS AND PERKS
                  </th>
                  <th className="p-4 sm:p-5 text-amber-400 font-bold uppercase tracking-wider text-center">
                    BRONZE
                    <span className="block text-[10px] text-text-muted font-normal">₹10,000</span>
                  </th>
                  <th className="p-4 sm:p-5 text-slate-300 font-bold uppercase tracking-wider text-center">
                    SILVER (Max 10)
                    <span className="block text-[10px] text-text-muted font-normal">₹20,000</span>
                  </th>
                  <th className="p-4 sm:p-5 text-yellow-400 font-bold uppercase tracking-wider text-center">
                    GOLD (Max 5)
                    <span className="block text-[10px] text-text-muted font-normal">₹30,000</span>
                  </th>
                  <th className="p-4 sm:p-5 text-brand-orange font-bold uppercase tracking-wider text-center">
                    PLATINUM (Max 2)
                    <span className="block text-[10px] text-text-muted font-normal">₹50,000</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {MATRIX_ROWS.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 sm:p-5 text-text-primary font-medium font-body text-xs sm:text-sm">
                      {row.feature}
                    </td>
                    <td className="p-4 sm:p-5 text-center text-text-secondary">
                      {row.bronze}
                    </td>
                    <td className="p-4 sm:p-5 text-center text-text-secondary">
                      {row.silver}
                    </td>
                    <td className="p-4 sm:p-5 text-center text-amber-300 font-bold">
                      {row.gold}
                    </td>
                    <td className="p-4 sm:p-5 text-center text-brand-orange font-extrabold">
                      {row.platinum}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════
            SPONSORSHIP CONTACT & REACH OUT CARD
        ═══════════════════════════════════════════════════════════════════════ */}
        <FadeUp delay={0.16} distance={20}>
          <div className="relative p-8 sm:p-12 rounded-3xl border border-brand-orange/40 bg-gradient-to-br from-[#12082b] via-[#09041a] to-[#040210] shadow-[0_0_40px_rgba(255,94,0,0.2)] overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Heading & Contact Channels */}
              <div className="lg:col-span-7 space-y-4">
                <span className="px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange font-mono text-xs uppercase tracking-wider font-bold">
                  DIRECT PARTNERSHIP DESK
                </span>

                <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase leading-tight">
                  Interested in Sponsoring ESPARTO 2026?
                </h3>

                <p className="text-text-secondary text-sm font-body leading-relaxed max-w-xl">
                  Reach out to the Student Self Governance (SSG) &amp; Industry-Institute-Incubation Centre (IIIC) team to receive the official sponsorship brochure, customized deliverables, or schedule a partnership discussion.
                </p>

                {/* Contact Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <a
                    href="mailto:ssg@hitam.org?cc=ssg.iiic@hitam.org&subject=Sponsorship Inquiry for ESPARTO 2026"
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-brand-orange/50 hover:bg-white/[0.08] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-brand-orange group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] font-mono text-text-muted block uppercase">EMAIL US</span>
                      <strong className="text-white text-xs font-mono truncate block">ssg@hitam.org</strong>
                      <span className="text-[10px] text-text-muted truncate block">ssg.iiic@hitam.org</span>
                    </div>
                  </a>

                  <a
                    href="tel:+917981495420"
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-emerald-500/50 hover:bg-white/[0.08] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-text-muted block uppercase">CALL / WHATSAPP</span>
                      <strong className="text-white text-xs font-mono block">Sharath — Lead</strong>
                      <span className="text-emerald-400 font-mono text-xs">+91 7981495420</span>
                    </div>
                  </a>
                </div>

              </div>

              {/* Right Column: Instant Email Action Box */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="p-6 rounded-2xl bg-[#0c0522] border border-white/15 text-center space-y-4">
                  <h4 className="font-display font-black text-lg text-white uppercase tracking-tight">
                    REQUEST SPONSORSHIP PROPOSAL
                  </h4>
                  <p className="text-xs font-body text-text-secondary leading-relaxed">
                    Have unique custom branding requirements or want to sponsor a specific flagship track? We offer flexible custom packages.
                  </p>
                  <a
                    href="mailto:ssg@hitam.org?cc=ssg.iiic@hitam.org&subject=Custom Partnership Request for ESPARTO 2026&body=Hello SSG Team,%0D%0A%0D%0AWe are interested in exploring a sponsorship partnership with ESPARTO 2026 at HITAM.%0D%0A%0D%0ACompany Name:%0D%0APreferred Tier (Bronze/Silver/Gold/Platinum/Custom):%0D%0AContact Person:%0D%0APhone Number:%0D%0A%0D%0AThank you!"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-display font-black text-xs sm:text-sm tracking-wider uppercase text-white bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-purple hover:scale-[1.02] shadow-[0_0_20px_rgba(255,94,0,0.4)] transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span>EMAIL SPONSORSHIP TEAM</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <span className="text-[10px] font-mono text-text-muted block">
                    Response typically within 12–24 business hours
                  </span>
                </div>
              </div>

            </div>

          </div>
        </FadeUp>

      </Container>
    </main>
  );
}
