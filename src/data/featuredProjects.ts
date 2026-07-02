export interface FeaturedProject {
  id: string;
  title: string;
  subtitle: string;
  progress: number;
  image: string;
  category: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: "stylinger",
    title: "Stylinger",
    subtitle: "AI Fashion Platform",
    progress: 82,
    image: "/images/projects/stylinger.png",
    category: "Startup",
  },

  {
    id: "portfolio",
    title: "ZEESHAN+",
    subtitle: "Netflix Portfolio",
    progress: 45,
    image: "/images/projects/portfolio.png",
    category: "Portfolio",
  },

  {
    id: "fashion",
    title: "AI Fashion Vision",
    subtitle: "Research & Vision",
    progress: 68,
    image: "/images/projects/fashion-ai.png",
    category: "Research",
  },

  {
    id: "docs",
    title: "Product Docs",
    subtitle: "PRDs & Roadmaps",
    progress: 76,
    image: "/images/projects/product-docs.png",
    category: "Product",
  },
];