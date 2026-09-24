import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface HeroPortalProps {
  headSrc?: string;
  className?: string;
}

/**
 * HeroPortal Component
 * 
 * Recreates the holographic portal platform, energy beams, orbital rings,
 * and glowing head illustration using layered HTML/CSS/SVG with GPU-accelerated micro-animations.
 */
export function HeroPortal({
  headSrc = "/icons/esparto_leftside.png",
  className,
}: HeroPortalProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-end w-full max-w-[540px] lg:max-w-[600px] aspect-[1/1.12] select-none pointer-events-none",
        className
      )}
      aria-hidden="true"
    >
      {/* =========================================================================
          ATMOSPHERIC BACKLIGHTING (Purple/Magenta + Warm Orange Core)
          ========================================================================= */}
      <div className="absolute top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[460px] lg:w-[540px] h-[340px] sm:h-[460px] lg:h-[540px] rounded-full bg-gradient-to-tr from-brand-purple/45 via-brand-magenta/35 to-transparent blur-[80px] lg:blur-[110px] mix-blend-screen -z-20 pointer-events-none" />
      <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[300px] lg:w-[360px] h-[220px] sm:h-[300px] lg:h-[360px] rounded-full bg-brand-orange/30 blur-[65px] mix-blend-screen -z-20 pointer-events-none" />

      {/* =========================================================================
          UPWARD RISING ENERGY BEAMS (Staggered Animation)
          ========================================================================= */}
      <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[260px] sm:w-[340px] h-[180px] sm:h-[240px] flex items-end justify-center gap-3 sm:gap-6 opacity-80 mix-blend-screen -z-10 overflow-hidden">
        <div className="w-[1.5px] h-[85%] bg-gradient-to-t from-brand-orange via-brand-magenta to-transparent blur-[0.5px] animate-beam" style={{ animationDelay: "0.2s" }} />
        <div className="w-[2px] h-[100%] bg-gradient-to-t from-brand-orange via-white to-transparent blur-[0.8px] animate-beam" style={{ animationDelay: "0s" }} />
        <div className="w-[1px] h-[75%] bg-gradient-to-t from-brand-magenta via-brand-purple to-transparent animate-beam" style={{ animationDelay: "0.5s" }} />
        <div className="w-[2.5px] h-[92%] bg-gradient-to-t from-brand-orange via-brand-magenta to-transparent blur-[0.6px] animate-beam" style={{ animationDelay: "0.8s" }} />
        <div className="w-[1.5px] h-[80%] bg-gradient-to-t from-brand-purple via-brand-magenta to-transparent animate-beam" style={{ animationDelay: "0.3s" }} />
      </div>

      {/* =========================================================================
          FOCAL OBJECT: LEVITATING HEAD & ORBITAL RINGS
          ========================================================================= */}
      <div className="relative w-[220px] xs:w-[260px] sm:w-[320px] md:w-[380px] lg:w-[430px] aspect-square flex items-center justify-center z-10 -mb-6 sm:-mb-8 animate-levitate">
        
        {/* Background Orbital Ring Layer (Behind Head) */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 rotate-[-18deg]">
          <div className="w-[115%] h-[40%] rounded-[100%] border-[2px] border-brand-orange/80 shadow-[0_0_18px_#ff5e00] blur-[0.5px]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center -z-10 rotate-[22deg]">
          <div className="w-[125%] h-[45%] rounded-[100%] border border-brand-purple/75 shadow-[0_0_14px_#7928ca]" />
        </div>

        {/* Head & Lightbulb Asset */}
        <div className="relative w-full h-full filter drop-shadow-[0_0_32px_rgba(255,0,122,0.75)] drop-shadow-[0_0_65px_rgba(155,81,224,0.5)]">
          <Image
            src={headSrc}
            alt="ESPARTO 2026 Focal Emblem"
            fill
            priority
            sizes="(max-width: 640px) 260px, (max-width: 1024px) 380px, 430px"
            className="object-contain"
          />
        </div>

        {/* Foreground Orbital Ring Segment (Passing in Front) */}
        <div className="absolute inset-0 flex items-center justify-center z-20 rotate-[-18deg] pointer-events-none">
          <div className="w-[115%] h-[40%] rounded-[100%] border-t-[2.5px] border-l-[2px] border-r-transparent border-b-transparent border-brand-orange shadow-[0_0_22px_#ff9100]" />
        </div>
      </div>

      {/* =========================================================================
          HOLOGRAPHIC CYBER PLATFORM / CONCENTRIC PORTAL RINGS
          ========================================================================= */}
      <div className="relative w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[560px] h-[85px] sm:h-[115px] flex items-center justify-center z-0 perspective-[600px]">
        {/* Layer 1: Outermost Glowing Disc */}
        <div className="absolute w-[96%] h-[78%] rounded-[100%] bg-gradient-to-r from-brand-purple/40 via-brand-magenta/40 to-brand-purple/40 border border-brand-magenta/60 shadow-[0_0_35px_rgba(255,0,122,0.55)] transform rotateX-[70deg]" />

        {/* Layer 2: Middle Metallic Stepped Rim */}
        <div className="absolute w-[80%] h-[65%] rounded-[100%] bg-[#0d0728] border-2 border-brand-purple/80 shadow-[inset_0_0_22px_rgba(121,40,202,0.65)] transform rotateX-[70deg]" />

        {/* Layer 3: Inner High-Intensity Energy Ring */}
        <div className="absolute w-[62%] h-[50%] rounded-[100%] border-[2.5px] border-brand-orange shadow-[0_0_28px_#ff5e00] transform rotateX-[70deg]" />

        {/* Layer 4: Luminous Center Core with Breathing Pulse */}
        <div className="absolute w-[40%] h-[32%] rounded-[100%] bg-gradient-to-r from-brand-orange via-white to-brand-orange blur-[4px] shadow-[0_0_40px_#ffaa00] transform rotateX-[70deg] animate-energy-pulse" />
      </div>
    </div>
  );
}
