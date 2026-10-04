import Image from "next/image";
import Navbar from "./Navbar";

type PageCoverProps = {
  src: string;
  alt: string;
  /** Optional centered title over the image */
  title?: string;
  /** Tailwind classes to change the height, e.g. "h-[80vh]" */
  className?: string;
};

export default function PageCover({ src, alt, title, className = "" }: PageCoverProps) {
  return (
    <section
      className={`relative h-[60vh] max-h-[760px] min-h-[380px] w-full overflow-hidden bg-black text-white ${className}`}
    >
      <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />

      {/* Light overall scrim + a darker top fade so the logo and MENU stay readable */}
      <div className="absolute inset-0 bg-black/15" />
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/40 to-transparent" />

      <Navbar />

      {title && (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <h1 className="animate-hero-text font-serif text-5xl font-light md:text-7xl">
            {title}
          </h1>
        </div>
      )}
    </section>
  );
}
