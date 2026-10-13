import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Layers, Edit2, Plus, X, Image as ImageIcon, Eye, Check } from 'lucide-react';

export const AdminCategories = () => {
  const { categories, products, updateCategory, addCategory, showToast } = useStore();

  const [activeModal, setActiveModal] = useState(null); // null, or { category }
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    accentColor: '#4F46E5',
    description: '',
    image: '',
    bannerImage: '',
    subcategories: '',
    featuredOnHome: true
  });

  const openEdit = (cat) => {
    setFormData({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      accentColor: cat.accentColor || '#4F46E5',
      description: cat.description,
      image: cat.image,
      bannerImage: cat.bannerImage || cat.image,
      subcategories: cat.subcategories?.join(', ') || '',
      featuredOnHome: cat.featuredOnHome !== false
    });
    setActiveModal({ mode: 'edit', id: cat.id });
  };

  const openCreate = () => {
    setFormData({
      name: '',
      slug: '',
      accentColor: '#4F46E5',
      description: '',
      image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
      bannerImage: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1600&q=80',
      subcategories: 'General Essentials, Direct Mill Supplies',
      featuredOnHome: true
    });
    setActiveModal({ mode: 'create' });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    const subcats = formData.subcategories
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      name: formData.name,
      accentColor: formData.accentColor,
      description: formData.description,
      image: formData.image,
      bannerImage: formData.bannerImage,
      subcategories: subcats,
      featuredOnHome: formData.featuredOnHome
    };

    if (activeModal.mode === 'edit') {
      updateCategory(activeModal.id, payload);
    } else {
      addCategory({
        ...payload,
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      });
    }

    setActiveModal(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Category & Collection Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure banners, subcategories, brand accent colors, and homepage visibility.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-indigo hover:bg-brand-indigo-hover text-white text-xs font-bold shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => {
          const catProducts = products.filter((p) => p.categoryId === cat.id);

          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Banner Thumbnail */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src={cat.bannerImage || cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />

                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <span
                      className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-sm"
                      style={{ backgroundColor: cat.accentColor || '#4F46E5' }}
                    >
                      {cat.accentColor}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 text-white">
                    <h3 className="text-lg font-bold">{cat.name}</h3>
                    <p className="text-[11px] text-slate-200">{catProducts.length} assigned products</p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Subcategories:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.subcategories?.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                    <span>Homepage Display:</span>
                    <span className={`font-bold ${cat.featuredOnHome !== false ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {cat.featuredOnHome !== false ? 'Active on Homepage' : 'Hidden from Homepage'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => openEdit(cat)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-brand-indigo hover:bg-indigo-50 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Configure Category</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit / Create Category Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveModal(null)} />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 border border-slate-200">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {activeModal.mode === 'create' ? 'Create New Category' : 'Edit Category'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Configure collection branding, banner imagery, and subcategory tags.
            </p>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-brand-indigo outline-none text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Accent Hex Code</label>
                  <input
                    type="text"
                    value={formData.accentColor}
                    onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Featured on Home</label>
                  <select
                    value={formData.featuredOnHome ? 'yes' : 'no'}
                    onChange={(e) => setFormData({ ...formData, featuredOnHome: e.target.value === 'yes' })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs"
                  >
                    <option value="yes">Yes (Visible in 4-card grid)</option>
                    <option value="no">No (Catalog only)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Subcategories (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Double Bedsheets, Curtains, Premium Linen"
                  value={formData.subcategories}
                  onChange={(e) => setFormData({ ...formData, subcategories: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Banner Image URL</label>
                <input
                  type="url"
                  value={formData.bannerImage}
                  onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 outline-none text-xs"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-brand-indigo text-white font-bold"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
