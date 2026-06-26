"use client";

import React, { useEffect } from "react";
import { initScrollAnimations } from "@/lib/scrollAnimations";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import ScrollRevealText from "@/components/ScrollRevealText";
import Statistics from "@/components/Statistics";
import CaseStudies from "@/components/CaseStudies";
import ProductBuilder from "@/components/ProductBuilder";
import LiveDashboard from "@/components/LiveDashboard";
import FeaturesSection from "@/components/FeaturesSection";
import IntegrationsGrid from "@/components/IntegrationsGrid";
import PricingSection from "@/components/PricingSection";
import Articles from "@/components/Articles";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    // Initialize the high-performance unified scroll animation system
    initScrollAnimations();
  }, []);

  return (
    <>
      <NavBar />
      <main>
        {/* Section Order (Alternating Dark/Light Zones) */}
        
        {/* 1. Hero -> DARK */}
        <HeroSection />
        
        {/* 2. LLM Integrate -> DARK */}
        <ScrollRevealText />
        
        {/* 3. Statistics -> DARK */}
        <Statistics />
        
        {/* 4. Case Studies -> LIGHT */}
        <CaseStudies />
        
        {/* 5. Product Build -> DARK */}
        <ProductBuilder />
        
        {/* 6. Dashboard -> DARK */}
        <LiveDashboard />
        
        {/* 7. Features Grid -> DARK */}
        <FeaturesSection />
        
        {/* 8. Integrations -> DARK */}
        <IntegrationsGrid />
        
        {/* 9. Pricing -> DARK */}
        <PricingSection />
        
        {/* 10. Articles -> LIGHT */}
        <Articles />
      </main>
      
      {/* 11. Newsletter + Footer -> DARK */}
      <Footer />
    </>
  );
}
