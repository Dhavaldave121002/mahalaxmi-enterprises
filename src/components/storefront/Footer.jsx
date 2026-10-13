import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter, Link } from '../../router/Router';
import { Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  const { categories, setIsTrackOrderOpen } = useStore();

  return (
    <footer className="bg-brand-navy text-slate-300 text-sm border-t border-slate-800">
      
      {/* Upper Footer: Main Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-violet flex items-center justify-center text-white font-serif font-bold text-lg">
                M
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                MAHALAXMI ENTERPRISES
              </span>
            </div>
            
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Direct Mill Rates & Wholesale Essentials. Supplying verified ring-spun cotton textiles, hotel-grade towels, microfiber maintenance utility products, and double bedsheets directly from Indian master looms.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-brand-indigo flex-shrink-0" />
                <span>Textile Cluster Hub, Solapur & Coimbatore, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-indigo flex-shrink-0" />
                <span>+91 98400 12345 (Direct Mill Line & B2B Orders)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-indigo flex-shrink-0" />
                <span>orders@mahalaxmienterprises.in</span>
              </div>
            </div>
          </div>

          {/* Col 3: Direct Mill Collections */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/collections/all" className="hover:text-white transition-colors">
                  Shop All Products
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <Link to={`/collections/${c.slug}`} className="hover:text-white transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Customer Support & Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Help & Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Our Mills & Quality
                </Link>
              </li>
              <li>
                <a href="#bulk-section" className="hover:text-white transition-colors">
                  Institutional & Bulk B2B Supply
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsTrackOrderOpen(true)}
                  className="hover:text-amber-300 text-left transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Track My Loom Dispatch</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">LIVE</span>
                </button>
              </li>
              <li>
                <span className="text-slate-400 cursor-default">
                  Pan-India Shipping: 3-5 Working Days
                </span>
              </li>
              <li>
                <span className="text-slate-400 cursor-default">
                  7-Day Quality Replacement Guarantee
                </span>
              </li>
              <li>
                <span className="text-slate-400 cursor-default">
                  GST Tax Invoicing on Every Order
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Direct Sourcing Trust & Admin Shortcut */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Enterprise Assurance
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Middlemen</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Transparent wholesale pricing with direct loom dispatch.
              </p>
              <div className="pt-2 border-t border-slate-700">
                <Link
                  to="/admin"
                  className="text-xs font-bold text-amber-300 hover:text-amber-200 block"
                >
                  Admin Control Panel →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal / Copyright Bar */}
      <div className="border-t border-slate-800 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Mahalaxmi Enterprises. All Rights Reserved. Direct Mill Rates & Wholesale Essentials.</p>
          <div className="flex items-center gap-6">
            <span>GST Registered B2B & Retail Entity</span>
            <span>Made with quality cotton weaves</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
