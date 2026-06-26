"use client";

import React from "react";

const FEATURES_DATA = [
  {
    title: "Secure Guard",
    desc: "We fortify your AI deployments with robust security protocols. Our team ensures every model adheres to strict data privacy standards.",
    icon: (
      <svg className="w-20 h-20 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        {/* Isometric Shield / Lock */}
        <path d="M 50,20 L 80,32 L 80,60 C 80,78 50,90 50,90 C 50,90 20,78 20,60 L 20,32 Z" strokeLinejoin="round" />
        <circle cx="50" cy="50" r="10" />
        <path d="M 50,40 V 45" />
        {/* Layered Isometric Gear */}
        <path d="M 68,36 L 74,38 L 74,44 L 68,46 Z" opacity="0.6" />
        <circle cx="71" cy="41" r="4" opacity="0.6" />
      </svg>
    ),
  },
  {
    title: "Agent Build",
    desc: "Tailored AI agents designed for your specific needs. We develop custom logic and workflows that integrate deeply with your existing tools.",
    icon: (
      <svg className="w-20 h-20 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        {/* Isometric Device 1 */}
        <path d="M 35,25 L 55,33 L 45,45 L 25,37 Z" fill="rgba(255,255,255,0.03)" />
        <path d="M 25,37 L 45,45 V 53 L 25,45 Z" />
        <path d="M 55,33 L 45,45 V 53 L 55,41 Z" />
        
        {/* Connecting Path / Chain */}
        <path d="M 45,41 L 52,49 L 60,45 L 65,52" strokeDasharray="3,3" />

        {/* Isometric Device 2 */}
        <path d="M 65,45 L 85,53 L 75,65 L 55,57 Z" fill="rgba(255,255,255,0.03)" />
        <path d="M 55,57 L 75,65 V 73 L 55,65 Z" />
        <path d="M 85,53 L 75,65 V 73 L 85,61 Z" />
      </svg>
    ),
  },
  {
    title: "Cloud Scale",
    desc: "Infrastructure optimization for high-traffic AI apps. We ensure your systems remain fast, responsive, and ready for any level of demand.",
    icon: (
      <svg className="w-20 h-20 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        {/* Isometric Computer Box */}
        <path d="M 50,15 L 80,30 L 50,45 L 20,30 Z" fill="rgba(255,255,255,0.03)" />
        <path d="M 20,30 L 50,45 V 75 L 20,60 Z" />
        <path d="M 80,30 L 50,45 V 75 L 80,60 Z" />
        
        {/* Cooling Fan circular grid */}
        <circle cx="50" cy="45" r="14" transform="rotate(-15 50 45)" opacity="0.4" />
        {/* Fan blades */}
        <path d="M 50,45 L 40,38 M 50,45 L 60,52 M 50,45 L 58,36 M 50,45 L 42,54" />
        <circle cx="50" cy="45" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Data Mining",
    desc: "Transform raw information into actionable intelligence. We build the pipelines and vector stores that power your organization's future.",
    icon: (
      <svg className="w-20 h-20 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        {/* Database Cylinders */}
        {/* Cylinder 1 */}
        <path d="M 60,35 A 15,6 0 0 0 90,35" />
        <path d="M 60,35 V 50 A 15,6 0 0 0 90,50 V 35" />
        <path d="M 60,42 A 15,6 0 0 0 90,42" />
        
        {/* Isometric Open Folder */}
        <path d="M 20,40 L 45,28 L 55,33 L 30,45 Z" fill="rgba(255,255,255,0.03)" />
        <path d="M 20,40 V 65 L 30,70 V 45 Z" />
        <path d="M 30,70 L 55,58 V 33" />
        <path d="M 30,45 L 55,33 L 60,40 L 35,52 Z" />
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section 
      id="features" 
      className="bg-[#0D0D0D] text-arctic py-24 border-b border-white/5 relative overflow-hidden"
    >
      {/* 4-Column Hairline Grid Overlay */}
      <div className="section-grid-overlay">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Pitch Black Canvas with Dot Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 border border-white/10 rounded-xl overflow-hidden"
          style={{
            backgroundColor: "#0D0D0D",
            backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.05) 1.2px, transparent 1.2px)",
            backgroundSize: "18px 18px",
          }}
        >
          {FEATURES_DATA.map((feat, index) => (
            <div 
              key={index}
              data-animate
              data-delay={index}
              className="p-8 flex flex-col items-start space-y-6 hover:bg-white/[0.01] transition-colors duration-200"
            >
              {/* Isometric Illustration */}
              <div className="h-24 w-full flex items-center justify-start select-none">
                {feat.icon}
              </div>

              {/* Title in Monospace */}
              <h3 className="font-display font-bold text-lg text-arctic">
                {feat.title}
              </h3>

              {/* Description */}
              <p className="font-body text-xs text-mint/65 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
