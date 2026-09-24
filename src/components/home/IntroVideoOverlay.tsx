"use client";

import React, { useState, useEffect, useRef } from "react";

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
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-black overflow-hidden transition-opacity duration-1000 ease-in-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Centered Video Clip with Pure Black Canvas */}
      <video
        ref={videoRef}
        src="/video/esparto_2026_video.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleDismiss}
        className="w-[85vw] h-[80vh] max-w-4xl md:max-w-5xl lg:max-w-6xl object-contain select-none pointer-events-none"
      />

      {/* Minds-ds Style Minimal Skip Intro Button */}
      <button
        type="button"
        onClick={handleDismiss}
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 text-white/40 hover:text-white/90 transition-colors z-20 text-xs sm:text-sm tracking-widest uppercase font-mono font-light cursor-pointer select-none focus:outline-none"
      >
        Skip Intro
      </button>
    </div>
  );
}
