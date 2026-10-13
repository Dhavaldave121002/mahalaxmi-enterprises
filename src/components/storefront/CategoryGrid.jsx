import React from 'react';
import { useRouter, Link } from '../../router/Router';
import { ArrowRight, Home, Sparkles, Layers, Flower2 } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'home-and-kitchen',
    slug: 'home-and-kitchen',
    name: 'Home and Kitchen',
    subtitle: 'Kitchen Towels, Aprons & Table Linen',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    icon: Home,
    iconBg: 'bg-amber-500 text-white',
    footerBg: 'bg-amber-50/70 border-amber-200/90',
    cardBorder: 'border-amber-200 hover:border-amber-400',
    arrowColor: 'text-amber-700',
  },
  {
    id: 'household',
    slug: 'household',
    name: 'Household',
    subtitle: 'Cleaning Cloths, Storage & Laundry',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80',
    icon: Sparkles,
    iconBg: 'bg-emerald-600 text-white',
    footerBg: 'bg-emerald-50/70 border-emerald-200/90',
    cardBorder: 'border-emerald-200 hover:border-emerald-400',
    arrowColor: 'text-emerald-700',
  },
  {
    id: 'textile',
    slug: 'textile',
    name: 'Textile',
    subtitle: 'Bedsheets, Curtains & Premium Fabrics',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    icon: Layers,
    iconBg: 'bg-blue-600 text-white',
    footerBg: 'bg-blue-50/70 border-blue-200/90',
    cardBorder: 'border-blue-200 hover:border-blue-400',
    arrowColor: 'text-blue-700',
  },
  {
    id: 'cotton-products',
    slug: 'cotton-products',
    name: 'Cotton Products',
    subtitle: 'Pure Cotton Towels, Bags & Mill Goods',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    icon: Flower2,
    iconBg: 'bg-purple-600 text-white',
    footerBg: 'bg-purple-50/70 border-purple-200/90',
    cardBorder: 'border-purple-200 hover:border-purple-400',
    arrowColor: 'text-purple-700',
  },
];

export const CategoryGrid = () => {
  const { navigate } = useRouter();

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Shop by Category
          </h2>
          <Link
            to="/collections/all"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => navigate(`/collections/${cat.slug}`)}
                className={`group rounded-2xl overflow-hidden bg-white border ${cat.cardBorder} shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer`}
              >
                {/* Photo frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Bottom Footer Bar */}
                <div className={`p-3.5 border-t ${cat.footerBg} flex items-center justify-between gap-3`}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-full ${cat.iconBg} flex items-center justify-center flex-shrink-0 shadow-xs`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-slate-900 truncate">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 truncate">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-white shadow-xs border border-slate-200/70 flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform">
                    <ArrowRight className={`w-3.5 h-3.5 ${cat.arrowColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
