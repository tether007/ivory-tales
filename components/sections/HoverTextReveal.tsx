"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// One image per phrase, in /public/hover/ (about 300 x 270, so ~600px wide for sharp screens)
const items = [
  { label: "Weddings", image: "/hover/marriages.jpg" },
  { label: "Corporate Events", image: "/hover/corporate.jpg" },
  { label: "Conferences", image: "/hover/conferences.jpg" },
  { label: "Brand Activations", image: "/hover/activations.jpg" },
  { label: "Product Launches", image: "/hover/launches.jpg" },
  { label: "Floral Design", image: "/hover/floral.jpg" },
  { label: "Private Celebrations", image: "/hover/celebrations.jpg" },
];

const OFFSET_X = 40; // gap between the cursor and the image

export default function HoverTextReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 }); // current + target position
  const [active, setActive] = useState<number | null>(null);
  const isActive = active !== null;

  // Work out where the image should be, relative to the section, from a pointer event
  const track = (e: React.PointerEvent, snap = false) => {
    const section = sectionRef.current;
    const box = boxRef.current;
    if (!section || !box) return;
    const rect = section.getBoundingClientRect();
    const w = box.offsetWidth;
    const h = box.offsetHeight;
    const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
    const p = pos.current;
    p.tx = clamp(e.clientX - rect.left + OFFSET_X, 0, rect.width - w);
    p.ty = clamp(e.clientY - rect.top - h / 2, 0, rect.height - h);
    if (snap) {
      // First hover: appear in place instead of flying in from the corner
      p.x = p.tx;
      p.y = p.ty;
    }
  };

  // Ease the image toward the cursor, only while something is hovered
  useEffect(() => {
    if (!isActive) return;
    let id: number;
    const tick = () => {
      const p = pos.current;
      p.x += (p.tx - p.x) * 0.14;
      p.y += (p.ty - p.y) * 0.14;
      if (boxRef.current) {
        boxRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [isActive]);

  // The section is `hidden` by default and shown only when the main pointer is a
  // mouse or trackpad (`pointer-fine`), so phones and tablets never display it.
  return (
    <section
      ref={sectionRef}
      onPointerMove={(e) => isActive && track(e)}
      onPointerLeave={() => setActive(null)}
      className="relative hidden overflow-hidden bg-[#f3eeec] px-6 py-20 pointer-fine:block md:px-[8%] md:py-32"
    >
      <p className="mx-auto max-w-6xl font-serif text-4xl font-serif leading-[1.15] tracking-tight md:text-6xl lg:text-7xl">
        {items.map((item, i) => (
          <span key={item.label}>
            <span
              onPointerEnter={(e) => {
                track(e, !isActive);
                setActive(i);
              }}
              className={`cursor-default transition-colors duration-300 ${
                active === null || active === i ? "text-[#1E2A44]" : "text-[#cdd0d1]"
              }`}
            >
              {item.label},
            </span>{" "}
          </span>
        ))}
      </p>

      {/* Floating image. The outer box is moved by JS; the inner one fades and scales. */}
      <div
        ref={boxRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 h-[210px] w-[230px] md:h-[270px] md:w-[300px]"
      >
        <div
          className={`relative h-full w-full transition-all duration-500 ease-out ${
            isActive ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          {/* All images stay mounted and stacked, so each one is preloaded and can crossfade */}
          {items.map((item, i) => (
            <Image
              key={item.image}
              src={item.image}
              alt=""
              fill
              sizes="300px"
              className={`object-cover transition-opacity duration-300 ${
                active === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
