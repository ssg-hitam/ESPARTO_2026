import Image from "next/image";
import { ArrowUpRight, Heart, Instagram } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FEST_INFO } from "@/lib/constants";

export function OrganiserTribute() {
  return (
    <section id="organisers" aria-labelledby="organiser-title" className="relative overflow-hidden border-y border-white/10 bg-[#08041d] py-16 sm:py-24">
      <Container size="lg">
        <div className="grid items-center gap-10 rounded-3xl border border-brand-violet/30 bg-gradient-to-br from-brand-purple/15 via-transparent to-brand-orange/10 p-6 sm:p-10 lg:grid-cols-[1fr_240px]">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-brand-amber"><Heart size={16} aria-hidden="true" /> The people behind the possibilities</p>
            <h2 id="organiser-title" className="font-display text-3xl font-black leading-tight text-white sm:text-5xl">Led by SSG.<br /><span className="bg-gradient-to-r from-brand-orange to-brand-magenta bg-clip-text text-transparent">Made extraordinary together.</span></h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary"><strong className="text-white">SSG HITAM — Student Self Governance — was the overall organiser of ESPARTO 2026.</strong> Behind the two days everyone experienced were the planning, coordination, long hours and countless details the SSG team brought together.</p>
            <p className="mt-4 max-w-2xl leading-relaxed text-text-secondary">To the SSG team: thank you for showing up, taking ownership and carrying this celebration from an idea to a successful reality. Your effort gave ESPARTO’26 its heartbeat.</p>
            <a href={FEST_INFO.officialLinks.ssgInstagram} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-[#140926] transition-colors hover:bg-orange-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"><Instagram size={18} aria-hidden="true" /> Get to know SSG HITAM <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <a href={FEST_INFO.officialLinks.ssgInstagram} target="_blank" rel="noopener noreferrer" aria-label="Discover SSG HITAM on Instagram" className="mx-auto flex w-full max-w-[240px] flex-col items-center gap-5 rounded-3xl border border-white/10 bg-white/5 p-7 transition-colors hover:bg-white/10">
            <div className="rounded-2xl bg-white p-5"><Image src="/images/brand/ssg-logo.png" alt="SSG HITAM — Student Self Governance logo" width={170} height={170} className="h-auto w-full object-contain" /></div>
            <span className="text-center font-mono text-xs uppercase tracking-widest text-white">Overall organiser<br /><span className="mt-2 block text-brand-amber">SSG HITAM</span></span>
          </a>
        </div>
      </Container>
    </section>
  );
}
