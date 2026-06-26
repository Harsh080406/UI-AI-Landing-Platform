"use client";

import React from "react";
import SectionEyebrow from "./SectionEyebrow";

export default function CaseStudies() {
  return (
    <section 
      id="case-studies" 
      className="zone-light py-32 border-b border-noir/5 relative overflow-hidden"
    >
      {/* Global Column Grid Overlay */}
      <div className="section-grid-overlay">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Hatch Eyebrow */}
        <div data-animate className="mb-12">
          <SectionEyebrow label="CASE STUDIES" />
        </div>

        {/* Heading & Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-6">
            <h2 
              data-animate
              data-delay="1"
              className="font-body font-extrabold text-4xl sm:text-5xl md:text-6xl text-noir tracking-tight leading-[1.1] select-none"
            >
              Proven neural<br />
              solutions
            </h2>
          </div>
          <div className="lg:col-span-6 flex items-end">
            <p 
              data-animate
              data-delay="2"
              className="font-body text-sm sm:text-base text-noir/70 leading-relaxed max-w-lg select-none"
            >
              We partner with industry leaders to deploy bespoke AI agents that solve complex operational hurdles and drive measurable growth.
            </p>
          </div>
        </div>

        {/* Case Studies Table Rows */}
        <div className="border-t border-noir/10 mb-16">
          
          {/* Row 1: Cigna */}
          <div 
            data-animate
            data-delay="3"
            className="group border-b border-noir/10 py-10 px-4 flex flex-col md:flex-row items-start md:items-center gap-8 hover:bg-noir/[0.03] transition-micro duration-200 cursor-pointer"
            role="article"
            aria-label="Cigna Smart Health Systems"
          >
            {/* Col 1: 200px Image/Logo */}
            <div className="w-[200px] shrink-0 flex items-center justify-start select-none">
              <div className="flex items-center gap-1 font-display font-extrabold text-2xl text-noir tracking-tighter">
                {/* Cigna custom cross/flower emblem */}
                <svg className="w-5 h-5 fill-forsythia text-noir" viewBox="0 0 24 24">
                  <path d="M12 2L9 9H2l6 5-3 8 7-5 7 5-3-8 6-5h-7z" />
                </svg>
                <span>cigna</span>
              </div>
            </div>

            {/* Col 2: 120px Date */}
            <div className="w-[120px] shrink-0 font-mono text-sm text-noir/40">
              {"//2026"}
            </div>

            {/* Col 3: Description */}
            <div className="flex-1 flex flex-col space-y-1.5">
              <h3 className="font-body font-bold text-xl text-noir tracking-tight group-hover:text-saffron transition-micro">
                Cigna Smart Health Systems
              </h3>
              <p className="font-body text-sm text-noir/75 leading-relaxed max-w-2xl">
                Revolutionizing patient care through predictive analytics and seamless AI-driven diagnostic integration tools.
              </p>
            </div>

            {/* Col 4: 60px Double Arrow >> */}
            <div className="w-[60px] shrink-0 flex justify-end text-noir/30 group-hover:text-noir transition-micro">
              <svg 
                className="w-6 h-6 transform transition-transform duration-150 ease-out group-hover:translate-x-1.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2.5"
                role="img"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Row 2: Aetna (Featured Galaxy Thumbnail!) */}
          <div 
            data-animate
            data-delay="4"
            className="group border-b border-noir/10 py-10 px-4 flex flex-col md:flex-row items-start md:items-center gap-8 hover:bg-noir/[0.03] transition-micro duration-200 cursor-pointer"
            role="article"
            aria-label="Aetna Health Data Ecosystem"
          >
            {/* Col 1: 200px Image/Logo (Galaxy Thumbnail) */}
            <div className="w-[200px] shrink-0 flex items-center justify-start select-none">
              <div 
                className="w-[200px] h-[120px] rounded border border-noir/15 flex items-center justify-center relative overflow-hidden shadow-md"
                style={{
                  background: "linear-gradient(135deg, #4c1d95 0%, #db2777 50%, #2563eb 100%)",
                }}
              >
                {/* Nebula Overlay Glows */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.4),_transparent_50%)]" />
                <div className="absolute -inset-10 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
                {/* Center aetna logo */}
                <span className="font-display font-extrabold text-2xl text-white tracking-tighter drop-shadow-sm z-10">
                  aetna
                </span>
              </div>
            </div>

            {/* Col 2: 120px Date */}
            <div className="w-[120px] shrink-0 font-mono text-sm text-noir/40">
              {"//2026"}
            </div>

            {/* Col 3: Description */}
            <div className="flex-1 flex flex-col space-y-1.5">
              <h3 className="font-body font-bold text-xl text-noir tracking-tight group-hover:text-saffron transition-micro">
                Aetna Health Data Ecosystem
              </h3>
              <p className="font-body text-sm text-noir/75 leading-relaxed max-w-2xl">
                We automated Aetna&apos;s member data management using secure AI to provide personalized care and clinical insights.
              </p>
            </div>

            {/* Col 4: 60px Single Arrow > */}
            <div className="w-[60px] shrink-0 flex justify-end text-noir/30 group-hover:text-noir transition-micro">
              <svg 
                className="w-6 h-6 transform transition-transform duration-150 ease-out group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2.5"
                role="img"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
