"use client";

import React from "react";

export default function VideoShowcase() {
  return (
    <section 
      id="video-showcase" 
      className="zone-dark min-h-[85vh] flex flex-col items-center justify-center py-24 relative overflow-hidden bg-[#0D0D0D]"
    >
      {/* Global Column Grid Overlay */}
      <div className="section-grid-overlay">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Animated Bokeh / Particles */}
      {/* Particle 1 */}
      <div 
        className="float-particle w-72 h-72 bg-forsythia/5 top-[10%] left-[5%]" 
        style={{ animationDelay: "0s", animationDuration: "12s" }}
      />
      {/* Particle 2 */}
      <div 
        className="float-particle w-96 h-96 bg-nocturnal/15 bottom-[8%] right-[10%]" 
        style={{ animationDelay: "2s", animationDuration: "16s" }}
      />
      {/* Particle 3 */}
      <div 
        className="float-particle w-80 h-80 bg-saffron/5 top-[45%] left-[60%]" 
        style={{ animationDelay: "4s", animationDuration: "10s" }}
      />

      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center relative z-10 space-y-12">
        
        {/* Pulsing Brand Logo SVG (120px, White) */}
        <div 
          className="pulsing-glow select-none"
          data-animate
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            className="w-32 h-32 fill-arctic"
            role="img"
            aria-label="AXON Logo Emblem"
          >
            <title>AXON Logo Emblem</title>
            <path d="M8.372 1.349a.75.75 0 0 0-.744 0l-4.81 2.748L8 7.131l5.182-3.034zM14 5.357L8.75 8.43v6.005l4.872-2.784A.75.75 0 0 0 14 11zm-6.75 9.078V8.43L2 5.357V11c0 .27.144.518.378.651z" />
          </svg>
        </div>

        {/* Play Video Button with Expanding Bracket Corners */}
        <button
          type="button"
          data-animate
          data-delay="1"
          className="group relative px-8 py-3.5 border border-arctic bg-transparent text-arctic font-display font-medium text-sm tracking-[0.15em] uppercase hover:bg-arctic/5 focus-visible:outline-none transition-colors select-none"
        >
          {/* Top-Left Bracket */}
          <div className="absolute -top-1 -left-1 w-2 h-2 border-t-1.5 border-l-1.5 border-arctic transition-transform duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-125 origin-top-left" />
          {/* Top-Right Bracket */}
          <div className="absolute -top-1 -right-1 w-2 h-2 border-t-1.5 border-r-1.5 border-arctic transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-125 origin-top-right" />
          {/* Bottom-Left Bracket */}
          <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-1.5 border-l-1.5 border-arctic transition-transform duration-150 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 group-hover:scale-125 origin-bottom-left" />
          {/* Bottom-Right Bracket */}
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-1.5 border-r-1.5 border-arctic transition-transform duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:scale-125 origin-bottom-right" />
          
          <span>Play Video</span>
        </button>

        {/* Explanatory text */}
        <p className="font-body text-sm text-mint/60 max-w-sm" data-animate data-delay="2">
          Discover how AXON orchestrates live streaming data systems across multi-region grids in under two minutes.
        </p>

      </div>

      {/* Bottom Right: Watch Time Badge */}
      <div 
        className="absolute bottom-6 right-8 flex items-center gap-1.5 text-xs font-body text-arctic/60"
        data-animate
        data-delay="3"
      >
        <span>⏱</span>
        <span>2 MINUTES WATCH</span>
      </div>
    </section>
  );
}
