"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface IntroContextValue {
  introComplete: boolean;
  markIntroComplete: () => void;
}

const IntroContext = createContext<IntroContextValue>({
  introComplete: false,
  markIntroComplete: () => {},
});

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Only the homepage presents the optional intro.
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("esparto_2026_intro_played") === "true") setIntroComplete(true);
    } catch {
      // Storage can be unavailable in private or restricted browsers.
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setIntroComplete(true);
  }, []);

  const markIntroComplete = () => {
    try { sessionStorage.setItem("esparto_2026_intro_played", "true"); } catch { /* Optional persistence. */ }
    window.scrollTo({ top: 0, behavior: "instant" });
    setIntroComplete(true);
  };

  return (
    <IntroContext.Provider value={{ introComplete: pathname !== "/" || introComplete, markIntroComplete }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}
