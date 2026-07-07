"use client";

/**
 * ContinueWatching — src/components/sections/ContinueWatching/index.tsx
 *
 * Horizontal scrolling row of project cards.
 *
 * Data source: CONTINUE_WATCHING_IDS from projectDetails.ts
 * Each card reads its own title/image/progress/category from ProjectDetail.
 * No data duplication — projectDetails is the single source of truth.
 *
 * State:
 *  activeProject — the currently open ProjectDetail, or null.
 *
 * Flow:
 *  card click → resolve ProjectDetail → setActiveProject
 *            → AnimatePresence renders <DetailOverlay>
 *  ESC / X  → setActiveProject(null)
 *            → AnimatePresence plays exit → unmounts overlay
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ContinueWatchingCard from "./ContinueWatchingCard";
import { DetailOverlay } from "@/components/sections/Details";

import { getProjects, CONTINUE_WATCHING_IDS } from "@/data/projectDetails";
import type { ProjectDetail } from "@/types/project-detail";

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContinueWatching() {
  const projects = getProjects(CONTINUE_WATCHING_IDS);
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);

  const handleClose = () => setActiveProject(null);

  return (
    <>
      {/* ── Section ─────────────────────────────────────────────────────── */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-8 lg:px-16">

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-4xl font-bold text-white"
          >
            Continue Watching
          </motion.h2>

          <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide">
            {projects.map((project) => (
              <ContinueWatchingCard
                key={project.id}
                title={project.title}
                subtitle={project.subtitle}
                category={project.category}
                progress={project.progress}
                image={project.heroImage}
                onSelect={() => setActiveProject(project)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ── Detail Overlay ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeProject && (
          <DetailOverlay
            key={activeProject.id}
            project={activeProject}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  );
}