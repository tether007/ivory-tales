"use client";

import { useEffect, useState } from "react";

const items = [

  {
    label: "Vision",
    text: "To create a world where every occasion becomes a story worth remembering — thoughtfully imagined, beautifully crafted, and truly personal.",
  },
  {
    label: "Mission",
    text: "At The Ivory Tales, we bring together creativity, thoughtful planning, and meticulous execution to create events that feel effortless, meaningful, and uniquely yours. From intimate celebrations to grand weddings, corporate experiences and entertainment, we turn ideas into experiences and moments into timeless tales.",
  },
  
];

const INTERVAL = 7000;

export default function VMSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance; restarts when index changes, stops while hovered/focused
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % items.length), INTERVAL);
    return () => clearTimeout(id);
  }, [index, paused]);

  return (
    <div
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* All slides share one grid cell, so the box is as tall as the tallest
          slide and nothing jumps when they crossfade. */}
      <div className="grid">
        {items.map((item, i) => (
          <div
            key={item.label}
            aria-hidden={i !== index}
            className={`col-start-1 row-start-1 transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/70">
              {item.label}
            </p>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg font-medium leading-8 tracking-[0.01em] text-foreground md:text-xl md:leading-9">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="mt-8 flex justify-center gap-3">
        {items.map((item, i) => (
          <button
            key={item.label}
            onClick={() => setIndex(i)}
            aria-label={`Show ${item.label}`}
            aria-current={i === index}
            className="group py-3"
          >
            <span
              className={`block h-px w-10 transition-all duration-500 ${
                i === index ? "bg-foreground" : "bg-foreground/30 group-hover:bg-foreground/60"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
