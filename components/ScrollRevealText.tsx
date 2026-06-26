"use client";

import React, { useEffect, useRef } from "react";
import SectionEyebrow from "./SectionEyebrow";

const PARAGRAPH = "Integrate with the world's most powerful data engines. Seamlessly connect your custom workflows to real-time pipelines and neural processors for unmatched precision. Build automations that don't just process — they adapt.";

export default function ScrollRevealText() {
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
        // Calculate reveal progress based on where the word is in relation to the top 60% of viewport
        const progress = 1 - (rect.top / vh60);
        // Map progress to an opacity value between 0.15 and 1.0
        const opacity = Math.max(0.15, Math.min(1, progress * 1.5));
        word.style.color = `rgba(241, 246, 244, ${opacity})`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialize immediately on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="llm-integrate" 
      className="zone-dark py-32 relative overflow-hidden"
    >
      {/* Reusable diagonal lines grid overlay */}
      <div className="section-grid-overlay">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Reusable hatch eyebrow */}
        <div data-animate>
          <SectionEyebrow label="LLM INTEGRATE" />
        </div>

        {/* 4 Circular Icon Pills - Staggered slide in from left */}
        <div className="flex items-center gap-4 mb-12">
          {/* Pill 1 */}
          <div 
            data-animate 
            data-delay="1" 
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-noir/40 slide-left"
          >
            <svg className="w-5 h-5 stroke-arctic" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795H14l1.818-5.705L6.818 15.3H9.81z" />
            </svg>
          </div>

          {/* Pill 2 */}
          <div 
            data-animate 
            data-delay="2" 
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-noir/40 slide-left"
          >
            <svg className="w-5 h-5 stroke-arctic" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
            </svg>
          </div>

          {/* Pill 3 */}
          <div 
            data-animate 
            data-delay="3" 
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-noir/40 slide-left"
          >
            <svg className="w-5 h-5 stroke-arctic" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7C4.798 9.547 4.75 10.768 4.75 12s.048 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.092-1.209.138-2.43.138-3.662z" />
            </svg>
          </div>

          {/* Pill 4 */}
          <div 
            data-animate 
            data-delay="4" 
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-noir/40 slide-left"
          >
            <svg className="w-5 h-5 stroke-arctic" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.004 9.004 0 018.716 2.253M12 3a9.004 9.004 0 00-8.716 2.253" />
            </svg>
          </div>
        </div>

        {/* Large Paragraph with Scroll-driven color reveal */}
        <h2 className="font-body text-[32px] sm:text-[40px] md:text-[48px] leading-[1.25] text-arctic/15 max-w-5xl text-left tracking-tight select-none">
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

      </div>

      {/* Self-contained style block for slide-in animation */}
      <style jsx global>{`
        [data-animate].slide-left {
          opacity: 0;
          transform: translateX(-20px);
          transition: transform 500ms cubic-bezier(0.25, 0, 0, 1), opacity 500ms cubic-bezier(0.25, 0, 0, 1);
        }
        [data-animate].slide-left.is-visible {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </section>
  );
}
