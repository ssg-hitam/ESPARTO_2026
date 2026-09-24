import React, { HTMLAttributes } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export interface SectionContainerProps extends HTMLAttributes<HTMLElement> {
  containerSize?: "sm" | "md" | "lg" | "full";
}

export function SectionContainer({
  id,
  className,
  containerSize = "lg",
  children,
  ...props
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn("relative py-16 sm:py-24 overflow-hidden", className)}
      {...props}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
