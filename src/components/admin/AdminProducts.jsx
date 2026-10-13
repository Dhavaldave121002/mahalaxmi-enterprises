import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  X,
  Filter,
  Check,
  AlertTriangle,
  ArrowUpDown,
  Tag,
  Layers,
  IndianRupee,
  Package
} from 'lucide-react';

export const AdminProducts = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct, showToast } = useStore();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('All'); // 'All', 'InStock', 'LowStock', 'OutOfStock'
  const [sortBy, setSortBy] = useState('newest');

  // Modal State: null, or { mode: 'create' | 'edit', product: {...} }
  const [activeModal, setActiveModal] = useState(null);
  // Delete confirmation modal
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    categoryId: 'home-and-kitchen',
    subcategory: '',
    price: '',
    mrp: '',
    stock: '',
    lowStockThreshold: 10,
    fabric: '',
    dimensions: '',
    packSize: '',
    description: '',
    careInstructions: '',
    imageUrl: '',
    isBestSeller: false,
    isFeatured: false,
    tier1Qty: 10,
    tier1Price: '',
    tier2Qty: 50,
    tier2Price: ''
  });

  const openCreateModal = () => {
    setFormData({
      name: '',
      categoryId: categories[0]?.id || 'home-and-kitchen',
      subcategory: categories[0]?.subcategories[0] || 'Kitchen Towels',
      price: '',
      mrp: '',
      stock: '25',
      lowStockThreshold: 10,
      fabric: '100% Combed Cotton',
      dimensions: '40 x 60 cm',
      packSize: 'Pack of 6',
      description: '',
      careInstructions: 'Machine wash warm with mild detergent.',
      imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80',
      isBestSeller: false,
      isFeatured: true,
      tier1Qty: 10,
      tier1Price: '',
      tier2Qty: 50,
      tier2Price: ''
    });
    setActiveModal({ mode: 'create' });
  };

  const openEditModal = (product) => {
    const tier1 = product.bulkTiers?.[0];
    const tier2 = product.bulkTiers?.[1];

    setFormData({
      name: product.name,
      categoryId: product.categoryId,
      subcategory: product.subcategory || '',
      price: product.price,
      mrp: product.mrp || product.price,
      stock: product.stock,
      lowStockThreshold: product.lowStockThreshold || 10,
      fabric: product.fabric || '',
      dimensions: product.dimensions || '',
      packSize: product.packSize || '',
      description: product.description || '',
      careInstructions: product.careInstructions || '',
      imageUrl: product.images?.[0] || '',
      isBestSeller: product.isBestSeller || false,
      isFeatured: product.isFeatured || false,
      tier1Qty: tier1?.minQty || 10,
      tier1Price: tier1?.pricePerUnit || '',
      tier2Qty: tier2?.minQty || 50,
      tier2Price: tier2?.pricePerUnit || ''
    });
    setActiveModal({ mode: 'edit', id: product.id });
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      showToast('Please provide product name and price', 'error');
      return;
    }

    const bulkTiers = [];
    if (formData.tier1Price) {
      bulkTiers.push({
        minQty: Number(formData.tier1Qty),
        pricePerUnit: Number(formData.tier1Price)
      });
    }
    if (formData.tier2Price) {
      bulkTiers.push({
        minQty: Number(formData.tier2Qty),
        pricePerUnit: Number(formData.tier2Price)
      });
    }

    const payload = {
      name: formData.name,
      categoryId: formData.categoryId,
      subcategory: formData.subcategory,
      price: Number(formData.price),
      mrp: Number(formData.mrp || formData.price),
      stock: Number(formData.stock),
      lowStockThreshold: Number(formData.lowStockThreshold),
      fabric: formData.fabric,
      dimensions: formData.dimensions,
      packSize: formData.packSize,
      description: formData.description,
      careInstructions: formData.careInstructions,
      images: [formData.imageUrl || 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80'],
      isBestSeller: formData.isBestSeller,
      isFeatured: formData.isFeatured,
      bulkTiers
    };

    if (activeModal.mode === 'create') {
      addProduct(payload);
    } else {
      updateProduct(activeModal.id, payload);
    }

    setActiveModal(null);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteProduct(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subcategory?.toLowerCase().includes(q) ||
          p.fabric?.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== 'All') {
      list = list.filter((p) => p.categoryId === categoryFilter);
    }

    if (stockFilter === 'InStock') {
      list = list.filter((p) => p.stock > (p.lowStockThreshold || 10));
    } else if (stockFilter === 'LowStock') {
      list = list.filter((p) => p.stock > 0 && p.stock <= (p.lowStockThreshold || 10));
    } else if (stockFilter === 'OutOfStock') {
      list = list.filter((p) => p.stock <= 0);
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'stock') {
      list.sort((a, b) => a.stock - b.stock);
    }

    return list;
  }, [products, search, categoryFilter, stockFilter, sortBy]);

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Direct Mill Product Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create, edit, manage loom specs, and configure bulk tier discounts.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-indigo hover:bg-brand-indigo-hover text-white text-xs font-bold shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-subtle flex flex-col md:flex-row items-center gap-3 justify-between">
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            placeholder="Search by product title or fabric..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-brand-indigo outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto text-xs">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 font-medium text-slate-700 outline-none"
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Stock Filter */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 font-medium text-slate-700 outline-none"
          >
            <option value="All">All Stock Levels</option>
            <option value="InStock">In Stock (&gt;10)</option>
            <option value="LowStock">Low Stock (≤10)</option>
            <option value="OutOfStock">Out of Stock (0)</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 font-medium text-slate-700 outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="stock">Lowest Stock</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Product Info</th>
                <th className="py-3 px-4">Category / Loom</th>
                <th className="py-3 px-4">Price & MRP</th>
                <th className="py-3 px-4">Stock Status</th>
                <th className="py-3 px-4">Bulk Tiers</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => {
                const category = categories.find((c) => c.id === p.categoryId);
                const isLow = p.stock <= (p.lowStockThreshold || 10) && p.stock > 0;
                const isOut = p.stock <= 0;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Product Info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-11 h-11 rounded-lg object-cover bg-slate-100 border border-slate-200 flex-shrink-0"
                        />
                        <div className="min-w-0 max-w-xs">
                          <p className="font-bold text-slate-900 truncate">{p.name}</p>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{p.fabric || p.packSize}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-800 block">{category?.name || p.categoryId}</span>
                      <span className="text-[10px] text-brand-violet">{p.subcategory}</span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">₹{p.price}</div>
                      {p.mrp && <div className="text-[11px] text-slate-400 line-through">MRP ₹{p.mrp}</div>}
                    </td>

                    {/* Stock */}
                    <td className="py-3 px-4">
                      {isOut ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          Out of Stock (0)
                        </span>
                      ) : isLow ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          Low: {p.stock} units
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {p.stock} units
                        </span>
                      )}
                    </td>

                    {/* Bulk Tiers */}
                    <td className="py-3 px-4">
                      {p.bulkTiers && p.bulkTiers.length > 0 ? (
                        <div className="space-y-0.5 text-[10px]">
                          {p.bulkTiers.map((t, idx) => (
                            <span key={idx} className="block text-slate-600">
                              {t.minQty}+ pcs: <strong className="text-slate-900">₹{t.pricePerUnit}</strong>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Flat rate only</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-brand-indigo hover:bg-indigo-50 transition-colors"
                          title="Edit product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(p)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* Create / Edit Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveModal(null)} />
          <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl z-10 border border-slate-200">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                {activeModal.mode === 'create' ? 'Add New Direct Mill SKU' : 'Edit Direct Mill Product'}
              </h3>
              <p className="text-xs text-slate-500">
                Configure loom rates, technical specifications, and tier volume pricing.
              </p>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 500 GSM Luxury Cotton Towels"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-brand-indigo outline-none text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => {
                      const cat = categories.find((c) => c.id === e.target.value);
                      setFormData({
                        ...formData,
                        categoryId: e.target.value,
                        subcategory: cat?.subcategories?.[0] || ''
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-brand-indigo outline-none text-xs bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subcategory</label>
                  <input
                    type="text"
                    placeholder="e.g. Pure Cotton Bath Towels"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-brand-indigo outline-none text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Direct Mill Rate (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 499"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-brand-indigo outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">MRP Reference (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 899"
                    value={formData.mrp}
                    onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-brand-indigo outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Current Stock *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 50"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-brand-indigo outline-none text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Fabric & GSM</label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Combed Cotton (300 TC)"
                    value={formData.fabric}
                    onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-brand-indigo outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Dimensions</label>
                  <input
                    type="text"
                    placeholder="e.g. 108 x 108 inches"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-brand-indigo outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pack Size</label>
                  <input
                    type="text"
                    placeholder="e.g. Pack of 2 Towels"
                    value={formData.packSize}
                    onChange={(e) => setFormData({ ...formData, packSize: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-brand-indigo outline-none text-xs"
                  />
                </div>
              </div>

              {/* Bulk Pricing Tiers */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block">Bulk Pricing Tiers (Optional)</span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 whitespace-nowrap">Tier 1 ({formData.tier1Qty}+ pcs): ₹</span>
                    <input
                      type="number"
                      placeholder="Rate / unit"
                      value={formData.tier1Price}
                      onChange={(e) => setFormData({ ...formData, tier1Price: e.target.value })}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 whitespace-nowrap">Tier 2 ({formData.tier2Qty}+ pcs): ₹</span>
                    <input
                      type="number"
                      placeholder="Rate / unit"
                      value={formData.tier2Price}
                      onChange={(e) => setFormData({ ...formData, tier2Price: e.target.value })}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-brand-indigo outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Detailed textile and yarn count information..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-brand-indigo outline-none text-xs"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    className="rounded text-brand-indigo"
                  />
                  <span>Show as Best Seller</span>
                </label>
                <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-brand-indigo"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-brand-indigo hover:bg-brand-indigo-hover text-white font-bold transition-colors shadow-sm"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-xl z-10 border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Confirm Deletion</h4>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to delete "{deleteTarget.name}"? This action removes it from both the storefront and admin catalog.
              </p>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
              >
                Delete SKU
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
