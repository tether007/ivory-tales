import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

// Replace the "#" placeholders with your real profile URLs
const socials = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5V13h2.8v8h3.2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M6.9 8.9H3.8V20h3.1V8.9zM5.4 4a1.8 1.8 0 100 3.6A1.8 1.8 0 005.4 4zM20.2 13.4c0-3-1.6-4.7-3.9-4.7-1.2 0-2.1.6-2.6 1.4V8.9h-3V20h3.1v-5.9c0-1.5.5-2.5 1.8-2.5 1.2 0 1.6.9 1.6 2.4V20h3.1v-6.6z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#f3eeec] px-4 py-8 text-[#0D1B3D] sm:px-6 sm:py-10 md:px-24 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-6 sm:gap-8 md:grid-cols-3 md:gap-10 md:text-left text-center">
          {/* Left: links */}
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs sm:gap-x-6 sm:text-sm md:justify-start">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm tracking-[0.08em] underline decoration-[#0D1B3D]/40 underline-offset-4 transition-colors hover:decoration-[#0D1B3D]"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Center: logo (brightness-0 makes it solid black on the light background) */}
          <Link href="/" aria-label="Ivory Tales home" className="mx-auto block">
            <Image
              src="/logo.svg"
              alt="Ivory Tales"
              width={160}
              height={80}
              className="h-14 w-auto brightness-0 sm:h-16 md:h-20"
            />
          </Link>

          {/* Right: CTA + social icons */}
          <div className="flex flex-col items-center gap-3 sm:gap-4 md:flex-row md:justify-end">
            <Link
              href="/contact"
              className="bg-[#D4AF37] px-5 py-2.5 text-xs tracking-[0.1em] text-[#0D1B3D] transition-colors hover:bg-[#0D1B3D] hover:text-white sm:px-7 sm:py-3 sm:text-sm sm:tracking-[0.12em]"
            >
              Book a Consultation
            </Link>
            <ul className="flex gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-7 w-7 items-center justify-center bg-black text-white transition-opacity hover:opacity-70 sm:h-8 sm:w-8"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-[#0D1B3D]/15 pt-4 text-[9px] uppercase tracking-[0.18em] sm:mt-10 sm:gap-3 sm:pt-6 sm:text-[11px] sm:tracking-[0.25em] md:flex-row">          <p>Copyright © {new Date().getFullYear()} Ivory Tales</p>
          <p>Bengaluru, India</p>
        </div>
      </div>
    </footer>
  );
}
