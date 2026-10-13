import React from 'react';
import { Navbar } from '../../components/storefront/Navbar';
import { AnnouncementBar } from '../../components/storefront/AnnouncementBar';
import { Footer } from '../../components/storefront/Footer';
import { CartDrawer } from '../../components/storefront/CartDrawer';
import { Link } from '../../router/Router';
import { ShieldCheck, Award, Factory, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-navy">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        {/* Hero banner */}
        <div className="bg-brand-navy text-white py-16 sm:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
              MAHALAXMI ENTERPRISES PROVENANCE
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight">
              Direct Mill Craftsmanship & Wholesale Integrity
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl leading-relaxed">
              Eliminating layers of middlemen to bring certified ring-spun cotton textiles, institutional linens, and heavy household essentials directly from the loom.
            </p>
          </div>
        </div>

        {/* Narrative & Values */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Rooted in India's Premier Textile Belts
              </h2>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Founded to address the steep markup that families and institutions routinely pay for household linens, Mahalaxmi Enterprises works directly with long-standing weaving clusters in Solapur, Coimbatore, and Surat.
              </p>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                By bypassing multi-tier regional stockists, packaging distributors, and marketing middlemen, we pass pure production economics directly to our consumers and bulk institutional buyers.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-premium aspect-[4/3] bg-slate-100 border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80"
                alt="Weaving Looms"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-brand-indigo flex items-center justify-center">
                <Factory className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Direct From Mill</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Direct loom dispatch eliminates 35-45% intermediary trade commissions, providing unmatched value.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Verified Purity</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                True 550 GSM density, combed long-staple yarns, and reinforced stitch selvedges guaranteed on every batch.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-brand-violet flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Dual Retail & B2B</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Whether you need 2 sets for your home or 500 units for a boutique resort, transparent pricing applies.
              </p>
            </div>
          </div>

          {/* Call to action */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white text-center space-y-4">
            <h3 className="text-2xl font-bold">Discover the Direct Mill Difference</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Explore our current stock ready for dispatch across kitchen linens, cleaning microfibers, bedsheets, and raw cotton rolls.
            </p>
            <div className="pt-2">
              <Link
                to="/collections/all"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-indigo text-white rounded-xl text-xs font-bold hover:bg-brand-indigo-hover shadow-md transition-all"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};
