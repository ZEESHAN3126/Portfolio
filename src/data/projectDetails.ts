/**
 * projectDetails.ts — SINGLE SOURCE OF TRUTH
 *
 * Every project in ZEESHAN+ lives here.
 * Cards, overlays, Story Mode, documents — everything reads from this file.
 *
 * ┌─────────────────────────────────────────────────────────┐
 * │  To add a new project:                                  │
 * │  1. Add one entry to this object.                       │
 * │  2. Add the id to the relevant row array                │
 * │     (e.g. CONTINUE_WATCHING_IDS, FEATURED_IDS).        │
 * │  3. Nothing else changes.                               │
 * └─────────────────────────────────────────────────────────┘
 *
 * Section visibility:
 *   undefined | []  →  section auto-hides in the overlay
 *   populated data  →  section renders
 *
 * Row configuration:
 *   The arrays at the bottom of this file define which projects
 *   appear in which section and in what order. They are just arrays
 *   of project IDs — no data duplication.
 */

import type { ProjectDetail } from "@/types/project-detail";

// ─── Project Registry ─────────────────────────────────────────────────────────

export const projectDetails: Record<string, ProjectDetail> = {

  // ─── Stylinger ─────────────────────────────────────────────────────────────
  stylinger: {
    id: "stylinger",
    title: "Stylinger",
    subtitle: "Building the future of AI Fashion.",
    heroImage: "/images/projects/stylinger.png",
    category: "Startup",
    progress: 82,
    year: "2024",
    status: "In Progress",

    description:
      "Stylinger is an AI-powered fashion discovery platform that helps users build a personal style identity through intelligent outfit recommendations and wardrobe curation. Designed to make fashion accessible, sustainable, and deeply personal — one look at a time.",

    tech: ["Next.js", "TypeScript", "OpenAI", "PostgreSQL", "Prisma", "Tailwind CSS", "Vercel"],

    links: {
      live: "https://stylinger.app",
      github: "https://github.com/ZEESHAN3126",
    },

    // ── Story Mode ─────────────────────────────────────────────────────────
    storyMode: {
      previewText: "The complete journey — from idea to AI-powered fashion platform.",
      ctaLabel: "Watch Story",
      slides: [
        // Slides will be added when Story Mode content is ready.
        // Example structure:
        // {
        //   id: "slide-1",
        //   type: "image",
        //   title: "The Problem",
        //   src: "/images/projects/stylinger/slide-01.png",
        //   caption: "Fashion is broken. We're fixing it.",
        // },
      ],
    },

    // ── Sections ───────────────────────────────────────────────────────────
    about: undefined,
    timeline: [],
    gallery: [],
    documents: [],
    achievements: [],
    relatedProjects: [],
  },

  // ─── ZEESHAN+ ──────────────────────────────────────────────────────────────
  portfolio: {
    id: "portfolio",
    title: "ZEESHAN+",
    subtitle: "A cinematic, Netflix-inspired portfolio.",
    heroImage: "/images/projects/portfolio.png",
    category: "Portfolio",
    progress: 45,
    year: "2024",
    status: "In Progress",

    description:
      "ZEESHAN+ is a premium interactive portfolio experience built to feel like browsing a streaming platform. Features persona-aware content, cinematic entry flows, a glassmorphic shell, and full Framer Motion animation throughout. Completely original — no templates.",

    tech: ["Next.js 15", "TypeScript", "Framer Motion", "Tailwind CSS v4", "Resend"],

    links: {
      github: "https://github.com/ZEESHAN3126/Portfolio",
    },

    storyMode: {
      previewText: "How a portfolio became a cinematic experience.",
      ctaLabel: "Watch Story",
      slides: [],
    },

    about: undefined,
    timeline: [],
    gallery: [],
    documents: [],
    achievements: [],
    relatedProjects: [],
  },

  // ─── AI Fashion Vision ─────────────────────────────────────────────────────
  "fashion-ai": {
    id: "fashion-ai",
    title: "AI Fashion Vision",
    subtitle: "Researching intelligent styling experiences.",
    heroImage: "/images/projects/fashion-ai.png",
    category: "Research",
    progress: 68,
    year: "2024",
    status: "In Progress",

    description:
      "A deep research initiative exploring the intersection of artificial intelligence and personal style. Covers computer vision for garment recognition, NLP-driven style profiling, and the product architecture needed to bring intelligent fashion recommendations to scale.",

    tech: ["Python", "TensorFlow", "Computer Vision", "NLP", "FastAPI"],

    links: {},

    storyMode: undefined,
    about: undefined,
    timeline: [],
    gallery: [],
    documents: [],
    achievements: [],
    relatedProjects: [],
  },

  // ─── Product Docs ──────────────────────────────────────────────────────────
  "product-docs": {
    id: "product-docs",
    title: "Product Docs",
    subtitle: "PRDs, roadmaps and product thinking.",
    heroImage: "/images/projects/product-docs.png",
    category: "Product",
    progress: 76,
    year: "2024",
    status: "In Progress",

    description:
      "A living collection of product requirement documents, feature roadmaps, user story maps, and technical specifications developed for Stylinger and other projects. Demonstrates end-to-end product thinking from zero to shipped.",

    tech: ["Notion", "Figma", "Miro", "Linear"],

    links: {},

    storyMode: undefined,
    about: undefined,
    timeline: [],
    gallery: [],
    documents: [],
    achievements: [],
    relatedProjects: [],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PLACEHOLDER SLOTS — Add real data when each section is built.
  // These IDs are reserved for future sections.
  // ─────────────────────────────────────────────────────────────────────────────

  // education: { id: "education", title: "Education", ... }
  // comic-con: { id: "comic-con", title: "Comic-Con 2024", ... }
  // internship-1: { id: "internship-1", title: "Internship @ ...", ... }

};

// ─── Row Configuration ────────────────────────────────────────────────────────
//
// These arrays define which projects appear in which section.
// Order = display order. IDs must match keys in projectDetails above.
// No data duplication — cards read everything from projectDetails[id].

/** "Continue Watching" horizontal row */
export const CONTINUE_WATCHING_IDS: string[] = [
  "stylinger",
  "portfolio",
  "fashion-ai",
  "product-docs",
];

/** "Featured Projects" horizontal row */
export const FEATURED_IDS: string[] = [
  "stylinger",
  "portfolio",
  "fashion-ai",
  "product-docs",
];

// ─── Lookup Helper ────────────────────────────────────────────────────────────

/**
 * Resolve a project ID to its full ProjectDetail.
 * Returns undefined if the ID is not found — callers should handle gracefully.
 */
export function getProject(id: string): ProjectDetail | undefined {
  return projectDetails[id];
}

/**
 * Resolve an ordered list of IDs to their ProjectDetail objects.
 * Silently skips unknown IDs.
 */
export function getProjects(ids: string[]): ProjectDetail[] {
  return ids.flatMap((id) => {
    const p = projectDetails[id];
    return p ? [p] : [];
  });
}
