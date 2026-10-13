import React from 'react';
import { Factory, Truck, Package, Headphones } from 'lucide-react';
import { Link } from '../../router/Router';

export const AnnouncementBar = () => {
  return (
    <div className="bg-[#0B1528] text-white text-[11px] sm:text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-9">
          
          {/* Left: Mill Rates & Essentials */}
          <div className="flex items-center gap-2 text-slate-200">
            <span className="flex items-center gap-1.5 font-medium">
              <Factory className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Mill Rates</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 font-medium">Wholesale &amp; Retail</span>
            <span className="text-slate-600 hidden xs:inline">|</span>
            <span className="text-slate-300 font-medium hidden xs:inline">Quality Essentials</span>
          </div>

          {/* Right: Shipping, Bulk, Support */}
          <div className="hidden md:flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <Truck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Free Shipping on Orders Above ₹999</span>
            </span>
            <span className="text-slate-600">|</span>
            <a
              href="#bulk-section"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Package className="w-3.5 h-3.5 text-indigo-400" />
              <span>Bulk Enquiries</span>
            </a>
            <span className="text-slate-600">|</span>
            <Link
              to="/about"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Headphones className="w-3.5 h-3.5 text-indigo-400" />
              <span>Support</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
