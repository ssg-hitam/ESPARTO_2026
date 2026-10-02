import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/ui/FadeUp";
import { GOOGLE_APPS_SCRIPT_REGISTRATION_URL } from "@/data/events";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen pt-6 sm:pt-8 pb-24 bg-[#03010b] relative overflow-hidden text-text-primary">
      
      {/* Background Atmosphere Lighting */}
      <div 
        className="absolute top-16 left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full bg-gradient-to-b from-brand-orange/15 via-brand-magenta/10 to-transparent blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute top-[40%] right-0 w-[500px] h-[500px] rounded-full bg-brand-violet/10 blur-[180px] pointer-events-none"
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

        {/* Page Header */}
        <FadeUp delay={0.06} distance={20}>
          <div className="max-w-3xl mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange font-mono font-bold text-[11px] uppercase tracking-wider">
                OFFICIAL REGISTRATION PORTAL
              </span>
              <span className="text-white/20 text-xs">/</span>
              <span className="text-[11px] font-mono tracking-wider text-text-muted">
                OCTOBER 09–10, 2026
              </span>
            </div>
            
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[1.05] mb-4">
              ESPARTO 2026 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-violet">
                EVENT REGISTRATIONS
              </span>
            </h1>
            
            <p className="text-text-secondary text-sm sm:text-base font-body leading-relaxed max-w-2xl mb-4">
              Secure your entry for Hyderabad Institute of Technology and Management&apos;s annual flagship technical fest.
              Continue to the official registration portal to choose your event and complete your registration.
            </p>

            <a
              href={GOOGLE_APPS_SCRIPT_REGISTRATION_URL}
              className="inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-purple hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,94,0,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>CONTINUE TO REGISTRATION</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </FadeUp>


        <FadeUp delay={0.12} distance={20}>
          <section aria-labelledby="explore-events-title" className="max-w-3xl mt-12 sm:mt-16 rounded-2xl border border-brand-violet/20 bg-white/[0.03] p-6 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-widest text-brand-orange mb-3">
              FIND YOUR NEXT CHALLENGE
            </p>
            <h2 id="explore-events-title" className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-tight mb-4">
              Explore before you register
            </h2>
            <p className="font-body text-sm sm:text-base leading-relaxed text-text-secondary mb-6">
              Discover the hackathons, workshops, ideathons, and technical challenges at ESPARTO 2026.
              Browse event schedules, participation formats, rules, and coordinator contacts to find the right event for you and your team.
            </p>
            <Link
              href="/events"
              className="inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-text-secondary hover:text-white border border-white/10 hover:border-brand-violet/50 bg-white/5 hover:bg-brand-purple/20 transition-all"
            >
              <span>EXPLORE EVENTS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </FadeUp>

      </Container>
    </div>
  );
}
