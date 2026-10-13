import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Boxes,
  AlertTriangle,
  Plus,
  Minus,
  Check,
  Search,
  Filter,
  Save,
  ShieldAlert
} from 'lucide-react';

export const AdminInventory = () => {
  const { products, updateProductStock, updateProduct, showToast } = useStore();

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All'); // 'All', 'LowOnly', 'OutOnly'
  const [editingThreshold, setEditingThreshold] = useState({});

  const filteredProducts = products.filter((p) => {
    const isLow = p.stock <= (p.lowStockThreshold || 10) && p.stock > 0;
    const isOut = p.stock <= 0;

    if (filterType === 'LowOnly' && !isLow) return false;
    if (filterType === 'OutOnly' && !isOut) return false;

    if (search.trim()) {
      return (
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.subcategory?.toLowerCase().includes(search.toLowerCase())
      );
    }
    return true;
  });

  const handleAdjustStock = (id, currentStock, delta) => {
    const updated = Math.max(0, currentStock + delta);
    updateProductStock(id, updated);
  };

  const handleSaveThreshold = (id) => {
    const val = parseInt(editingThreshold[id], 10);
    if (!isNaN(val) && val >= 0) {
      updateProduct(id, { lowStockThreshold: val });
      setEditingThreshold((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      showToast('Threshold updated');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Loom Inventory & Stock Controller
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Monitor mill stock quotas, adjust warehouse counts, and set low-stock notification triggers.
        </p>
      </div>

      {/* Top Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col sm:flex-row items-center gap-3 justify-between">
        <div className="w-full sm:w-80 relative">
          <input
            type="text"
            placeholder="Search inventory items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-brand-indigo outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
          <button
            type="button"
            onClick={() => setFilterType('All')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterType === 'All' ? 'bg-brand-navy text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            All Inventory ({products.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('LowOnly')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterType === 'LowOnly' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800'
            }`}
          >
            Low Stock Alerts
          </button>
          <button
            type="button"
            onClick={() => setFilterType('OutOnly')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterType === 'OutOnly' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-800'
            }`}
          >
            Out of Stock
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Item & Loom Spec</th>
                <th className="py-3 px-4">Current Stock Units</th>
                <th className="py-3 px-4">Low-Stock Trigger</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Quick Stock Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => {
                const threshold = p.lowStockThreshold || 10;
                const isLow = p.stock <= threshold && p.stock > 0;
                const isOut = p.stock <= 0;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Item */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200 flex-shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{p.name}</p>
                          <p className="text-[11px] text-slate-400">{p.subcategory} • ₹{p.price}/unit</p>
                        </div>
                      </div>
                    </td>

                    {/* Current Stock */}
                    <td className="py-3.5 px-4 font-mono font-bold text-sm text-slate-800">
                      {p.stock}
                    </td>

                    {/* Threshold config */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          max="500"
                          value={editingThreshold[p.id] !== undefined ? editingThreshold[p.id] : threshold}
                          onChange={(e) => setEditingThreshold({ ...editingThreshold, [p.id]: e.target.value })}
                          className="w-16 px-2 py-1 rounded-lg border border-slate-300 text-xs font-mono"
                        />
                        {editingThreshold[p.id] !== undefined && (
                          <button
                            type="button"
                            onClick={() => handleSaveThreshold(p.id)}
                            className="p-1 rounded bg-brand-indigo text-white hover:bg-brand-indigo-hover"
                            title="Save threshold"
                          >
                            <Save className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      {isOut ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          Depleted (0 units)
                        </span>
                      ) : isLow ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          Reorder Alert (≤{threshold})
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Healthy Stock
                        </span>
                      )}
                    </td>

                    {/* Quick Adjust */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleAdjustStock(p.id, p.stock, -5)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold"
                          title="Reduce 5 units"
                        >
                          -5
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAdjustStock(p.id, p.stock, -1)}
                          className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                          title="Reduce 1 unit"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAdjustStock(p.id, p.stock, 1)}
                          className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                          title="Add 1 unit"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAdjustStock(p.id, p.stock, 10)}
                          className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-brand-indigo rounded-lg text-xs font-bold"
                          title="Add 10 units"
                        >
                          +10
                        </button>
                      </div>
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
