import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { FEST_INFO } from "@/lib/constants";
import { Calendar, MapPin, Globe, Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "About ESPARTO", href: "/about" },
    { label: "About HITAM", href: "/hitam" },
    { label: "Events", href: "/events" },
    { label: "Payment status", href: "/payment-status" },
    { label: "Sponsors", href: "/sponsors" },
    { label: "Guests", href: "/guests" },
    { label: "Team", href: "/team" },
    { label: "Venue", href: "/venue" },
  ];

  const socialChannels = [
    { name: "ESPARTO Instagram", icon: Instagram, url: FEST_INFO.officialLinks.instagram },
    { name: "SSG HITAM Instagram", icon: Instagram, url: FEST_INFO.officialLinks.ssgInstagram },
    { name: "HITAM LinkedIn", icon: Linkedin, url: FEST_INFO.officialLinks.linkedin },
    { name: "HITAM YouTube", icon: Youtube, url: FEST_INFO.officialLinks.youtube },
  ];

  return (
    <footer className="relative bg-[#020108] border-t border-brand-violet/15 overflow-hidden mt-auto">
      {/* Background Subtle Radial Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-brand-purple/10 blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Brand & Festival Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo />
            <p className="font-body text-sm text-text-secondary max-w-sm leading-relaxed">
              The annual flagship technical fest of Hyderabad Institute of Technology and Management (HITAM), celebrating innovation, creativity, and engineering excellence.
            </p>
            <div className="space-y-2 pt-2 text-xs font-mono text-text-muted">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-orange" />
                <span>October 09–10, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-magenta" />
                <span>HITAM Campus, Hyderabad</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links (4 cols) */}
          <div className="lg:col-span-4">
            <h3 className="font-mono text-xs font-bold tracking-widest text-brand-violet uppercase mb-4">
              NAVIGATION
            </h3>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-6 text-sm font-display">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-text-secondary hover:text-white hover:translate-x-1 transition-all inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-violet rounded"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={FEST_INFO.institution.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-brand-amber transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-violet rounded"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>HITAM Portal</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Social Channels (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="font-mono text-xs font-bold tracking-widest text-brand-amber uppercase mb-4">
              CONNECT WITH US
            </h3>
            <p className="font-body text-xs text-text-muted mb-4">
              Follow official announcements, workshop details, and fest updates.
            </p>
            <div className="flex items-center gap-2.5">
              {socialChannels.map((channel) => {
                const Icon = channel.icon;
                if (channel.url) {
                  return (
                    <a
                      key={channel.name}
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={channel.name}
                      title={channel.name}
                      className="p-2.5 rounded-lg border border-white/10 bg-white/5 text-text-secondary hover:text-white hover:border-brand-violet hover:bg-brand-purple/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                }

                return (
                  <span
                    key={channel.name}
                    title={`${channel.name} handle will be announced soon`}
                    aria-label={`${channel.name} handle coming soon`}
                    className="p-2.5 rounded-lg border border-white/10 bg-white/[0.02] text-text-muted opacity-40 cursor-not-allowed inline-flex items-center justify-center"
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Attribution Bar with "Developed by SSG" */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-text-muted">
          <p>
            © {currentYear} {FEST_INFO.name} — {FEST_INFO.institution.shortName} Technical Fest. All rights reserved.
          </p>
          <div>
            <span className="text-text-muted/80">
              Developed by{" "}
              <a
                href={FEST_INFO.officialLinks.ssgInstagram || "https://www.instagram.com/ssg_hitam/"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SSG HITAM Instagram"
                className="text-text-secondary font-semibold hover:text-brand-magenta hover:underline underline-offset-2 transition-all inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-magenta rounded"
              >
                SSG
              </a>
            </span>
          </div>
        </div>

      </Container>
    </footer>
  );
}
