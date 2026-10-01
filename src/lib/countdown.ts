import { useState, useEffect } from "react";

export interface CountdownState {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isLive: boolean;
  totalMsRemaining: number;
  isMounted: boolean;
}

/**
 * Calculates drift-free countdown values from target ISO string timestamp.
 * Always calculates remaining = targetTimestamp - Date.now() on each tick.
 */
export function calculateTimeRemaining(targetIso: string): Omit<CountdownState, "isMounted"> {
  const targetTime = new Date(targetIso).getTime();
  const now = Date.now();
  const totalMsRemaining = targetTime - now;

  if (totalMsRemaining <= 0 || isNaN(totalMsRemaining)) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      isLive: true,
      totalMsRemaining: 0,
    };
  }

  const d = Math.floor(totalMsRemaining / (1000 * 60 * 60 * 24));
  const h = Math.floor((totalMsRemaining / (1000 * 60 * 60)) % 24);
  const m = Math.floor((totalMsRemaining / (1000 * 60)) % 60);
  const s = Math.floor((totalMsRemaining / 1000) % 60);

  return {
    days: String(d).padStart(3, "0"),
    hours: String(h).padStart(2, "0"),
    minutes: String(m).padStart(2, "0"),
    seconds: String(s).padStart(2, "0"),
    isLive: false,
    totalMsRemaining,
  };
}

/**
 * Custom React Hook for live countdown updates.
 * Updates accurately every second and handles component unmount cleanup.
 */
export function useCountdown(targetIso: string): CountdownState {
  const [state, setState] = useState<CountdownState>(() => ({
    ...calculateTimeRemaining(targetIso),
    isMounted: false,
  }));

  useEffect(() => {
    setState({
      ...calculateTimeRemaining(targetIso),
      isMounted: true,
    });

    const intervalId = window.setInterval(() => {
      setState({
        ...calculateTimeRemaining(targetIso),
        isMounted: true,
      });
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [targetIso]);

  return state;
}
