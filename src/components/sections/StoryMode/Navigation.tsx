"use client";

/**
 * Navigation — src/components/sections/StoryMode/Navigation.tsx
 *
 * Previous / Next controls for Story Mode.
 *
 * Layout:
 *  • Invisible left 40% tap zone → previous slide
 *  • Invisible right 40% tap zone → next slide
 *  • Visible Previous / Next arrow buttons at the bottom center
 *  • Keyboard: ← → Arrow keys handled by the parent StoryMode
 *
 * This component only renders the UI. The parent owns the currentSlide state.
 *
 * PRD Reference: §12 Accessibility · §8 Motion Design
 */

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavigationProps {
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Navigation({ onPrev, onNext, hasPrev, hasNext }: NavigationProps) {
  return (
    <>
      {/* ── Invisible tap zones (mobile / touch) ──────────────────────────── */}
      {hasPrev && (
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous episode"
          className="absolute inset-y-0 left-0 z-10 w-[40%] cursor-pointer bg-transparent focus-visible:outline-none"
        />
      )}

      {hasNext && (
        <button
          type="button"
          onClick={onNext}
          aria-label="Next episode"
          className="absolute inset-y-0 right-0 z-10 w-[40%] cursor-pointer bg-transparent focus-visible:outline-none"
        />
      )}

      {/* ── Visible arrow buttons (always shown, disabled when unavailable) ── */}
      <div
        className="
          absolute bottom-8 left-1/2 z-20
          -translate-x-1/2
          flex items-center gap-3
        "
      >
        <NavButton
          onClick={onPrev}
          disabled={!hasPrev}
          aria-label="Previous episode"
        >
          <ChevronLeft size={18} strokeWidth={2.5} aria-hidden />
        </NavButton>

        <NavButton
          onClick={onNext}
          disabled={!hasNext}
          aria-label="Next episode"
        >
          <ChevronRight size={18} strokeWidth={2.5} aria-hidden />
        </NavButton>
      </div>
    </>
  );
}

// ─── NavButton ────────────────────────────────────────────────────────────────

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function NavButton({ children, disabled, className, ...rest }: NavButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "flex h-10 w-10 items-center justify-center",
        "rounded-full",
        "border border-white/20 bg-black/50 backdrop-blur-sm",
        "text-white",
        "transition-all duration-150",
        disabled
          ? "cursor-not-allowed opacity-30"
          : "cursor-pointer hover:bg-white/20 hover:scale-110",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
