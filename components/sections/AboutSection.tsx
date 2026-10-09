"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Edit the copy here
const content = {
  title: "Our Motto",
  image: "/about/story.jpg",
  imageAlt: "Elegantly styled event venue",
  paragraphs: [
    "At The Ivory Tales, we believe every celebration should be as unique as the people behind it. Our approach to event management is rooted in understanding your vision, preferences, and personal story, translating them into thoughtfully tailored experiences where every detail feels intentional and every moment feels truly yours."    ,
    "We work closely with our clients at every stage of the journey, collaborating to understand their ideas, offering thoughtful guidance, and carefully personalising each element to reflect their individuality. From the initial concept to the final execution, we ensure that every decision aligns with your vision and brings your ideas to life with creativity, precision, and care.",    
    "Our goal is to create more than just beautifully managed events — we create experiences that feel personal, meaningful, and unforgettable. By building genuine relationships with our clients and embracing what makes each occasion special, we transform individual visions into distinctive celebrations that tell your story, reflect your style, and leave lasting memories.",
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
