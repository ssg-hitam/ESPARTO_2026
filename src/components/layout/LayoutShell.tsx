"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useIntro } from "@/context/IntroContext";

/**
 * LayoutShell — reads IntroContext to show/hide Navbar + Footer.
 *
 * During intro  → visibility:hidden  (layout holds space, nothing is visible)
 * After intro   → fade in with Framer-style CSS transition
 *
 * Using visibility:hidden (not display:none / opacity:0) is critical:
 *   • The shell keeps its full min-h-screen height → footer stays at bottom
 *   • Nothing is visually painted → no footer flash
 */
export function LayoutShell({ children }: { children: React.ReactNode }) {
  const { introComplete } = useIntro();

  return (
    <div className="relative z-10 flex flex-col min-h-screen" suppressHydrationWarning>
      {/* Navbar — hidden while intro plays */}
      <div
        style={{
          visibility: introComplete ? "visible" : "hidden",
          opacity: introComplete ? 1 : 0,
          transition: introComplete
            ? "opacity 0.6s ease-out, visibility 0s 0s"
            : "none",
        }}
      >
        <Navbar />
      </div>

      {/* Page content — always rendered, intro manages its own overlay */}
      <main id="main-content" className="flex-grow flex flex-col">
        {children}
      </main>

      {/* Footer — hidden while intro plays */}
      <div
        style={{
          visibility: introComplete ? "visible" : "hidden",
          opacity: introComplete ? 1 : 0,
          transition: introComplete
            ? "opacity 0.6s ease-out 0.3s, visibility 0s 0.3s"
            : "none",
        }}
      >
        <Footer />
      </div>
    </div>
  );
}
