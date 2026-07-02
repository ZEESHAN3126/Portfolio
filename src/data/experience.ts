import type { WorkExperience } from "@/types";

/**
 * Career timeline — most recent first.
 * Displayed in the "Career Timeline" section.
 */
export const experience: WorkExperience[] = [
  {
    id: "exp-1",
    company: "Your Company",       // ← Update with real data
    role: "Full-Stack Developer",
    type: "full-time",
    startDate: "2023-01",
    current: true,
    location: "India",
    remote: true,
    description:
      "Building scalable web applications and leading frontend architecture decisions.",
    highlights: [
      "Architected and shipped [X] features serving [N] users",
      "Reduced page load time by 40% through optimisation",
      "Mentored junior developers in TypeScript best practices",
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    companyUrl: "",
  },
  // Add more experiences here
];
