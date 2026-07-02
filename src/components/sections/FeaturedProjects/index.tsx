"use client";

import ContinueWatchingCard from "../ContinueWatching/ContinueWatchingCard";

import { featuredProjects } from "@/data/featuredProjects";

export default function FeaturedProjects() {
  return (
    <section className="relative py-20">

      <div className="mx-auto max-w-7xl px-8 lg:px-16">

        <h2 className="mb-8 text-4xl font-bold text-white">
          Featured Projects
        </h2>

        <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide">

          {featuredProjects.map((project) => (

            <ContinueWatchingCard
              key={project.id}
              title={project.title}
              subtitle={project.subtitle}
              progress={project.progress}
              image={project.image}
              category={project.category}
            />

          ))}

        </div>

      </div>

    </section>
  );
}