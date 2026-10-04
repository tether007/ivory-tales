"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Images go in /public/services/ (portrait, about 4:5, ~1200px tall)
const slides = [
  {
    title: "Corporate Events",
    text: "We design corporate events that strengthen your brand and bring your audience closer, from conferences and launches to large family days, with careful planning and seamless delivery.",
    src: "/services/corporate.jpg",
    alt: "Corporate conference with a full audience",
    href: "/corp-events",
  },
  {
    title: "Weddings",
    text: "We craft weddings that feel deeply personal, with thoughtful details, intentional design and calm, seamless execution that brings your love story to life.",
    src: "/services/wedding.jpg",
    alt: "Couple under a floral wedding arch",
    href: "/wedding",
  },
  {
    title: "Experiences",
    text: "From brand activations to intimate celebrations, we shape moments that engage every guest and stay with them long after the lights go down.",
    src: "/services/experiences.jpg",
    alt: "Guests celebrating under string lights",
    href: "/experiences",
  },
];

const n = slides.length;

// Position of slide i relative to the active one: -1 (left), 0 (active), 1 (right).
// Wraps around so the carousel loops forever in both directions.
function offsetOf(i: number, active: number) {
  let o = (i - active + n) % n;
  if (o > n / 2) o -= n;
  return o;
}

export default function ServicesSlider() {
  const [{ index, prev }, setState] = useState({ index: 0, prev: 0 });

  const go = (to: number) => setState({ index: (to + n) % n, prev: index });

  return (
    <section className="relative overflow-hidden bg-[#a39f74] text-[#F7F4EC]">
      {/* Inset hairline border */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 z-20 border border-[#F7F4EC]/40 md:inset-5"
      />

      <div className="relative h-[780px] md:h-[680px]">
        {slides.map((s, i) => {
          const off = offsetOf(i, index);
          const active = off === 0;
          // A slide that wraps from one side to the other jumps instantly
          // (off-screen) instead of sliding across the viewport.
          const instant = Math.abs(off - offsetOf(i, prev)) > 1;

          return (
            <div
              key={s.title}
              inert={!active}
              className={`absolute inset-0 ${
                instant
                  ? "transition-none"
                  : "transition-transform duration-[900ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
              }`}
              style={{ transform: `translateX(${off * 100}%)` }}
            >
              <div className="mx-auto grid h-full max-w-6xl grid-cols-1 content-center items-center gap-8 px-8 pb-20 pt-10 md:grid-cols-2 md:gap-16 md:px-32 md:py-0">
                {/* Image (first on mobile) */}
                <div className="relative order-first h-60 w-full overflow-hidden md:order-last md:h-auto md:max-w-[440px] md:aspect-[4/5] md:justify-self-start">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 768px) 440px, 100vw"
                    priority={i === 0}
                    className={`object-cover transition-transform duration-[1600ms] ease-out ${
                      active ? "scale-100" : "scale-110"
                    }`}
                  />
                </div>

                {/* Text: fades up shortly after the slide settles */}
                <div
                  className={`transition-all duration-700 ${
                    active ? "translate-y-0 opacity-100 delay-300" : "translate-y-4 opacity-0"
                  }`}
                >
                  <p className="text-xs tracking-[0.25em]">
                    {i + 1} / {n}
                  </p>
                  <h2 className="mt-10 font-serif text-4xl font-light md:mt-16 md:text-5xl">
                    {s.title}
                  </h2>
                  <p className="mt-8 max-w-sm font-sans text-md leading-8 text-[#F7F4EC]/85 md:mt-12">
                    {s.text}
                  </p>
                  <Link
                    href={s.href}
                    className="mt-10 inline-block bg-black px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-white transition-colors"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Arrows */}
        <button
          onClick={() => go(index - 1)}
          aria-label="Previous"
          className="absolute bottom-6 left-8 z-30 p-3 transition-opacity hover:opacity-60 md:bottom-auto md:left-10 md:top-1/2 md:-translate-y-1/2"
        >
          <svg width="26" height="50" viewBox="0 0 26 50" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M24 2L2 25l22 23" />
          </svg>
        </button>
        <button
          onClick={() => go(index + 1)}
          aria-label="Next"
          className="absolute bottom-6 right-8 z-30 p-3 transition-opacity hover:opacity-60 md:bottom-auto md:right-10 md:top-1/2 md:-translate-y-1/2"
        >
          <svg width="26" height="50" viewBox="0 0 26 50" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M2 2l22 23L2 48" />
          </svg>
        </button>
      </div>
    </section>
  );
}
