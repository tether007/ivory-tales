// app/services/[slug]/page.tsx
// Placeholder detail page for every service. Replace UnderConstruction with the
// real content when each page is ready.
import type { Metadata } from "next";
import UnderConstruction from "@/components/sections/UnderConstruction";
import { getService, services } from "@/utils/services";

type Props = { params: Promise<{ slug: string }> };

// Only the slugs in utils/services.ts exist; anything else is a 404
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  return { title: service?.title, robots: { index: false } };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug)!; // safe: dynamicParams is false
  return <UnderConstruction pageName={service.title} />;
}
