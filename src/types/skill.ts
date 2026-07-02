export type SkillLevel = "familiar" | "proficient" | "expert";

export interface Skill {
  name: string;
  level: SkillLevel;
  /** Optional icon key mapping to an SVG in assets/icons */
  iconKey?: string;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}
