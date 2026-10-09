// utils/services.ts
// Single source of truth for the services. The showcase, the menu and the
// slider all read from here, so a link is only ever defined once.

export type Service = {
  slug: string; // becomes /services/<slug>
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
};

export const services: Service[] = [
  {
    slug: "marriage",
    title: "Weddings",
    subtitle: "Full planning & design",
    description:
      "We know that on your wedding day, every detail matters. We guide couples through each step of the planning process so that everyone, from the newly engaged to each individual guest, is happy, carefree and in the moment.",
    image: "/services/marriages.jpg",
    alt: "Bride holding a bouquet at golden hour",
  },
  {
    slug: "corporate",
    title: "Corporate Events",
    subtitle: "Conferences, launches & brand experiences",
    description:
      "We design corporate events that strengthen your brand and bring your audience closer, from conferences and product launches to large family days, with careful planning and seamless delivery on the day.",
    image: "/services/corporate.jpg",
    alt: "Conference stage with an engaged audience",
  },
  {
    slug: "experiences",
    title: "Experiences",
    subtitle: "Activations & celebrations",
    description:
      "From brand activations to intimate celebrations, we shape moments that engage every guest. Our trusted partners in lighting, florals and food are vetted for each and every event.",
    image: "/services/experiences.jpg",
    alt: "Guests celebrating under string lights",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);