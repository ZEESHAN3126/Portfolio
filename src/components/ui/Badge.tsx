import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "success" | "muted";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-white/10 text-white/80",
  accent:  "bg-[#C8102E]/20 text-[#C8102E] border border-[#C8102E]/30",
  success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  muted:   "bg-white/5 text-white/40",
};

/**
 * Small inline badge / label component.
 *
 * @example
 * <Badge variant="accent">Live</Badge>
 */
export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
