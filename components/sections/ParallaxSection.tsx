import Image from "next/image";
import Link from "next/link";

type Banner = {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  text: string;
  href: string;
};

type Card = {
  title: string;
  text: string;
  image: string;
  alt: string;
  href: string;
};

type ParallaxSectionProps = {
  banner: Banner;
  cards: Card[];
};

export default function ParallaxSection({
  banner,
  cards,
}: ParallaxSectionProps) {
  return (
    <div className="bg-white">
      {/* ---------- Banner: a "window" onto a fixed background ---------- */}
      <div className="px-4 pt-6 md:px-8 md:pt-12">
        <section
          // clip-path makes this box a window: the fixed image inside is only
          // visible within it (overflow-hidden would NOT clip a fixed child).
          className="relative h-[400px] [clip-path:inset(0)] md:h-[560px]"
        >
          {/* The image is fixed to the viewport, so it stays still while the
              page, and this window, scroll over it. */}
          <div className="fixed inset-0 z-0">
            <Image
              src={banner.image}
              alt={banner.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Scrim for text contrast */}
          <div className="absolute inset-0 z-[1] bg-black/30" />

          {/* Text scrolls normally with the window */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
            <h2 className="max-w-4xl font-serif text-4xl font-light uppercase leading-tight tracking-wide md:text-7xl">
              {banner.title}
            </h2>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] md:text-lg">
              {banner.subtitle}
            </p>

            <p className="mt-3 max-w-xl text-sm font-light md:text-base">
              {banner.text}
            </p>

            {/* unneccesary */}
            {/* <Link
              href={banner.href}
              className="mt-10 inline-flex items-center gap-4 bg-white px-8 py-4 text-xs uppercase tracking-wide text-black transition-colors hover:bg-[#D4AF37] md:px-10 md:text-sm"
            >
              Learn more

              <svg
                width="28"
                height="10"
                viewBox="0 0 28 10"
                fill="none"
                stroke="currentColor"
                aria-hidden
              >
                <path d="M0 5h27M23 1l4 4-4 4" />
              </svg>
            </Link> */}
          </div>
        </section>
      </div>

      {/* ---------- Cards with an overlapping label ---------- */}
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 pb-20 pt-16 md:grid-cols-2 md:pb-28 md:pt-24">
        {cards.map((c) => (
          <Link key={c.title} href={c.href} className="group block">
            <div className="relative aspect-[580/420] overflow-hidden">
              <Image
                src={c.image}
                alt={c.alt}
                fill
                sizes="(min-width: 768px) 580px, 100vw"
                className="object-cover transition-transform duration-1000 ease-out"
              />
            </div>

            {/* White label overlapping the bottom of the image */}
            <div className="relative -mt-12 mx-5 bg-white px-6 pb-4 pt-6 md:mx-7 md:px-8">
              <h3 className="font-serif text-2xl font-light text-neutral-800 md:text-3xl">
                {c.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                {c.text}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}