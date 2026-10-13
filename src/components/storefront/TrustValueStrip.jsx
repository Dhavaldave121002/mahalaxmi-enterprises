import React from 'react';
import { Factory, ShieldCheck, Truck, ShoppingBag } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: Factory,
    title: 'Direct Mill Rates',
    desc: 'Quality products at best prices',
    iconBg: 'bg-indigo-50 border-indigo-100 text-indigo-600',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Focused',
    desc: 'Trusted for everyday essentials',
    iconBg: 'bg-purple-50 border-purple-100 text-purple-600',
  },
  {
    icon: Truck,
    title: 'Wholesale & Retail',
    desc: 'For home and business needs',
    iconBg: 'bg-blue-50 border-blue-100 text-blue-600',
  },
  {
    icon: ShoppingBag,
    title: 'Easy Shopping',
    desc: 'Safe and convenient experience',
    iconBg: 'bg-purple-50 border-purple-100 text-purple-600',
  },
];

export const TrustValueStrip = () => {
  return (
    <section className="bg-white border-b border-slate-200/70 py-6 sm:py-8 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-slate-200">
          {TRUST_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 px-3 lg:px-6"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${item.iconBg}`}>
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
