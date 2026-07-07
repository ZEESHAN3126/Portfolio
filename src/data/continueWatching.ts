/**
 * continueWatching.ts
 *
 * Data for the "Continue Watching" section.
 * Each item represents a project Zeeshan is actively building.
 *
 * Optional detail fields (description, tech, liveUrl, githubUrl, year, status)
 * are consumed by the DetailOverlay component when a card is clicked.
 */

export type ProjectStatus = "In Progress" | "Completed" | "Archived";

export interface ContinueWatchingItem {

  gallery?: {
  image: string;
  title: string;
}[];

timeline?: {
  title: string;
  description: string;
}[];
  id: string;
  title: string;
  subtitle: string;
  progress: number;
  image: string;
  category: string;

  // ── Detail Overlay fields ────────────────────────────────────────────────────
  description?: string;
  year?: string;
  status?: ProjectStatus;
  tech?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const continueWatching: ContinueWatchingItem[] = [
  {
    id: "stylinger",
    title: "Stylinger",
    subtitle: "Building the future of AI Fashion.",
    description:
      "Stylinger is an AI-powered fashion discovery platform that helps users build a personal style identity through intelligent outfit recommendations and wardrobe curation. Designed to make fashion accessible, sustainable, and deeply personal — one look at a time.",
    progress: 82,
    image: "/images/projects/stylinger.png",
    category: "Startup",
    year: "2024",
    status: "In Progress",
    tech: ["Next.js", "TypeScript", "OpenAI", "PostgreSQL", "Prisma", "Tailwind CSS", "Vercel"],
    liveUrl: "https://stylinger.app",
    githubUrl: "https://github.com/ZEESHAN3126",
  },

  {
    id: "portfolio",
    title: "ZEESHAN+",
    subtitle: "A cinematic, Netflix-inspired portfolio.",
    description:
      "ZEESHAN+ is a premium interactive portfolio experience built to feel like browsing a streaming platform. Features persona-aware content, cinematic entry flows, a glassmorphic shell, and full Framer Motion animation throughout. Completely original — no templates.",
    progress: 45,
    image: "/images/projects/portfolio.png",
    category: "Portfolio",
    year: "2024",
    status: "In Progress",
    tech: ["Next.js 15", "TypeScript", "Framer Motion", "Tailwind CSS v4", "Resend"],
    githubUrl: "https://github.com/ZEESHAN3126/Portfolio",
  },

  {
    id: "fashion-ai",
    title: "AI Fashion Vision",
    subtitle: "Researching intelligent styling experiences.",
    description:
      "A deep research initiative exploring the intersection of artificial intelligence and personal style. Covers computer vision for garment recognition, NLP-driven style profiling, and the product architecture needed to bring intelligent fashion recommendations to scale.",
    progress: 68,
    image: "/images/projects/fashion-ai.png",
    category: "Research",
    year: "2024",
    status: "In Progress",
    tech: ["Python", "TensorFlow", "Computer Vision", "NLP", "FastAPI"],
  },

  {
    id: "product-docs",
    title: "Product Docs",
    subtitle: "PRDs, roadmaps and product thinking.",
    description:
      "A living collection of product requirement documents, feature roadmaps, user story maps, and technical specifications developed for Stylinger and other projects. Demonstrates end-to-end product thinking from zero to shipped.",
    progress: 76,
    image: "/images/projects/product-docs.png",
    category: "Product",
    year: "2024",
    status: "In Progress",
    tech: ["Notion", "Figma", "Miro", "Linear"],
  },
];