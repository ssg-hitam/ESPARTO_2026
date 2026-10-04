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
 * Renders the official ESPARTO logo and HITAM institutional logo side by side.
 */
export function BrandLogo({
  className,
  variant = "full",
  showHitam = true,
}: BrandLogoProps) {
  const isMinimal = variant === "minimal";

  return (
    <div
      className={cn(
        "inline-flex items-center select-none",
        isMinimal ? "gap-2" : "gap-2.5 sm:gap-3",
        className
      )}
    >
      {/* ESPARTO Official Logo */}
      <Link
        href="/"
        className="group inline-flex items-center select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet rounded-md transition-transform duration-200 hover:opacity-95 active:scale-95"
        aria-label={`${FEST_INFO.name} ${FEST_INFO.edition} - Home`}
      >
        <div
          className={cn(
            "relative w-auto flex items-center",
            isMinimal ? "h-8 sm:h-9" : "h-10 sm:h-12"
          )}
        >
          <Image
            src="/icons/esparto_official_logo.png"
            alt={`${FEST_INFO.name} ${FEST_INFO.edition} Official Logo`}
            width={1545}
            height={1018}
            className={cn(
              "w-auto object-contain transition-all duration-300 drop-shadow-[0_2px_12px_rgba(121,40,202,0.35)] group-hover:drop-shadow-[0_4px_16px_rgba(255,0,122,0.5)]",
              isMinimal ? "h-8 sm:h-9" : "h-10 sm:h-12"
            )}
            priority
          />
        </div>
      </Link>

      {showHitam && (
        <>
          {/* Subtle Vertical Divider */}
          <div
            className={cn(
              "w-[1px] bg-white/20 shrink-0",
              isMinimal ? "h-5 sm:h-6" : "h-6 sm:h-7"
            )}
            aria-hidden="true"
          />

          {/* HITAM Institutional Emblem Logo */}
          <Link
            href="/hitam"
            className="group/hitam relative flex items-center justify-center select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md sm:rounded-lg transition-transform duration-200 hover:opacity-95 active:scale-95 shrink-0"
            aria-label="About HITAM - Hyderabad Institute of Technology and Management"
            title="About HITAM"
          >
            <div
              className={cn(
                "relative rounded-md sm:rounded-lg overflow-hidden border border-white/20 shadow-md bg-[#388e3c] flex items-center justify-center shrink-0 group-hover/hitam:border-emerald-400/60 group-hover/hitam:shadow-[0_0_12px_rgba(16,185,129,0.35)] transition-all duration-300",
                isMinimal ? "h-7 w-[23px] sm:h-8 sm:w-[26px]" : "h-8 w-[26px] sm:h-9 sm:w-[30px]"
              )}
            >
              <Image
                src="/images/hitam/hitam_logo.jpg"
                alt="HITAM Official Logo"
                fill
                sizes="40px"
                className="object-contain p-[1px] group-hover/hitam:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        </>
      )}
    </div>
  );
}

