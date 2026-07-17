import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";
import FloorIndicator from "@/components/FloorIndicator";
import CinematicHero from "@/components/CinematicHero";
import Seam from "@/components/ui/Seam";

import LivingRoom from "@/components/sections/LivingRoom";
import Kitchen from "@/components/sections/Kitchen";
import DiningRoom from "@/components/sections/DiningRoom";
import WineCellar from "@/components/sections/WineCellar";
import ExecutiveOffice from "@/components/sections/ExecutiveOffice";
import HomeTheater from "@/components/sections/HomeTheater";
import MasterSuite from "@/components/sections/MasterSuite";
import WalkInCloset from "@/components/sections/WalkInCloset";
import SpaBathroom from "@/components/sections/SpaBathroom";
import WellnessArea from "@/components/sections/WellnessArea";
import RooftopTerrace from "@/components/sections/RooftopTerrace";

const INK = "#0a0a0b";
const INK_SOFT = "#111113";
const MARBLE = "#f4f1ea";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <Navigation />
      <FloorIndicator />

      <main className="relative">
        {/* The film → the threshold */}
        <CinematicHero />

        {/* 01 · Living Room — About (dark, continues the film) */}
        <LivingRoom />

        <Seam from={INK_SOFT} to={MARBLE} />
        {/* 02 · Kitchen — Services (light) */}
        <Kitchen />

        <Seam from={MARBLE} to={INK} />
        {/* 03 · Dining Room — Featured Properties (dark) */}
        <DiningRoom />

        {/* 04 · Wine Cellar — Collection (dark, moody) */}
        <WineCellar />

        <Seam from={INK_SOFT} to={MARBLE} />
        {/* 05 · Executive Office — Why Velmont (light) */}
        <ExecutiveOffice />

        <Seam from={MARBLE} to={INK} />
        {/* 06 · Home Theater — Testimonials (dark) */}
        <HomeTheater />

        <Seam from={INK} to={MARBLE} />
        {/* 07 · Master Suite — Lifestyle (light) */}
        <MasterSuite />

        <Seam from={MARBLE} to={INK_SOFT} />
        {/* 08 · Walk-in Closet — Features (dark) */}
        <WalkInCloset />

        <Seam from={INK_SOFT} to={MARBLE} />
        {/* 09 · Spa Bathroom — Philosophy & materials (light) */}
        <SpaBathroom />

        <Seam from={MARBLE} to={INK} />
        {/* 10 · Wellness Area — Investment (dark) */}
        <WellnessArea />

        {/* 11 · Rooftop Terrace — CTA / Contact / Footer (dark) */}
        <RooftopTerrace />
      </main>
    </SmoothScroll>
  );
}
