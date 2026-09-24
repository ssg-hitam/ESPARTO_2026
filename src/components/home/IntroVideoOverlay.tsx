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
    }
  }, []);

  const handleDismiss = React.useCallback(() => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    sessionStorage.setItem("esparto_2026_intro_played", "true");
    
    // Pause video to save CPU/GPU resources
    if (videoRef.current) {
      videoRef.current.pause();
    }

    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  }, [isFadingOut]);

  useEffect(() => {
    // Allow user to dismiss with Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
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
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#04010e]/96 backdrop-blur-2xl px-4 sm:px-6 py-8 transition-opacity duration-500 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Ambient Background Aura */}
      <div 
        className="absolute w-[600px] h-[350px] rounded-full bg-brand-purple/25 blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute w-[450px] h-[250px] rounded-full bg-brand-magenta/15 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Cyber Frame Container */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full">
        
        {/* Top Mini Header Status */}
        <div className="flex items-center justify-between w-full max-w-3xl mb-3 px-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-widest text-text-muted uppercase">
              ESPARTO 2026 // TEASER PREVIEW
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-text-muted font-mono text-[11px]">
            <VolumeX className="w-3.5 h-3.5 text-brand-violet" />
            <span>MUTED AUDIO</span>
          </div>
        </div>

        {/* Medium-Sized Centered Video Box */}
        <div className="relative w-full max-w-3xl aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-violet/30 bg-black shadow-[0_0_50px_rgba(121,40,202,0.35),0_20px_60px_rgba(0,0,0,0.9)] group">
          <video
            ref={videoRef}
            src="/video/esparto_2026_video.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleDismiss}
            className="w-full h-full object-contain bg-black"
          />
        </div>

        {/* Bottom Skip Action */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={handleDismiss}
            className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full border border-white/20 bg-surface/90 hover:bg-white/10 hover:border-brand-magenta/70 text-text-primary hover:text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(0,0,0,0.6)] group hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta"
          >
            <span>SKIP VIDEO • ENTER ESPARTO</span>
            <ArrowRight className="w-4 h-4 text-brand-orange group-hover:text-brand-magenta group-hover:translate-x-1 transition-all" />
          </button>
        </div>

        {/* Escape Key Hint */}
        <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest mt-3">
          Press [ESC] or Click Button to Skip
        </span>

      </div>
    </div>
  );
}
