import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter, Link } from '../../router/Router';
import { Navbar } from '../../components/storefront/Navbar';
import { AnnouncementBar } from '../../components/storefront/AnnouncementBar';
import { Footer } from '../../components/storefront/Footer';
import { CartDrawer } from '../../components/storefront/CartDrawer';
import { ProductCard } from '../../components/storefront/ProductCard';
import {
  Search,
  Filter,
  SlidersHorizontal,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Tag
} from 'lucide-react';

export const ShopAllPage = () => {
  const { categories, products } = useStore();
  const { currentPath } = useRouter();

  // Parse URL search params if present
  const getInitialSearch = () => {
    try {
      const url = new URL(window.location.href);
      return url.searchParams.get('search') || '';
    } catch (e) {
      return '';
    }
  };

  const [search, setSearch] = useState(getInitialSearch);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(2500);
  const [stockOnly, setStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [visibleCount, setVisibleCount] = useState(12);

  // Sync with URL query when it changes
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const query = url.searchParams.get('search');
      if (query !== null) {
        setSearch(query);
      }
    } catch (e) {}
  }, [currentPath]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.subcategory?.toLowerCase().includes(q) ||
          p.fabric?.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.categoryId === selectedCategory);
    }

    // Max Price
    list = list.filter((p) => p.price <= priceRange);

    // In stock
    if (stockOnly) {
      list = list.filter((p) => p.stock > 0);
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'best-selling') {
      list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || (b.reviewCount || 0) - (a.reviewCount || 0));
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, search, selectedCategory, priceRange, stockOnly, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setPriceRange(2500);
    setStockOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-navy">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        {/* Editorial Catalog Header */}
        <div className="bg-white border-b border-slate-200 py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-3">
              <Link to="/" className="hover:text-brand-indigo transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-800 font-semibold">Shop All Collections</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
                  Complete Mill Catalog
                </h1>
                <p className="text-sm text-slate-500 mt-1 max-w-xl">
                  Everyday kitchen linens, heavy microfiber packs, Solapur cotton bedsheets, and raw mill goods with transparent tier pricing.
                </p>
              </div>

              {/* Search Bar */}
              <div className="w-full md:w-80 relative">
                <input
                  type="text"
                  placeholder="Filter by keyword or fabric..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:bg-white focus:border-brand-indigo outline-none"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills Header */}
        <div className="bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex-shrink-0">
              Categories:
            </span>
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'All'
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              All Products ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-brand-indigo text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat.name} ({products.filter((p) => p.categoryId === cat.id).length})
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Filter Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-sm text-brand-navy">
                    <SlidersHorizontal className="w-4 h-4 text-brand-indigo" />
                    <span>Catalog Filters</span>
                  </div>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-[11px] text-slate-400 hover:text-brand-indigo flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>

                {/* Price Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Max Mill Price
                    </h4>
                    <span className="text-xs font-extrabold text-brand-indigo">
                      ₹{priceRange}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="2500"
                    step="50"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-brand-indigo cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>₹200</span>
                    <span>₹2,500</span>
                  </div>
                </div>

                {/* In Stock Only */}
                <div className="pt-4 border-t border-slate-100">
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={stockOnly}
                      onChange={(e) => setStockOnly(e.target.checked)}
                      className="rounded text-brand-indigo focus:ring-brand-indigo"
                    />
                    <span>Available In-Stock Only</span>
                  </label>
                </div>

                {/* Bulk Banner info */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-950">
                  <p className="font-bold flex items-center gap-1.5 text-amber-800">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Bulk Wholesale Orders</span>
                  </p>
                  <p className="text-[11px] text-amber-900/80 mt-1 leading-snug">
                    Quantities of 10+ automatically receive up to 35% tier discount at cart!
                  </p>
                </div>
              </div>
            </div>

            {/* Right Product Grid */}
            <div className="lg:col-span-3">
              
              {/* Sort & Count Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200 gap-3">
                <p className="text-xs sm:text-sm text-slate-500">
                  Showing <span className="font-bold text-slate-900">{displayedProducts.length}</span> of{' '}
                  <span className="font-bold text-slate-900">{filteredProducts.length}</span> items
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-slate-200 text-xs font-semibold text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-brand-indigo shadow-subtle cursor-pointer"
                  >
                    <option value="featured">Featured / Loom Selection</option>
                    <option value="best-selling">Best Selling</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Product Name (A-Z)</option>
                  </select>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Filter className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">
                    No products found
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    We couldn't find any products matching your search criteria. Try clearing search filters.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-5 py-2.5 bg-brand-indigo text-white text-xs font-bold rounded-xl hover:bg-brand-indigo-hover transition-colors shadow-sm"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {displayedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {visibleCount < filteredProducts.length && (
                    <div className="mt-10 text-center">
                      <button
                        type="button"
                        onClick={() => setVisibleCount((prev) => prev + 6)}
                        className="px-6 py-3 bg-white border border-slate-300 hover:border-slate-400 rounded-xl text-xs font-bold text-slate-800 shadow-sm transition-all"
                      >
                        Load More Products ({filteredProducts.length - visibleCount} remaining)
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};
