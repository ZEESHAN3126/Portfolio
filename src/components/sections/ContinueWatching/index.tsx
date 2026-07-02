"use client";

import { motion } from "framer-motion";

import ContinueWatchingCard from "./ContinueWatchingCard";

import { continueWatching } from "@/data/continueWatching";

export default function ContinueWatching() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-8 lg:px-16">

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-4xl font-bold text-white"
        >
          Continue Watching
        </motion.h2>

        <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide">
          {continueWatching.map((project) => (
            <ContinueWatchingCard
              key={project.id}
              title={project.title}
              subtitle={project.subtitle}
              category={project.category}
              progress={project.progress}
              image={project.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}