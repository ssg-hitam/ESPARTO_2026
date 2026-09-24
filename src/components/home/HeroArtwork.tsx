import React from "react";
import { HeroPortal } from "@/components/home/HeroPortal";
import { cn } from "@/lib/utils";

export interface HeroArtworkProps {
  className?: string;
}

/**
 * HeroArtwork Component
 * 
 * Houses the pure HTML/CSS/SVG right-side visual focal experience.
 */
export function HeroArtwork({ className }: HeroArtworkProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center w-full select-none pointer-events-none",
        className
      )}
      aria-hidden="true"
    >
      <HeroPortal headSrc="/icons/esparto_leftside.png" />
    </div>
  );
}
