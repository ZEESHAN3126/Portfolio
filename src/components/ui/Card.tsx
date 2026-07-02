import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Adds a subtle crimson glow on hover */
  glowOnHover?: boolean;
}

/**
 * Base card surface component.
 * Wrap with Framer Motion for hover animations.
 *
 * @example
 * <Card glowOnHover>
 *   <ProjectContent />
 * </Card>
 */
export function Card({ children, className, glowOnHover = false }: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden",
        "bg-[#1F1F1F] border border-white/5",
        "transition-all duration-300",
        glowOnHover &&
          "hover:border-[#C8102E]/30 hover:shadow-[0_0_30px_rgba(200,16,46,0.12)]",
        className
      )}
    >
      {children}
    </div>
  );
}
