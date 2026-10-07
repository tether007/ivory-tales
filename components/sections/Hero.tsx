"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Put these 3-4 images in /public/hero/ (landscape, ~2400px wide, compressed)
const slides = [
  { src: "/hero/1.jpg", alt: "Outdoor ceremony aisle lined with flowers", line1: "Events that elevate", line2: "your brand" },
  { src: "/hero/2.jpg", alt: "Conference hall with stage lighting", line1: "Your day", line2: "designed with heart" },
  { src: "/hero/3.jpg", alt: "Reception tables set for an evening event", line1: "An experience,", line2: "to remember" },
];

const INTERVAL = 6000;

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Auto-advance. Restarts whenever index changes, so clicking a dot resets the timer.
  useEffect(() => {
    const id = setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearTimeout(id);
  }, [index]);

  // While the menu is open: Escape closes it and the page behind can't scroll
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  return (
    <section className="relative aspect-[6/9] w-full overflow-hidden bg-black text-white md:aspect-auto md:h-screen">
      {/* Slides: stacked, crossfading via opacity */}
      {slides.map((s, i) => (
        <div
          key={s.src}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover motion-safe:transition-transform motion-safe:ease-linear ${
-              i === index ? "scale-110" : "scale-100"
            }`}
            style={{ transitionDuration: `${INTERVAL + 1600}ms` }}
          />
        </div>
      ))}

      {/* Soft scrim so white text stays readable on bright photos */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Top bar */}
      <header
        className={`absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-6 transition-opacity duration-300 sm:px-8 lg:px-24 lg:py-8 ${
          menuOpen ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <Link href="/" aria-label="Ivory Tales home" className="block">
          <Image
            src="/hero-logo.svg"
            alt="Ivory Tales"
            width={210}
            height={114}
            priority
            className="h-10 h-auto w-auto sm:h-12 lg:h-16 "
          />
        </Link>

        {/* Mobile + tablet: three-line icon. Desktop (lg+): "MENU" text. */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="-mr-3 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:mr-0 lg:p-0"
        >
          <span className="flex flex-col gap-[6px] lg:hidden" aria-hidden>
            <span className="block h-[1.5px] w-7 bg-current" />
            <span className="block h-[1.5px] w-7 bg-current" />
            <span className="block h-[1.5px] w-7 bg-current" />
          </span>
          <span className="hidden font-serif text-4xl font-light tracking-wide lg:inline">
            MENU
          </span>
        </button>
      </header>

      {/* Headline: re-keyed so it fades in fresh for each slide */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
        <h1
          key={index}
          className={`font-serif animate-hero-text text-3xl font-light leading-[1.1] sm:text-5xl md:text-7xl lg:text-8xl`}
        >
          {slides[index].line1}
          <br />
          {slides[index].line2}
        </h1>
      </div>

      {/* Logo mark under the headline */}
      <div className="pointer-events-none absolute bottom-28 left-1/2 z-10 hidden -translate-x-1/2 md:block md:bottom-32">
        <Image
          src="/logo.svg"
          alt=""
          width={80}
          height={80}
          className="h-14 w-auto brightness-0 invert md:h-20"
        />
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-1 left-1/2 z-20 flex -translate-x-1/2 gap-3 md:bottom-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === index}
            className="group py-3"
          >
            <span
              className={`block h-px w-10 transition-all duration-500 ${
                i === index ? "bg-white" : "bg-white/40 group-hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Full-screen menu overlay: translucent #0D1B3D so the hero photo shows through */}
      <div
        className={`fixed inset-0 z-30 flex flex-col bg-[#0D1B3D]/85 backdrop-blur-[3px] transition-opacity duration-500 ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Site menu"
      >
        {/* Same position as the hero header so nothing jumps */}
        <div className="flex items-center justify-between px-5 py-6 sm:px-8 lg:px-24 lg:py-8">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
            aria-label="Ivory Tales home"
            className="block"
          >
            <Image
              src="/hero-logo.svg"
              alt="Ivory Tales"
              width={160}
              height={64}
              className="h-10 w-auto sm:h-12 lg:h-16"
            />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
            aria-label="Close menu"
            className="-mr-3 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:mr-0"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 3l16 16M19 3L3 19" />
            </svg>
          </button>
        </div>

        {/* Right-aligned links, staggered fade-in */}
        <nav className="flex flex-1 flex-col items-end justify-center gap-7 px-5 pb-24 sm:px-8 md:gap-8 lg:px-24">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
              style={{ transitionDelay: menuOpen ? `${150 + i * 80}ms` : "0ms" }}
              className={`font-serif text-5xl font-light text-[#D4AF37] transition-all duration-700 hover:opacity-60 md:text-6xl ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ivorytalesevents@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? 0 : -1}
            style={{ transitionDelay: menuOpen ? `${150 + links.length * 80}ms` : "0ms" }}
            className={`mt-4 text-xs tracking-[0.3em] transition-all duration-700 hover:opacity-60 ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            ivorytalesevents@gmail.com
          </a>
        </nav>
      </div>
    </section>
  );
}
