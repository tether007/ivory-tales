"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Edit the copy here
const content = {
  title: "Our Story",
  image: "/about/story.jpg",
  imageAlt: "Elegantly styled event venue",
  paragraphs: [
    "At The Ivory Tales, our objective is to bring creativity, attention to detail, and effortless execution together — delivering events that are beautifully imagined, seamlessly managed, and deeply memorable.",
    "To create thoughtfully crafted experiences that reflect the people, stories, and moments behind every occasion.",
    "We strive to build lasting relationships with our clients by turning their vision into experiences they can truly call their own.",
  ],
  quote:
    "Our team draws on a diverse background of professional service industries, and we share one common goal: to create high-quality event experiences with innovation, collaboration, excellence, empathy, enthusiasm and integrity.",
};

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // One observer starts the whole sequence when the section scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Line: grows from the left edge
  const lineClass = `h-px bg-neutral-500 origin-left transition-transform duration-[1400ms] ease-out ${
    visible ? "scale-x-100" : "scale-x-0"
  }`;

  // Text blocks: fade up after the image has landed
  const fadeClass = `transition-all duration-1000 ease-out ${
    visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
  }`;
  const delay = (ms: number) => ({ transitionDelay: visible ? `${ms}ms` : "0ms" });

  return (
    <section className="overflow-hidden bg-[#f0e9de] px-6 py-20 md:py-32">
      <div ref={ref} className="relative mx-auto max-w-[1240px]">
        {/* Desktop line: spans the full width and passes behind the image */}
        <div className={`${lineClass} absolute left-0 right-0 top-[7.5rem] hidden md:block`} aria-hidden />

        <div className="grid gap-y-8 md:grid-cols-[minmax(0,1fr)_clamp(340px,48%,600px)] md:pr-12">
          {/* Title */}
          <h2 className="font-serif text-6xl font-light uppercase leading-none tracking-wide text-[#b98f62] md:col-start-1 md:row-start-1 md:pt-11 md:text-7xl">
            {content.title}
          </h2>

          {/* Mobile line: sits under the title */}
          <div className={`${lineClass} md:hidden`} aria-hidden />

          {/* Image: slides in from the right */}
          <div
            className={`relative z-10 aspect-[600/466] w-full overflow-hidden transition-all duration-[1400ms] ease-out md:col-start-2 md:row-span-2 md:row-start-1 ${
              visible ? "translate-x-0 opacity-100" : "translate-x-24 opacity-0"
            }`}
            style={{ transitionDelay: visible ? "200ms" : "0ms" }}
          >
            <Image
              src={content.image}
              alt={content.imageAlt}
              fill
              sizes="(min-width: 768px) 600px, 100vw"
              className="object-cover"
            />
          </div>

          {/* Paragraphs */}
          <div
            style={delay(600)}
            className={`${fadeClass} space-y-6 font-sans text-[17px] font-medium leading-[1.9] text-[#7b8796] md:col-start-1 md:row-start-2 md:mt-14 md:pr-14 md:text-lg`}
          >
            {content.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        {/* Quote box */}
        <div
          style={delay(900)}
          className={`${fadeClass} mt-20 border border-[#c4b5a3] px-7 py-10 md:mt-36 md:px-10 md:py-14`}
        >
          <p className="font-serif text-xl font-light uppercase leading-[1.7] tracking-wide text-[#7d8791] md:text-[27px]">
            {content.quote}
          </p>
        </div>
      </div>
    </section>
  );
}
