import { Persona } from "@/context/PersonaContext";

export interface PersonaOption {
  id: Persona;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
}

export const personas: PersonaOption[] = [
  {
    id: "founder",
    title: "Founder",
    subtitle: "Product • Startup • Vision",
    description:
      "Experience ZEESHAN+ through the journey of building Stylinger, product strategy, and startup execution.",
    accent: "#E50914",
  },

  {
    id: "recruiter",
    title: "Recruiter",
    subtitle: "Resume • Experience • Skills",
    description:
      "See my professional experience, achievements, technical skills, and everything needed for hiring.",
    accent: "#E50914",
  },

  {
    id: "developer",
    title: "Developer",
    subtitle: "Projects • Architecture • Code",
    description:
      "Explore engineering decisions, clean architecture, AI projects, GitHub work, and technical implementations.",
    accent: "#E50914",
  },

  {
    id: "explorer",
    title: "Explorer",
    subtitle: "Complete Experience",
    description:
      "Watch the complete ZEESHAN+ story exactly as it was designed—from startup to code to career.",
    accent: "#E50914",
  },
];