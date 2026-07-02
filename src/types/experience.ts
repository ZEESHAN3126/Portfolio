export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  type: "full-time" | "part-time" | "freelance" | "contract" | "internship";
  startDate: string; // ISO date string e.g. "2022-06"
  endDate?: string;  // Omit for current role
  current?: boolean;
  location: string;
  remote?: boolean;
  description: string;
  highlights: string[];
  tech: string[];
  companyUrl?: string;
  logoPath?: string;
}
