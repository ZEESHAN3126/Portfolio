"use client";

interface Props {
  title: string;
  project: string;
}

export default function AvailabilityBadge({
  title,
  project,
}: Props) {
  return (
    <div
      className="
        mt-12
        rounded-2xl
        border
        border-white/10
        bg-[#1B1B1B]
        p-6
        text-center
      "
    >
      <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
        {title}
      </p>

      <h3 className="mt-3 text-3xl font-bold text-white">
        {project}
      </h3>
    </div>
  );
}