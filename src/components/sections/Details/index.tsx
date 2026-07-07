"use client";

/**
 * DetailOverlay — src/components/sections/Details/index.tsx
 *
 * The Project Experience overlay.
 * Accepts a full ProjectDetail object and composes every section.
 *
 * Layout (top → bottom, scrollable):
 *  ┌─ Hero          (image + title + category badge + close X) ──────────────┐
 *  │  Overview       (meta + subtitle + description + progress + tech)        │
 *  │  ActionButtons  (Live · GitHub · Figma · Notion · Case Study)            │
 *  │─────────────────────────────────────────────────────────────────────────│
 *  │  StoryPreview   (teaser → opens StoryMode)                               │
 *  │  About          (extended paragraphs)                                    │
 *  │  Timeline       (project milestones)                                     │
 *  │  Gallery        (image grid)                                             │
 *  │  Documents      (PDF · Notion · Figma · links)                           │
 *  │  Achievements   (wins + dates)                                           │
 *  │  RelatedProjects (mini cards → navigate to another project)              │
 *  └─────────────────────────────────────────────────────────────────────────┘
 *
 * StoryMode:
 *  Managed as a second layer (z-[400]) above this overlay.
 *  AnimatePresence wraps it so it animates in/out cleanly.
 *
 * Data:
 *  All sections read from project (ProjectDetail).
 *  Empty sections auto-hide — no conditional rendering needed in this file.
 *
 * Behaviour:
 *  ✅ Fade + scale entrance / exit (parent AnimatePresence)
 *  ✅ ESC closes the overlay
 *  ✅ X button closes it
 *  ✅ Clicking outside panel does NOT close
 *  ✅ Body scroll locked while open
 *  ✅ Related project click → navigates to that project's overlay
 *
 * PRD Reference: §8 Motion · §12 Accessibility · §9 Color System
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { ProjectDetail } from "@/types/project-detail";

import { DetailHero }          from "./Hero";
import { Overview }            from "./Overview";
import { DetailActionButtons } from "./ActionButtons";
import { StoryPreview }        from "./StoryPreview";
import { About }               from "./About";
import { Timeline }            from "./Timeline";
import { Gallery }             from "./Gallery";
import { Documents }           from "./Documents";
import { Achievements }        from "./Achievements";
import { RelatedProjects }     from "./RelatedProjects";


import { getProject } from "@/data/projectDetails";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DetailOverlayProps {
  project: ProjectDetail;
  onClose: () => void;
}

// ─── Animation ────────────────────────────────────────────────────────────────

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
  exit:    { opacity: 0 },
};

const panelVariants = {
  hidden:  { opacity: 0, y: 32, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1    },
  exit:    { opacity: 0, y: 16, scale: 0.98 },
};

const transition = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

// ─── Component ────────────────────────────────────────────────────────────────

export function DetailOverlay({ project, onClose }: DetailOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  /** Allows clicking a RelatedProject card to navigate to that project */
  const [activeProject, setActiveProject] = useState<ProjectDetail>(project);

  // Sync when the parent changes the project prop
  useEffect(() => { setActiveProject(project); }, [project]);

  // ── Body scroll lock ────────────────────────────────────────────────────────
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // ── ESC key: close StoryMode first, then overlay ────────────────────────────
  useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
    onClose();
  };

  window.addEventListener("keydown", handleKey);

  return () => window.removeEventListener("keydown", handleKey);
}, [onClose]);

  // ── Focus management ────────────────────────────────────────────────────────
  useEffect(() => {
    const raf = requestAnimationFrame(() => panelRef.current?.focus());
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── Related project navigation ──────────────────────────────────────────────
  const handleRelatedSelect = (id: string) => {
    const detail = getProject(id);
    if (detail) {
      setActiveProject(detail);
      // Scroll panel back to top
      panelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const p = activeProject;

  return (
    <>
      {/* ── Overlay ──────────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 z-[300] overflow-y-auto">

        {/* Backdrop */}
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 bg-black/85"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.25, ease: "easeOut" }}
        />

        {/* Centering wrapper */}
        <div className="relative min-h-full flex items-start justify-center p-4 sm:p-6 py-10 sm:py-14">

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-overlay-title"
            tabIndex={-1}
            className="
              relative z-[1]
              w-full max-w-3xl
              overflow-hidden
              rounded-2xl
              bg-[#141414]
              shadow-[0_30px_100px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)]
              outline-none
            "
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transition}
          >

            {/* Hero */}
            <DetailHero
              image={p.heroImage}
              title={p.title}
              category={p.category}
              onClose={onClose}
            />

            {/* Body */}
            <div className="px-5 pb-10 pt-5 sm:px-7">

              {/* Overview */}
              <Overview
                subtitle={p.subtitle}
                description={p.description}
                year={p.year}
                status={p.status}
                category={p.category}
                progress={p.progress}
                tech={p.tech}
              />

              {/* Action Buttons */}
              {p.links && (
                <div className="mt-5">
                  <DetailActionButtons
                    liveUrl={p.links.live}
                    githubUrl={p.links.github}
                  />
                </div>
              )}

              {/* Scrollable sections — each auto-hides when data is absent */}
            <StoryPreview
  data={p.storyMode}
/>

              <About content={p.about} />

              <Timeline items={p.timeline} />

              <Gallery images={p.gallery} />

              <Documents items={p.documents} />

              <Achievements items={p.achievements} />

              <RelatedProjects
                items={p.relatedProjects}
                onSelect={handleRelatedSelect}
              />

            </div>
          </motion.div>
        </div>
      </div>

      
    
    </>
  );
}
