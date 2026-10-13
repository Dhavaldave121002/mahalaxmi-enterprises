import React from 'react';
import { Tag, ShieldCheck, Building2, Truck } from 'lucide-react';

export const TrustValueStrip = () => {
  const benefits = [
    {
      icon: Tag,
      title: "Direct Mill Rates",
      description: "Direct loom sourcing without middle distributor markups.",
      color: "text-amber-600 bg-amber-50"
    },
    {
      icon: ShieldCheck,
      title: "Quality-Focused Products",
      description: "Tested yarn counts, verified GSM, and reinforced hems.",
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      icon: Building2,
      title: "Wholesale & Retail",
      description: "Order single packs or bulk commercial carton batches.",
      color: "text-brand-indigo bg-indigo-50"
    },
    {
      icon: Truck,
      title: "Convenient Shopping",
      description: "Prompt Pan-India doorstep delivery with live parcel tracking.",
      color: "text-brand-violet bg-purple-50"
    }
  ];

  return (
    <section className="py-8 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200/80 shadow-subtle hover:border-slate-300 transition-colors"
              >
                <div className={`p-2.5 rounded-lg flex-shrink-0 ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {item.description}
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
