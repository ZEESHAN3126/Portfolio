"use client";

import { ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  value: string;
  href: string;
}

export default function SocialButton({
  title,
  value,
  href,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="
        group
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-white/10
        bg-[#1B1B1B]
        px-6
        py-5
        transition
        duration-300
        hover:border-[#E50914]
        hover:bg-[#202020]
      "
    >
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
          {title}
        </p>

        <p className="mt-1 text-lg font-semibold text-white">
          {value}
        </p>
      </div>

      <ArrowUpRight
        size={22}
        className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
      />
    </a>
  );
}