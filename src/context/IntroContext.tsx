"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface IntroContextValue {
  introComplete: boolean;
  markIntroComplete: () => void;
}

const IntroContext = createContext<IntroContextValue>({
  introComplete: false,
  markIntroComplete: () => {},
});

export function IntroProvider({ children }: { children: React.ReactNode }) {
  // Start as true if already seen this session — layout won't flicker
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const alreadySeen =
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem("esparto_2026_intro_played") === "true";
    if (alreadySeen) setIntroComplete(true);
  }, []);

  const markIntroComplete = () => {
    sessionStorage.setItem("esparto_2026_intro_played", "true");
    window.scrollTo({ top: 0, behavior: "instant" });
    setIntroComplete(true);
  };

  return (
    <IntroContext.Provider value={{ introComplete, markIntroComplete }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}
