import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { EVENT_TRACKS } from "@/data/events";
import { ArrowRight, ArrowUpRight, Terminal, Trophy, Cpu } from "lucide-react";

/**
 * EventsSection Component — Featured Events Preview
 * 
 * Clean, editorial 3-event preview for the homepage:
 * - Shows exactly 3 featured tracks
 * - Asymmetric, sharp futuristic panels with subtle glow & neon borders
 * - "VIEW ALL EVENTS →" leading to dedicated /events page
 */
export function EventsSection() {
  // Only 3 featured events on the homepage as requested
  const featuredEvents = EVENT_TRACKS.slice(0, 3);

  const getTrackIcon = (id: string) => {
    switch (id) {
      case "hackathons":
        return <Terminal className="w-5 h-5 text-brand-orange" />;
      case "competitions":
        return <Trophy className="w-5 h-5 text-brand-magenta" />;
      case "robotics":
        return <Cpu className="w-5 h-5 text-brand-violet" />;
      default:
        return <Terminal className="w-5 h-5 text-brand-violet" />;
    }
  };

  const getBorderHover = (color: string) => {
    switch (color) {
      case "orange":
        return "hover:border-brand-orange/60 hover:shadow-[0_0_25px_rgba(255,94,0,0.2)]";
      case "magenta":
        return "hover:border-brand-magenta/60 hover:shadow-[0_0_25px_rgba(255,0,122,0.2)]";
      case "violet":
        return "hover:border-brand-violet/60 hover:shadow-[0_0_25px_rgba(121,40,202,0.25)]";
      default:
        return "hover:border-brand-magenta/60";
    }
  };

  return (
    <section
      id="events"
      aria-label="Featured ESPARTO Events"
      className="relative py-20 sm:py-28 bg-[#040210] overflow-hidden border-b border-brand-violet/15"
    >
      {/* Background Subtle Ambient Aura */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-purple/10 blur-[160px] pointer-events-none mix-blend-screen"
        aria-hidden="true"
      />

      {/* Decorative Technical Grid Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line x1="0" y1="20%" x2="100%" y2="20%" stroke="rgba(121, 40, 202, 0.2)" strokeDasharray="6 6" />
        <line x1="0" y1="80%" x2="100%" y2="80%" stroke="rgba(121, 40, 202, 0.2)" strokeDasharray="6 6" />
      </svg>

      <Container size="lg" className="relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <h2 className="font-display font-black text-3xl xs:text-4xl sm:text-5xl text-text-primary tracking-tight uppercase">
              EXPLORE THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">
                EXPERIENCE
              </span>
            </h2>
          </div>

          <p className="text-text-secondary text-sm sm:text-base font-body max-w-md leading-relaxed">
            From 24-hour coding sprints to autonomous hardware battles, experience engineering at full throttle.
          </p>
        </div>

        {/* 3 Featured Event Editorial Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {featuredEvents.map((event) => (
            <div
              key={event.id}
              className={`relative p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#08041c]/80 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group ${getBorderHover(
                event.accentColor
              )}`}
            >
              {/* Background Oversized Numerals */}
              <span 
                className="absolute right-4 top-4 font-display font-black text-6xl text-white/[0.04] select-none pointer-events-none"
                aria-hidden="true"
              >
                {event.number}
              </span>

              <div>
                {/* Top: Icon + Category */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-2.5 rounded-xl border border-white/10 bg-white/5">
                    {getTrackIcon(event.id)}
                  </div>
                  <span className="font-mono text-[11px] font-bold tracking-widest text-text-muted uppercase">
                    {event.category}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="font-display font-bold text-xl text-text-primary tracking-wide uppercase mb-3 group-hover:text-white transition-colors">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-xs sm:text-sm font-body leading-relaxed mb-6">
                  {event.shortDescription}
                </p>
              </div>

              {/* Card Footer Link */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs text-text-muted group-hover:text-text-primary transition-colors">
                  {event.tagline}
                </span>
                <Link
                  href="/events"
                  className="inline-flex items-center gap-1 font-mono text-xs font-bold text-brand-magenta group-hover:text-brand-orange transition-colors"
                >
                  <span>EXPLORE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Events CTA */}
        <div className="text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-display font-bold text-xs sm:text-sm tracking-wider uppercase text-white bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-purple shadow-[0_0_25px_rgba(255,94,0,0.3)] hover:shadow-[0_0_35px_rgba(255,0,122,0.5)] hover:brightness-110 transition-all active:scale-95 group"
          >
            <span>VIEW ALL EVENTS</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </Container>
    </section>
  );
}
