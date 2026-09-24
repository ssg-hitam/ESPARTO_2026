import React, { ButtonHTMLAttributes, forwardRef, cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  asChild?: boolean;
}

export function getButtonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-display font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none rounded-lg";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-2 min-h-[36px] gap-1.5",
    md: "text-sm px-5 py-2.5 min-h-[44px] gap-2",
    lg: "text-base px-7 py-3.5 min-h-[50px] gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-brand-orange via-brand-magenta to-brand-purple text-white shadow-lg shadow-brand-magenta/25 hover:shadow-brand-magenta/40 hover:brightness-110",
    secondary:
      "bg-surface border border-border-glass text-text-primary hover:border-brand-violet/50 hover:bg-surface-elevated hover:text-white",
    outline:
      "border border-brand-violet text-brand-violet hover:bg-brand-violet/10 active:bg-brand-violet/20",
    ghost:
      "text-text-secondary hover:text-text-primary hover:bg-white/5",
  };

  return cn(baseStyles, sizeStyles[size], variantStyles[variant], className);
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      asChild = false,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const computedClassName = getButtonClasses({ variant, size, className });

    if (asChild && isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return cloneElement(child, {
        className: cn(computedClassName, child.props.className),
      });
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={computedClassName}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
