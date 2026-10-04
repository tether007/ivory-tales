import Image from "next/image";

const W = 1000; // canvas width
const ROW_H = 190; // height of every tile
const GAP_Y = 15; // vertical gap between rows
const SLANT = 140; // horizontal shift of the diagonal across one tile's height
const GAP_X = 18; // horizontal gap between tiles in a row (≈ GAP_Y once slanted)
const H = ROW_H * 3 + GAP_Y * 2; // canvas height (600)

type Row = {
  x: number; // left edge of the first tile in the row
  tiles: { w: number; src: string; alt: string }[];
};

const rows: Row[] = [
  {
    x: 120,
    tiles: [
      { w: 400, src: "/gallery/1.jpg", alt: "Event photographer capturing guests at a mixer" },
      { w: 483, src: "/gallery/2.jpg", alt: "Guests networking at a corporate reception" },
    ],
  },
  {
    x: 270,
    tiles: [
      { w: 460, src: "/gallery/3.jpg", alt: "Audience cheering at a large conference stage" },
    ],
  },
  {
    x: 125,
    tiles: [
      { w: 460, src: "/gallery/4.jpg", alt: "Outdoor wedding arch and floral draping" },
      { w: 413, src: "/gallery/5.jpg", alt: "Guests raising glasses under string lights" },
    ],
  },
];

// Turn the rows into positioned tiles
const tiles = rows.flatMap((row, r) => {
  let x = row.x;
  return row.tiles.map((t) => {
    const tile = {
      src: t.src,
      alt: t.alt,
      l: `${(x / W) * 100}%`,
      t: `${((r * (ROW_H + GAP_Y)) / H) * 100}%`,
      w: `${(t.w / W) * 100}%`,
      h: `${(ROW_H / H) * 100}%`,
      // slant as a % of THIS tile's width, so the angle is identical for all
      slant: `${(SLANT / t.w) * 100}%`,
    };
    // next tile starts so its slanted edge sits GAP_X away from this one's
    x = x + t.w - SLANT + GAP_X;
    return tile;
  });
});

export default function SGallery() {
  return (
    <section className="relative overflow-hidden bg-[#0D1B3D] px-6 py-20 md:px-24 md:py-28 pt: 20px pb: 20px">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 border border-[#F7F4EC]/40 md:inset-5"
      />
      <h2 className="mb-12 font-serif text-4xl font-light text-[#F7F4EC] md:text-6xl">
        Moments we&apos;ve made
      </h2>
      

      {/* Lilac corner shape, like the deck */}
      <div className="pointer-events-none absolute bottom-0 right-0 hidden h-30 w-1/3 rounded-tl-[80px] bg-[#1E2A44] md:block" />

      {/* Mobile: simple stack. md+: absolutely positioned collage. */}
      {/* aspect ratio must match W / H above (1000 / 600) */}
      <div className="relative mx-auto flex max-w-6xl flex-col gap-4 md:block md:aspect-[1000/600]">
        {tiles.map((t) => (
          <div
            key={t.src}
            className="group relative aspect-video overflow-hidden [--slant:12%] md:absolute md:aspect-auto md:[--slant:var(--slant-md)] md:left-[var(--l)] md:top-[var(--t)] md:h-[var(--h)] md:w-[var(--w)]"
            style={
              {
                "--l": t.l,
                "--t": t.t,
                "--w": t.w,
                "--h": t.h,
                "--slant-md": t.slant,
                clipPath:
                  "polygon(var(--slant) 0, 100% 0, calc(100% - var(--slant)) 100%, 0 100%)",
              } as React.CSSProperties
            }
          >
            <Image
              src={t.src}
              alt={t.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
