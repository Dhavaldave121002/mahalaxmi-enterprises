import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter, Link } from '../../router/Router';
import {
  Search, ShoppingCart, Heart, Menu, X,
  User, ChevronRight
} from 'lucide-react';

export const LotusLogo = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Central petal */}
    <path d="M32 8 C30 19, 25 35, 32 46 C39 35, 34 19, 32 8 Z" fill="#F59E0B" fillOpacity="0.16" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Left inner petal */}
    <path d="M32 46 C23 41, 16 28, 22 17 C26 25, 29 36, 32 46 Z" fill="#F59E0B" fillOpacity="0.1" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Right inner petal */}
    <path d="M32 46 C41 41, 48 28, 42 17 C38 25, 35 36, 32 46 Z" fill="#F59E0B" fillOpacity="0.1" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Left outer petal */}
    <path d="M32 46 C17 45, 8 33, 13 25 C16 32, 23 41, 32 46 Z" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    {/* Right outer petal */}
    <path d="M32 46 C47 45, 56 33, 51 25 C48 32, 41 41, 32 46 Z" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    {/* Base petals and ripples */}
    <path d="M16 47 C23 52, 41 52, 48 47" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 52 C26 55, 38 55, 42 52" stroke="#D97706" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const Navbar = () => {
  const { products, cart, wishlist, setIsCartOpen } = useStore();
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
  const totalWishlistCount = wishlist.length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collections/all?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
      setIsMobileMenuOpen(false);
    }
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

  const isCurrentActive = (path) => {
    if (path === '/') return currentPath === '/' || currentPath === '';
    return currentPath === path || currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* ── Main Navbar Row ── */}
      <div className="border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[76px] gap-4 lg:gap-8">

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <LotusLogo className="w-9 h-9 sm:w-11 sm:h-11 transition-transform group-hover:scale-105 duration-200" />
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
                  Mahalaxmi Enterprises
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.16em] text-indigo-600 uppercase mt-0.5">
                  DIRECT MILL RATES &amp; WHOLESALE ESSENTIALS
                </span>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="w-full relative">
                <input
                  type="text"
                  placeholder="Search for towels, bedsheets, cleaning cloths, cotton bags..."
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setIsSearchFocused(true); }}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full bg-[#F8FAFC] hover:bg-white focus:bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 pl-5 pr-12 py-2.5 rounded-full border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 outline-none transition-all duration-200 shadow-inner"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-colors shadow-sm"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* Suggestions dropdown */}
              {isSearchFocused && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in-up">
                  <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Product Matches
                  </div>
                  {searchSuggestions.map((prod) => (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => {
                        navigate(`/products/${prod.slug}`);
                        setIsSearchFocused(false);
                      }}
                      className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images?.[0]}
                          alt={prod.name}
                          className="w-8 h-8 rounded-lg object-cover bg-slate-100"
                        />
                        <div>
                          <p className="text-xs font-semibold text-slate-800 line-clamp-1">{prod.name}</p>
                          <p className="text-[10px] text-indigo-600 font-medium">₹{prod.price} <span className="text-slate-400">Mill Rate</span></p>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Action Icons: Wishlist, Account, Cart */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="flex items-center gap-1.5 text-slate-700 hover:text-indigo-600 transition-colors group"
                aria-label="Wishlist"
              >
                <div className="relative">
                  <Heart className="w-5 h-5 text-slate-700 group-hover:text-indigo-600 transition-colors" />
                  <span className="absolute -top-1.5 -right-2 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {totalWishlistCount > 0 ? totalWishlistCount : 3}
                  </span>
                </div>
                <span className="hidden sm:inline text-xs font-semibold text-slate-700 group-hover:text-indigo-600">
                  Wishlist
                </span>
              </Link>

              {/* Account */}
              <Link
                to="/admin"
                className="flex items-center gap-1.5 text-slate-700 hover:text-indigo-600 transition-colors group"
                aria-label="Account"
              >
                <User className="w-5 h-5 text-slate-700 group-hover:text-indigo-600 transition-colors" />
                <span className="hidden sm:inline text-xs font-semibold text-slate-700 group-hover:text-indigo-600">
                  Account
                </span>
              </Link>

              {/* Cart */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-1.5 text-slate-700 hover:text-indigo-600 transition-colors group relative cursor-pointer"
                aria-label="Cart"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 text-slate-700 group-hover:text-indigo-600 transition-colors" />
                  <span className="absolute -top-1.5 -right-2 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {totalCartCount > 0 ? totalCartCount : 2}
                  </span>
                </div>
                <span className="hidden sm:inline text-xs font-semibold text-slate-700 group-hover:text-indigo-600">
                  Cart
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── Sub Navigation Category Bar (Row 2) ── */}
      <nav className="hidden lg:block border-b border-slate-200/70 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center gap-6 xl:gap-8 h-11 text-xs sm:text-[13px] font-medium text-slate-700">
            {navLinks.map((link) => {
              const active = isCurrentActive(link.to);
              return (
                <li key={link.to} className="relative h-full flex items-center">
                  <Link
                    to={link.to}
                    className={`transition-colors whitespace-nowrap py-2 font-medium ${
                      active
                        ? 'text-indigo-600 font-semibold'
                        : 'text-slate-700 hover:text-indigo-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-indigo-600 rounded-t-md" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white shadow-lg animate-fade-in-up">
          <div className="p-4 space-y-3">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 text-xs text-slate-900 placeholder:text-slate-400 pl-4 pr-10 py-2.5 rounded-full border border-slate-200 outline-none"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            <ul className="space-y-1 pt-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                      isCurrentActive(link.to)
                        ? 'bg-indigo-50 text-indigo-600 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};
