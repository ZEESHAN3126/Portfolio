"use client";

import { contact } from "@/data/contact";

import SocialButton from "./SocialButton";
import AvailabilityBadge from "./AvailabilityBadge";

export default function ContactContent() {
  return (
    <>
      <div className="max-w-3xl">

        <p className="text-sm uppercase tracking-[0.35em] text-[#E50914]">
          LET'S TALK
        </p>

        <h2 className="mt-5 text-6xl font-black leading-none text-white">
          {contact.title}

          <br />

          <span className="text-[#E50914]">
            {contact.highlight}
          </span>
        </h2>

        <p className="mt-8 text-xl leading-9 text-zinc-400">
          {contact.description}
        </p>

      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2">

        {contact.socials.map((item) => (
          <SocialButton
            key={item.title}
            {...item}
          />
        ))}

      </div>

      <AvailabilityBadge
        title={contact.availability}
        project={contact.project}
      />
    </>
  );
}