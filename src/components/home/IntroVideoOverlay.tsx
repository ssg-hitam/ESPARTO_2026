"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";

interface IntroVideoOverlayProps {
  onComplete: () => void;
}

/**
 * IntroVideoOverlay — full Framer Motion showcase
 *
 * Features used:
 *  01 Independent transforms  — rotateX/rotateY/scale on video without wrappers
 *  02 Motion values           — useMotionValue tracks raw mouse position in real time
 *  03 useTransform            — derives rotateX/Y from mouse position
 *  04 Spring physics          — useSpring smooths the 3-D tilt (type="spring")
 *  05 Native gestures         — whileHover / whileTap on the Skip button
 *  06 Exit animation          — AnimatePresence keeps the overlay alive during cinematic exit
 *  07 Timeline sequences      — corner-line decorations staggered via variants + stagger(0.04)
 *  08 Layout animation        — progress bar uses layout prop to smoothly resize
 */
export function IntroVideoOverlay({ onComplete }: IntroVideoOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);

  // ─── 02 Motion values — raw mouse coords ─────────────────────────────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // ─── 03 useTransform — map mouse [0,1] → tilt angle ──────────────────────
  const rotateYRaw = useTransform(mouseX, [0, 1], [-8, 8]);
  const rotateXRaw = useTransform(mouseY, [0, 1], [6, -6]);

  // ─── 04 Spring physics — damp the 3-D rotation for natural feel ──────────
  const rotateY = useSpring(rotateYRaw, { stiffness: 60, damping: 18, mass: 0.8 });
  const rotateX = useSpring(rotateXRaw, { stiffness: 60, damping: 18, mass: 0.8 });

  // Update mouseX/Y on pointer move over the container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Track video progress for the layout-animated progress bar
  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setVideoProgress(v.currentTime / v.duration);
  };

  // ─── 07 Timeline sequences — corner decoration variants ──────────────────
  const cornerVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.12, duration: 0.6, ease: "easeInOut" },
        opacity:    { delay: i * 0.12, duration: 0.2 },
      },
    }),
  };

  // Lock body scroll while intro is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    mouseX.set(0.5);
    mouseY.set(0.5);
    return () => { document.body.style.overflow = ""; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        e.preventDefault();
        triggerExit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFadingOut]);

  const triggerExit = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    if (videoRef.current) videoRef.current.pause();
    setTimeout(() => setIsVisible(false), 80);
  };

  // ─── 06 Exit animation — AnimatePresence fires onComplete after exit ──────
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          ref={containerRef}
          key="intro-overlay"
          aria-label="ESPARTO 2026 Intro"
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.07,
            filter: "blur(14px) brightness(2.2)",
          }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Radial vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.72) 100%)",
            }}
          />

          {/* ── 07 Corner SVG decorations — staggered entrance ───────────── */}
          {[
            "top-6 left-6 rotate-0",
            "top-6 right-6 rotate-90",
            "bottom-6 right-6 rotate-180",
            "bottom-6 left-6 -rotate-90",
          ].map((pos, i) => (
            <motion.svg
              key={i}
              className={`absolute ${pos} w-8 h-8 z-20 pointer-events-none`}
              viewBox="0 0 32 32"
              fill="none"
              initial="hidden"
              animate="visible"
            >
              <motion.path
                d="M2 14 L2 2 L14 2"
                stroke="rgba(155,81,224,0.6)"
                strokeWidth="1.5"
                strokeLinecap="round"
                custom={i}
                variants={cornerVariants}
              />
            </motion.svg>
          ))}

          {/* ── 01 Independent transforms — 3D tilt via motion values ─────
               rotateX, rotateY, scale applied directly (no wrapper needed) */}
          <motion.video
            ref={videoRef}
            src="/video/esparto_2026_video.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={() => setVideoDuration(videoRef.current?.duration ?? 0)}
            onTimeUpdate={handleTimeUpdate}
            onEnded={triggerExit}
            className="w-[65vw] h-[60vh] max-w-2xl md:max-w-3xl lg:max-w-4xl object-contain select-none pointer-events-none relative z-10"
            style={{
              rotateX,           // 01 independent transform — no wrapper
              rotateY,           // 01 independent transform
              transformPerspective: 900,
            }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />

          {/* ── 08 Layout animation — progress bar resizes with layout prop ─ */}
          {videoDuration > 0 && (
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden z-20">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-purple via-brand-magenta to-brand-orange rounded-full origin-left"
                layout
                style={{ scaleX: videoProgress, transformOrigin: "left" }}
                transition={{ type: "spring", stiffness: 40, damping: 20 }}
              />
            </div>
          )}

          {/* ── 05 Native gestures — Skip button with whileHover / whileTap ─ */}
          <motion.button
            type="button"
            onClick={triggerExit}
            className="absolute bottom-6 right-8 z-20 flex items-center gap-2 text-white/40 font-mono text-xs tracking-widest uppercase font-light select-none focus:outline-none"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 1.8,
              duration: 0.5,
              // ── 04 Spring physics on the entrance ─────────────────────
              type: "spring",
              stiffness: 120,
              damping: 18,
            }}
            // ── 05 Native gestures ─────────────────────────────────────
            whileHover={{ scale: 1.08, color: "rgba(255,255,255,0.9)" }}
            whileTap={{ scale: 0.92 }}
          >
            <motion.span
              className="inline-block w-4 h-[1px] bg-current"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.1, duration: 0.4 }}
            />
            Skip Intro
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
