import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { OrganiserPortraits } from "@/components/home/OrganiserPortraits";
import { OrganiserTribute } from "@/components/home/OrganiserTribute";
import { ChaptersMarqueeSection } from "@/components/home/ChaptersMarqueeSection";

export const metadata: Metadata = {
  title: "The People Behind ESPARTO’26",
  description: "Celebrating SSG HITAM, the overall organiser of ESPARTO 2026, our student chapters, clubs and supporters. Includes the archived 2026 sponsorship rubric.",
};

interface SponsorshipTier {
  id: string;
  name: string;
  title: string;
  emoji: string;
  titleColor: string;
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
    title: "BRONZE",
    emoji: "🥉",
    titleColor: "text-amber-400",
    price: "₹10,000",
    priceNumeric: 10000,
    slots: "Available",
    tagline: "Ideal for emerging tech startups and local developer ecosystem partners.",
    accent: "from-amber-600 to-amber-700",
    badgeBg: "bg-amber-600/20 text-amber-400 border-amber-500/30",
    borderCol: "border-amber-600/30 hover:border-amber-500/60 shadow-[0_0_30px_rgba(217,119,6,0.12)]",
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
    title: "SILVER",
    emoji: "🥈",
    titleColor: "text-slate-100",
    price: "₹20,000",
    priceNumeric: 20000,
    slots: "Max: 10 Slots",
    tagline: "Balanced branding across digital and physical festival arenas with product showcase.",
    popular: true,
    accent: "from-slate-300 via-gray-100 to-zinc-400",
    badgeBg: "bg-slate-300/20 text-slate-200 border-slate-300/40",
    borderCol: "border-slate-300/40 hover:border-slate-200 shadow-[0_0_30px_rgba(226,232,240,0.15)]",
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
    title: "GOLD",
    emoji: "🥇",
    titleColor: "text-yellow-400",
    price: "₹30,000",
    priceNumeric: 30000,
    slots: "Max: 5 Slots",
    tagline: "High-impact brand prominence with prime exhibition stalls and speaking slot.",
    accent: "from-yellow-400 via-amber-300 to-yellow-600",
    badgeBg: "bg-amber-400/20 text-amber-300 border-amber-400/50",
    borderCol: "border-amber-400/50 hover:border-amber-300 shadow-[0_0_40px_rgba(251,191,36,0.22)]",
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
  }
];


export default function SponsorsPage() {
  return (
    <div className="bg-[#03010b] pb-20 text-text-primary">
      <Container size="lg" className="pb-14 pt-10 sm:pt-16">
        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white"><ArrowLeft size={16} aria-hidden="true" /> Back to the celebration</Link>
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-brand-amber">ESPARTO’26 · With gratitude</p>
        <h1 className="max-w-4xl font-display text-4xl font-black leading-tight text-white sm:text-6xl">A remarkable fest.<br /><span className="bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet bg-clip-text text-transparent">An extraordinary team.</span></h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">The stages may be quiet, but the effort behind them deserves the spotlight. ESPARTO 2026 was a success because people cared, collaborated and gave it their all.</p>
        <Link href="/#memories" className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-bold text-white hover:bg-white/10">Revisit the moments <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </Container>
      <OrganiserTribute />
      <OrganiserPortraits />
      <ChaptersMarqueeSection />
      <Container size="lg" className="pt-16">
        <div className="mb-14 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-amber">Every contribution mattered</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-white">To our supporters, mentors and volunteers: thank you.</h2>
          <p className="mt-4 leading-relaxed text-text-secondary">To our sponsors and partners, HITAM leadership, faculty, mentors, volunteers and participants: your support, trust and energy helped the SSG team and student communities create something worth remembering. We carry that encouragement into a bigger, bolder ESPARTO 2027.</p>
        </div>
        <details className="rounded-3xl border border-white/15 bg-white/[0.03] p-6 sm:p-8">
          <summary className="cursor-pointer font-display text-xl font-bold text-white sm:text-2xl">2026 sponsorship rubric — archived reference</summary>
          <p className="mb-7 mt-4 max-w-3xl leading-relaxed text-text-secondary">ESPARTO 2026 has concluded. The original sponsorship tiers and deliverables below are preserved for reference. These were the published package options, not a list of confirmed sponsors. Sponsorship applications for this edition are closed.</p>
          <div className="grid gap-5 lg:grid-cols-3">
            {TIERS.map((tier) => (
              <article key={tier.id} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="font-mono text-xs uppercase tracking-widest text-text-muted">Archived 2026 tier</p>
                <h3 className={`mt-3 font-display text-2xl font-bold ${tier.titleColor}`}>{tier.title}</h3>
                <p className="mb-5 mt-2 text-xl font-bold text-white">{tier.price} <span className="text-xs font-normal text-text-muted">INR</span></p>
                <ul className="space-y-3 text-sm leading-relaxed text-text-secondary">{tier.features.map((feature) => <li key={feature} className="flex items-start gap-2"><CheckCircle2 size={15} className="mt-1 shrink-0 text-brand-amber" aria-hidden="true" /><span>{feature}</span></li>)}</ul>
              </article>
            ))}
          </div>
        </details>
      </Container>
    </div>
  );
}
