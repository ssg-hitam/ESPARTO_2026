import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, Camera, Instagram } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FEST_INFO } from "@/lib/constants";

const memories = [
  { day: "Day 1", date: "09 October 2026", title: "Where it all sparked.", caption: "The ideas. The energy. The people who made it happen.", photos: "https://drive.google.com/drive/folders/1kQz4gl2fJqf1WXoeu9O0Fw1mCVUwzkZl?usp=sharing", post: "DeVr1_8IDZ8" },
  { day: "Day 2", date: "10 October 2026", title: "An unforgettable finish.", caption: "More challenges, shared victories, and memories to take home.", photos: "https://drive.google.com/drive/folders/16qbBKE0XiPiuemyAmLK3DaWeTQljJjFK", post: "Debf36ljohK" },
];

const action = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange";

export function CelebrationSection() {
  return (
    <>
      <section id="hero" className="relative overflow-hidden bg-[#030318] px-5 py-20 text-center sm:py-28 lg:py-32" aria-labelledby="celebration-title">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_30%,rgba(145,55,230,0.22),transparent_55%),radial-gradient(ellipse_at_80%_65%,rgba(255,100,0,0.16),transparent_50%)]" />
        <div aria-hidden="true" className="hero-celebration-confetti pointer-events-none absolute inset-0 overflow-hidden">
          {(["left", "right"] as const).map((side) => (
            <div key={side} className={`hero-confetti-cannon hero-confetti-cannon-${side}`}>
              {Array.from({ length: 48 }, (_, index) => (
                <span key={index} className="hero-confetti-piece" style={{
                  "--confetti-x": `${80 + (index * 43) % 460}px`,
                  "--confetti-y": `${-190 - (index * 61) % 430}px`,
                  "--confetti-fall": `${100 + (index * 31) % 220}px`,
                  "--confetti-turn": `${240 + index * 47}deg`,
                  "--confetti-delay": `${(index % 24) * 0.15}s`,
                  backgroundColor: ["#ff6b21", "#ff328c", "#a878ff", "#ffd36a", "#ffffff"][index % 5],
                  borderRadius: index % 3 === 0 ? "50%" : "2px",
                  width: index % 2 === 0 ? "8px" : "5px",
                  height: index % 3 === 0 ? "8px" : "13px",
                } as CSSProperties} />
              ))}
            </div>
          ))}
        </div>
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-8 flex flex-col items-center gap-4">
            <Image src="/images/brand/esparto-logo.png" alt="ESPARTO — HITAM Technical Fest" width={1545} height={1018} priority sizes="(max-width: 639px) 75vw, 440px" className="h-auto w-[min(75vw,440px)] object-contain drop-shadow-[0_0_40px_rgba(255,40,140,0.25)]" />
            <p className="rounded-full border border-brand-amber/30 bg-brand-amber/10 px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-amber">ESPARTO’26 · What a celebration!</p>
          </div>
          <h1 id="celebration-title" className="font-display text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">Two days.<br /><span className="bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet bg-clip-text text-transparent">One unforgettable ESPARTO.</span></h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-text-secondary">Ideas became prototypes. Challenges became shared victories. And a campus became a community of builders, thinkers and doers. ESPARTO’26 may have ended, but the moments we created together are here to stay.</p>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-text-secondary">Brought together by <strong className="text-white">SSG HITAM</strong>, powered by our student chapters and clubs, and made memorable by every participant, volunteer, mentor and supporter. <span className="text-brand-amber">Thank you for being part of it.</span></p>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-text-muted">9–10 October 2026 · HITAM, Hyderabad</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="#memories" className={`${action} bg-brand-orange text-white hover:bg-brand-magenta`}><Camera size={18} aria-hidden="true" /> Relive the moments <ArrowDown size={16} aria-hidden="true" /></a>
            <a href={FEST_INFO.officialLinks.instagram} target="_blank" rel="noopener noreferrer" className={`${action} border border-white/20 text-white hover:bg-white/10`}><Instagram size={18} aria-hidden="true" /> Follow ESPARTO <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-brand-violet/30 bg-white/[0.04] px-6 py-7">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-amber">This is only the beginning</p>
            <p className="font-display text-2xl font-bold text-white sm:text-3xl">Next year. Bigger. Bolder. Together.</p>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">We’re taking this energy into ESPARTO 2027. Stay connected for the next chapter.</p>
          </div>
        </div>
      </section>
      <section id="memories" aria-labelledby="memories-title" className="border-y border-white/10 bg-[#08051a] py-16 sm:py-24">
        <Container size="lg">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand-orange">The ESPARTO’26 memory archive</p>
            <h2 id="memories-title" className="font-display text-4xl font-black text-white sm:text-5xl">Two days. So many stories.</h2>
            <p className="mt-4 text-text-secondary">Find your favourite moments in the photo drives and revisit our daily highlights on Instagram.</p>
          </div>
          <div className="grid items-start gap-7 lg:grid-cols-2">
            {memories.map((memory) => (
              <article key={memory.day} className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                <div className="p-6 sm:p-8">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-2 font-mono text-xs uppercase tracking-widest"><span className="rounded-full bg-brand-violet/20 px-3 py-1.5 text-brand-amber">{memory.day}</span><span className="text-text-muted">{memory.date}</span></div>
                  <h3 className="font-display text-3xl font-bold text-white">{memory.title}</h3>
                  <p className="mb-6 mt-3 text-text-secondary">{memory.caption}</p>
                  <a href={memory.photos} target="_blank" rel="noopener noreferrer" className={`${action} w-full bg-brand-orange text-white hover:bg-brand-magenta`}><Camera size={18} aria-hidden="true" /> Open {memory.day} photo drive <ArrowUpRight size={16} aria-hidden="true" /></a>
                </div>
                <div className="mx-3 overflow-hidden rounded-xl bg-white sm:mx-6">
                  <iframe src={`https://www.instagram.com/p/${memory.post}/embed/`} title={`ESPARTO 2026 ${memory.day} Instagram highlights`} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="block h-[640px] w-full border-0 sm:h-[720px]" allowFullScreen />
                </div>
                <div className="p-6 text-center"><a href={`https://www.instagram.com/p/${memory.post}/`} target="_blank" rel="noopener noreferrer" className={`${action} text-white hover:bg-white/10`}><Instagram size={18} aria-hidden="true" /> View {memory.day} post on Instagram <ArrowUpRight size={16} aria-hidden="true" /></a><p className="mt-2 text-xs text-text-muted">Post not loading? Open it directly on Instagram.</p></div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
