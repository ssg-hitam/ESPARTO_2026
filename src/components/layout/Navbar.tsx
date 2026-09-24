"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { RegisterButton } from "@/components/ui/RegisterButton";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Container } from "@/components/ui/Container";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const pathname = usePathname();

  // Scroll listener for top transparency vs scrolled blur transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer to highlight active section on homepage
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = NAV_ITEMS.map((item) => item.href.replace("/#", "")).filter(
      Boolean
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "bg-surface/85 backdrop-blur-md border-b border-border-glass shadow-lg shadow-background/50 py-2"
            : "bg-transparent py-2.5 border-b border-transparent"
        )}

      >
        <Container size="lg">
          <div className="flex items-center justify-between">
            {/* Brand Logo Lockup */}
            <BrandLogo />

            {/* Desktop Navigation Links matching Screenshot */}
            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-3"
              aria-label="Main Navigation"
            >
              {NAV_ITEMS.map((item) => {
                const isAnchor = item.href.startsWith("/#");
                const sectionId = item.href.replace("/#", "");
                const isActive =
                  (pathname === "/" && isAnchor && activeSection === sectionId) ||
                  (!isAnchor && pathname === item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "relative px-3 py-1.5 text-xs xl:text-sm font-display font-medium transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet rounded",
                      isActive
                        ? "text-white font-semibold"
                        : "text-text-secondary hover:text-white"
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive ? (
                      <span
                        className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-gradient-to-r from-brand-orange to-brand-magenta shadow-[0_0_8px_#ff007a]"
                        aria-hidden="true"
                      />
                    ) : null}
                  </Link>
                );
              })}
            </nav>

            {/* Action Group: Register CTA & Mobile Hamburger */}
            <div className="flex items-center gap-3">
              {/* Desktop Register CTA */}
              <div className="hidden sm:block">
                <RegisterButton
                  size="sm"
                  className="rounded-full px-5 py-2 border border-brand-purple/80 bg-surface-elevated/80 shadow-[0_0_15px_rgba(155,81,224,0.4)] hover:border-brand-magenta hover:shadow-[0_0_20px_rgba(255,0,122,0.5)]"
                />
              </div>

              {/* Mobile Menu Trigger */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Open mobile navigation menu"
                className="lg:hidden p-2.5 rounded-lg border border-border-glass text-text-secondary hover:text-text-primary hover:border-brand-violet/50 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Accessible Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
