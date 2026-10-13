import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../router/Router';
import { Building2, CheckCircle2, ArrowRight, Mail, Phone, Calculator, X } from 'lucide-react';

export const WholesaleBulkSection = () => {
  const { homepageConfig, showToast } = useStore();
  const { navigate } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    categoryInterest: 'Textile (Bedsheets & Curtains)',
    estimatedQuantity: '50 - 200 units',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const bulk = homepageConfig?.bulkBanner;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.businessName || !formData.phone) {
      showToast('Please enter your business name and contact number', 'error');
      return;
    }
    setIsSubmitted(true);
    showToast('Wholesale enquiry received. Our B2B mill manager will call you today.');
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setFormData({
        businessName: '',
        contactPerson: '',
        phone: '',
        email: '',
        categoryInterest: 'Textile (Bedsheets & Curtains)',
        estimatedQuantity: '50 - 200 units',
        notes: ''
      });
    }, 2500);
  };

  return (
    <section id="bulk-section" className="py-16 sm:py-24 bg-brand-navy text-white relative overflow-hidden scroll-mt-20">
      {/* Subtle background ambient texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#312E81_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-indigo/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-900/60 border border-indigo-700/60 text-xs font-semibold text-indigo-200">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>DIRECT MILL B2B & INSTITUTIONAL SUPPLY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {bulk?.title || "Direct Mill Bulk Purchasing & Institutional Supply"}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              {bulk?.subtitle || "Special rates for hotels, hostels, hospitals, retail shops, and corporate buyers. Transparent quantity-tiered pricing with direct mill dispatch."}
            </p>

            {/* Configured Tier Rate Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="text-xs font-semibold text-amber-300 uppercase">Tier 1: 10 - 25 Units</span>
                <p className="text-lg font-bold text-white mt-1">15% Off Mill Price</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Boutique homestays & clinics</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="text-xs font-semibold text-amber-300 uppercase">Tier 2: 26 - 99 Units</span>
                <p className="text-lg font-bold text-white mt-1">25% Off Mill Price</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Resellers & regional suppliers</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="text-xs font-semibold text-amber-300 uppercase">Tier 3: 100+ Units</span>
                <p className="text-lg font-bold text-white mt-1">Direct Loom Invoicing</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Custom dye & GST invoicing</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-brand-indigo hover:bg-brand-indigo-hover text-white font-semibold text-sm shadow-lg shadow-indigo-500/30 transition-all duration-200 gap-2 group"
              >
                <span>{bulk?.ctaText || "Explore Bulk Pricing"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/collections/all')}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/15 transition-colors"
              >
                <span>Browse Products with Tiers</span>
              </button>
            </div>

          </div>

          {/* Right Card: Instant Quote Form & Live Tiers */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-7 backdrop-blur-md shadow-2xl relative">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-bold text-white">Instant Wholesale Quote</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/90 px-2.5 py-0.5 rounded-full border border-emerald-800">
                  GST Verified
                </span>
              </div>

              {isSubmitted ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Enquiry Received!</h4>
                  <p className="text-xs text-slate-300 max-w-xs mx-auto">
                    Our dedicated B2B Mill Relationship Manager will call you shortly with formal tier pricing.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Business / Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Heritage Resort / Sharma Textiles"
                      value={formData.businessName}
                      onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Contact Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98XXX XXXXX"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Product Category
                      </label>
                      <select
                        value={formData.categoryInterest}
                        onChange={e => setFormData({ ...formData, categoryInterest: e.target.value })}
                        className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:border-indigo-500 outline-none transition-colors"
                      >
                        <option>Textile (Bedsheets & Curtains)</option>
                        <option>Cotton Products (Towels & Bags)</option>
                        <option>Household (Microfiber & Cleaning)</option>
                        <option>Home & Kitchen (Towels & Aprons)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Estimated Volume
                    </label>
                    <select
                      value={formData.estimatedQuantity}
                      onChange={e => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                      className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:border-indigo-500 outline-none transition-colors"
                    >
                      <option>Tier 1: 10 - 25 units (15% Off)</option>
                      <option>Tier 2: 26 - 99 units (25% Off)</option>
                      <option>Tier 3: 100+ units (Loom Wholesale Invoice)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                  >
                    <span>Request Mill Quotation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              <div className="mt-4 pt-3.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-indigo-400" />
                  <span>+91 98400 12345</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>b2b@mahalaxmienterprises.in</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Bulk Enquiry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 animate-fade-in border border-slate-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Enquiry Registered!</h3>
                <p className="text-sm text-slate-600">
                  Our wholesale team will contact {formData.contactPerson || formData.businessName} with catalog quotation & tax invoice breakdown.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold text-brand-indigo uppercase tracking-wider">
                    Institutional & Wholesale Request
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    Direct Mill Rate Quotation
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct factory dispatched billing with HSN-classified GST tax invoices.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Business or Enterprise Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Grand Heritage Hotel / Solapur Textiles"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-brand-indigo outline-none text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Contact Person
                      </label>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-brand-indigo outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-brand-indigo outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Category of Interest
                      </label>
                      <select
                        value={formData.categoryInterest}
                        onChange={(e) => setFormData({ ...formData, categoryInterest: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-brand-indigo outline-none text-xs bg-white"
                      >
                        <option>Textile (Bedsheets & Curtains)</option>
                        <option>Cotton Bath Towels (550 GSM)</option>
                        <option>Microfiber Cleaning Essentials</option>
                        <option>Kitchen Towels & Aprons</option>
                        <option>Assorted Institutional Consumables</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Estimated Quantity
                      </label>
                      <select
                        value={formData.estimatedQuantity}
                        onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-brand-indigo outline-none text-xs bg-white"
                      >
                        <option>10 - 25 units (Sample Batch)</option>
                        <option>26 - 99 units</option>
                        <option>100 - 500 units (Institutional)</option>
                        <option>500+ units (Container/Truckload)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Specific Requirements / Custom Specs
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need white towels with custom logo embroidery..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:border-brand-indigo outline-none text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-indigo hover:bg-brand-indigo-hover text-white font-bold rounded-xl text-sm transition-colors shadow-md mt-2"
                  >
                    Submit Wholesale Enquiry
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
