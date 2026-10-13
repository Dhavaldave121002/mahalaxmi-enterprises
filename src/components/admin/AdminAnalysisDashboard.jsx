import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Search,
  ChevronDown,
  ArrowUpDown,
  Download,
  Filter,
  ArrowUpRight,
  RefreshCw,
  LayoutGrid,
  Check,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

export const AdminAnalysisDashboard = ({ setActiveTab }) => {
  const { products, showToast } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubTab, setSelectedSubTab] = useState('Inventory');
  const [selectedProductIds, setSelectedProductIds] = useState(new Set(['MLX-CP-001']));

  // Product analysis mock units sold for visual fidelity matching screenshot
  const analysisProducts = [
    {
      id: 'MLX-CP-001',
      code: 'ZCR-TBSSD-4791',
      name: 'Luxury Combed Cotton Bath Towel Set',
      category: 'Cotton Products',
      unitSold: 992,
      stock: 520,
      status: 'In Stock'
    },
    {
      id: 'MLX-TX-002',
      code: 'ZCM-ORBPRO-1865',
      name: 'Floral Motif Satin Double Bedsheet',
      category: 'Textile',
      unitSold: 107,
      stock: 39,
      status: 'Low Stock'
    },
    {
      id: 'MLX-HK-003',
      code: 'ZPX-VISX-3748',
      name: 'Teal Waffle Quick-Dry Face Towels',
      category: 'Home & Kitchen',
      unitSold: 100,
      stock: 76,
      status: 'In Stock'
    },
    {
      id: 'MLX-HK-004',
      code: 'ZSD-BLZS-3816',
      name: 'Durable Heavy Cotton Chef Apron',
      category: 'Home & Kitchen',
      unitSold: 300,
      stock: 21,
      status: 'Low Stock'
    },
    {
      id: 'MLX-HH-005',
      code: 'ZLK-ULT6-5623',
      name: 'Commercial-Grade Microfiber (12-Pack)',
      category: 'Household',
      unitSold: 200,
      stock: 165,
      status: 'In Stock'
    },
    {
      id: 'MLX-HH-006',
      code: 'ZSC-CMLK-5412',
      name: 'Reinforced Fabric Storage Box',
      category: 'Household',
      unitSold: 220,
      stock: 184,
      status: 'In Stock'
    },
    {
      id: 'MLX-CP-007',
      code: 'ZVS-NEOVR-2948',
      name: 'Heavy Cotton Canvas Market Tote',
      category: 'Cotton Products',
      unitSold: 220,
      stock: 184,
      status: 'In Stock'
    },
    {
      id: 'MLX-TX-008',
      code: 'ZGD-NVA4-7329',
      name: '400 TC Pure Linen Master Curtain',
      category: 'Textile',
      unitSold: 200,
      stock: 147,
      status: 'In Stock'
    },
    {
      id: 'MLX-HK-009',
      code: 'ZFC-EDG2-6275',
      name: 'Hemstitched Pure Cotton Table Runner',
      category: 'Home & Kitchen',
      unitSold: 124,
      stock: 165,
      status: 'In Stock'
    }
  ];

  const filteredList = analysisProducts.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleSelectAll = () => {
    if (selectedProductIds.size === filteredList.length) {
      setSelectedProductIds(new Set());
    } else {
      setSelectedProductIds(new Set(filteredList.map(i => i.id)));
    }
  };

  const toggleSelectOne = (id) => {
    const next = new Set(selectedProductIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedProductIds(next);
  };

  const handleExport = () => {
    showToast('Exporting inventory analysis data to CSV...');
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      
      {/* ── Page Header: Title, Subtitle & Action Controls ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Product Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Analyze product trends, identify top performers, and optimize your offerings for maximum profitability
          </p>
        </div>

        {/* Date Selector & Export Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>December 2024</span>
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs text-xs font-bold text-slate-800 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* ── Sub-tabs & Widget Management Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Sub-nav Pills */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-600">
          {['Overview', 'Product List', 'Revenue Distribution', 'Inventory'].map((tab) => {
            const active = selectedSubTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedSubTab(tab)}
                className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                  active
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-700 transition-colors"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-slate-500" />
            <span>Manage Widget</span>
          </button>
          <button
            type="button"
            onClick={() => showToast('Dashboard widgets refreshed')}
            className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm hover:bg-blue-700 transition-colors"
            title="Refresh Analysis"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── Main Dashboard Layout: 8 cols Left (Product List), 4 cols Right (Charts) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ── LEFT COLUMN (8 cols): Product List Card ── */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          
          <div>
            {/* Card Header & Search / Filters Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Product List
              </h2>

              <div className="flex flex-wrap items-center gap-2">
                {/* Search Product input */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search Product"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 w-36 sm:w-44"
                  />
                </div>

                {/* Category Dropdown */}
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="Cotton Products">Cotton Products</option>
                  <option value="Textile">Textile</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Household">Household</option>
                </select>

                {/* Sort dropdown */}
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium cursor-pointer">
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  <span>Top Products</span>
                </div>

                {/* Quick actions */}
                <button
                  type="button"
                  onClick={handleExport}
                  className="p-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900"
                  title="Export"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900"
                  title="Filter options"
                >
                  <Filter className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 font-semibold border-b border-slate-100">
                    <th className="py-3 px-3 w-8">
                      <input
                        type="checkbox"
                        checked={selectedProductIds.size === filteredList.length && filteredList.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                      />
                    </th>
                    <th className="py-3 px-3">Product ID</th>
                    <th className="py-3 px-3">Product Name</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3 text-right">Unit Sold</th>
                    <th className="py-3 px-3 text-right">Stock</th>
                    <th className="py-3 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredList.map((item) => {
                    const isSelected = selectedProductIds.has(item.id);
                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          isSelected ? 'bg-blue-50/30' : ''
                        }`}
                      >
                        <td className="py-3 px-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectOne(item.id)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                          />
                        </td>
                        <td className="py-3 px-3 font-medium text-slate-500 font-mono text-[11px]">
                          {item.code}
                        </td>
                        <td className="py-3 px-3 font-semibold text-slate-800">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200/70 flex items-center justify-center text-slate-400 flex-shrink-0">
                              <span className="text-[10px] font-bold">▦</span>
                            </div>
                            <span className="truncate max-w-[180px]">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-600 font-medium">
                          {item.category}
                        </td>
                        <td className="py-3 px-3 text-right font-bold text-slate-800">
                          {item.unitSold.toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right font-medium text-slate-700">
                          {item.stock}
                        </td>
                        <td className="py-3 px-3 text-center">
                          {item.status === 'In Stock' ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                              In Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-500 border border-rose-100">
                              Low Stock
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filteredList.length} products</span>
            <span>All stock synchronized with live looms</span>
          </div>

        </div>

        {/* ── RIGHT COLUMN (4 cols): Inventory Age & Historical Stock Levels ── */}
        <div className="lg:col-span-4 space-y-6">

          {/* ── Card 1: Inventory Age (Donut Chart) ── */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Inventory Age
              </h3>
              <ArrowUpRight className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-700" />
            </div>

            {/* Donut Chart with Legend */}
            <div className="flex items-center justify-between gap-4 py-2">
              {/* Circular SVG Donut */}
              <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Segment 1: Light Blue (50%) -> strokeDasharray 125.6, 251.2 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#BFDBFE"
                    strokeWidth="16"
                    strokeDasharray="125.6 125.6"
                    strokeDashoffset="0"
                  />
                  {/* Segment 2: Medium Blue (25%) -> 62.8 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#3B82F6"
                    strokeWidth="16"
                    strokeDasharray="62.8 188.4"
                    strokeDashoffset="-125.6"
                  />
                  {/* Segment 3: Deep Navy Blue (25%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#1D4ED8"
                    strokeWidth="16"
                    strokeDasharray="62.8 188.4"
                    strokeDashoffset="-188.4"
                  />
                </svg>

                {/* Center text inside Donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-black text-slate-900 leading-tight">25K</span>
                  <span className="text-[10px] font-medium text-slate-400">Product Units</span>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-200" />
                  <span className="text-slate-600 font-medium">&gt;30 Days</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-slate-600 font-medium">30-90 Days</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-700" />
                  <span className="text-slate-600 font-medium">&lt;90 Days</span>
                </div>
              </div>
            </div>

            {/* Metric Callout */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-3xl font-black text-blue-600 leading-none">25%</p>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                of inventory has been stored for more than 90 days, increasing the risk of obsolescence.
              </p>
            </div>
          </div>

          {/* ── Card 2: Historical Stock Levels (Wave Chart) ── */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900">
                Historical Stock Levels
              </h3>
              <div className="flex items-center gap-2 text-slate-400">
                <Download className="w-3.5 h-3.5 hover:text-slate-700 cursor-pointer" />
                <ArrowUpRight className="w-3.5 h-3.5 hover:text-slate-700 cursor-pointer" />
              </div>
            </div>

            {/* Wave SVG Graph */}
            <div className="relative pt-2">
              <div className="h-44 w-full">
                <svg viewBox="0 0 320 140" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  <line x1="28" y1="20" x2="310" y2="20" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="28" y1="50" x2="310" y2="50" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="28" y1="80" x2="310" y2="80" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="28" y1="110" x2="310" y2="110" stroke="#F1F5F9" strokeWidth="1" />

                  {/* Y-axis labels */}
                  <text x="22" y="24" textAnchor="end" fontSize="8" fill="#94A3B8" fontWeight="600">12,000</text>
                  <text x="22" y="54" textAnchor="end" fontSize="8" fill="#94A3B8" fontWeight="600">8,000</text>
                  <text x="22" y="84" textAnchor="end" fontSize="8" fill="#94A3B8" fontWeight="600">4,000</text>
                  <text x="22" y="114" textAnchor="end" fontSize="8" fill="#94A3B8" fontWeight="600">0</text>

                  {/* Shaded Area */}
                  <path
                    d="M 35 95 Q 55 20, 75 35 T 115 65 T 155 90 T 195 30 T 235 30 T 275 75 T 305 105 L 305 110 L 35 110 Z"
                    fill="url(#waveGradient)"
                  />

                  {/* Curved Wave Line */}
                  <path
                    d="M 35 95 Q 55 20, 75 35 T 115 65 T 155 90 T 195 30 T 235 30 T 275 75 T 305 105"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />

                  {/* Highlight dots on wave */}
                  <circle cx="195" cy="30" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="235" cy="30" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                </svg>
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between pl-8 pr-2 text-[10px] font-semibold text-slate-400 mt-1">
                <span>Quarter 1</span>
                <span>Quarter 2</span>
                <span>Quarter 3</span>
                <span>Quarter 4</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
