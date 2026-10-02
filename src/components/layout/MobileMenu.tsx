"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/nav";
import { RegisterButton } from "@/components/ui/RegisterButton";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { X } from "lucide-react";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection?: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  activeSection,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const desktop = window.matchMedia("(min-width: 1024px)");
    const handleResize = () => { if (desktop.matches) onClose(); };
    desktop.addEventListener("change", handleResize);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const elements = menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!elements?.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      className="fixed inset-0 z-50 lg:hidden flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        ref={menuRef}
        className="relative w-full max-w-sm bg-surface-elevated/95 backdrop-blur-xl border-l border-border-glass shadow-2xl p-6 flex flex-col justify-between h-full overflow-y-auto z-10 animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-border-glass">
          <BrandLogo variant="minimal" showHitam={false} />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-2.5 rounded-lg border border-border-glass text-text-secondary hover:text-text-primary hover:border-brand-violet/50 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="py-8 flex flex-col space-y-1" aria-label="Mobile links">
          {NAV_ITEMS.map((item) => {
            const isActive =
              activeSection &&
              (item.href === `/#${activeSection}` || item.href === `/${activeSection}`);

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center justify-between px-4 py-3.5 rounded-lg text-base font-display font-medium transition-all duration-200 min-h-[48px] ${
                  isActive
                    ? "bg-brand-purple/20 text-white border-l-2 border-brand-magenta"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-brand-violet/80 group-hover:text-brand-magenta transition-colors">
                    {item.indicator}
                  </span>
                  <span>{item.label}</span>
                </div>
                <span className="text-text-muted group-hover:text-brand-magenta group-hover:translate-x-1 transition-all text-xs font-mono">
                  →
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom CTA & Attribution */}
        <div className="pt-6 border-t border-border-glass space-y-4">
          <RegisterButton size="lg" className="w-full justify-center" onClick={onClose} />
          <p className="text-center text-xs font-mono text-text-muted">
            ESPARTO 2026 • HITAM HYDERABAD
          </p>
        </div>
      </div>
    </div>
  );
}
