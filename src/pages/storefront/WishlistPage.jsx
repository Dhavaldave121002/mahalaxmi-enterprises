import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter, Link } from '../../router/Router';
import { Navbar } from '../../components/storefront/Navbar';
import { AnnouncementBar } from '../../components/storefront/AnnouncementBar';
import { Footer } from '../../components/storefront/Footer';
import { CartDrawer } from '../../components/storefront/CartDrawer';
import { ProductCard } from '../../components/storefront/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';

export const WishlistPage = () => {
  const { wishlist } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-navy">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-rose-600 mb-1">
                <Heart className="w-5 h-5 fill-rose-600" />
                <span className="text-xs font-bold uppercase tracking-wider">Saved For Later</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
                My Direct Mill Wishlist ({wishlist.length})
              </h1>
            </div>

            <Link
              to="/collections/all"
              className="text-xs font-bold text-brand-indigo hover:underline flex items-center gap-1"
            >
              <span>Explore More Items</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {wishlist.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Your wishlist is empty</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Save your favorite cotton towels, bedsheets, or microfiber bundles by clicking the heart icon on any product card.
              </p>
              <Link
                to="/collections/all"
                className="inline-block px-5 py-2.5 bg-brand-indigo text-white text-xs font-bold rounded-xl hover:bg-brand-indigo-hover transition-colors shadow-sm"
              >
                Start Exploring
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};
