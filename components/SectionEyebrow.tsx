import React from "react";

interface SectionEyebrowProps {
  label: string;
}

export default function SectionEyebrow({ label }: SectionEyebrowProps) {
  return (
    <div className="flex items-center gap-3 font-display font-bold text-xs tracking-[0.15em] uppercase text-current select-none mb-4">
      <svg
        viewBox="0 0 24 16"
        className="w-6 h-4 stroke-current fill-none opacity-80 shrink-0"
        role="img"
        aria-hidden="true"
      >
        <title>Hatching graphic</title>
        {/* 3 parallel diagonal lines (135°), 8px spacing, 1.5px stroke */}
        <line x1="2" y1="0" x2="14" y2="12" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="9" y1="0" x2="21" y2="12" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="0" x2="28" y2="12" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span>{label}</span>
    </div>
  );
}
