import React, { useState } from 'react';
import { useRouter, Link } from '../../router/Router';
import { useStore } from '../../context/StoreContext';
import {
  LayoutDashboard,
  Package,
  Layers,
  Home,
  ShoppingBag,
  Boxes,
  ExternalLink,
  Menu,
  X,
  Bell,
  RefreshCw,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const AdminLayout = ({ children, activeTab, setActiveTab }) => {
  const { resetToFactoryDefaults, products, orders } = useStore();
  const { navigate } = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Compute alerts
  const lowStockCount = products.filter(
    (p) => p.stock <= (p.lowStockThreshold || 10)
  ).length;

  const pendingOrdersCount = orders.filter(
    (o) => o.orderStatus === 'Processing'
  ).length;

  const navItems = [
    { id: 'overview', label: 'Overview & KPIs', icon: LayoutDashboard },
    { id: 'products', label: 'Product Catalog', icon: Package, badge: products.length },
    { id: 'categories', label: 'Categories & Loom Collections', icon: Layers },
    { id: 'homepage', label: 'Homepage Content', icon: Home },
    { id: 'orders', label: 'Orders Management', icon: ShoppingBag, badge: pendingOrdersCount ? `${pendingOrdersCount} pending` : null, badgeColor: 'bg-amber-100 text-amber-800' },
    { id: 'inventory', label: 'Stock & Inventory', icon: Boxes, badge: lowStockCount ? `${lowStockCount} low` : null, badgeColor: 'bg-rose-100 text-rose-800' }
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col antialiased">
      
      {/* Top Admin Header */}
      <header className="bg-brand-navy text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-indigo flex items-center justify-center font-serif font-bold text-base text-white">
                M
              </div>
              <div>
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white block leading-tight">
                  MAHALAXMI ENTERPRISES
                </span>
                <span className="text-[10px] text-indigo-300 uppercase font-semibold tracking-wider block">
                  Admin Management Console
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Reset to Factory Defaults Button for quick clean testing */}
            <button
              type="button"
              onClick={resetToFactoryDefaults}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
              title="Reset sample database to fresh demo defaults"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Demo State</span>
            </button>

            {/* View Live Storefront */}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-indigo hover:bg-brand-indigo-hover text-white transition-colors shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Storefront</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Wrapper */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Sidebar (w-64) */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200/90 p-4 justify-between">
          <div className="space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Operations & Catalog
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-brand-indigo shadow-subtle'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-indigo' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        item.badgeColor || (isActive ? 'bg-indigo-100 text-brand-indigo' : 'bg-slate-100 text-slate-600')
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sourcing Node Info */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <p className="font-bold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Direct Mill Node</span>
            </p>
            <p className="text-[11px] text-slate-500 leading-snug">
              Connected to Solapur, Coimbatore, Surat production centers.
            </p>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white p-5 shadow-2xl flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-400">Navigation</span>
                  <button onClick={() => setIsMobileSidebarOpen(false)}>
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>
                <div className="pt-3 space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold ${
                          isActive ? 'bg-indigo-50 text-brand-indigo' : 'text-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 font-bold">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    resetToFactoryDefaults();
                    setIsMobileSidebarOpen(false);
                  }}
                  className="w-full py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  Reset Demo State
                </button>
                <Link
                  to="/"
                  className="w-full py-2 bg-brand-indigo text-white rounded-lg text-xs font-bold block text-center"
                >
                  View Storefront
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};
