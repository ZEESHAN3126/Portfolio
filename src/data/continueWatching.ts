export interface ContinueWatchingItem {
  id: string;
  title: string;
  subtitle: string;
  progress: number;
  image: string;
  category: string;
}

export const continueWatching: ContinueWatchingItem[] = [
  {
    id: "stylinger",
    title: "Stylinger",
    subtitle: "Building the future of AI Fashion.",
    progress: 82,
    image: "/images/projects/stylinger.png",
    category: "Startup",
  },
  {
    id: "portfolio",
    title: "ZEESHAN+",
    subtitle: "Crafting a Netflix-inspired portfolio.",
    progress: 45,
    image: "/images/projects/portfolio.png",
    category: "Portfolio",
  },
  {
    id: "fashion-ai",
    title: "AI Fashion Vision",
    subtitle: "Researching intelligent styling experiences.",
    progress: 68,
    image: "/images/projects/fashion-ai.png",
    category: "Research",
  },
  {
    id: "product-docs",
    title: "Product Documentation",
    subtitle: "PRDs, Roadmaps & Product Thinking.",
    progress: 76,
    image: "/images/projects/product-docs.png",
    category: "Product",
  },
];