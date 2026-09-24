import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "purple" | "magenta" | "orange" | "outline";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-mono font-medium uppercase tracking-wider rounded-full transition-colors";

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  const variantStyles = {
    default: "bg-surface-elevated text-text-secondary border border-border-glass",
    purple: "bg-brand-purple/15 text-brand-violet border border-brand-purple/30",
    magenta: "bg-brand-magenta/15 text-brand-magenta border border-brand-magenta/30",
    orange: "bg-brand-orange/15 text-brand-amber border border-brand-orange/30",
    outline: "bg-transparent text-text-muted border border-border-glass",
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
