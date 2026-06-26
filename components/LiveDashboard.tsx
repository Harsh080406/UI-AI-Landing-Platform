"use client";

import React from "react";
import SectionEyebrow from "./SectionEyebrow";

export default function LiveDashboard() {
  return (
    <section 
      id="dashboard" 
      className="zone-dark py-32 border-b border-white/5 relative overflow-hidden"
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
        <div data-animate className="mb-16">
          <SectionEyebrow label="LIVE DASHBOARD" />
        </div>

        {/* 3-Panel Grid Mockup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Panel 1: Radial Gauge */}
          <div 
            data-animate
            className="bg-nocturnal/20 rounded-xl p-8 border border-white/10 flex flex-col items-center text-center relative overflow-hidden"
          >
            <span className="font-mono text-[10px] tracking-wider text-arctic/40 uppercase mb-6 block self-start">
              SYS_CACHE_METRIC
            </span>
            
            {/* Radial Gauge SVG */}
            <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background arc */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="transparent" 
                  stroke="#172B36" 
                  strokeWidth="8" 
                  className="opacity-50"
                />
                {/* Foreground drawing arc (draws 0 -> 99%) */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="transparent" 
                  stroke="var(--color-forsythia)" 
                  strokeWidth="8" 
                  strokeDasharray="251.2"
                  strokeDashoffset="60" /* roughly 76% filled */
                  strokeLinecap="round"
                  data-animate
                  data-draw
                  className="transition-all duration-1000"
                />
              </svg>
              {/* Inner Label */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-display font-bold text-3xl text-arctic">99%</span>
                <span className="font-mono text-[9px] text-forsythia font-bold tracking-widest">CACHE</span>
              </div>
            </div>

            <div className="flex justify-between w-full border-t border-white/10 pt-4 text-left">
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm text-arctic">15 Core</span>
                <span className="font-body text-[10px] text-mint/50 uppercase">Active Systems</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="font-display font-bold text-sm text-arctic">6M Hrs</span>
                <span className="font-body text-[10px] text-mint/50 uppercase">Uptime</span>
              </div>
            </div>
          </div>

          {/* Panel 2: Bar Chart */}
          <div 
            data-animate
            className="bg-nocturnal/20 rounded-xl p-8 border border-white/10 flex flex-col justify-between relative overflow-hidden"
          >
            <span className="font-mono text-[10px] tracking-wider text-arctic/40 uppercase mb-4 block">
              LOAD_DISTRIBUTION
            </span>

            {/* 8-Bar Chart (Heights animate staggered via CSS transition) */}
            <div className="h-44 flex items-end justify-between gap-2.5 px-2 mb-6">
              {/* Bar 1 */}
              <div className="flex-1 bg-arctic/40 rounded-t bar-chart-rect" style={{ height: "45%", transitionDelay: "0ms" }} />
              {/* Bar 2 */}
              <div className="flex-1 bg-arctic/40 rounded-t bar-chart-rect" style={{ height: "60%", transitionDelay: "80ms" }} />
              {/* Bar 3 */}
              <div className="flex-1 bg-arctic/40 rounded-t bar-chart-rect" style={{ height: "30%", transitionDelay: "160ms" }} />
              {/* Bar 4 */}
              <div className="flex-1 bg-arctic/40 rounded-t bar-chart-rect" style={{ height: "85%", transitionDelay: "240ms" }} />
              {/* Bar 5 (Highlighted) */}
              <div className="flex-1 bg-forsythia rounded-t bar-chart-rect" style={{ height: "95%", transitionDelay: "320ms" }} />
              {/* Bar 6 */}
              <div className="flex-1 bg-arctic/40 rounded-t bar-chart-rect" style={{ height: "55%", transitionDelay: "400ms" }} />
              {/* Bar 7 */}
              <div className="flex-1 bg-arctic/40 rounded-t bar-chart-rect" style={{ height: "70%", transitionDelay: "480ms" }} />
              {/* Bar 8 */}
              <div className="flex-1 bg-arctic/40 rounded-t bar-chart-rect" style={{ height: "40%", transitionDelay: "560ms" }} />
            </div>

            <div className="flex justify-between w-full border-t border-white/10 pt-4">
              <span className="font-mono text-[10px] text-mint/50">NODE_GRID_04</span>
              <span className="font-mono text-[10px] text-forsythia font-bold">PEAK LOAD STATE</span>
            </div>
          </div>

          {/* Panel 3: Token/Query Gauge */}
          <div 
            data-animate
            className="bg-nocturnal/20 rounded-xl p-8 border border-white/10 flex flex-col items-center text-center relative overflow-hidden"
          >
            <span className="font-mono text-[10px] tracking-wider text-arctic/40 uppercase mb-6 block self-start">
              QUERY_VOLUME_STATUS
            </span>
            
            {/* Radial Gauge SVG */}
            <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background arc */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="transparent" 
                  stroke="#172B36" 
                  strokeWidth="8" 
                  className="opacity-50"
                />
                {/* Foreground drawing arc (draws 0 -> 82%) */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="transparent" 
                  stroke="var(--color-forsythia)" 
                  strokeWidth="8" 
                  strokeDasharray="251.2"
                  strokeDashoffset="90" /* roughly 64% filled */
                  strokeLinecap="round"
                  data-animate
                  data-draw
                  className="transition-all duration-1000"
                />
              </svg>
              {/* Inner Label */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-display font-bold text-3xl text-arctic">345</span>
                <span className="font-mono text-[9px] text-forsythia font-bold tracking-widest">QPS</span>
              </div>
            </div>

            <div className="flex justify-between w-full border-t border-white/10 pt-4 text-left">
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm text-arctic">152 Total</span>
                <span className="font-body text-[10px] text-mint/50 uppercase">Queries</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="font-display font-bold text-sm text-arctic">115</span>
                <span className="font-body text-[10px] text-mint/50 uppercase">Active Nodes</span>
              </div>
            </div>
          </div>

        </div>

        {/* Growth Vector row */}
        <div 
          data-animate
          className="border-t border-white/10 pt-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        >
          {/* Growth stats */}
          <div className="flex flex-col">
            <span className="font-display font-bold text-2xl text-forsythia">82% NET GROWTH</span>
            <span className="font-mono text-[10px] text-mint/50 tracking-wider uppercase">SYSTEM_INDEX_REPORT</span>
          </div>

          {/* Animated Line Chart SVG */}
          <div className="w-full lg:w-[450px] h-12">
            <svg className="w-full h-full" viewBox="0 0 300 50">
              {/* Background baseline */}
              <line x1="0" y1="45" x2="300" y2="45" stroke="rgba(241,246,244,0.1)" strokeWidth="1" />
              {/* Drawing line path */}
              <path 
                d="M 0,40 Q 50,20 100,35 T 200,10 T 300,5" 
                fill="none" 
                stroke="var(--color-forsythia)" 
                strokeWidth="2" 
                data-animate
                data-draw
              />
            </svg>
          </div>

          {/* Monospace Caption */}
          <div className="font-mono text-xs text-arctic/40 select-none">
            Optimizing neural weights for output.
          </div>

          {/* Request Demo Outlined Button */}
          <a
            href="#"
            className="group inline-flex items-center gap-3 border border-arctic bg-transparent text-arctic font-display font-medium text-xs rounded-[6px] py-3 px-5 tracking-[0.12em] uppercase transition-button hover:bg-arctic hover:text-noir focus-visible:outline-none shrink-0"
          >
            <div className="w-6 h-6 flex items-center justify-center border border-arctic/30 rounded shrink-0 transition-colors group-hover:border-noir/30">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 16 16">
                <path d="M8.22 2.72a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 8 8.22 4.28a.75.75 0 0 1 0-1.06z" />
                <path d="M12.5 8H2.75a.75.75 0 0 1 0-1.5h9.75a.75.75 0 0 1 0 1.5z" />
              </svg>
            </div>
            <span>Request Demo</span>
          </a>

        </div>

      </div>

      {/* Self-contained style block for bar animations */}
      <style jsx global>{`
        .bar-chart-rect {
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 600ms cubic-bezier(0.25, 0, 0, 1);
          will-change: transform;
        }
        .is-visible .bar-chart-rect {
          transform: scaleY(1);
        }
      `}</style>
    </section>
  );
}
