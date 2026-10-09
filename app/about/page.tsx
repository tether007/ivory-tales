import type { Metadata } from "next";
import PageCover from "@/components/sections/PageCover";
import AboutSection from "@/components/sections/AboutSection";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main>
      <PageCover src="/covers/about.jpg" alt="Couple walking at sunset" title="About" />
      <AboutSection />
    </main>
  );
}