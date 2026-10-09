// Landing page
import Hero from "@/components/sections/Hero";
import SGallery from "@/components/sections/SGallery";
import IntroSection from "@/components/sections/IntroSection";
import ServicesSlider from "@/components/sections/ServicesSlider";
import Reveal from "@/components/sections/Reveal";
import GetInTouch from "@/components/sections/GetInTouch";
import HoverTextReveal from "@/components/sections/HoverTextReveal";


export default function Home() {
  return (
    <main>
      <Hero />
      <Reveal><IntroSection/></Reveal>
      <Reveal><ServicesSlider/></Reveal>
      <GetInTouch/>
      {/* wait for client's opinion */}
      {/* <Reveal><SGallery/></Reveal>  */}
      <Reveal><HoverTextReveal/></Reveal>
      <Reveal><SGallery/></Reveal>
    </main>
  );
}