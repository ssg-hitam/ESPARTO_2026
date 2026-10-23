import { CelebrationSection } from "@/components/home/CelebrationSection";
import { ChaptersMarqueeSection } from "@/components/home/ChaptersMarqueeSection";

export default function Home() {
  return (
    <>
      <CelebrationSection />
      <ChaptersMarqueeSection />
      <section className="border-t border-white/10 px-5 py-16 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-brand-amber">Made possible together</p>
        <h2 className="mt-4 font-display text-3xl font-bold text-white">To everyone behind the experience: thank you.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-text-secondary">Our sponsors, partners, faculty and student teams helped turn ideas into an unforgettable ESPARTO’26.</p>
        <a href="/sponsors" className="mt-6 inline-block rounded-full border border-white/20 px-6 py-3 font-bold text-white hover:bg-white/10">Meet our sponsors and partners</a>
      </section>
    </>
  );
}
