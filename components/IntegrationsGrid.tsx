"use client";

import React, { useEffect, useRef } from "react";
import SectionEyebrow from "./SectionEyebrow";

const PARAGRAPH = "AXON bridges your data and your tools. Deploy automations that live where you work — from Slack to cloud and beyond.";

const LOGOS = [
  { name: "Slack", svg: (
    <svg className="w-auto h-8 fill-current text-arctic" viewBox="0 0 24 24">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.043a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.043zM8.823 5.043a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52v2.52h-2.522a2.528 2.528 0 0 1-2.52-2.52zm0 1.261a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522H3.78a2.528 2.528 0 0 1-2.522-2.522V8.824a2.528 2.528 0 0 1 2.522-2.52h5.043zm10.135 3.762a2.528 2.528 0 0 1 2.522-2.52 2.528 2.528 0 0 1 2.52 2.52 2.528 2.528 0 0 1-2.52 2.52h-2.522v-2.52zm-1.262 0a2.528 2.528 0 0 1-2.52 2.52h-5.043a2.528 2.528 0 0 1-2.522-2.52V3.78a2.528 2.528 0 0 1 2.522-2.522h5.043a2.528 2.528 0 0 1 2.52 2.522v5.043zm-3.781 10.135a2.528 2.528 0 0 1-2.52 2.52 2.528 2.528 0 0 1-2.522-2.52v-2.52h2.522a2.528 2.528 0 0 1 2.52 2.52zm0-1.262a2.528 2.528 0 0 1-2.52-2.52v-5.043a2.528 2.528 0 0 1 2.52-2.522h5.043a2.528 2.528 0 0 1 2.522 2.522v5.043a2.528 2.528 0 0 1-2.522 2.52h-5.043z"/>
    </svg>
  )},
  { name: "AWS", svg: (
    <svg className="w-auto h-6 fill-current text-arctic" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.29 14.29c-.19.18-.45.29-.71.29s-.52-.11-.71-.29L6.5 13.5c-.39-.39-.39-1.02 0-1.41s1.02-.39 1.41 0L10 14.09l6.09-6.09c.39-.39 1.02-.39 1.41 0s.39 1.02 0 1.41l-6.79 6.88z"/>
    </svg>
  )},
  { name: "Stripe", svg: (
    <svg className="w-auto h-7 fill-current text-arctic" viewBox="0 0 24 24">
      <path d="M13.923 8.78c0-1.077-.872-1.472-2.316-1.472-1.577 0-2.915.426-3.792 1.015L7 5.928c1.15-.758 2.99-1.246 4.885-1.246 3.738 0 5.674 1.706 5.674 4.675v7.26c0 1.137.938 1.543 1.44 1.543a3.5 3.5 0 0 0 .762-.1v2.336a5.556 5.556 0 0 1-1.92.295c-2.146 0-3.327-1.127-3.327-3.23v-1.198a5.27 5.27 0 0 1-4.225 1.523c-2.617 0-4.306-1.523-4.306-3.879 0-2.823 2.37-3.99 6.22-3.99h1.725V8.78zm-1.725 3.016c-1.848 0-2.738.477-2.738 1.39 0 .863.69 1.35 1.838 1.35 1.49 0 2.625-1.005 2.625-2.52v-1.22H12.2z"/>
    </svg>
  )},
  { name: "GitHub", svg: (
    <svg className="w-auto h-8 fill-current text-arctic" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.024A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.293 2.747-1.024 2.747-1.024.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  )},
  { name: "Snowflake", svg: (
    <svg className="w-auto h-8 fill-current text-arctic" viewBox="0 0 24 24">
      <path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm5.67 15.65h-1.89c.12-.44.22-.92.27-1.42h1.62zm-3.08 0H12.9v-1.42h1.72c-.03.5-.09.98-.18 1.42zm.28-2.62H12.9V11.6h1.97c-.03.5-.09.98-.18 1.42zm-5.69.03V11.6h1.98v1.43c-.02-.45-.07-.93-.15-1.41zm0 2.59V14.2h1.98v1.43c-.03-.44-.09-.92-.18-1.42zm-2.88-.03H4.6v-1.42h1.62c.05.5.15.98.27 1.42zm.28-2.62H4.6v-1.42h1.98c-.02.44-.07.92-.16 1.42z"/>
    </svg>
  )},
  { name: "Google Cloud", svg: (
    <svg className="w-auto h-7 fill-current text-arctic" viewBox="0 0 24 24">
      <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95A5.469 5.469 0 0 1 12 6c2.63 0 4.89 1.83 5.45 4.39l.26 1.16 1.19.1c1.64.13 2.9 1.52 2.9 3.18 0 1.76-1.44 3.17-3.2 3.17z"/>
    </svg>
  )},
  { name: "Vercel", svg: (
    <svg className="w-auto h-7 fill-current text-arctic" viewBox="0 0 24 24">
      <path d="M24 22.525H0L12 1.475L24 22.525Z"/>
    </svg>
  )},
  { name: "Linear", svg: (
    <svg className="w-auto h-7 fill-current text-arctic" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2v-6h2v6z"/>
    </svg>
  )},
  { name: "Figma", svg: (
    <svg className="w-auto h-7 fill-current text-arctic" viewBox="0 0 24 24">
      <path d="M8.5 0C6.57 0 5 1.57 5 3.5S6.57 7 8.5 7H12V3.5C12 1.57 10.43 0 8.5 0zm0 7C6.57 7 5 8.57 5 10.5S6.57 14 8.5 14H12V7H8.5zm0 7C6.57 14 5 15.57 5 17.5S6.57 21 8.5 21H12V14H8.5zm7-7c-1.93 0-3.5-1.57-3.5-3.5S13.57 0 15.5 0S19 1.57 19 3.5S17.43 7 15.5 7zm0 7c-1.93 0-3.5-1.57-3.5-3.5S13.57 7 15.5 7S19 8.57 19 10.5S17.43 14 15.5 14z"/>
    </svg>
  )},
  { name: "Notion", svg: (
    <svg className="w-auto h-7 fill-current text-arctic" viewBox="0 0 24 24">
      <path d="M4.6 2h14.8c1.4 0 2.6 1.2 2.6 2.6v14.8c0 1.4-1.2 2.6-2.6 2.6H4.6C3.2 22 2 20.8 2 19.4V4.6C2 3.2 3.2 2 4.6 2zm1.4 5.2v9.6c0 .4.3.7.7.7H7c.4 0 .7-.3.7-.7v-4.1l4.1 4.5c.3.3.7.3.9 0l4.1-4.5v4.1c0 .4.3.7.7.7h.3c.4 0 .7-.3.7-.7V7.2c0-.4-.3-.7-.7-.7h-.3c-.3 0-.6.1-.8.4L12.5 12l-4.5-5.1c-.2-.3-.5-.4-.8-.4h-.3c-.4 0-.7.3-.7.7z"/>
    </svg>
  )},
  { name: "Discord", svg: (
    <svg className="w-auto h-7 fill-current text-arctic" viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0c-.172-.393-.412-.882-.63-1.25a.074.074 0 00-.078-.037 19.736 19.736 0 00-4.885 1.515.069.069 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
    </svg>
  )},
  { name: "PostgreSQL", svg: (
    <svg className="w-auto h-7 fill-current text-arctic" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-6h2v6zm0-8h-2V6h2v2z"/>
    </svg>
  )},
];

export default function IntegrationsGrid() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const words = PARAGRAPH.split(" ");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const wordSpans = section.querySelectorAll(".reveal-word") as NodeListOf<HTMLSpanElement>;

    const handleScroll = () => {
      const vh60 = window.innerHeight * 0.6;
      wordSpans.forEach((word) => {
        const rect = word.getBoundingClientRect();
        const progress = 1 - (rect.top / vh60);
        const opacity = Math.max(0.15, Math.min(1, progress * 1.5));
        word.style.color = `rgba(241, 246, 244, ${opacity})`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="integrations" 
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
        <div data-animate className="mb-8">
          <SectionEyebrow label="INTEGRATIONS" />
        </div>

        {/* Large Scroll-reveal Paragraph */}
        <h2 className="font-body text-[32px] sm:text-[40px] md:text-[48px] leading-[1.25] text-arctic/15 max-w-5xl text-left tracking-tight mb-20 select-none">
          {words.map((word, index) => (
            <span 
              key={index}
              className="reveal-word inline-block mr-[0.25em] transition-colors duration-400 ease-out"
              style={{ color: "rgba(241, 246, 244, 0.15)" }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* 4x3 Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-white/10">
          {LOGOS.map((logo, index) => (
            <div 
              key={index}
              data-animate
              className="group border-r border-b border-white/10 flex flex-col items-center justify-center p-6 h-32 hover:bg-white/[0.02] transition-colors duration-200 cursor-pointer"
              style={{ transitionDelay: `${index * 40}ms` }}
              role="img"
              aria-label={`${logo.name} integration logo`}
            >
              {/* Icon Center Container */}
              <div className="h-10 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-150">
                {logo.svg}
              </div>
              {/* Monospace Tool Label */}
              <span className="font-mono text-[10px] tracking-widest text-mint/75 uppercase group-hover:text-forsythia transition-colors duration-150 mt-3 select-none">
                {logo.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
