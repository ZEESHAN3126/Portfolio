"use client";

import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";

interface ContinueWatchingCardProps {
  title: string;
  subtitle: string;
  category: string;
  progress: number;
  image: string;
  /** Called when the card (or its inner Resume button) is clicked. */
  onSelect?: () => void;
}

export default function ContinueWatchingCard({
  title,
  subtitle,
  category,
  progress,
  image,
  onSelect,
}: ContinueWatchingCardProps) {
  return (
    <motion.article
      whileHover="hover"
      initial="rest"
      animate="rest"
      variants={{
        rest: {
          y: 0,
          scale: 1,
        },
        hover: {
          y: -8,
          scale: 1.03,
        },
      }}
      transition={{ duration: 0.3 }}
      onClick={onSelect}
      className="
        group
        relative
        min-w-[430px]
        max-w-[430px]
        overflow-hidden
        rounded-2xl
        bg-[#181818]
        shadow-2xl
        cursor-pointer
      "
    >
      {/* COVER */}

      <div className="relative aspect-video overflow-hidden">

        <motion.img
          src={image}
          alt={title}
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.08 },
          }}
          transition={{ duration: 0.6 }}
          className="
            h-full
            w-full
            object-cover
          "
        />

        {/* Gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-black/10 to-transparent" />

        {/* Category */}

        <span
          className="
            absolute
            left-4
            top-4
            rounded-full
            bg-[#E50914]
            px-3
            py-1
            text-xs
            font-bold
            uppercase
            tracking-wider
            text-white
          "
        >
          {category}
        </span>

        {/* TITLE */}

        <div className="absolute bottom-5 left-5">

          <h3 className="text-4xl font-black text-white drop-shadow-lg">
            {title}
          </h3>

        </div>

      </div>

      {/* EXPAND */}

      <motion.div
        variants={{
          rest: {
            height: 0,
            opacity: 0,
          },
          hover: {
            height: "auto",
            opacity: 1,
          },
        }}
        transition={{
          duration: 0.25,
        }}
        className="overflow-hidden"
      >
        <div className="space-y-5 p-5">

          <div className="flex gap-3">

            <button
              onClick={(e) => {
                // Prevent the click from bubbling to the article and
                // double-invoking onSelect. Future per-button logic goes here.
                e.stopPropagation();
                onSelect?.();
              }}
              className="
                flex
                items-center
                gap-2
                rounded-full
                bg-white
                px-5
                py-2.5
                font-semibold
                text-black
              "
            >
              <Play size={18} fill="black" />
              Resume
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.();
              }}
              aria-label="More information"
              className="
                rounded-full
                border
                border-white/20
                p-3
                text-white
              "
            >
              <Info size={18} />
            </button>

          </div>

          <p className="text-zinc-400 leading-7">
            {subtitle}
          </p>

          <div>

            <div className="mb-2 flex justify-between text-sm">

              <span className="text-zinc-500">
                Progress
              </span>

              <span className="font-semibold text-white">
                {progress}%
              </span>

            </div>

            <div className="h-1.5 rounded-full bg-white/10">

              <div
                className="h-full rounded-full bg-[#E50914]"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

        </div>

      </motion.div>

    </motion.article>
  );
}