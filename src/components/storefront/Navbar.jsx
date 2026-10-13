import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter, Link } from '../../router/Router';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  ShieldCheck,
  Tag,
  ArrowRight
} from 'lucide-react';

export const Navbar = () => {
  const { categories, products, cart, wishlist, setIsCartOpen } = useStore();
  const { currentPath, navigate } = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const categoryDropdownRef = useRef(null);

  // Filter products for live search suggestions
  const searchSuggestions = searchQuery.trim().length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subcategory?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.fabric?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collections/all?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleSelectProduct = (slug) => {
    navigate(`/products/${slug}`);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  return (
    <header className="sticky top-0 z-30 transition-all duration-200">
      <div className="glass-panel border-b border-slate-200/80 bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Left: Mobile Menu Toggle & Brand Logo */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-brand-indigo hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <Link to="/" className="flex items-center gap-3 group">
                {/* Brand Mark Icon */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-violet flex items-center justify-center text-white font-bold text-xl shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                  <span className="font-serif">M</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-extrabold tracking-tight text-brand-navy group-hover:text-brand-indigo transition-colors">
                      MAHALAXMI
                    </span>
                    <span className="text-xs uppercase font-bold tracking-widest text-brand-violet bg-violet-50 px-1.5 py-0.5 rounded border border-violet-100">
                      MILLS
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 tracking-wider uppercase">
                    Direct Mill Rates & Wholesale Essentials
                  </p>
                </div>
              </Link>
            </div>

            {/* Center: Large Clean Search Field with functional suggestions */}
            <div className="hidden md:flex flex-1 max-w-md lg:max-w-lg relative" ref={searchContainerRef}>
              <form onSubmit={handleSearchSubmit} className="w-full relative">
                <input
                  type="text"
                  placeholder="Search pure cotton bedsheets, kitchen towels, microfiber..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 pl-11 pr-10 py-2.5 rounded-full border border-slate-200 focus:border-brand-indigo focus:ring-2 focus:ring-brand-indigo/10 outline-none transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              {/* Live Search Suggestions Dropdown */}
              {isSearchFocused && searchQuery.trim().length > 1 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-premium border border-slate-200 overflow-hidden z-50 animate-fade-in">
                  <div className="p-3 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Products matching "{searchQuery}"</span>
                    <span className="font-semibold text-brand-indigo">{searchSuggestions.length} found</span>
                  </div>
                  {searchSuggestions.length > 0 ? (
                    <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                      {searchSuggestions.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelectProduct(item.slug)}
                          className="flex items-center gap-3 p-3 hover:bg-indigo-50/40 cursor-pointer transition-colors"
                        >
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-800 truncate">{item.name}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <span className="text-brand-violet font-medium">{item.subcategory}</span>
                              <span>•</span>
                              <span className="text-slate-400 line-through">₹{item.mrp}</span>
                              <span className="font-bold text-slate-900">₹{item.price}</span>
                            </div>
                          </div>
                          <span className="text-xs text-brand-indigo font-semibold px-2 py-0.5 bg-indigo-50 rounded">
                            Direct Mill
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-sm text-slate-500">
                      No products matching "{searchQuery}". Try "cotton", "towel", or "linen".
                    </div>
                  )}
                  <div className="p-2.5 bg-slate-50 text-center border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="text-xs font-semibold text-brand-indigo hover:text-brand-violet flex items-center justify-center gap-1 mx-auto"
                    >
                      <span>View all results for "{searchQuery}"</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Actions (Wishlist, Admin Portal, Cart) */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              
              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="relative p-2.5 rounded-full text-slate-700 hover:text-brand-indigo hover:bg-slate-100 transition-colors"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Admin Portal Toggle (Prominently accessible for review & management) */}
              <Link
                to="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-slate-700 hover:text-brand-indigo bg-slate-100 hover:bg-indigo-50 border border-slate-200 transition-colors"
                title="Admin Control Center"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-brand-indigo" />
                <span>Admin Portal</span>
              </Link>

              {/* Shopping Cart Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 p-2.5 sm:px-4 sm:py-2 rounded-xl bg-brand-navy hover:bg-slate-800 text-white shadow-sm transition-all duration-200"
                aria-label="Shopping Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  {totalCartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-brand-indigo text-white text-[10px] font-bold flex items-center justify-center border border-brand-navy">
                      {totalCartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline text-xs font-semibold">
                  Cart {totalCartCount > 0 && `(${totalCartCount})`}
                </span>
              </button>
            </div>
          </div>

          {/* Desktop Navigation Row */}
          <nav className="hidden lg:flex items-center justify-between border-t border-slate-100 py-3 text-sm">
            <div className="flex items-center space-x-8 font-medium text-slate-700">
              <Link
                to="/"
                className="hover:text-brand-indigo transition-colors"
                activeClassName="text-brand-indigo font-semibold"
              >
                Home
              </Link>
              <Link
                to="/collections/all"
                className="hover:text-brand-indigo transition-colors"
                activeClassName="text-brand-indigo font-semibold"
              >
                Shop All
              </Link>

              {/* Categories Dropdown */}
              <div className="relative" ref={categoryDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                  className="flex items-center gap-1 hover:text-brand-indigo transition-colors py-1"
                >
                  <span>Categories</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {isCategoryDropdownOpen && (
                  <div
                    onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                    className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-premium border border-slate-200 py-2 z-50 animate-fade-in"
                  >
                    <div className="px-4 py-2 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Direct Mill Collections
                    </div>
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/collections/${cat.slug}`}
                        onClick={() => setIsCategoryDropdownOpen(false)}
                        className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: cat.accentColor }}
                          />
                          <span className="group-hover:text-brand-indigo transition-colors font-medium">
                            {cat.name}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-indigo group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="#best-sellers"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPath !== '/') {
                    navigate('/#best-sellers');
                  } else {
                    document.getElementById('best-sellers')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="hover:text-brand-indigo transition-colors"
              >
                Best Sellers
              </a>

              <Link
                to="/about"
                className="hover:text-brand-indigo transition-colors"
                activeClassName="text-brand-indigo font-semibold"
              >
                About Us
              </Link>

              <a
                href="#bulk-section"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPath !== '/') {
                    navigate('/#bulk-section');
                  } else {
                    document.getElementById('bulk-section')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-brand-violet hover:text-indigo-700 font-semibold flex items-center gap-1"
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Wholesale & Bulk B2B</span>
              </a>
            </div>

            {/* Direct Mill Guarantee Strip */}
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Direct Mill Quality Tested</span>
              </span>
              <span>•</span>
              <span className="text-slate-600 font-medium">
                Pan-India Express Dispatch
              </span>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-indigo text-white font-bold flex items-center justify-center font-serif">
                    M
                  </div>
                  <span className="font-bold text-brand-navy text-sm">MAHALAXMI ENTERPRISES</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="mt-4 relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 text-sm pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-brand-indigo"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </form>

              {/* Navigation Links */}
              <div className="mt-6 space-y-1">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Home
                </Link>
                <Link
                  to="/collections/all"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Shop All Products
                </Link>

                <div className="pt-2 pb-1 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Categories
                </div>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/collections/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:text-brand-indigo hover:bg-slate-50 rounded-lg"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: cat.accentColor }}
                    />
                    <span>{cat.name}</span>
                  </Link>
                ))}

                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Wishlist ({wishlist.length})
                </Link>
                <Link
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50"
                >
                  About Our Mills
                </Link>
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-semibold text-brand-indigo bg-indigo-50/60 hover:bg-indigo-50"
                >
                  Admin Control Center
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 text-xs text-slate-500">
              <p className="font-semibold text-slate-700 mb-1">Direct Mill Rates & Wholesale Essentials</p>
              <p>Solapur • Coimbatore • Surat</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
