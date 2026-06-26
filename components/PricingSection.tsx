"use client";

import React, { useRef, useState, useEffect } from "react";
import { PRICING_MATRIX, computePrice } from "@/lib/pricingMatrix";
import SectionEyebrow from "./SectionEyebrow";

// Custom Dropdown Component declared outside to prevent parent re-renders on open/close
interface CurrencyDropdownProps {
  onChange: (value: "USD" | "INR" | "EUR") => void;
  defaultValue: "USD" | "INR" | "EUR";
}

function CurrencyDropdown({ onChange, defaultValue }: CurrencyDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<"USD" | "INR" | "EUR">(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (val: "USD" | "INR" | "EUR") => {
    setValue(val);
    setIsOpen(false);
    onChange(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const options = [
    { code: "USD", label: "USD ($)" },
    { code: "INR", label: "INR (₹)" },
    { code: "EUR", label: "EUR (€)" },
  ] as const;

  const selectedOption = options.find((opt) => opt.code === value);

  return (
    <div 
      ref={dropdownRef} 
      className="relative inline-block text-left"
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-6 bg-nocturnal/60 border border-white/20 hover:border-forsythia/80 text-forsythia font-display font-bold text-xs uppercase tracking-wider rounded-lg px-4 py-2.5 pr-10 focus-visible:outline-none transition-colors duration-150 cursor-pointer select-none"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select pricing currency"
      >
        <span>{selectedOption?.label}</span>
        <svg 
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forsythia transition-transform duration-200 pointer-events-none ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth="2"
          role="img"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute left-0 mt-1.5 w-[140px] rounded-lg bg-[#0d161a] border border-white/15 shadow-2xl p-1 z-30 overflow-hidden select-none"
          role="listbox"
          style={{ animation: "fadeIn 150ms ease-out" }}
        >
          {options.map((opt) => {
            const isSelected = opt.code === value;
            return (
              <button
                key={opt.code}
                type="button"
                onClick={() => handleSelect(opt.code)}
                role="option"
                aria-selected={isSelected}
                className={`w-full text-left px-3 py-2 text-[10px] font-display font-bold tracking-wider uppercase rounded-md transition-colors duration-100 ${
                  isSelected 
                    ? "bg-forsythia text-noir" 
                    : "text-mint/70 bg-transparent hover:text-forsythia hover:bg-white/5 focus-visible:outline-none"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Embedded CSS fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

export default function PricingSection() {
  // 1. Plain refs to store state - never trigger React re-renders
  const billingRef = useRef<"monthly" | "annual">("monthly");
  const currencyRef = useRef<"USD" | "INR" | "EUR">("USD");

  // 2. Refs for manual DOM text updates
  const starterPriceRef = useRef<HTMLSpanElement | null>(null);
  const proPriceRef = useRef<HTMLSpanElement | null>(null);
  const scalePriceRef = useRef<HTMLSpanElement | null>(null);

  // 3. Refs for manual toggle button styling updates
  const monthlyBtnRef = useRef<HTMLButtonElement | null>(null);
  const annualBtnRef = useRef<HTMLButtonElement | null>(null);

  // Function to manually update the DOM text nodes with new computed prices
  const updatePrices = () => {
    const billing = billingRef.current;
    const currency = currencyRef.current;

    if (starterPriceRef.current) {
      starterPriceRef.current.textContent = computePrice("starter", billing, currency);
    }
    if (proPriceRef.current) {
      proPriceRef.current.textContent = computePrice("pro", billing, currency);
    }
    if (scalePriceRef.current) {
      scalePriceRef.current.textContent = computePrice("scale", billing, currency);
    }
  };

  // Handler for billing cycle switch (direct DOM manipulation)
  const handleBillingChange = (mode: "monthly" | "annual") => {
    if (billingRef.current === mode) return;
    billingRef.current = mode;
    
    updatePrices();

    // Directly update button classes to reflect active/inactive state without re-rendering
    if (mode === "monthly") {
      if (monthlyBtnRef.current) {
        monthlyBtnRef.current.classList.add("bg-forsythia", "text-noir");
        monthlyBtnRef.current.classList.remove("text-arctic");
      }
      if (annualBtnRef.current) {
        annualBtnRef.current.classList.remove("bg-forsythia", "text-noir");
        annualBtnRef.current.classList.add("text-arctic");
      }
    } else {
      if (monthlyBtnRef.current) {
        monthlyBtnRef.current.classList.remove("bg-forsythia", "text-noir");
        monthlyBtnRef.current.classList.add("text-arctic");
      }
      if (annualBtnRef.current) {
        annualBtnRef.current.classList.add("bg-forsythia", "text-noir");
        annualBtnRef.current.classList.remove("text-arctic");
      }
    }
  };

  // Handler for currency dropdown change (direct DOM manipulation)
  const handleCurrencyChange = (val: "USD" | "INR" | "EUR") => {
    currencyRef.current = val;
    updatePrices();
  };

  return (
    <section 
      id="pricing" 
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
          <SectionEyebrow label="PRICING" />
        </div>

        {/* Header Column */}
        <div className="text-left max-w-3xl mb-16" data-animate data-delay="1">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-arctic tracking-tight mb-4">
            Scale from Starter to Global Grid
          </h2>
          <p className="font-body text-base text-mint/70">
            Choose a plan that matches your pipeline scale. Update currencies and billing cycles instantly with zero latency.
          </p>
        </div>

        {/* Pricing Controls */}
        <div 
          data-animate
          data-delay="2"
          className="flex flex-col sm:flex-row items-center justify-start gap-6 mb-16"
        >
          {/* Billing Switcher Button Group */}
          <div className="bg-nocturnal/40 border border-white/10 rounded-lg p-1 flex items-center select-none">
            <button
              ref={monthlyBtnRef}
              type="button"
              className="px-5 py-2 rounded-md font-display font-bold text-xs uppercase tracking-wider transition-micro bg-forsythia text-noir focus-visible:outline-none"
              onClick={() => handleBillingChange("monthly")}
            >
              Monthly
            </button>
            <button
              ref={annualBtnRef}
              type="button"
              className="px-5 py-2 rounded-md font-display font-bold text-xs uppercase tracking-wider transition-micro text-arctic hover:text-forsythia/85 focus-visible:outline-none"
              onClick={() => handleBillingChange("annual")}
            >
              Annual <span className="text-[9px] text-saffron ml-1 bg-saffron/10 px-1.5 py-0.5 rounded border border-saffron/20">Save 20%</span>
            </button>
          </div>

          {/* Currency Dropdown Select */}
          <div className="flex items-center gap-3">
            <span className="font-body text-xs text-mint/60 uppercase font-semibold tracking-wider select-none">
              Currency:
            </span>
            <CurrencyDropdown 
              onChange={handleCurrencyChange} 
              defaultValue="USD" 
            />
          </div>
        </div>

        {/* 3 Tier Cards Side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Starter */}
          <div 
            data-animate
            data-delay="1"
            className="bg-nocturnal/20 border-t-4 border-t-forsythia/50 border-x border-b border-white/5 rounded-xl p-8 flex flex-col justify-between relative hover:-translate-y-1 transition-micro"
          >
            <div>
              <span className="font-display font-semibold text-xs tracking-widest text-mint/40 uppercase block mb-2">
                {PRICING_MATRIX.tiers.starter.label}
              </span>
              <div className="flex items-baseline gap-1.5 mb-6 select-none">
                <span 
                  ref={starterPriceRef} 
                  className="font-display font-bold text-5xl sm:text-6xl text-forsythia"
                >
                  $29.00
                </span>
                <span className="font-body text-xs text-mint/50">/month</span>
              </div>
              <p className="font-body text-sm text-mint/70 mb-8 border-b border-white/10 pb-6 leading-relaxed">
                Perfect for developers building side projects and orchestrating basic pipelines.
              </p>
              
              <ul className="space-y-4 mb-8" aria-label="Starter Features">
                {PRICING_MATRIX.tiers.starter.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 font-body text-sm text-mint/80">
                    <svg className="w-4 h-4 text-forsythia shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#pricing"
              className="w-full inline-flex items-center justify-center py-3 border border-forsythia text-forsythia font-display font-semibold text-xs tracking-widest uppercase rounded-[6px] hover:bg-forsythia/5 transition-micro focus-visible:outline-none"
            >
              Get Starter
            </a>
          </div>

          {/* Card 2: Pro (Most Popular, Glowing) */}
          <div 
            data-animate
            data-delay="2"
            className="bg-nocturnal/20 border-2 border-forsythia rounded-xl p-8 flex flex-col justify-between relative hover:-translate-y-1 transition-micro shadow-[0_0_30px_rgba(255,200,1,0.12)]"
          >
            {/* "Most Popular" Badge */}
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-gradient-flame text-noir font-display font-bold text-[9px] tracking-widest uppercase px-3 py-1 rounded-full border border-noir/20">
              Most Popular
            </div>

            <div>
              <span className="font-display font-semibold text-xs tracking-widest text-forsythia uppercase block mb-2">
                {PRICING_MATRIX.tiers.pro.label}
              </span>
              <div className="flex items-baseline gap-1.5 mb-6 select-none">
                <span 
                  ref={proPriceRef} 
                  className="font-display font-bold text-5xl sm:text-6xl text-forsythia"
                >
                  $79.00
                </span>
                <span className="font-body text-xs text-mint/50">/month</span>
              </div>
              <p className="font-body text-sm text-mint/70 mb-8 border-b border-white/10 pb-6 leading-relaxed">
                Tailored for high-growth engineering teams seeking production pipelines and API access.
              </p>
              
              <ul className="space-y-4 mb-8" aria-label="Pro Features">
                {PRICING_MATRIX.tiers.pro.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 font-body text-sm text-mint/80">
                    <svg className="w-4 h-4 text-forsythia shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#pricing"
              className="w-full inline-flex items-center justify-center py-3 bg-gradient-flame text-noir font-display font-semibold text-xs tracking-widest uppercase rounded-[6px] hover:scale-[1.01] transition-micro focus-visible:outline-none"
            >
              Get Pro
            </a>
          </div>

          {/* Card 3: Scale */}
          <div 
            data-animate
            data-delay="3"
            className="bg-nocturnal/20 border-t-4 border-t-forsythia/50 border-x border-b border-white/5 rounded-xl p-8 flex flex-col justify-between relative hover:-translate-y-1 transition-micro"
          >
            <div>
              <span className="font-display font-semibold text-xs tracking-widest text-mint/40 uppercase block mb-2">
                {PRICING_MATRIX.tiers.scale.label}
              </span>
              <div className="flex items-baseline gap-1.5 mb-6 select-none">
                <span 
                  ref={scalePriceRef} 
                  className="font-display font-bold text-5xl sm:text-6xl text-forsythia"
                >
                  $199.00
                </span>
                <span className="font-body text-xs text-mint/50">/month</span>
              </div>
              <p className="font-body text-sm text-mint/70 mb-8 border-b border-white/10 pb-6 leading-relaxed">
                Built for enterprise operations requiring multi-region grid deploys and dedicated SLA.
              </p>
              
              <ul className="space-y-4 mb-8" aria-label="Scale Features">
                {PRICING_MATRIX.tiers.scale.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 font-body text-sm text-mint/80">
                    <svg className="w-4 h-4 text-forsythia shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#pricing"
              className="w-full inline-flex items-center justify-center py-3 border border-forsythia text-forsythia font-display font-semibold text-xs tracking-widest uppercase rounded-[6px] hover:bg-forsythia/5 transition-micro focus-visible:outline-none"
            >
              Get Scale
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
