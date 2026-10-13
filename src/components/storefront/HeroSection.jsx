import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from '../../router/Router';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    image: '/images/hero_towels.jpg',
    title: 'Luxury Combed Cotton Towels & Bath Linens',
    subtitle: 'Direct Mill Rates • 100% Ring-Spun Cotton • Pan-India Loom Dispatch',
    link: '/collections/cotton-products'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=1920&q=85',
    title: 'Hotel Quality Woven Linens & Spa Essentials',
    subtitle: 'High Absorbency Weaves • Direct from Accredited Mills',
    link: '/collections/home-and-kitchen'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1920&q=85',
    title: 'Premium Bedsheets & Satin Weaves',
    subtitle: '400 Thread Count Breathability • Zero Middlemen Markups',
    link: '/collections/textile'
  }
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

  // Auto rotate every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full bg-slate-100 overflow-hidden">
      {/* ── Full-Width Panoramic Carousel Banner matching reference photo ── */}
      <div className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[560px]">
        {SLIDES.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out cursor-pointer ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              onClick={() => navigate(slide.link)}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
              />
              {/* Subtle vignette for edge contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
            </div>
          );
        })}

        {/* ── Left Navigation Arrow Button ── */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
        </button>

        {/* ── Right Navigation Arrow Button ── */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
        </button>

        {/* ── Carousel Dot Indicators at Bottom Center ── */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/25 backdrop-blur-xs px-3.5 py-1.5 rounded-full">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => { e.stopPropagation(); setCurrent(idx); }}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === current
                  ? 'w-4 h-2 bg-amber-400'
                  : 'w-2 h-2 bg-white/70 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
