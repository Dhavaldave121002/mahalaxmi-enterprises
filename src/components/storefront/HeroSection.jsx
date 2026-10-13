import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter, Link } from '../../router/Router';
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const HeroSection = () => {
  const { homepageConfig } = useStore();
  const { navigate } = useRouter();
  const hero = homepageConfig?.hero;

  const headline = hero?.headline || "Everyday Essentials. Better Quality. Direct Mill Rates.";
  const supportingText = hero?.supportingText || "Discover thoughtfully selected textiles, cotton essentials and household products for your home and business.";
  const primaryCta = hero?.primaryCtaText || "Explore Collections";
  const secondaryCta = hero?.secondaryCtaText || "Shop Best Sellers";
  const trustLabel = hero?.trustLabel || "Wholesale & Retail";
  const bannerImage = hero?.bannerImage || "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1400&q=80";

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200/60 pt-6 pb-12 sm:pt-10 sm:pb-16 lg:py-20">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-brand-lightIndigo/60 rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 w-80 h-80 bg-amber-50/70 rounded-full blur-2xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Brand Headline & CTA (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Subtle Trust Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-brand-indigo animate-pulse" />
              <span>{trustLabel}</span>
              <span className="text-slate-300">|</span>
              <span className="text-brand-indigo font-bold">Pan-India Direct Sourcing</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-navy tracking-tight leading-[1.12]">
              Everyday Essentials. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-indigo via-indigo-600 to-brand-violet bg-clip-text text-transparent">
                Better Quality.
              </span> <br />
              <span className="text-slate-800">Direct Mill Rates.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
              {supportingText}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/collections/all"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-brand-indigo hover:bg-brand-indigo-hover text-white font-semibold text-sm shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30 transition-all duration-200 gap-2 group"
              >
                <span>{primaryCta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#best-sellers"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('best-sellers')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm border border-slate-200/80 transition-colors"
              >
                <span>{secondaryCta}</span>
              </a>
            </div>

            {/* Micro value highlights */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Zero Middlemen Markups</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Verified Mill GSM & Fabric Count</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Transparent Tier Pricing</span>
              </div>
            </div>

          </div>

          {/* Right Column: High Quality Product Imagery Editorial Composition (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Photo Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100 aspect-[4/5] group">
                <img
                  src={bannerImage}
                  alt="Premium Direct Mill Textiles & Essentials"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                
                {/* Image Overlay Label */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-block px-2.5 py-1 rounded bg-white/20 backdrop-blur-md text-[11px] font-semibold tracking-wider uppercase mb-2 border border-white/20">
                    Loom Certified Quality
                  </div>
                  <h3 className="text-xl font-bold font-serif leading-snug">
                    Authentic Cotton Weaves & Household Essentials
                  </h3>
                  <p className="text-xs text-slate-200 mt-1">
                    Direct from accredited textile clusters of Maharashtra & Tamil Nadu
                  </p>
                </div>
              </div>

              {/* Floating Verified Mill Badge */}
              <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 bg-white rounded-xl p-3.5 shadow-premium border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Purity Standard</p>
                  <p className="text-xs font-bold text-slate-900">100% Combed Cotton</p>
                </div>
              </div>

              {/* Floating Tier Pricing Pill */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 bg-white rounded-xl p-3.5 shadow-premium border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-brand-indigo flex items-center justify-center font-bold">
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
