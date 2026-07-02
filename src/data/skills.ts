import type { SkillGroup } from "@/types";

/**
 * Tech stack organised by category.
 * Displayed in the "Tech Stack" section.
 */
export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React",        level: "expert"     },
      { name: "Next.js",      level: "expert"     },
      { name: "TypeScript",   level: "expert"     },
      { name: "Tailwind CSS", level: "expert"     },
      { name: "Framer Motion",level: "proficient" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js",    level: "expert"     },
      { name: "Express",    level: "proficient" },
      { name: "Prisma",     level: "proficient" },
      { name: "PostgreSQL", level: "proficient" },
      { name: "REST APIs",  level: "expert"     },
    ],
  },
  {
    category: "Tools & Platforms",
    skills: [
      { name: "Git / GitHub", level: "expert"     },
      { name: "Vercel",       level: "expert"     },
      { name: "Figma",        level: "proficient" },
      { name: "Docker",       level: "familiar"   },
    ],
  },
];
