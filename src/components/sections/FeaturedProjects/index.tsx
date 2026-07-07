"use client";

/**
 * FeaturedProjects — src/components/sections/FeaturedProjects/index.tsx
 *
 * Horizontal scrolling row of featured project cards.
 *
 * Data source: FEATURED_IDS from projectDetails.ts
 * All card data comes from ProjectDetail — no local data file needed.
 * featuredProjects.ts is now obsolete and can be removed.
 */

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import ContinueWatchingCard from "@/components/sections/ContinueWatching/ContinueWatchingCard";
import { DetailOverlay } from "@/components/sections/Details";

import { getProjects, FEATURED_IDS } from "@/data/projectDetails";
import type { ProjectDetail } from "@/types/project-detail";

// ─── Component ────────────────────────────────────────────────────────────────

export default function FeaturedProjects() {
  const projects = getProjects(FEATURED_IDS);
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);

  return (
    <>
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-8 lg:px-16">

          <h2 className="mb-8 text-4xl font-bold text-white">
            Featured Projects
          </h2>

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

      <AnimatePresence>
        {activeProject && (
          <DetailOverlay
            key={activeProject.id}
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}