import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter, Link } from '../../router/Router';
import {
  Search, ShoppingBag, Heart, Menu, X,
  LayoutDashboard, ShieldCheck, ArrowRight, User
} from 'lucide-react';

export const Navbar = () => {
  const { categories, products, cart, wishlist, setIsCartOpen } = useStore();
  const { currentPath, navigate } = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  const searchSuggestions = searchQuery.trim().length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subcategory?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
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

  const isActive = (path) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop All', to: '/collections/all' },
    { label: 'Home and Kitchen', to: '/collections/home-and-kitchen' },
    { label: 'Household', to: '/collections/household' },
    { label: 'Textile', to: '/collections/textile' },
    { label: 'Cotton Products', to: '/collections/cotton-products' },
    { label: 'Best Sellers', to: '/collections/all?sort=best-selling' },
    { label: 'About Us', to: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40">
      {/* ── Main Navbar Row ── */}
      <div className="glass-panel border-b border-slate-200/80 bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px] gap-4">

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-brand-indigo hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-violet flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
                <span className="font-serif">M</span>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-[17px] font-extrabold tracking-tight text-brand-navy leading-none group-hover:text-brand-indigo transition-colors">
                    MAHALAXMI
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-brand-violet bg-violet-50 px-1.5 py-0.5 rounded border border-violet-100">
                    MILLS
                  </span>
                </div>
                <p className="text-[10px] font-medium text-slate-400 tracking-wider uppercase mt-0.5">
                  Direct Mill Rates & Wholesale
                </p>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="w-full">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search for towels, bedsheets, cleaning cloths, cotton bags..."
                    value={searchQuery}
                    onChange={e => { setSearchQuery(e.target.value); setIsSearchFocused(true); }}
                    onFocus={() => setIsSearchFocused(true)}
                    className="w-full bg-slate-50 hover:bg-white focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 pl-10 pr-10 py-2.5 rounded-full border border-slate-200 focus:border-brand-indigo focus:ring-2 focus:ring-brand-indigo/15 outline-none transition-all duration-200 shadow-sm"
                  />
                  {searchQuery && (
                    <button type="button" onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </form>

              {/* Search Suggestions Dropdown */}
              {isSearchFocused && searchQuery.trim().length > 1 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-fade-in">
                  <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex justify-between text-xs text-slate-500">
                    <span>Results for "{searchQuery}"</span>
                    <span className="font-semibold text-brand-indigo">{searchSuggestions.length} found</span>
                  </div>
                  {searchSuggestions.length > 0 ? (
                    <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
                      {searchSuggestions.map(item => (
                        <div key={item.id} onClick={() => { navigate(`/products/${item.slug}`); setIsSearchFocused(false); setSearchQuery(''); }}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50/40 cursor-pointer transition-colors">
                          <img src={item.images?.[0]} alt={item.name} className="w-11 h-11 rounded-lg object-cover bg-slate-100 border border-slate-200 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-800 truncate">{item.name}</p>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                              <span className="text-brand-violet font-medium">{item.subcategory}</span>
                              <span>·</span>
                              <span className="text-slate-400 line-through">₹{item.mrp}</span>
                              <span className="font-bold text-slate-800">₹{item.price}</span>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center text-sm text-slate-500">
                      No results for "{searchQuery}"
                    </div>
                  )}
                  <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-center">
                    <button onClick={handleSearchSubmit} className="text-xs font-semibold text-brand-indigo hover:text-brand-violet flex items-center gap-1 mx-auto">
                      <span>View all results for "{searchQuery}"</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-1.5">
              {/* Wishlist */}
              <Link to="/wishlist" title="Wishlist"
                className="relative p-2.5 rounded-full text-slate-600 hover:text-rose-500 hover:bg-rose-50 transition-all duration-200">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-badge-pop">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Admin */}
              <Link to="/admin" title="Admin"
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-slate-600 hover:text-brand-indigo bg-slate-100 hover:bg-indigo-50 border border-slate-200/80 transition-all duration-200">
                <LayoutDashboard className="w-3.5 h-3.5 text-brand-indigo" />
                <span>Admin</span>
              </Link>

              {/* Cart */}
              <button type="button" onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-slate-800 text-white shadow-sm hover:shadow-md transition-all duration-200 group">
                <div className="relative">
                  <ShoppingBag className="w-4.5 h-4.5 text-amber-400 w-[18px] h-[18px]" />
                  {totalCartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-brand-indigo text-white text-[9px] font-bold flex items-center justify-center border-2 border-brand-navy animate-cart-bounce">
                      {totalCartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline text-xs font-bold">
                  Cart {totalCartCount > 0 && `(${totalCartCount})`}
                </span>
              </button>
            </div>
          </div>

          {/* ── Desktop Nav Links Row ── */}
          <nav className="hidden lg:flex items-center gap-6 border-t border-slate-100 py-2.5 text-[13px] font-semibold overflow-x-auto scrollbar-none">
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`whitespace-nowrap transition-colors duration-150 pb-0.5 border-b-2 ${
                  isActive(to)
                    ? 'text-brand-indigo border-brand-indigo'
                    : 'text-slate-600 hover:text-brand-indigo border-transparent hover:border-brand-indigo/40'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="ml-auto flex items-center gap-1.5 text-xs text-slate-500 flex-shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-slate-600 font-medium">Quality Verified</span>
              <span className="text-slate-300">•</span>
              <span>Pan-India Express Dispatch</span>
            </div>
          </nav>
        </div>
      </div>

      {/* ── Mobile Menu Drawer ── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm animate-overlay-in"
            onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 max-w-[320px] w-full bg-white shadow-2xl flex flex-col animate-slide-left overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-indigo to-brand-violet text-white font-bold flex items-center justify-center font-serif text-base">M</div>
                <span className="font-extrabold text-brand-navy text-sm tracking-tight">MAHALAXMI MILLS</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="px-5 pt-4 pb-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input type="text" placeholder="Search products..."
                  value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 text-sm pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-indigo transition-colors" />
              </div>
            </form>

            {/* Nav Links */}
            <div className="flex-1 px-3 py-2 space-y-0.5">
              {navLinks.map(({ label, to }) => (
                <Link key={to} to={to} onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive(to) ? 'bg-indigo-50 text-brand-indigo' : 'text-slate-700 hover:bg-slate-50'
                  }`}>
                  {label}
                </Link>
              ))}
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-brand-indigo bg-indigo-50 hover:bg-indigo-100 transition-colors mt-2">
                <LayoutDashboard className="w-4 h-4" />
                Admin Dashboard
              </Link>
            </div>

            <div className="px-5 py-4 border-t border-slate-100 text-xs text-slate-500">
              <p className="font-semibold text-slate-700 mb-0.5">Direct Mill Rates & Wholesale Essentials</p>
              <p>Solapur • Coimbatore • Surat</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
