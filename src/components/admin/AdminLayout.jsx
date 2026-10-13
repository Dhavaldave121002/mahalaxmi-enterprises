import React, { useState } from 'react';
import { useRouter, Link } from '../../router/Router';
import { useStore } from '../../context/StoreContext';
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  Users,
  LineChart,
  Search,
  Bell,
  ChevronDown,
  ExternalLink,
  Layers,
  ShoppingBag,
  RefreshCw,
  Boxes
} from 'lucide-react';

export const AdminLayout = ({ children, activeTab, setActiveTab }) => {
  const { resetToFactoryDefaults, showToast } = useStore();
  const { navigate } = useRouter();

  const navItems = [
    { id: 'inventory', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'overview', label: 'Performance', icon: TrendingUp },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Customers', icon: Users },
    { id: 'categories', label: 'Forecasting', icon: LineChart },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col antialiased">
      
      {/* ── Top Header Matching Reference Screenshot ── */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Left: Electric Blue Logo Badge + Nav Pills */}
          <div className="flex items-center gap-6">
            
            {/* Logo: Electric Blue Circle Badge */}
            <div
              onClick={() => setActiveTab('inventory')}
              className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 cursor-pointer flex-shrink-0"
              title="Mahalaxmi Admin"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93V18c0 .55-.45 1-1 1s-1-.45-1-1v-1.07c-2.45-.44-4-2.14-4-4.43 0-.55.45-1 1-1s1 .45 1 1c0 1.34.87 2.37 2 2.5v-3.79c-2.11-.64-3.5-1.92-3.5-3.71 0-2.29 1.55-3.99 4-4.43V4c0-.55.45-1 1-1s1 .45 1 1v1.07c2.45.44 4 2.14 4 4.43 0 .55-.45 1-1 1s-1-.45-1-1c0-1.34-.87-2.37-2-2.5v3.79c2.11.64 3.5 1.92 3.5 3.71 0 2.29-1.55 3.99-4 4.43z" />
              </svg>
            </div>

            {/* Nav Menu Pills */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-100 text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

          </div>

          {/* Right: Search, Notifications, User Avatar & Storefront Link */}
          <div className="flex items-center gap-3">
            
            {/* Search circular button */}
            <button
              type="button"
              className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-600 transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Notification bell with indicator */}
            <button
              type="button"
              onClick={() => showToast('No unread admin alerts')}
              className="relative w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-600 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500" />
            </button>

            {/* User Profile Chip */}
            <div className="hidden sm:flex items-center gap-2.5 pl-2 py-1 pr-3 rounded-full hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Admin avatar"
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <div className="text-left">
                <span className="block text-xs font-bold text-slate-800 leading-tight">
                  Kadirov
                </span>
                <span className="block text-[10px] text-slate-400 leading-tight">
                  kadirov@company.com
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </div>

            {/* Live Storefront Link */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
                window.location.href = '/';
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm cursor-pointer ml-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Storefront</span>
            </a>

          </div>

        </div>
      </header>

      {/* ── Main Content Container ── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

    </div>
  );
};
