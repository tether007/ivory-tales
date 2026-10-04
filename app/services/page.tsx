// app/services/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import PageCover from "@/components/sections/PageCover";
import ServicesShowcase from "@/components/sections/ServicesShowCase";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <main>
      <PageCover
        src="/covers/contact.png"
        alt="Elegantly set event venue"
        title="Services"
      />

      {/* Intro: same gray as the first showcase row so the two flow together */}
      <section className="flex flex-col items-center bg-[#f4f4f4] px-6 py-12 text-center md:py-16">
        <Image
          src="/services-logo.png"
          alt="Ivory Tales"
          width={80}
          height={80}
          className="h-12 w-auto brightness-0"
        />
        <h2 className="mt-6 max-w-xl font-serif text-3xl font-light text-[#0D1B3D] md:text-4xl">
          Serving every important occasion
        </h2>
      </section>

      <ServicesShowcase />
    </main>
  );
}
