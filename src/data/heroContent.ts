import { Persona } from "@/context/PersonaContext";

export interface HeroContentData {
  badge: string;
  title: string;
  description: string;
  primaryButton: string;
  secondaryButton: string;
}

export const heroContent: Record<Persona, HeroContentData> = {
  founder: {
    badge: "Z+ ORIGINAL",
    title: "BUILDING PRODUCTS PEOPLE REMEMBER.",
    description:
      "Founder of Stylinger. Building AI-powered fashion experiences, solving real-world problems and turning ideas into scalable products.",
    primaryButton: "Launch Stylinger",
    secondaryButton: "Product Journey",
  },

  recruiter: {
    badge: "CAREER EDITION",
    title: "BUILDING PRODUCTS. DELIVERING IMPACT.",
    description:
      "Explore my experience, technical skills, achievements and the work that reflects my growth as a software engineer and product builder.",
    primaryButton: "View Resume",
    secondaryButton: "Career Journey",
  },

  developer: {
    badge: "DEVELOPER EDITION",
    title: "ARCHITECTING MODERN SOFTWARE.",
    description:
      "Dive into clean architecture, scalable systems, AI integrations and engineering decisions behind every project.",
    primaryButton: "View Projects",
    secondaryButton: "Tech Stack",
  },

  explorer: {
    badge: "FULL EXPERIENCE",
    title: "WELCOME TO ZEESHAN+",
    description:
      "Experience everything—from startup building to software engineering, product thinking and the journey behind every project.",
    primaryButton: "Start Watching",
    secondaryButton: "My Journey",
  },
};