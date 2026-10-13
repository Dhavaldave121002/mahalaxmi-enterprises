import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter, Link } from '../../router/Router';
import { ProductCard } from './ProductCard';
import { ArrowRight, Flame } from 'lucide-react';

export const CuratedBestSellers = () => {
  const { products } = useStore();
  const { navigate } = useRouter();

  // Curated 4-8 best-selling products only
  const bestSellers = products
    .filter((p) => p.isBestSeller || p.isFeatured)
    .slice(0, 6);

  if (bestSellers.length === 0) return null;

  return (
    <section id="best-sellers" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>Direct Mill Proven Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
              Curated Best Sellers
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Our highest volume essential items, preferred by household managers, boutique homestays, and institutional buyers alike.
            </p>
          </div>

          <Link
            to="/collections/all?sort=best-selling"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-indigo hover:text-brand-indigo-hover group self-start md:self-auto"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Curated Grid of 4-6 products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Banner Prompt */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-500">
            Showing curated selections from our 100+ master loom catalog. Need specific yarn counts or custom dyeing?
          </p>
          <a
            href="#bulk-section"
            className="inline-block mt-2 text-xs font-bold text-brand-indigo hover:text-brand-violet underline underline-offset-4"
          >
            Contact B2B Institutional Sourcing Team
          </a>
        </div>

      </div>
    </section>
  );
};
