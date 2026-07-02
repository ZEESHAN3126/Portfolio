export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string; // ISO date string
  description?: string;
  credentialUrl?: string;
  iconKey?: string;
}
