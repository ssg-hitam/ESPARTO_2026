import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive";
}

export function Card({
  className,
  variant = "default",
  children,
  ...props
}: CardProps) {
  const baseStyles = "rounded-xl border transition-all duration-200";

  const variantStyles = {
    default: "bg-surface/80 backdrop-blur-md border-border-glass text-text-primary",
    elevated: "bg-surface-elevated/90 backdrop-blur-md border-border-glass shadow-xl text-text-primary",
    interactive:
      "bg-surface/80 backdrop-blur-md border-border-glass hover:border-brand-violet/40 hover:shadow-lg hover:shadow-brand-purple/10 hover:-translate-y-1 cursor-pointer text-text-primary",
  };

  return (
    <div className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </div>
  );
}
