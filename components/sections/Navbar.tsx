"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

type NavbarProps = {
  nameLogo?: string | null;
  nameLogoAlt?: string;
};

export default function Navbar({
  nameLogo = null,
  nameLogoAlt = "Ivory Tales",
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // true = the background behind that element is light, so it should turn black
  const [logoOnLight, setLogoOnLight] = useState(false);
  const [menuOnLight, setMenuOnLight] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // 1x1 canvas = reliable way to turn any computed CSS colour into RGBA
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Look at what is painted under a point (ignoring the navbar itself)
    // and decide whether it is light or dark.
    const isLightAt = (x: number, y: number) => {
      for (const el of document.elementsFromPoint(x, y)) {
        if (headerRef.current?.contains(el)) continue;
        // Photos and video count as dark (the white text works on them)
        if (el instanceof HTMLImageElement || el instanceof HTMLVideoElement) return false;

        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = getComputedStyle(el).backgroundColor;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
        if (a > 128) return 0.299 * r + 0.587 * g + 0.114 * b > 140;
      }
      return true;
    };

    const measure = () => {
      const l = logoRef.current?.getBoundingClientRect();
      const m = menuRef.current?.getBoundingClientRect();
      if (l) setLogoOnLight(isLightAt(l.left + l.width / 2, l.top + l.height / 2));
      if (m) setMenuOnLight(isLightAt(m.left + m.width / 2, m.top + m.height / 2));
    };

    let ticking = false;
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        measure();
        ticking = false;
      });
    };

    onScroll();
    const t = setTimeout(onScroll, 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", onScroll);
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", onScroll);
    };
  }, []);

  // While the menu is open: Escape closes it and the page can't scroll behind it
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
    <>
      {/* Sticky, fully transparent bar */}
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-8 transition-all duration-300 md:px-24 ${
          scrolled ? "py-3" : "py-8"
        } ${menuOpen ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <Link ref={logoRef} href="/" aria-label="Ivory Tales home" className="block">
          <Image
            src="/logo.svg"
            alt="Ivory Tales"
            width={160}
            height={64}
            priority
            className={`w-auto transition-all duration-300 ${
              scrolled ? "h-10 md:h-12" : "h-12 md:h-16"
            } ${logoOnLight ? "brightness-0" : ""}`}
          />
        </Link>

        {/* Optional centered name-logo */}
        {nameLogo && (
          <Link
            href="/"
            aria-label={nameLogoAlt}
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Image
              src={nameLogo}
              alt={nameLogoAlt}
              width={220}
              height={80}
              priority
              className="h-auto w-auto max-w-[180px] md:max-w-[220px]"
            />
          </Link>
        )}

        <button
          ref={menuRef}
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-label="Open menu"
          className={`transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${
            menuOnLight ? "text-black" : "text-white"
          }`}
        >
          {/* Mobile hamburger */}
          <span className="flex h-5 w-6 flex-col justify-between md:hidden">
            <span className="block h-[1.5px] w-full bg-current" />
            <span className="block h-[1.5px] w-full bg-current" />
            <span className="block h-[1.5px] w-full bg-current" />
          </span>

          {/* Desktop MENU */}
          <span className="hidden font-serif text-4xl font-light tracking-wide md:block">
            MENU
          </span>
        </button>
      </header>

      {/* Menu overlay (a sibling of the header so `fixed` always covers the screen) */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-[#0D1B3D]/85 text-white backdrop-blur-[3px] transition-opacity duration-500 ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Site menu"
      >
        <div className="flex items-center justify-between px-8 py-8 md:px-24">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
            aria-label="Ivory Tales home"
            className="block"
          >
            <Image
              src="/logo.svg"
              alt="Ivory Tales"
              width={160}
              height={64}
              className="h-12 w-auto md:h-16"
            />
          </Link>

          <button
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
            aria-label="Close menu"
            className="p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M3 3l16 16M19 3L3 19" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col items-end justify-center gap-6 px-8 pb-24 md:gap-7 md:px-24">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
              style={{
                transitionDelay: menuOpen ? `${150 + i * 80}ms` : "0ms",
              }}
              className={`font-serif text-5xl font-light text-[#D4AF37] transition-all duration-700 hover:opacity-60 md:text-6xl ${
                menuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
              }`}
            >
              {l.label}
            </Link>
          ))}

          <a
            href="mailto:ivorytalesevents@gmail.com"
            tabIndex={menuOpen ? 0 : -1}
            style={{
              transitionDelay: menuOpen
                ? `${150 + links.length * 80}ms`
                : "0ms",
            }}
            className={`mt-4 text-xs tracking-[0.3em] transition-all duration-700 hover:opacity-60 ${
              menuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            }`}
          >
            ivorytalesevents@gmail.com
          </a>
        </nav>
      </div>
    </>
  );
}