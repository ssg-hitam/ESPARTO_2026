import { Mail, Trophy } from "lucide-react";
import { OrganiserPortraits } from "@/components/home/OrganiserPortraits";
import { OrganiserTribute } from "@/components/home/OrganiserTribute";
import { CelebrationSection } from "@/components/home/CelebrationSection";
import { ChaptersMarqueeSection } from "@/components/home/ChaptersMarqueeSection";

export default function Home() {
  return (
    <>
      <CelebrationSection />
      <OrganiserTribute />
      <ChaptersMarqueeSection marquee />
      <OrganiserPortraits />
      <section aria-labelledby="participant-thanks-title" className="border-t border-white/10 bg-gradient-to-b from-[#100723] to-[#050212] px-5 py-16 text-center sm:py-20">
        <Trophy className="mx-auto mb-5 h-9 w-9 text-brand-amber" aria-hidden="true" />
        <p className="font-mono text-xs uppercase tracking-widest text-brand-amber">Here’s to everyone who showed up</p>
        <h2 id="participant-thanks-title" className="mx-auto mt-4 max-w-3xl font-display text-3xl font-black text-white sm:text-5xl">Congratulations to our winners.<br /><span className="text-brand-orange">A huge thank-you to every participant.</span></h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">To our winners: congratulations on your creativity, skill and well-earned achievements. To every participant: thank you for bringing your ideas, courage and enthusiasm to ESPARTO’26. You made the challenges exciting, the community stronger and the celebration a success.</p>
        <p className="mt-5 font-display text-xl font-bold text-white">Keep building. Keep exploring. See you at ESPARTO 2027.</p>
      </section>
      <section aria-labelledby="certificate-help-title" className="border-t border-white/10 bg-[#050212] px-5 py-12 text-center">
        <div className="mx-auto max-w-2xl rounded-2xl border border-brand-violet/30 bg-white/[0.04] px-6 py-7">
          <h2 id="certificate-help-title" className="scroll-mt-24 font-display text-xl font-bold text-white">Questions about your e-certificate?</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">Please reach out to Tejal at the SSG IIIC team. Include your full name, event name and registered email so we can help.</p>
          <a href="mailto:ssg.iiic@hitam.org?subject=ESPARTO%202026%20Certificate%20Query" className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-2 font-semibold text-brand-amber underline decoration-brand-amber/40 underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"><Mail size={18} aria-hidden="true" /> ssg.iiic@hitam.org</a>
        </div>
      </section>
    </>
  );
}
