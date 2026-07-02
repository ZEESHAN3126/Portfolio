import type { Project } from "@/types";

/**
 * All portfolio projects.
 * `featured: true` items appear in the "Featured Release" section.
 * The rest appear in "Continue Building".
 */
export const projects: Project[] = [
  {
    id: "stylinger",
    title: "Stylinger",
    tagline: "AI-powered fashion styling platform",
    description:
      "A full-stack platform that uses AI to generate personalised outfit recommendations based on body type, style preferences, and wardrobe inventory.",
    longDescription: "", // Fill in with full case study
    category: "fullstack",
    status: "live",
    year: 2024,
    tech: ["Next.js", "TypeScript", "OpenAI", "Prisma", "PostgreSQL", "Stripe"],
    liveUrl: "https://stylinger.app", // Update with real URL
    repoUrl: "", // Update or remove if private
    thumbnail: "/thumbnails/stylinger.jpg", // Place image in /public/thumbnails/
    featured: true,
  },
  // Add more projects here
];

/** Returns only featured projects */
export const featuredProjects = projects.filter((p) => p.featured);

/** Returns non-featured projects */
export const otherProjects = projects.filter((p) => !p.featured);
