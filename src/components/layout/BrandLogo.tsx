import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FEST_INFO } from "@/lib/constants";

export interface BrandLogoProps {
  className?: string;
  variant?: "full" | "minimal";
  showHitam?: boolean;
}

/**
 * BrandLogo Component
 * 
 * Renders the official ESPARTO logo directly from /icons/esparto_official_logo.png.
 */
export function BrandLogo({
  className,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet rounded-md transition-transform duration-200 hover:opacity-95 active:scale-95",
        className
      )}
      aria-label={`${FEST_INFO.name} ${FEST_INFO.edition} - ${FEST_INFO.institution.shortName} Technical Fest`}
    >
      <div className="relative h-10 sm:h-12 w-auto flex items-center">
        <Image
          src="/icons/esparto_official_logo.png"
          alt={`${FEST_INFO.name} ${FEST_INFO.edition} Official Logo`}
          width={1545}
          height={1018}
          className="h-10 sm:h-12 w-auto object-contain transition-all duration-300 drop-shadow-[0_2px_12px_rgba(121,40,202,0.35)] group-hover:drop-shadow-[0_4px_16px_rgba(255,0,122,0.5)]"
          priority
        />
      </div>
    </Link>
  );
}

