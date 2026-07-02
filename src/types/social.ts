export interface SocialLink {
  platform: string;
  url: string;
  /** Icon key mapping to an SVG icon component */
  iconKey: string;
  label: string; // Accessible label
}
