import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { facultyCoordinators, ssgLeadership } from "@/data/team";

export function OrganiserPortraits() {
  return (
    <section aria-labelledby="team-preview-title" className="border-t border-white/10 bg-[#050212] py-16 sm:py-24">
      <Container size="lg">
        <p className="font-mono text-xs uppercase tracking-widest text-brand-amber">The faces behind the fest</p>
        <h2 id="team-preview-title" className="mt-4 font-display text-3xl font-black text-white sm:text-5xl">Their effort. Our unforgettable ESPARTO.</h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-text-secondary">Meet our Faculty Conveners and the SSG HITAM team whose guidance, leadership and work behind the scenes brought ESPARTO’26 to life.</p>
        {[{ title: "Faculty Conveners", members: facultyCoordinators }, { title: "SSG HITAM — Overall Organising Team", members: ssgLeadership }].map((group) => (
          <div key={group.title} className="mt-10">
            <h3 className="mb-5 font-display text-xl font-bold text-white">{group.title}</h3>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {group.members.map((person) => (
                <li key={person.id} className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                  <Link href="/team" className="group block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange" aria-label={`Meet ${person.name}, ${person.role}`}>
                    <div className="relative aspect-[4/5] bg-gradient-to-b from-brand-purple/20 to-transparent">
                      {person.image && <Image src={person.image} alt={person.name} fill sizes="(max-width: 639px) 44vw, (max-width: 1023px) 28vw, 220px" className="object-contain object-bottom p-2 transition-transform group-hover:scale-[1.03]" />}
                    </div>
                    <div className="border-t border-white/10 p-4">
                      <p className="font-display font-bold text-white">{person.name}</p>
                      <p className="mt-1 text-xs leading-relaxed text-brand-amber">{group.title === "Faculty Conveners" ? "Faculty Convener · " : ""}{person.role}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Link href="/team" className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-[#140926] hover:bg-orange-100">Meet the people behind ESPARTO’26 <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </Container>
    </section>
  );
}
