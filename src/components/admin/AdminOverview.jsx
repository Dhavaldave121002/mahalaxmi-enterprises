import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  IndianRupee,
  ShoppingBag,
  Package,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const AdminOverview = ({ setActiveTab }) => {
  const { products, orders, categories } = useStore();

  // Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);
  const totalOrders = orders.length;
  const activeProducts = products.length;
  const lowStockProducts = products.filter(
    (p) => p.stock <= (p.lowStockThreshold || 10)
  );

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Executive Dashboard Overview
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Real-time metrics for Mahalaxmi Enterprises mill sales, consignment dispatches, and inventory.
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Sales Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Direct mill invoices issued</span>
            </p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Orders</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-brand-indigo flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {totalOrders}
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              {orders.filter((o) => o.orderStatus === 'Delivered').length} Delivered • {orders.filter((o) => o.orderStatus === 'Processing').length} Processing
            </p>
          </div>
        </div>

        {/* Active Products */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Catalog SKUs</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-brand-violet flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {activeProducts}
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              Across {categories.length} production categories
            </p>
          </div>
        </div>

        {/* Low-Stock Alerts */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Low Stock Warnings</span>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${lowStockProducts.length > 0 ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-400'}`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className={`text-2xl sm:text-3xl font-extrabold ${lowStockProducts.length > 0 ? 'text-amber-600' : 'text-slate-900'}`}>
              {lowStockProducts.length}
            </div>
            <button
              onClick={() => setActiveTab('inventory')}
              className="text-[11px] text-brand-indigo font-semibold hover:underline mt-1 block text-left"
            >
              Review inventory thresholds →
            </button>
          </div>
        </div>

      </div>

      {/* Revenue Breakdown & Category Share */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Breakdown by Category (2 cols) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">
              Loom Category Performance & Inventory Distribution
            </h3>
            <span className="text-xs text-slate-400">Direct Mill Status</span>
          </div>

          <div className="space-y-4 pt-2">
            {categories.map((cat) => {
              const catProducts = products.filter((p) => p.categoryId === cat.id);
              const totalStock = catProducts.reduce((acc, p) => acc + p.stock, 0);
              const percentage = Math.min(100, Math.round((catProducts.length / (products.length || 1)) * 100));

              return (
                <div key={cat.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold text-slate-800">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.accentColor }} />
                      <span>{cat.name}</span>
                    </div>
                    <span className="text-slate-500 font-medium">
                      {catProducts.length} SKUs • {totalStock} units on hand
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: cat.accentColor || '#4F46E5'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Operations Guide (1 col) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
              Quick Administrative Actions
            </h3>
            <div className="mt-4 space-y-2.5">
              <button
                onClick={() => setActiveTab('products')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors"
              >
                <span>Add / Edit Direct Mill Products</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => setActiveTab('homepage')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors"
              >
                <span>Customize Homepage Headlines & Hero</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors"
              >
                <span>Adjust Stock Levels & Thresholds</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors"
              >
                <span>Process Customer Orders & Consignments</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="p-3 bg-indigo-50 rounded-xl text-xs text-indigo-950 mt-4">
            <span className="font-bold block">Live Synchronized Demo</span>
            <span className="text-[11px] text-slate-600 block mt-0.5">
              Any edits to products, homepage banners, or stock update instantly on the storefront.
            </span>
          </div>
        </div>

      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Customer & B2B Orders</h3>
            <p className="text-xs text-slate-500">Live order logs from web checkout and wholesale requests</p>
          </div>
          <button
            onClick={() => setActiveTab('orders')}
            className="text-xs font-bold text-brand-indigo hover:underline flex items-center gap-1"
          >
            <span>Manage All Orders</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Tracking</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.slice(0, 5).map((order) => {
                let badgeClass = 'bg-amber-50 text-amber-800 border-amber-200';
                if (order.orderStatus === 'Delivered') {
                  badgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                } else if (order.orderStatus === 'Cancelled') {
                  badgeClass = 'bg-rose-50 text-rose-800 border-rose-200';
                }

                return (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{order.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <div>{order.customerName}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{order.shippingAddress?.city}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {order.items?.length || 1} distinct item(s)
                    </td>
                    <td className="py-3.5 px-4 font-extrabold text-slate-900">
                      ₹{order.total}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${badgeClass}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      {order.trackingNumber || 'Pending'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
