// Navigation links used by Navbar and the dot-nav SideNav.
// `id` must match the `id` attribute of the corresponding section element.

export interface NavLink {
  label: string;
  id: string; // section element id for scroll targeting
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Hero",       id: "hero",             href: "#hero" },
  { label: "About",      id: "about",            href: "#about" },
  { label: "Work",       id: "featured-release", href: "#featured-release" },
  { label: "Projects",   id: "continue-building",href: "#continue-building" },
  { label: "Stack",      id: "tech-stack",       href: "#tech-stack" },
  { label: "Timeline",   id: "career-timeline",  href: "#career-timeline" },
  { label: "Wins",       id: "achievements",     href: "#achievements" },
  { label: "Resume",     id: "resume",           href: "#resume" },
  { label: "Contact",    id: "contact",          href: "#contact" },
] as const;
