

export default function IntroSection() {
  return (
    <section className="bg-[#f3eeec] px-6 py-20 md:py-36">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        {/* Eyebrow: small, widely tracked caps */}
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-foreground md:text-[20px]">
          <span className="font-bold font-serif text-[#1E2A44]"> Based in Bengaluru</span>
        </p>

        {/* Heading: light serif in the brand accent */}
        <h2 className="mt-6 font-serif text-4xl font-light leading-tight text-[#D4AF37] md:text-6xl">
          Corporate Events &amp; Brand Experiences,
        </h2>

        {/* Short divider */}
        <span className="my-10 block h-px w-20 bg-foreground/60" aria-hidden />

        <p className="text-base font-serif leading-9 text-foreground md:text-lg md:leading-10 md:text-[20px]">
          From a 15,000-person family day to an intimate breakfast meet-up,
          Ivory Tales designs events that engage your audience and carry your
          brand story well beyond the day itself.
        </p>
      </div>
    </section>
  );
}
