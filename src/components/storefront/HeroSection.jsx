import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, Link } from '../../router/Router';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=85',
    badge: 'NEW COLLECTION 2026 | PAN-INDIA DIRECT SOURCING',
    headline: ['Everyday Essentials.', 'Better Quality.', 'Direct Mill Rates.'],
    sub: 'Discover thoughtfully selected textiles, cotton essentials and household products for your home and business.',
    primaryCta: { label: 'Explore Collections', to: '/collections/all' },
    secondaryCta: { label: 'Shop Best Sellers', to: '/collections/all?sort=best-selling' },
    floatingBadge: { title: 'PURITY STANDARD', subtitle: '100% Combed Cotton' }
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=85',
    badge: 'LUXURY TEXTILE WEAVES | MASTER LOOM SOURCED',
    headline: ['Hotel Quality Bedsheets.', 'Satin Weaves.', 'Direct Mill Prices.'],
    sub: 'Experience 400 thread-count breathability, direct from certified Solapur and Coimbatore weaving clusters.',
    primaryCta: { label: 'Explore Textiles', to: '/collections/textile' },
    secondaryCta: { label: 'Bulk Bed Linen', to: '/#bulk-section' },
    floatingBadge: { title: 'THREAD COUNT CERTIFIED', subtitle: '400 TC Satin Weave' }
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=85',
    badge: 'CULINARY & HOUSEHOLD | LINT-FREE ESSENTIALS',
    headline: ['Kitchen & Utility Linens.', 'Maximum Absorbency.', 'Wholesale Ready.'],
    sub: 'Waffle-weave dish towels, dense cleaning microfibers and heavy cotton aprons built for daily heavy duty.',
    primaryCta: { label: 'Explore Kitchen Linens', to: '/collections/home-and-kitchen' },
    secondaryCta: { label: 'View Household', to: '/collections/household' },
    floatingBadge: { title: 'QUICK-DRY WAFFLE', subtitle: 'Honeycomb Structure' }
  }
];

const TRUST_POINTS = [
  'Zero Middlemen Markups',
  'Verified Mill GSM & Fabric Count',
  'Transparent Tier Pricing'
];

export const HeroSection = () => {
  const { navigate } = useRouter();
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % SLIDES.length);
  }, []);

  // Auto advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="relative bg-[#FAFAF9] border-b border-slate-200/70 overflow-hidden py-10 sm:py-14 lg:py-18">
      {/* Ambient background blur */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ── Left Column: Headline, Subtitle, CTA, Trust Points ── */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-[11px] sm:text-xs font-bold text-slate-800 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <span>{slide.badge}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                <span className="block">{slide.headline[0]}</span>
                <span className="block bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  {slide.headline[1]}
                </span>
                <span className="block text-slate-900">{slide.headline[2]}</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
              {slide.sub}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to={slide.primaryCta.to}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition-all duration-200 group"
              >
                <span>{slide.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to={slide.secondaryCta.to}
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-2xs transition-colors"
              >
                <span>{slide.secondaryCta.label}</span>
              </Link>
            </div>

            {/* Trust Points */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 border-t border-slate-200/60 text-xs font-semibold text-slate-600">
              {TRUST_POINTS.map((pt, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

          </div>

          {/* ── Right Column: Framed Carousel Image with Controls & Badge ── */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-xl aspect-[4/3] sm:aspect-[16/11]">
              
              {/* Slides */}
              {SLIDES.map((s, idx) => (
                <div
                  key={s.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={s.image}
                    alt={s.headline[0]}
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                </div>
              ))}

              {/* Top-Right Floating Slide Badge */}
              <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-xs px-3.5 py-2 rounded-xl shadow-md border border-slate-200/80 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-800 leading-none">
                    {slide.floatingBadge.title}
                  </p>
                  <p className="text-[9.5px] font-medium text-slate-500 mt-0.5 leading-none">
                    {slide.floatingBadge.subtitle}
                  </p>
                </div>
              </div>

              {/* Bottom Carousel Controls: Prev, Next, Counter */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
                
                {/* 1/3 Counter badge */}
                <div className="bg-slate-900/80 backdrop-blur-xs text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                  <span>{current + 1}</span>
                  <span className="text-slate-400 mx-1">/</span>
                  <span className="text-slate-400">{SLIDES.length}</span>
                </div>

                {/* Dots indicator */}
                <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-xs px-2.5 py-1.5 rounded-full">
                  {SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrent(idx)}
                      className={`transition-all duration-200 rounded-full cursor-pointer ${
                        idx === current
                          ? 'w-4 h-1.5 bg-amber-400'
                          : 'w-1.5 h-1.5 bg-white/70 hover:bg-white'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Prev / Next circular buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    className="w-9 h-9 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="w-9 h-9 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-700" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
