import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter, Link } from '../../router/Router';
import { Navbar } from '../../components/storefront/Navbar';
import { AnnouncementBar } from '../../components/storefront/AnnouncementBar';
import { Footer } from '../../components/storefront/Footer';
import { CartDrawer } from '../../components/storefront/CartDrawer';
import { ProductCard } from '../../components/storefront/ProductCard';
import {
  ChevronRight,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  Filter,
  Check,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const CategoryPage = ({ categorySlug }) => {
  const { categories, products } = useStore();
  const { navigate } = useRouter();

  // Find category
  const currentCategory = categories.find((c) => c.slug === categorySlug) || categories[0];

  // Filters State
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [priceRange, setPriceRange] = useState(2500);
  const [stockOnly, setStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'best-selling', 'price-low', 'price-high', 'name'
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => p.categoryId === currentCategory.id);

    // Subcategory filter
    if (selectedSubcategory !== 'All') {
      result = result.filter((p) => p.subcategory === selectedSubcategory);
    }

    // Price range
    result = result.filter((p) => p.price <= priceRange);

    // In stock only
    if (stockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'best-selling') {
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || (b.reviewCount || 0) - (a.reviewCount || 0));
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, currentCategory, selectedSubcategory, priceRange, stockOnly, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const resetFilters = () => {
    setSelectedSubcategory('All');
    setPriceRange(2500);
    setStockOnly(false);
    setSortBy('featured');
  };

  const accentColor = currentCategory.accentColor || '#4F46E5';

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-navy">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        {/* Category Header Banner */}
        <div className="relative bg-brand-navy text-white overflow-hidden py-12 sm:py-16">
          <div className="absolute inset-0 z-0 opacity-25">
            <img
              src={currentCategory.bannerImage || currentCategory.image}
              alt={currentCategory.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-transparent z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <Link to="/collections/all" className="hover:text-white transition-colors">Collections</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-white font-semibold">{currentCategory.name}</span>
            </nav>

            <div className="max-w-2xl">
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white mb-3"
                style={{ backgroundColor: accentColor }}
              >
                Direct Mill Collection
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {currentCategory.name}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
                {currentCategory.description}
              </p>
            </div>
          </div>
        </div>

        {/* Subcategory Pills Row */}
        {currentCategory.subcategories && currentCategory.subcategories.length > 0 && (
          <div className="bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex-shrink-0">
                Subcategories:
              </span>
              <button
                type="button"
                onClick={() => setSelectedSubcategory('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSubcategory === 'All'
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All ({products.filter((p) => p.categoryId === currentCategory.id).length})
              </button>
              {currentCategory.subcategories.map((sub, idx) => {
                const subCount = products.filter(
                  (p) => p.categoryId === currentCategory.id && p.subcategory === sub
                ).length;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedSubcategory === sub
                        ? 'bg-brand-indigo text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {sub} ({subCount})
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Content Area: Sidebar + Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          
          {/* Controls Bar: Count, Mobile Trigger, Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm"
              >
                <Filter className="w-3.5 h-3.5 text-brand-indigo" />
                <span>Filters</span>
              </button>
              <p className="text-xs sm:text-sm text-slate-500">
                Showing <span className="font-bold text-slate-900">{displayedProducts.length}</span> of{' '}
                <span className="font-bold text-slate-900">{filteredProducts.length}</span> items
              </p>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 text-xs font-semibold text-slate-800 rounded-lg px-3 py-2 outline-none focus:border-brand-indigo shadow-subtle cursor-pointer"
              >
                <option value="featured">Featured / Mill Curated</option>
                <option value="best-selling">Best Selling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Product Name (A-Z)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Desktop Filters Sidebar (1 col) */}
            <div className="hidden lg:block lg:col-span-1 space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-subtle space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 font-bold text-sm text-brand-navy">
                    <SlidersHorizontal className="w-4 h-4 text-brand-indigo" />
                    <span>Filter Products</span>
                  </div>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-[11px] text-slate-400 hover:text-brand-indigo flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>

                {/* Subcategory Filter */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                    Subcategory
                  </h4>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer">
                      <input
                        type="radio"
                        name="subcat"
                        checked={selectedSubcategory === 'All'}
                        onChange={() => setSelectedSubcategory('All')}
                        className="text-brand-indigo focus:ring-brand-indigo"
                      />
                      <span>All Subcategories</span>
                    </label>
                    {currentCategory.subcategories?.map((sub, idx) => (
                      <label key={idx} className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer">
                        <input
                          type="radio"
                          name="subcat"
                          checked={selectedSubcategory === sub}
                          onChange={() => setSelectedSubcategory(sub)}
                          className="text-brand-indigo focus:ring-brand-indigo"
                        />
                        <span>{sub}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Slider */}
                <div className="pt-4 border-t border-slate-100">
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

                {/* Availability Checkbox */}
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                    Availability
                  </h4>
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={stockOnly}
                      onChange={(e) => setStockOnly(e.target.checked)}
                      className="rounded text-brand-indigo focus:ring-brand-indigo"
                    />
                    <span>In-Stock Items Only</span>
                  </label>
                </div>

                {/* Sourcing Guarantee Badge */}
                <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100/70 text-xs text-indigo-950 space-y-1">
                  <p className="font-bold flex items-center gap-1.5 text-brand-indigo">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Direct Mill Guarantee</span>
                  </p>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Transparent tier discounts automatically apply when ordering carton lots.
                  </p>
                </div>
              </div>
            </div>

            {/* Product Grid Area (3 cols on lg) */}
            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                /* Empty state design */
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Filter className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">
                    No products match your active filters
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try adjusting your maximum price range or selecting another subcategory to view available mill inventory.
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

                  {/* Load More / Pagination */}
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

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto max-w-xs w-full bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <span className="font-bold text-sm text-slate-900">Filters</span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Subcategories */}
              <div className="py-4 border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 mb-2">Subcategory</h4>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSubcategory('All')}
                    className={`block w-full text-left text-xs px-2.5 py-1.5 rounded-lg ${
                      selectedSubcategory === 'All' ? 'bg-indigo-50 text-brand-indigo font-bold' : 'text-slate-600'
                    }`}
                  >
                    All
                  </button>
                  {currentCategory.subcategories?.map((sub, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSubcategory(sub)}
                      className={`block w-full text-left text-xs px-2.5 py-1.5 rounded-lg ${
                        selectedSubcategory === sub ? 'bg-indigo-50 text-brand-indigo font-bold' : 'text-slate-600'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div className="py-4 border-b border-slate-100">
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-bold text-slate-700">Max Price</span>
                  <span className="font-extrabold text-brand-indigo">₹{priceRange}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="2500"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-brand-indigo"
                />
              </div>

              {/* In stock */}
              <div className="py-4">
                <label className="flex items-center gap-2 text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={stockOnly}
                    onChange={(e) => setStockOnly(e.target.checked)}
                    className="rounded text-brand-indigo"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex gap-2">
              <button
                type="button"
                onClick={resetFilters}
                className="flex-1 py-2.5 text-xs font-bold border border-slate-300 rounded-xl text-slate-700"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 text-xs font-bold bg-brand-indigo text-white rounded-xl"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <CartDrawer />
    </div>
  );
};
