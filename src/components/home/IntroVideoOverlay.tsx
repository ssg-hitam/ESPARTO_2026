"use client";

import React, { useEffect, useRef, useState } from "react";

interface IntroVideoOverlayProps {
  /** Called when the intro finishes (video end or skip). Parent unmounts this component. */
  onComplete: () => void;
}

/**
 * IntroVideoOverlay — STATE 1 (Intro Only)
 *
 * Occupies 100vw × 100vh with a pure black background.
 * The homepage does NOT exist in the DOM while this is rendered.
 *
 * Flow:
 *   Load → black screen → video plays → video ends → onComplete() → homepage revealed
 *   OR: user clicks "Skip Intro" → onComplete() → homepage revealed
 */
export function IntroVideoOverlay({ onComplete }: IntroVideoOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Lock body scroll while intro is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard shortcut — Escape or Space to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        e.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFadingOut]);

  const handleSkip = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    if (videoRef.current) videoRef.current.pause();
    // Short black hold, then signal parent to unmount and show homepage
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  const handleVideoEnded = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    // Natural end — slightly longer hold before transitioning
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <div
      aria-label="ESPARTO 2026 Intro"
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-black transition-opacity duration-700 ease-in-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Centered video — black canvas fills all sides */}
      <video
        ref={videoRef}
        src="/video/esparto_2026_video.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnded}
        className="w-[65vw] h-[60vh] max-w-2xl md:max-w-3xl lg:max-w-4xl object-contain select-none pointer-events-none"
      />

      {/* MINDS-style minimal Skip Intro — bottom right */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute bottom-8 right-8 text-white/40 hover:text-white/90 transition-colors duration-200 text-xs tracking-widest uppercase font-mono font-light cursor-pointer select-none focus:outline-none"
      >
        Skip Intro
      </button>
    </div>
  );
}
