import { Geist, Geist_Mono } from "next/font/google";

/**
 * Primary display font — clean, modern, cinematic.
 */
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Monospace font — used for code snippets and tech labels.
 */
export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Combined font class string for use in the root <body> element */
export const fontVariables = `${geistSans.variable} ${geistMono.variable}`;
