"use client";

import React from "react";
import SectionEyebrow from "./SectionEyebrow";

const STATS_DATA = [
  { value: "10M+", label: "TASKS AUTOMATED" },
  { value: "99.99%", label: "PLATFORM UPTIME SLA" },
  { value: "50ms", label: "AVERAGE SYNC LATENCY", prefix: "< " },
];

export default function Statistics() {
  return (
    <section 
      id="statistics" 
      className="zone-dark py-24 border-b border-white/5 relative overflow-hidden"
    >
      {/* Column Grid Lines */}
      <div className="section-grid-overlay">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Hatch Eyebrow */}
        <div data-animate className="mb-16">
          <SectionEyebrow label="STATISTICS" />
        </div>

        {/* 3-Column Stats Grid with Hairline Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-y border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10 py-12">
          {STATS_DATA.map((stat, index) => (
            <div 
              key={index}
              data-animate
              data-delay={index}
              className="relative py-12 px-8 flex flex-col items-center justify-center text-center group"
            >
              {/* Bracket Corners (scale(0) -> scale(1) on scroll) */}
              {/* Top-Left Corner */}
              <div className="bracket-corner absolute top-3 left-3 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-arctic origin-top-left" />
              {/* Top-Right Corner */}
              <div className="bracket-corner absolute top-3 right-3 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-arctic origin-top-right" />
              {/* Bottom-Left Corner */}
              <div className="bracket-corner absolute bottom-3 left-3 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-arctic origin-bottom-left" />
              {/* Bottom-Right Corner */}
              <div className="bracket-corner absolute bottom-3 right-3 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-arctic origin-bottom-right" />

              {/* Number (with static prefix if applicable) */}
              <div className="font-display font-bold text-5xl sm:text-6xl md:text-7.5xl text-forsythia mb-3 select-none flex items-center justify-center">
                {stat.prefix && <span className="opacity-80 mr-1">{stat.prefix}</span>}
                <span 
                  data-animate
                  data-count-to={stat.value}
                  className="tabular-nums"
                >
                  0
                </span>
              </div>

              {/* Label */}
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.15em] text-arctic/60 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Self-contained style block for bracket animations */}
      <style jsx global>{`
        [data-animate] .bracket-corner {
          transform: scale(0);
          transition: transform 250ms cubic-bezier(0.25, 0, 0, 1);
        }
        [data-animate].is-visible .bracket-corner {
          transform: scale(1);
        }
      `}</style>
    </section>
  );
}
