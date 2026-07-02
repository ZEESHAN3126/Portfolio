"use client";

import ContactContent from "./ContactContent";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-32"
    >
      <div className="mx-auto max-w-6xl px-8 lg:px-16">
        <ContactContent />
      </div>
    </section>
  );
}