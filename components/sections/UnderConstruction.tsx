import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";

type UnderConstructionProps = {
  /** Name of the page being worked on, e.g. "Weddings" */
  pageName?: string;
  /** Main heading */
  title?: string;
  /** Supporting paragraph */
  message?: string;
};

export default function UnderConstruction({
  pageName,
  title = "Something beautiful is on its way",
  message = "We're putting the finishing touches on this page. Please check back soon, or get in touch and we'll be happy to help in the meantime.",
}: UnderConstructionProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0D1B3D] px-6 py-32 text-center text-[#F7F4EC]">
      <Navbar />

      {/* Inset hairline border, same as the other sections */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 border border-[#F7F4EC]/40 md:inset-5"
      />

      <div className="relative z-10 mx-auto flex max-w-xl animate-hero-text flex-col items-center">
        <Image
          src="/logo.svg"
          alt="Ivory Tales"
          width={80}
          height={80}
          className="mb-10 h-14 w-auto"
        />

        <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]">
          {pageName ? `${pageName} · Under Construction` : "Under Construction"}
        </p>

        <h1 className="mt-6 font-serif text-4xl font-light leading-tight md:text-6xl">
          {title}
        </h1>

        <span className="my-10 block h-px w-20 bg-[#D4AF37]" aria-hidden />

        <p className="max-w-md text-base leading-8 text-[#F7F4EC]/85">{message}</p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="bg-[#D4AF37] px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-[#0D1B3D] transition-colors hover:bg-[#F7F4EC]"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="border border-[#F7F4EC]/60 px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] transition-colors hover:bg-[#F7F4EC] hover:text-[#0D1B3D]"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
