import React from "react";

/**
 * Accessible Skip to Main Content Link
 * Visually hidden by default; becomes visible on keyboard Tab focus.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-brand-purple focus:text-white focus:font-display focus:font-semibold focus:text-sm focus:rounded-lg focus:shadow-xl focus:shadow-brand-purple/50 focus:border focus:border-white/20 focus:outline-none"
    >
      Skip to main content
    </a>
  );
}
