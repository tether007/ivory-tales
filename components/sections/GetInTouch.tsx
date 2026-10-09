"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function GetInTouch() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // One observer drives both animations so the card can follow the image
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
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="overflow-hidden bg-[#faf9f7] py-16 md:py-20">
      <div
        ref={ref}
        className="relative mx-auto flex max-w-[1700px] flex-col md:block md:h-[clamp(520px,40vw,680px)]"
      >
        {/* LEFT: framed image. Renders first. */}
        <div
          className={`relative h-80 w-[92%] transition-opacity duration-1000 ease-out md:absolute md:left-0 md:top-0 md:h-full md:w-[50.7%] ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Offset outline: sticks out past the image on top, bottom and right */}
          <div aria-hidden className="absolute inset-0 border border-neutral-600" />

          {/* The image bleeds off the left edge and sits inside the outline */}
          <div className="absolute bottom-[19px] left-0 right-2 top-[18px] z-10 overflow-hidden">
            <Image
              src="/cta/lets-meet.jpg"
              alt="Two guests clinking glasses in a toast"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* RIGHT: white card overlapping the image. Fades in after the left. */}
        <div
          className={`relative z-20 -mt-12 ml-auto mr-6 flex w-[calc(100%-3rem)] flex-col justify-center bg-white p-8 shadow-[3px_3px_8px_rgba(0,0,0,0.25)] transition-all duration-1000 ease-out md:absolute md:left-[43%] md:top-[23.5%] md:m-0 md:h-[60%] md:w-[54%] md:p-0 md:pl-[7.8%] ${
            visible
              ? "translate-y-0 opacity-100 delay-[900ms]"
              : "translate-y-4 opacity-0"
          }`}
        >
          <h2 className="font-serif text-4xl font-light tracking-wide text-[#1E2A44] small-caps lg:text-6xl">
            Let&rsquo;s Talk
          </h2>
          <p className="mt-3 font-serif text-xl tracking-wide text-[#1E2A44] small-caps lg:text-3xl">
            Get in touch
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block self-start bg-[#D4AF37] px-8 py-3 text-[15px] tracking-[0.12em] text-[#0D1B3D] transition-colors hover:bg-[#0D1B3D] hover:text-white"
          >
            Schedule a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
