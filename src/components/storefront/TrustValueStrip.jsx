import React from 'react';
import { Factory, BadgeCheck, Package, ShoppingBag } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: Factory,
    label: 'Direct Mill Rates',
    sub: 'Best prices from loom',
    color: 'text-brand-indigo',
    bg: 'bg-indigo-50',
  },
  {
    icon: BadgeCheck,
    label: 'Quality Focused',
    sub: 'Verified textile products',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Package,
    label: 'Wholesale & Retail',
    sub: 'Safe & secure packaging',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: ShoppingBag,
    label: 'Convenient Shopping',
    sub: 'Easy returns & exchange',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
];

export const TrustValueStrip = () => {
  return (
    <section className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100">
          {TRUST_ITEMS.map(({ icon: Icon, label, sub, color, bg }) => (
            <div key={label} className="flex items-center gap-3 px-4 sm:px-6 py-4 sm:py-5 hover:bg-slate-50/60 transition-colors group">
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                <Icon className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${color}`} style={{ width: '18px', height: '18px' }} />
              </div>
              <div>
                <p className="text-xs sm:text-[13px] font-bold text-slate-800 leading-tight">{label}</p>
                <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
