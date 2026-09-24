import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  indicator?: string; // e.g. "01 // THE MISSION"
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  indicator,
  title,
  subtitle,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 sm:mb-14",
        align === "center" ? "text-center mx-auto max-w-2xl" : "text-left max-w-2xl",
        className
      )}
      {...props}
    >
      {indicator ? (
        <p className="type-technical-label mb-2 flex items-center gap-2 font-mono text-xs tracking-widest text-brand-violet uppercase">
          <span>{indicator}</span>
        </p>
      ) : null}

      <h2 className="type-h1 text-text-primary tracking-tight font-display font-bold">
        {title}
      </h2>

      {subtitle ? (
        <p className="mt-3 type-body text-text-secondary">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
