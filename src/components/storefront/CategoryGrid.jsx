import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter, Link } from '../../router/Router';
import { ArrowRight, Layers } from 'lucide-react';

export const CategoryGrid = () => {
  const { categories, products } = useStore();
  const { navigate } = useRouter();

  // Color mapping to ensure exact hex requirement
  const categoryAccentColors = {
    'home-and-kitchen': '#F59E0B',
    'household': '#10B981',
    'textile': '#3B82F6',
    'cotton-products': '#8B5CF6'
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-indigo mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Direct Mill Categories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
              Curated Wholesale & Retail Collections
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Select a specialized category to browse direct loom rates, technical specifications, and tier volumes.
            </p>
          </div>
          <Link
            to="/collections/all"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-indigo hover:text-brand-indigo-hover group self-start md:self-auto"
          >
            <span>Browse Complete Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Premium Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((cat) => {
            const count = products.filter((p) => p.categoryId === cat.id).length;
            const accent = categoryAccentColors[cat.id] || cat.accentColor || '#4F46E5';

            return (
              <div
                key={cat.id}
                onClick={() => navigate(`/collections/${cat.slug}`)}
                className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-subtle hover:shadow-premium hover:border-slate-300 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Category Photography Frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Category Accent Indicator Top-Right */}
                  <div
                    className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-sm"
                    style={{ backgroundColor: accent }}
                  >
                    {count} {count === 1 ? 'Product' : 'Products'}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Subcategories preview */}
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {cat.subcategories?.slice(0, 2).map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                        >
                          {sub}
                        </span>
                      ))}
                      {cat.subcategories?.length > 2 && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">
                          +{cat.subcategories.length - 2}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-indigo transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Explore Collection Link CTA */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                    <span style={{ color: accent }}>Explore Collection</span>
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1"
                      style={{ backgroundColor: `${accent}15`, color: accent }}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Top accent border line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: accent }}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
