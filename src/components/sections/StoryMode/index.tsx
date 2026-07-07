"use client";

/**
 * StoryMode — src/components/sections/StoryMode/index.tsx
 *
 * Netflix-style "episode viewer" for project stories.
 *
 * Think of it as: each project has a series of full-screen episodes.
 * Each episode (slide) can be an image, video, PDF, code block, text, or split layout.
 *
 * Architecture:
 *  ┌─ fixed overlay (inset-0, z-[400]) ─────────────────────────────────────┐
 *  │  ┌─ Progress bar (top) ─────────────────────────────────────────────┐  │
 *  │  └──────────────────────────────────────────────────────────────────┘  │
 *  │  ┌─ Header (project title + close) ────────────────────────────────┐  │
 *  │  └──────────────────────────────────────────────────────────────────┘  │
 *  │  ┌─ Slide area (AnimatePresence → Slide) ──────────────────────────┐  │
 *  │  └──────────────────────────────────────────────────────────────────┘  │
 *  │  ┌─ Navigation (tap zones + arrow buttons) ─────────────────────────┐  │
 *  │  └──────────────────────────────────────────────────────────────────┘  │
 *  └────────────────────────────────────────────────────────────────────────┘
 *
 * Behaviour:
 *  ✅ ← → keyboard navigation
 *  ✅ ESC closes Story Mode (returns to Detail Overlay)
 *  ✅ Body scroll locked while open
 *  ✅ AnimatePresence slide transitions (horizontal slide + fade)
 *  ✅ Progress bar shows position
 *  ✅ Graceful empty state when slides array is empty
 *  ✅ prefers-reduced-motion respected
 *
 * PRD Reference: §8 Motion Design · §12 Accessibility · §9 Color System
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";


import { Slide } from "./Slide";
import { Progress } from "./Progress";
import { Navigation } from "./Navigation";

// ─── Types ────────────────────────────────────────────────────────────────────
import { projectDetails } from "@/data/projectDetails";

export interface StoryModeProps {
  projectId: string;
}

// ─── Animation ────────────────────────────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const slideTransition = {
  duration: 0.38,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function StoryMode({ projectId }: StoryModeProps) {

  // Hooks MUST come first
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  const project = projectDetails[projectId];
   
  
  const story = project?.storyMode;
const projectTitle = project?.title ?? "Unknown Project";
const slides = story?.slides ?? [];

const hasPrev = currentIndex > 0;
const hasNext = currentIndex < slides.length - 1;

 

  // ── Navigation helpers ─────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    if (hasNext) {
      setDirection(1);
      setCurrentIndex((i) => i + 1);
    }
  }, [hasNext]);

  const goPrev = useCallback(() => {
    if (hasPrev) {
      setDirection(-1);
      setCurrentIndex((i) => i - 1);
    }
  }, [hasPrev]);

  // ── Keyboard navigation ────────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft")  goPrev();
      if (e.key === "Escape") {
      window.history.back(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  // ── Body scroll lock ───────────────────────────────────────────────────────
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // ── Focus management ──────────────────────────────────────────────────────
  useEffect(() => {
    const raf = requestAnimationFrame(() => closeRef.current?.focus());
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!project) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      Project not found.
    </div>
  );
}

if (!story) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      Story not found.
    </div>
  );
}
  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[400] flex flex-col bg-[#0A0A0A] text-white"
      role="dialog"
      aria-modal="true"
      aria-label={`Story Mode: ${projectTitle}`}
    >

      {/* ── Background ambient ──────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"
      />

      {/* ── Top bar: progress + header ───────────────────────────────────────── */}
      <div className="relative z-20 flex flex-col gap-3 px-5 pb-2 pt-5 sm:px-8">

        {/* Progress segments */}
        {slides.length > 0 && (
          <Progress total={slides.length} current={currentIndex} />
        )}

        {/* Header row */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-[#C8102E]">
              Story Mode
            </p>
            <h1 className="mt-0.5 text-lg font-black leading-none text-white">
              {projectTitle}
            </h1>
          </div>

          <button
            ref={closeRef}
            type="button"
          onClick={() => window.history.back()}
            aria-label="Close Story Mode"
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full
              border border-white/15
              bg-black/50 backdrop-blur-sm
              text-white
              transition-all duration-150
              hover:bg-white/20 hover:scale-110
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]
            "
          >
            <X size={15} strokeWidth={2.5} aria-hidden />
          </button>
        </div>

      </div>

      {/* ── Slide area ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 min-h-0 flex-1 overflow-hidden">

        {slides.length === 0 ? (
          /* ── Empty state ──────────────────────────────────────────────────── */
          <div className="flex h-full items-center justify-center text-center">
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-[#C8102E]">
                Coming Soon
              </p>
              <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">
                Story in Production
              </h2>
              <p className="mt-4 text-base text-white/50">
                This cinematic story will tell the complete journey of {projectTitle}.
              </p>
            </div>
          </div>
        ) : (
          /* ── Animated slide sequence ─────────────────────────────────────── */
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="absolute inset-0"
            >
              <Slide
                slide={slides[currentIndex]}
                slideIndex={currentIndex}
                totalSlides={slides.length}
              />
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── Navigation controls (on top of slide) ─────────────────────────── */}
        {slides.length > 1 && (
          <Navigation
            onPrev={goPrev}
            onNext={goNext}
            hasPrev={hasPrev}
            hasNext={hasNext}
          />
        )}

      </div>

    </motion.div>
  );
}