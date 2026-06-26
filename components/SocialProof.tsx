"use client";

import React from "react";

const TESTIMONIALS = [
  {
    quote: "AXON completely redefined our data operations. We migrated 400 custom cron jobs into a single pipeline dashboard in an afternoon. Uptime has been flawless.",
    author: "Sarah Jenkins",
    role: "VP of Engineering",
    company: "Vectra AI",
  },
  {
    quote: "The anomaly detection caught a major schema drift on our payments gateway within 50ms, preventing what would have been a catastrophic database corruption.",
    author: "Arjun Mehta",
    role: "Principal Data Architect",
    company: "Cypher Analytics",
  },
  {
    quote: "No-code connectors that actually work. Our product managers can now spin up sync pipelines from Stripe to Snowflake without asking engineering for support.",
    author: "Elena Rostova",
    role: "Lead Platform Engineer",
    company: "Kronos Tech",
  },
];

const STATS = [
  { value: "10M+", label: "Tasks Automated Daily" },
  { value: "99.99%", label: "Platform Uptime SLA" },
  { value: "< 50ms", label: "Average Sync Latency" },
];

export default function SocialProof() {
  return (
    <section id="social-proof" className="py-24 bg-arctic text-nocturnal border-t border-mint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stat Counters Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 border-b border-mint pb-16 text-center md:text-left">
          {STATS.map((stat, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <span className="font-display font-bold text-5xl sm:text-6xl text-saffron tracking-tight">
                {stat.value}
              </span>
              <span className="font-body text-sm font-semibold text-nocturnal/60 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonial Cards Section */}
        <div className="mb-24">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-nocturnal tracking-tight mb-12 text-center">
            Validated by Engineering Leaders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, index) => (
              <div 
                key={index}
                className="bg-mint rounded-xl p-8 border border-nocturnal/5 flex flex-col justify-between relative hover:shadow-md transition-micro"
                role="blockquote"
              >
                {/* Visual Quote mark */}
                <span className="absolute top-4 right-6 font-display font-extrabold text-7xl text-nocturnal/5 select-none pointer-events-none">
                  “
                </span>
                
                <p className="font-body text-sm sm:text-base text-nocturnal/85 leading-relaxed mb-6 italic relative z-10">
                  &quot;{t.quote}&quot;
                </p>
                
                <div>
                  <h3 className="font-display font-bold text-sm text-nocturnal">
                    {t.author}
                  </h3>
                  <p className="font-body text-xs text-nocturnal/60 mt-0.5">
                    {t.role}, <span className="font-semibold text-nocturnal/80">{t.company}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Logo Strip */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <span className="font-display font-semibold text-[10px] tracking-widest text-nocturnal/40 uppercase">
            TRUSTED BY THE WORLD&apos;S BEST
          </span>
          <div className="w-full flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-45 grayscale hover:opacity-75 transition-micro">
            {/* Logo 1: VECTRA */}
            <div className="flex items-center gap-1.5 font-display font-bold text-lg tracking-wider text-nocturnal">
              <svg className="w-5 h-5 fill-nocturnal" viewBox="0 0 16 16">
                <path d="M8 0L0 14h16L8 0zM8 4l5 9H3l5-9z" />
              </svg>
              <span>VECTRA</span>
            </div>
            
            {/* Logo 2: CYPHER */}
            <div className="flex items-center gap-1.5 font-display font-bold text-lg tracking-wider text-nocturnal">
              <svg className="w-5 h-5 fill-nocturnal" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14A6 6 0 118 2a6 6 0 010 12z" />
              </svg>
              <span>CYPHER</span>
            </div>

            {/* Logo 3: KRONOS */}
            <div className="flex items-center gap-1.5 font-display font-bold text-lg tracking-wider text-nocturnal">
              <svg className="w-5 h-5 fill-nocturnal" viewBox="0 0 16 16">
                <path d="M0 0h16v3H0zm0 5h16v3H0zm0 5h16v3H0zm0 5h16v1H0z" />
              </svg>
              <span>KRONOS</span>
            </div>

            {/* Logo 4: APEX */}
            <div className="flex items-center gap-1.5 font-display font-bold text-lg tracking-wider text-nocturnal">
              <svg className="w-5 h-5 fill-nocturnal" viewBox="0 0 16 16">
                <path d="M8 1.5L1.5 8 8 14.5 14.5 8 8 1.5zM8 4.3L11.7 8 8 11.7 4.3 8 8 4.3z" />
              </svg>
              <span>APEX</span>
            </div>

            {/* Logo 5: NEXUS */}
            <div className="flex items-center gap-1.5 font-display font-bold text-lg tracking-wider text-nocturnal">
              <svg className="w-5 h-5 fill-nocturnal" viewBox="0 0 16 16">
                <path d="M2 2h12v12H2V2zm2 2v8h8V4H4z" />
              </svg>
              <span>NEXUS</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
