import PageCover from "@/components/sections/PageCover"
import UnderConstruction from "@/components/sections/UnderConstruction"
import ParallaxSection from "@/components/sections/ParallaxSection"
import Navbar from "@/components/sections/Navbar"

export default function ServicesPage(){
    return(
        <main>
        <div className="mb-18"></div>
        <Navbar
        nameLogo="/text-only-logo.jpg"/>
        {/* <PageCover src="/covers/contact.png" alt="Couple walking at sunset" />s */}
        {/* <UnderConstruction pageName="corporate" /> */}
        <ParallaxSection
            banner={{
                image: "/parallax/experiences-banner.jpg",
                alt: "Corporate event experience",
                title: "Designed to Connect",
                subtitle: "Corporate events with purpose",
                text: "From conferences and launches to employee experiences, we create events that bring people and brands together.",
                href: "/services/experiences",
            }}
            cards={[
                {
                title: "Corporate Events",
                text: "Conferences, launches and family days planned with care, so your brand and your people connect.",
                image: "/parallax/experiences_1.jpg",
                alt: "Corporate event with a full audience",
                href: "/services/experiences",
                },
                {
                title: "Brand Experiences",
                text: "Immersive experiences designed to communicate your brand while creating memorable moments.",
                image: "/parallax/experiences_2.jpg",
                alt: "Corporate brand experience",
                href: "/services/experiences",
                },
            ]}
            />
        </main>
    )
}