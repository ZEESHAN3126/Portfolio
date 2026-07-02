import type { SocialLink } from "@/types";

/**
 * Social / contact links shown in the footer, hero, and contact section.
 */
export const socials: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/zeeshanvahora", // ← Update
    iconKey: "github",
    label: "Visit Zeeshan's GitHub profile",
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/zeeshanvahora", // ← Update
    iconKey: "linkedin",
    label: "Connect with Zeeshan on LinkedIn",
  },
  {
    platform: "Twitter / X",
    url: "https://twitter.com/zeeshanvahora", // ← Update
    iconKey: "twitter",
    label: "Follow Zeeshan on Twitter",
  },
  {
    platform: "Email",
    url: "mailto:hello@zeeshanvahora.dev", // ← Update
    iconKey: "email",
    label: "Send Zeeshan an email",
  },
];
