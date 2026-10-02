import React from "react";
import Link from "next/link";
import { getButtonClasses } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { GOOGLE_APPS_SCRIPT_REGISTRATION_URL } from "@/data/events";

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
 * Redirects directly to the official Google Apps Script central registration engine
 * or event-specific direct link.
 */
export function RegisterButton({
  registrationUrl = GOOGLE_APPS_SCRIPT_REGISTRATION_URL,
  label,
  showIcon = true,
  size = "md",
  className,
}: RegisterButtonProps) {
  const isExternal = registrationUrl.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={registrationUrl}
        target="_blank"
        rel="noopener noreferrer"
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
      </a>
    );
  }

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

