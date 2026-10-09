import Image from "next/image";

// Put your photos in /public/portfolio/ and list them here.
// Add or remove entries freely; the grid adjusts by itself.
const images = [
  { src: "/portfolio/1.jpg", alt: "Dessert table with a tall floral arrangement" },
  { src: "/portfolio/2.jpg", alt: "Flower cart with pastel favour cones" },
  { src: "/portfolio/3.jpg", alt: "Grazing table with fruit and bright blooms" },
  { src: "/portfolio/4.jpg", alt: "Colonnaded entrance with a lantern" },
  { src: "/portfolio/5.jpg", alt: "Reception table with gold chairs" },
  { src: "/portfolio/6.jpg", alt: "Garden venue framed by trees" },
  { src: "/portfolio/7.jpg", alt: "Event photo 7" },
  { src: "/portfolio/8.jpg", alt: "Event photo 8" },
  { src: "/portfolio/9.jpg", alt: "Event photo 9" },
];

type PortfolioGalleryProps = {
  /** Optional heading shown above the grid */
  title?: string;
};

export default function PortfolioGallery({ title }: PortfolioGalleryProps) {
  return (
    <section>
      {/* Optional title */}
      {title && (
        <div className="bg-[#fafafa] px-6 pb-12 pt-16 text-center md:pb-14 md:pt-24">
          <h2 className="font-serif text-3xl font-normal text-[#6b6b6b] md:text-5xl">
            {title}
          </h2>
        </div>
      )}

      {/* Full-bleed grid: no outer padding, only thin gaps between tiles */}
      <ul className="grid gap-2 bg-white sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img) => (
          <li key={img.src}>
            <div className="group relative aspect-square overflow-hidden bg-neutral-100">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              {/* Hover: a navy tint over the photo, nothing else */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[#0D1B3D]/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
