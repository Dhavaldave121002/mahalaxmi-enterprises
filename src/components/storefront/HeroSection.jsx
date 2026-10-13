import React, { useState, useEffect, useCallback } from 'react';
import { useStore } from '../../context/StoreContext';
import { Link } from '../../router/Router';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1400&q=80',
    badge: 'New Collection 2026',
    headline: ['Everyday Essentials.', 'Better Quality.', 'Direct Mill Rates.'],
    sub: 'Discover thoughtfully selected textiles, cotton essentials and household products for your home and business.',
    primaryCta: { label: 'Explore Collections', to: '/collections/all' },
    secondaryCta: { label: 'Shop Best Sellers', anchor: 'best-sellers' },
    overlayLabel: 'Loom Certified Quality',
    overlayTitle: 'Authentic Cotton Weaves & Household Essentials',
    overlayDesc: 'Direct from accredited textile clusters of Maharashtra & Tamil Nadu',
  },
  {
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80',
    badge: 'Wholesale & Bulk',
    headline: ['Pan-India Sourcing.', 'Zero Middlemen.', 'Guaranteed Savings.'],
    sub: 'Institutional buyers, homestays and retail chains trust our direct mill pricing for unmatched quality at scale.',
    primaryCta: { label: 'View Wholesale Rates', to: '/collections/all' },
    secondaryCta: { label: 'Explore Categories', anchor: 'categories' },
    overlayLabel: 'Institutional Pricing',
    overlayTitle: 'Bulk Orders Starting ₹999 — Free Shipping',
    overlayDesc: 'Verified GSM, yarn count & fabric specifications on every SKU',
  },
  {
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=80',
    badge: 'Cotton Products',
    headline: ['Pure Cotton.', 'Combed & Certified.', 'Mill Direct Price.'],
    sub: 'From bath towels to bedsheets — 100% combed cotton products at prices direct from the loom.',
    primaryCta: { label: 'Shop Cotton Products', to: '/collections/cotton-products' },
    secondaryCta: { label: 'View All Categories', anchor: 'categories' },
    overlayLabel: '100% Combed Cotton',
    overlayTitle: 'Soft, Absorbent & Long-Lasting Textiles',
    overlayDesc: 'Oeko-Tex certified. Suitable for home, hotel & hospitality',
  },
];

const TRUST_PILLS = [
  { icon: CheckCircle2, label: 'Zero Middlemen Markups', color: 'text-emerald-600' },
  { icon: CheckCircle2, label: 'Verified Mill GSM & Fabric Count', color: 'text-emerald-600' },
  { icon: CheckCircle2, label: 'Transparent Tier Pricing', color: 'text-emerald-600' },
];

export const HeroSection = () => {
  const { homepageConfig } = useStore();
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((idx) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(idx);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((current + 1) % SLIDES.length);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200/60">

      {/* ── Ambient glow ── */}
      <div className="absolute top-0 right-1/3 -z-10 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-80 h-80 bg-amber-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* ── Left: Text Content ── */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">

            {/* Badge */}
            <div key={`badge-${current}`} className="animate-badge-pop inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-brand-indigo animate-pulse-soft" />
              <span>{slide.badge}</span>
              <span className="text-slate-300">|</span>
              <span className="text-brand-indigo font-bold">Pan-India Direct Sourcing</span>
            </div>

            {/* Headline */}
            <div key={`headline-${current}`} className="animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-brand-navy tracking-tight leading-[1.1]">
                <span className="block">{slide.headline[0]}</span>
                <span className="block bg-gradient-to-r from-brand-indigo via-indigo-500 to-brand-violet bg-clip-text text-transparent">
                  {slide.headline[1]}
                </span>
                <span className="block text-slate-800">{slide.headline[2]}</span>
              </h1>
            </div>

            {/* Supporting text */}
            <p key={`sub-${current}`} className="animate-fade-in-up text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed" style={{animationDelay:'0.08s'}}>
              {slide.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to={slide.primaryCta.to}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-indigo hover:bg-brand-indigo-hover text-white font-bold text-sm shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <span>{slide.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`#${slide.secondaryCta.anchor}`}
                onClick={e => { e.preventDefault(); document.getElementById(slide.secondaryCta.anchor)?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 hover:border-slate-300 shadow-sm transition-all duration-200"
              >
                {slide.secondaryCta.label}
              </a>
            </div>

            {/* Trust pills */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-5 text-xs text-slate-500">
              {TRUST_PILLS.map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-1.5 font-medium">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${color}`} />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* Carousel dot navigation */}
            <div className="flex items-center gap-2 pt-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-400 ${
                    i === current
                      ? 'w-8 bg-brand-indigo'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ── Right: Image Carousel Frame ── */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* Main Photo Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100 aspect-[4/5] group">
                <img
                  key={`img-${current}`}
                  src={slide.image}
                  alt={slide.overlayTitle}
                  className="w-full h-full object-cover object-center hero-slide-enter"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                {/* Image Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-block px-2.5 py-1 rounded bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase mb-2 border border-white/20">
                    {slide.overlayLabel}
                  </div>
                  <h3 className="text-xl font-bold font-serif leading-snug">{slide.overlayTitle}</h3>
                  <p className="text-xs text-slate-200 mt-1">{slide.overlayDesc}</p>
                </div>

                {/* Prev Arrow */}
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white flex items-center justify-center transition-all border border-white/20 hover:scale-110"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Next Arrow */}
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white flex items-center justify-center transition-all border border-white/20 hover:scale-110"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Slide counter */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-md text-white text-[11px] font-bold">
                  {current + 1} / {SLIDES.length}
                </div>
              </div>

              {/* Floating Badge — Top Left */}
              <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 bg-white rounded-xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3 animate-fade-in-up">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Purity Standard</p>
                  <p className="text-xs font-bold text-slate-900">100% Combed Cotton</p>
                </div>
              </div>

              {/* Floating Badge — Bottom Right */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 bg-white rounded-xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3 animate-fade-in-up" style={{animationDelay:'0.15s'}}>
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-brand-indigo flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Institutional Rates</p>
                  <p className="text-xs font-bold text-brand-indigo">Up to 35% Bulk Off</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
