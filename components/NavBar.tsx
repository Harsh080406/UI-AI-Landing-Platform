"use client";

import React, { useState, useEffect } from "react";

const MENU_ITEMS = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#features" },
  { label: "Integrations", href: "#integrations" },
  { label: "Statistics", href: "#statistics" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Product Build", href: "#product-builder" },
  { label: "Dashboard", href: "#dashboard" },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      } else if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 350);
  };

  const handleDesktopLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0D0D0D]/80 border-b border-white/5 py-4 transition-layout">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          
          {/* Logo - Left */}
          <a
            href="#"
            className="flex items-center gap-2 font-display font-extrabold text-2xl text-arctic tracking-tight transition-micro hover:opacity-90 focus-visible:outline-none shrink-0"
            aria-label="AXON Home"
          >
            {/* Slanted Lightning Bolt Logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-6 h-6 fill-current text-white shrink-0"
              role="img"
              aria-hidden="true"
            >
              <path d="M19 2L5 17h8L8 30l19-15h-9z" />
            </svg>
            <span className="font-display uppercase tracking-tight">AXON</span>
          </a>

          {/* Horizontal Navigation Links - Center (Desktop Only) */}
          <nav 
            className="hidden lg:flex items-center gap-8" 
            aria-label="Desktop Navigation"
          >
            {MENU_ITEMS.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => handleDesktopLinkClick(e, item.href)}
                className="group font-body text-[11px] font-semibold text-mint/70 hover:text-forsythia transition-colors uppercase tracking-widest relative py-1.5 focus-visible:outline-none"
              >
                <span>{item.label}</span>
                {/* Clean micro-interaction underline */}
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-forsythia transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </a>
            ))}
          </nav>

          {/* Call to Action Button - Right (Desktop Only) */}
          <div className="hidden lg:flex items-center shrink-0">
            <a
              href="#product-builder"
              className="bg-white/10 hover:bg-white text-arctic hover:text-noir border border-white/10 hover:border-transparent font-body font-bold text-[10px] uppercase tracking-wider px-5 py-2.5 rounded transition-colors duration-250 focus-visible:outline-none"
            >
              Build Now
            </a>
          </div>

          {/* Hamburger Icon - Right (Mobile Only) */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-arctic hover:text-forsythia transition-micro p-2 focus-visible:outline-none shrink-0"
            aria-label="Open Navigation Menu"
          >
            {/* Hamburger ≡ Icon */}
            <svg
              className="w-8 h-8 fill-current"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
            >
              <title>Menu</title>
              <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
          </button>

        </div>
      </header>

      {/* Fullscreen Menu Overlay (Mobile Only) */}
      <div
        className={`fixed inset-0 z-50 bg-[#172B36]/98 transition-all duration-300 flex flex-col items-center justify-center ${
          isOpen 
            ? "opacity-100 scale-100 pointer-events-auto" 
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-8 text-arctic hover:text-forsythia transition-micro p-3 focus-visible:outline-none"
          aria-label="Close Navigation Menu"
        >
          <svg
            className="w-8 h-8 stroke-current fill-none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            role="img"
            aria-hidden="true"
          >
            <title>Close</title>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Vertically Stacked Links */}
        <nav 
          className={`flex flex-col items-center space-y-6 transition-opacity ${
            isOpen ? "opacity-100 duration-300" : "opacity-0 duration-150"
          }`}
          aria-label="Mobile Navigation"
        >
          {MENU_ITEMS.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden py-1"
            >
              <a
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="inline-block font-display text-4xl sm:text-5xl font-extrabold text-arctic hover:text-forsythia focus-visible:outline-none transition-transform duration-500 ease-out"
                style={{
                  transform: isOpen ? "translateY(0)" : "translateY(50px)",
                  transitionDelay: isOpen ? `${index * 60}ms` : "0ms",
                  opacity: isOpen ? 1 : 0,
                  transitionProperty: "transform, opacity",
                }}
              >
                {item.label}
              </a>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
