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
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

/**
 * Reusable Registration Call To Action Button
 *
 * Opens the registration page, or an explicitly supplied destination, in the same tab.
 */
export function RegisterButton({
  registrationUrl = "/register",
  label,
  showIcon = true,
  size = "md",
  className,
  onClick,
}: RegisterButtonProps) {
  const isExternal = registrationUrl.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={registrationUrl}
        onClick={onClick}
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
      onClick={onClick}
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
