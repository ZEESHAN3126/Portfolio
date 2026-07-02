import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Pill-shaped tech tag — used inside project cards for tech stack labels.
 *
 * @example
 * <Tag>Next.js</Tag>
 */
export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 rounded-full text-xs font-mono",
        "bg-white/5 text-white/60 border border-white/10",
        "hover:border-white/25 hover:text-white/80 transition-colors duration-200",
        className
      )}
    >
      {children}
    </span>
  );
}
