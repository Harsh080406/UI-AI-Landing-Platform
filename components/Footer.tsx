"use client";

import React from "react";
import SectionEyebrow from "./SectionEyebrow";

export default function Footer() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-[#0D0D0D] text-arctic pt-24 pb-12 relative overflow-hidden">
      {/* Global Column Grid Overlay */}
      <div className="section-grid-overlay">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Newsletter Section Above Footer */}
        <div className="border-b border-white/10 pb-16 mb-20">
          <div className="max-w-2xl">
            {/* Hatch Eyebrow */}
            <div data-animate className="mb-4">
              <SectionEyebrow label="AI SYSTEMS" />
            </div>
            
            {/* 40px Heading */}
            <h3 
              data-animate
              data-delay="1"
              className="font-display font-bold text-3xl sm:text-[40px] leading-tight tracking-tight text-arctic mb-8"
            >
              Get system status updates.
            </h3>

            {/* Email Input Row */}
            <form 
              onSubmit={handleSubmit} 
              data-animate
              data-delay="2"
              className="w-full relative flex items-center border border-white/30 hover:border-white/50 focus-within:border-forsythia rounded-md overflow-hidden transition-colors"
            >
              <input
                type="email"
                required
                placeholder="Enter your engineering email..."
                className="w-full bg-transparent px-5 py-4 text-sm text-arctic placeholder-arctic/40 focus:outline-none pr-[140px]"
                aria-label="Engineering Email Address"
              />
              {/* Flush Right Submit Button */}
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-5 bg-forsythia text-noir font-display font-bold text-xs uppercase tracking-wider rounded transition-button hover:bg-saffron focus-visible:outline-none select-none"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* 3 Link Columns + Brand Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10 relative z-10">
          
          {/* Brand Info */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <a 
              href="#" 
              className="flex items-center gap-2 font-display font-extrabold text-xl tracking-tight text-arctic focus-visible:outline-none"
              aria-label="AXON Home"
            >
              {/* Slanted Lightning Bolt Logo */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current text-white shrink-0"
                role="img"
                aria-hidden="true"
              >
                <path d="M19 2L5 17h8L8 30l19-15h-9z" />
              </svg>
              <span className="font-display uppercase tracking-tight">AXON</span>
            </a>
            <p className="font-body text-xs text-mint/50 max-w-sm leading-relaxed">
              A high-throughput enterprise AI agent and workflow automation platform. Scale your intelligence with AXON.
            </p>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            
            {/* Col 1: Platform */}
            <div className="flex flex-col space-y-3">
              <span className="font-display font-bold text-[10px] tracking-widest uppercase text-saffron">
                Platform
              </span>
              <ul className="space-y-2" aria-label="Platform links">
                <li><a href="#features" className="font-body text-xs text-mint/60 hover:text-forsythia transition-micro focus-visible:outline-none">Features</a></li>
                <li><a href="#product-builder" className="font-body text-xs text-mint/60 hover:text-forsythia transition-micro focus-visible:outline-none">Builder</a></li>
                <li><a href="#dashboard" className="font-body text-xs text-mint/60 hover:text-forsythia transition-micro focus-visible:outline-none">Dashboard</a></li>
                <li><a href="#pricing" className="font-body text-xs text-mint/60 hover:text-forsythia transition-micro focus-visible:outline-none">Pricing</a></li>
              </ul>
            </div>

            {/* Col 2: Devs */}
            <div className="flex flex-col space-y-3">
              <span className="font-display font-bold text-[10px] tracking-widest uppercase text-saffron">
                Developers
              </span>
              <ul className="space-y-2" aria-label="Developer links">
                <li><a href="#" className="font-body text-xs text-mint/60 hover:text-forsythia transition-micro focus-visible:outline-none">Documentation</a></li>
                <li><a href="#" className="font-body text-xs text-mint/60 hover:text-forsythia transition-micro focus-visible:outline-none">API Status</a></li>
                <li><a href="#" className="font-body text-xs text-mint/60 hover:text-forsythia transition-micro focus-visible:outline-none">Changelog</a></li>
                <li><a href="#" className="font-body text-xs text-mint/60 hover:text-forsythia transition-micro focus-visible:outline-none">System SLA</a></li>
              </ul>
            </div>

            {/* Col 3: Company */}
            <div className="flex flex-col space-y-3">
              <span className="font-display font-bold text-[10px] tracking-widest uppercase text-saffron">
                Company
              </span>
              <ul className="space-y-2" aria-label="Company links">
                <li><a href="#" className="font-body text-xs text-mint/60 hover:text-forsythia transition-micro focus-visible:outline-none">About Us</a></li>
                <li><a href="#" className="font-body text-xs text-mint/60 hover:text-forsythia transition-micro focus-visible:outline-none">Careers</a></li>
                <li><a href="#" className="font-body text-xs text-mint/60 hover:text-forsythia transition-micro focus-visible:outline-none">Blog</a></li>
                <li><a href="#" className="font-body text-xs text-mint/60 hover:text-forsythia transition-micro focus-visible:outline-none">Press Kit</a></li>
              </ul>
            </div>

            {/* Col 4: Socials */}
            <div className="flex flex-col space-y-3">
              <span className="font-display font-bold text-[10px] tracking-widest uppercase text-saffron">
                Connect
              </span>
              <ul className="space-y-2" aria-label="Social media connections">
                <li><a href="#" className="font-body text-xs text-mint/60 hover:text-forsythia transition-micro focus-visible:outline-none">GitHub</a></li>
                <li><a href="#" className="font-body text-xs text-mint/60 hover:text-forsythia transition-micro focus-visible:outline-none">Twitter / X</a></li>
                <li><a href="#" className="font-body text-xs text-mint/60 hover:text-forsythia transition-micro focus-visible:outline-none">Discord</a></li>
                <li><a href="#" className="font-body text-xs text-mint/60 hover:text-forsythia transition-micro focus-visible:outline-none">LinkedIn</a></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 pb-20 gap-4 relative z-10">
          <span className="font-body text-[11px] text-mint/40">
            © {new Date().getFullYear()} AXON Technologies Inc. All rights reserved.
          </span>
          <div className="flex gap-4 text-[11px] font-body text-mint/40">
            <a href="#" className="hover:text-forsythia transition-micro">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-forsythia transition-micro">Terms of Service</a>
          </div>
        </div>

      </div>

      {/* Signature Brand Lockup (Uppercase 'AXON', naturally cropped) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 select-none pointer-events-none z-0 overflow-hidden w-full text-center leading-none">
        <span 
          className="font-display font-extrabold text-[18vw] sm:text-[320px] tracking-[-0.04em] block transform translate-y-16 select-none uppercase"
          style={{ color: "var(--color-arctic)", opacity: 0.03 }}
        >
          AXON
        </span>
      </div>
    </footer>
  );
}
