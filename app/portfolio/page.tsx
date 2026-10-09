import PageCover from "@/components/sections/PageCover"
import UnderConstruction from "@/components/sections/UnderConstruction"
import PortfolioGallery from "@/components/sections/PortfolioGallery"
import Reveal from "@/components/sections/Reveal"

export default function ServicesPage(){
    return(
        <main>
        <PageCover src="/covers/contact.png" alt="Couple walking at sunset" />
        {/* <UnderConstruction pageName="Services" /> */}
        <Reveal><PortfolioGallery title="Weddings, Corporate & Experiences"/></Reveal>
        {/* <Reveal><PortfolioGallery title="Corporate & Social Events in Bengaluru" /></Reveal> */}

        </main>
    )
}