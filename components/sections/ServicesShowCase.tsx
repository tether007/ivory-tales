import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/sections/Reveal";
import { services } from "@/utils/services";

/**
 * Alternating rows: text on one side, a tall image with one big rounded corner
 * on the other. Clicking the image (or "More details") opens /services/<slug>.
 */
export default function ServicesShowcase() {
  return (
    <div>
      {services.map((s, i) => {
        const flip = i % 2 === 1; // every second row mirrors the layout
        const href = `/services/${s.slug}`;

        return (
          <Reveal key={s.slug}>
            <section
              className={`grid md:min-h-[670px] ${
                flip
                  ? "bg-[#e9ebea] md:grid-cols-[45fr_55fr]"
                  : "bg-[#f4f4f4] md:grid-cols-[55fr_45fr]"
              }`}
            >
              {/* Text */}
              <div
                className={`flex flex-col justify-center px-8 py-16 md:px-[clamp(2rem,8.8vw,9rem)] md:py-20 ${
                  flip ? "md:order-2" : "md:order-1"
                }`}
              >
                <h2 className="max-w-md font-serif text-4xl font-light uppercase leading-[1.1] tracking-[0.08em] text-neutral-800 md:text-6xl">
                  {s.title}
                </h2>
                <p className="mt-4 text-xs uppercase tracking-[0.4em] text-[#6f7c88] md:text-sm">
                  {s.subtitle}
                </p>
                <span className="my-8 block h-px w-[50px] bg-neutral-500" aria-hidden />
                <p className="max-w-[34rem] text-[15px] leading-7 text-[#6b7580]">
                  {s.description}
                </p>
                <Link
                  href={href}
                  className="group/link mt-12 inline-flex items-center gap-3 self-start text-sm italic uppercase tracking-[0.3em] text-[#6f7c88] transition-colors hover:text-neutral-900 md:mt-16"
                >
                  More details
                  <span className="not-italic transition-transform duration-300 group-hover/link:translate-x-1.5">
                    →
                  </span>
                </Link>
              </div>

              {/* Image: the whole thing is a link. Hidden from keyboard/screen
                  readers because "More details" already covers it. */}
              <Link
                href={href}
                aria-hidden
                tabIndex={-1}
                className={`group relative block min-h-80 overflow-hidden ${
                  flip
                    ? "rounded-tr-[80px] md:order-1 md:rounded-tr-[160px]"
                    : "rounded-tl-[80px] md:order-2 md:rounded-tl-[160px]"
                }`}
              >
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              </Link>
            </section>
          </Reveal>
        );
      })}
    </div>
  );
}
