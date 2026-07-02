export type ProjectCategory =
  | "web"
  | "mobile"
  | "fullstack"
  | "design"
  | "open-source";

export type ProjectStatus = "live" | "wip" | "archived";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  status: ProjectStatus;
  year: number;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** Path to thumbnail image */
  thumbnail: string;
  /** Optional array of screenshot paths for modal/detail view */
  screenshots?: string[];
  featured?: boolean;
}
