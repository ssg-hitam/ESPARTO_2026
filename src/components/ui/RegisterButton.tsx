import React from "react";
import Link from "next/link";
import { getButtonClasses } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RegisterButtonProps {
  registrationUrl?: string;
  label?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Reusable Registration Call To Action Button
 * 
 * Automatically checks for verified registration URLs in FEST_INFO.
 * If no verified URL is supplied yet (CONTENT_REQUIRED), it gracefully displays 
 * a controlled "Register Soon" state without broken links.
 */
export function RegisterButton({
  registrationUrl = "/register",
  label,
  showIcon = true,
  size = "md",
  className,
}: RegisterButtonProps) {
  return (
    <Link
      href={registrationUrl}
      aria-label={label || "Register for ESPARTO 2026 events"}
      className={cn(
        "group inline-flex items-center justify-center select-none font-display font-bold tracking-wider uppercase transition-all duration-200",
        getButtonClasses({ variant: "primary", size, className })
      )}
    >
      <span>{label || "REGISTER NOW"}</span>
      {showIcon ? (
        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
      ) : null}
    </Link>
  );
}

