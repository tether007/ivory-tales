import PageCover from "@/components/sections/PageCover";
import ParallaxSection from "@/components/sections/ParallaxSection";
import Navbar from "@/components/sections/Navbar";

export default function ServicesPage() {
  return (
    <main>
      {/* <PageCover src="/covers/contact.png" alt="Couple walking at sunset" /> */}
      <div className="mb-18"></div>
      <Navbar nameLogo="/text-only-logo.jpg" />
      <ParallaxSection
        banner={{
          image: "/parallax/marriages-banner.jpg",
          alt: "Corporate event experience",
          title: "YOUR STORY, BEAUTIFULLY TOLD",
          subtitle: "TAILORED WEDDINGS, UNIQUELY YOURS",
          text: "Every love story is different. We bring yours to life through thoughtful details, personal touches, and celebrations crafted around what makes your story special.",
          href: "/services/corporate",
        }}
        cards={[
          {
            title: "Wedding Planning",
            text: "Every couple has a story of their own. We take the time to understand yours, creating a tailored wedding experience that feels personal, meaningful, and uniquely you.",
            image: "/parallax/marriages_1.jpg",
            alt: "Corporate event with a full audience",
            href: "/services/marriage",
          },
          {
            title: "Wedding Design & Experiences",
            text: "From the little details to the moments that take your breath away, we bring your ideas to life with thoughtful design and a personal touch, creating a celebration that feels truly yours.",
            image: "/parallax/marriages_2.jpg",
            alt: "Corporate brand experience",
            href: "/services/marriage",
          },
        ]}
      />
    </main>
  );
}
