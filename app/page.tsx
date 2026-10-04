// Landing page
import Hero from "@/components/sections/Hero";
import SGallery from "@/components/sections/SGallery";
import IntroSection from "@/components/sections/IntroSection";
import ServicesSlider from "@/components/sections/ServicesSlider";
import Reveal from "@/components/sections/Reveal";
import GetInTouch from "@/components/sections/GetInTouch";


export default function Home() {
  return (
    <main>
      <Hero />
      <Reveal><IntroSection/></Reveal>
      <Reveal><ServicesSlider/></Reveal>
      <GetInTouch/>
      <Reveal><SGallery/></Reveal>
    </main>
  );
}