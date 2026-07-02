import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#C8102E] text-white hover:bg-[#A50D26] focus-visible:ring-[#3B82F6]",
  secondary:
    "bg-white/10 text-white hover:bg-white/20 focus-visible:ring-[#3B82F6]",
  ghost:
    "bg-transparent text-white/70 hover:text-white hover:bg-white/5 focus-visible:ring-[#3B82F6]",
  outline:
    "border border-white/20 text-white hover:border-white/50 bg-transparent focus-visible:ring-[#3B82F6]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2 rounded-md",
  md: "text-base px-6 py-3 rounded-lg",
  lg: "text-lg px-8 py-4 rounded-xl",
};

/**
 * Primary button component.
 * All variants share focus-visible styling using the Electric Blue accent.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium",
          "transition-all duration-200 cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
