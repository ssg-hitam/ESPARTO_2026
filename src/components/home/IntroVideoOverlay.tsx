"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, VolumeX } from "lucide-react";

/**
 * IntroVideoOverlay Component
 * 
 * Plays the official ESPARTO 2026 intro teaser (/video/esparto_2026_video.mp4)
 * on initial site visit:
 * - Autoplays muted without audio
 * - Centered, medium-sized glassmorphic cinematic frame
 * - Skip video option to immediately enter main festival page
 * - Auto-dismisses when the video playback concludes
 */
export function IntroVideoOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if user has already viewed the intro in this session
    const hasSeenIntro = sessionStorage.getItem("esparto_2026_intro_played");
    if (!hasSeenIntro) {
      setIsVisible(true);
      // Lock scroll while intro is playing
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleDismiss = React.useCallback(() => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    sessionStorage.setItem("esparto_2026_intro_played", "true");
    document.body.style.overflow = "";
    
    // Pause video to free resources
    if (videoRef.current) {
      videoRef.current.pause();
    }

    setTimeout(() => {
      setIsVisible(false);
    }, 600);
  }, [isFadingOut]);

  useEffect(() => {
    // Allow user to dismiss with Escape key or Space key
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "Escape" || e.key === " ") && isVisible) {
        e.preventDefault();
        handleDismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, handleDismiss]);

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="ESPARTO 2026 Intro Video"
      className={`fixed inset-0 z-[99999] w-screen h-screen bg-black flex items-center justify-center overflow-hidden transition-opacity duration-700 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Full-Screen Pure Black Cinematic Video */}
      <video
        ref={videoRef}
        src="/video/esparto_2026_video.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleDismiss}
        className="w-full h-full object-contain bg-black select-none pointer-events-none"
      />

      {/* Minimal Bottom-Right Skip Intro Button */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30">
        <button
          type="button"
          onClick={handleDismiss}
          className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/20 bg-black/80 backdrop-blur-md hover:bg-white/15 hover:border-white/40 text-zinc-300 hover:text-white font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-2xl group hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
        >
          <span>SKIP INTRO</span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </button>
      </div>
    </div>
  );
}
