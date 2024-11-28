/**
 * This code was generated by Builder.io
 */
import React from "react";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StockIndex from "@/components/StockIndex";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import Fund from "@/components/Fund";
import AboutUs from "@/components/AboutUs";
import News from "@/components/News";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { ThreeController } from "@/components/r3f/components/three-controller";
import { CharacterModel } from "@/components/r3f/gltfjsx/character";
import { SceneModel } from "@/components/r3f/gltfjsx/scene";

const LandingPage: React.FC = () => {
  return (
    <main className="flex overflow-hidden flex-col items-center bg-[linear-gradient(to_bottom_right,#AED2FD_0%,#4D3589_46%_bottom_right_/_50%_50%_no-repeat,linear-gradient(to_bottom_left,#AED2FD_0%,#4D3589_46%)_bottom_left_/_50%_50%_no-repeat,linear-gradient(to_top_left,#AED2FD_0%,#4D3589_46%)_top_left_/_50%_50%_no-repeat,linear-gradient(to_top_right,#AED2FD_0%,#4D3589_46%)_top_right_/_50%_50%_no-repeat)]">
      <Header />
      <Hero />
      <ThreeController
        character={<CharacterModel />}
        scene={<SceneModel />}
        cameraDebug={false}
        stats={false} />
      <StockIndex />
      <Fund />
      <AboutUs />
      <News />
      <FAQ />
      <SubscriptionPlans />
      <Footer />
    </main>
  );
};

export default LandingPage;