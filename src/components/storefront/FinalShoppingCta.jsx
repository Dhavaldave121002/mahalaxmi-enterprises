import React from 'react';
import { useRouter, Link } from '../../router/Router';
import { ArrowRight, ShoppingBag, CheckCircle } from 'lucide-react';

export const FinalShoppingCta = () => {
  return (
    <section className="py-16 sm:py-20 bg-brand-lightIndigo/50 border-b border-indigo-100/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-indigo-200 text-xs font-bold uppercase tracking-wider text-brand-indigo mb-4 shadow-subtle">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Ready to Experience Direct Mill Essentials?</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight max-w-2xl mx-auto">
          Equip Your Home or Enterprise with Premium Textiles Today
        </h2>

        <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-xl mx-auto">
          Explore complete collections across Kitchen, Household, Cotton Towels, and Pure Cotton Linen with direct transparent rates.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            to="/collections/all"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-brand-indigo hover:bg-brand-indigo-hover text-white font-bold text-sm shadow-md shadow-indigo-600/20 hover:shadow-lg transition-all duration-200 gap-2 group"
          >
            <span>Explore All Collections</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/collections/textile"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 shadow-subtle transition-colors"
          >
            <span>Shop Pure Cotton Bedsheets</span>
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Free Shipping Above ₹999</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Cash on Delivery & Instant UPI</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>7-Day Quality Replacement Guarantee</span>
          </span>
        </div>

      </div>
    </section>
  );
};
