"use client";

import React from "react";
import SectionEyebrow from "./SectionEyebrow";

const ARTICLES_DATA = [
  {
    date: "//2026.06.12",
    title: "Designing event-driven crons for zero-overlap execution",
    desc: "A technical analysis of distributed lock mechanisms and queue throttling algorithms to guarantee exactly-once pipeline triggers.",
  },
  {
    date: "//2026.06.04",
    title: "Edge neural inference: running local models on data streams",
    desc: "How we compiled quantized ONNX weights into a tiny edge-runtime that classifies streaming JSON nodes in under 8ms.",
  },
  {
    date: "//2026.05.28",
    title: "Scaling Postgres replication with real-time CDC grids",
    desc: "An in-depth guide to configuring logical replication slots and processing write-ahead logs with low egress overhead.",
  },
];

export default function Articles() {
  return (
    <section 
      id="articles" 
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
          <SectionEyebrow label="ARTICLES" />
        </div>

        {/* Heading */}
        <h2 
          data-animate
          data-delay="1"
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-noir tracking-tight mb-16"
        >
          Deep-dives in system design
        </h2>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES_DATA.map((article, index) => (
            <article 
              key={index}
              data-animate
              data-delay={index}
              className="group border border-noir/15 bg-noir/[0.01] rounded-xl p-8 hover:bg-noir/[0.04] hover:border-noir/30 transition-micro duration-200 cursor-pointer flex flex-col justify-between h-[280px]"
            >
              <div>
                <span className="font-mono text-xs text-noir/50 block mb-3">
                  {article.date}
                </span>
                <h3 className="font-display font-bold text-lg text-noir tracking-tight leading-snug group-hover:text-saffron transition-micro">
                  {article.title}
                </h3>
                <p className="font-body text-xs text-noir/70 leading-relaxed mt-2 line-clamp-3">
                  {article.desc}
                </p>
              </div>

              {/* Read Article double arrow */}
              <div className="flex items-center gap-2 text-xs font-display font-bold text-noir/40 group-hover:text-noir transition-micro pt-4 select-none">
                <span>READ ARTICLE</span>
                <svg 
                  className="w-4 h-4 transform transition-transform duration-150 ease-out group-hover:translate-x-1" 
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
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
