import React from "react";
import Image from "next/image";

export interface HeroLogoEmblemProps {
  className?: string;
}

/**
 * Holographic Portal & ESPARTO Head Lightbulb Centerpiece
 * 
 * Recreates the exact multi-ring energy pedestal, vertical laser beam aura, 
 * and glowing holographic head emblem from the official fest visual design.
 */
export function HeroLogoEmblem({ className = "" }: HeroLogoEmblemProps) {
  return (
    <div className={`relative flex flex-col items-center justify-end ${className}`}>
      
      {/* 1. Holographic Head Silhouette (Official ESPARTO Logo with Glow) */}
      <div className="relative z-20 w-[280px] sm:w-[340px] md:w-[400px] lg:w-[460px] xl:w-[500px] aspect-square flex items-center justify-center animate-in fade-in zoom-in-95 duration-700">
        
        {/* Intense Neon Aura behind Head */}
        <div 
          className="absolute inset-4 rounded-full bg-gradient-to-tr from-brand-orange via-brand-magenta to-brand-violet opacity-60 blur-3xl -z-10 animate-pulse"
          aria-hidden="true"
        />

        {/* Official Transparent PNG Logo */}
        <div className="relative w-full h-full filter drop-shadow-[0_0_35px_rgba(255,0,122,0.65)] drop-shadow-[0_0_80px_rgba(155,81,224,0.45)]">
          <Image
            src="/icons/esparto_official_logo.png"
            alt="ESPARTO 2026 Official Holographic Emblem"
            fill
            priority
            sizes="(max-width: 640px) 280px, (max-width: 1024px) 400px, 500px"
            className="object-contain"
          />
        </div>

        {/* Subtle Orbiting Laser Light Ring */}
        <div 
          className="absolute -inset-6 rounded-full border border-brand-orange/40 [transform:rotateX(65deg)] animate-[spin_20s_linear_infinite]"
          aria-hidden="true"
        />
      </div>

      {/* 2. Futuristic 3D Holographic Pedestal / Portal Ring on Ground */}
      <div className="relative z-10 -mt-16 sm:-mt-20 w-[300px] sm:w-[380px] md:w-[440px] lg:w-[520px] h-[120px] flex items-center justify-center">
        
        {/* Layer 1: Outer Dark Metallic Disc */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-surface-elevated to-[#020108] border-2 border-brand-purple/50 shadow-[0_0_40px_rgba(121,40,202,0.6)] [transform:rotateX(70deg)]" />

        {/* Layer 2: Inner Neon Energy Core Disc */}
        <div className="absolute inset-4 sm:inset-6 rounded-full bg-gradient-to-tr from-brand-magenta via-brand-orange to-brand-violet border border-white/60 shadow-[0_0_30px_rgba(255,0,122,0.8)] [transform:rotateX(70deg)] opacity-90" />

        {/* Layer 3: Concentric Glowing Laser Rings */}
        <div className="absolute inset-8 sm:inset-10 rounded-full border-2 border-dashed border-amber-300 [transform:rotateX(70deg)] animate-[spin_12s_linear_infinite]" />
        <div className="absolute inset-12 sm:inset-14 rounded-full border border-cyan-300 [transform:rotateX(70deg)] animate-[spin_8s_linear_infinite_reverse]" />

        {/* Layer 4: Vertical Neon Light Pillars / Rays Shooting Upward */}
        <div className="absolute -top-16 inset-x-12 h-28 bg-gradient-to-t from-brand-magenta/40 via-brand-purple/20 to-transparent blur-md pointer-events-none" />
        <div className="absolute -top-24 inset-x-20 h-36 bg-gradient-to-t from-brand-orange/50 via-brand-magenta/30 to-transparent blur-lg pointer-events-none" />
      </div>

    </div>
  );
}
