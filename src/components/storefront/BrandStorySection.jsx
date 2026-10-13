import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter, Link } from '../../router/Router';
import { ShieldCheck, Award, Factory, ArrowRight } from 'lucide-react';

export const BrandStorySection = () => {
  const { homepageConfig } = useStore();
  const story = homepageConfig?.brandStory;

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Imagery Left (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-premium border border-slate-200 aspect-[4/5] bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1000&q=80"
                alt="Direct Loom Craftsmanship and Quality Assurance"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                  Origin Heritage
                </p>
                <p className="text-sm font-medium mt-1 text-slate-100">
                  Loom Hubs in Solapur, Coimbatore & Surat
                </p>
              </div>
            </div>

            {/* Floating Mill Verification Card */}
            <div className="absolute -bottom-5 -right-5 sm:-bottom-6 sm:-right-6 bg-white p-4 rounded-xl shadow-premium border border-slate-200/80 max-w-xs hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-brand-indigo flex items-center justify-center flex-shrink-0">
                <Factory className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900">Direct From Source</p>
                <p className="text-[11px] text-slate-500">Zero middle traders or hidden re-packing costs</p>
              </div>
            </div>
          </div>

          {/* Text Content Right (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 text-brand-violet border border-violet-100 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>{story?.badge || "Direct Mill Craftsmanship"}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy tracking-tight leading-snug">
              {story?.heading || "Bridging Loom Craftsmanship to Modern Indian Homes & Enterprises"}
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              {story?.text || "Founded on the bedrock of fair pricing, Mahalaxmi Enterprises sources directly from master textile hubs in Solapur, Coimbatore, and Surat. Every kitchen napkin, microfiber duster, and cotton bedsheet meets strict density, absorbency, and tensile standards."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Uncompromised GSM</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We don't shave grams off our weave. Our 550 GSM towels and 300 TC bedsheets provide genuine hotel longevity.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1">
                  <Factory className="w-4 h-4 text-brand-indigo" />
                  <span>Direct Loom Margins</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Customers pay for premium cotton fibers and careful stitching, never for expensive distributor channels.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-indigo hover:text-brand-indigo-hover group"
              >
                <span>Read our full sourcing and mill heritage story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
