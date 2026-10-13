import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles, X } from 'lucide-react';

export const AnnouncementBar = () => {
  const { homepageConfig } = useStore();
  const [dismissed, setDismissed] = useState(false);

  const announcement = homepageConfig?.announcementBar;
  if (!announcement?.enabled || dismissed) return null;

  return (
    <div className="bg-brand-navy text-white text-xs md:text-sm font-medium py-2.5 px-4 tracking-wide relative border-b border-white/10 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center space-x-2 text-center">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-brand-indigo/30 text-indigo-200 border border-indigo-400/30">
            DIRECT LOOM
          </span>
          <span className="text-slate-200 font-normal">
            {announcement.text || "Direct Mill Rates | Wholesale & Retail | Quality Essentials"}
          </span>
          {announcement.linkText && (
            <a
              href="#bulk-section"
              className="inline-flex items-center text-amber-300 hover:text-amber-200 underline underline-offset-4 ml-1.5 transition-colors font-medium"
            >
              <span>{announcement.linkText}</span>
              <ArrowRight className="w-3 h-3 ml-0.5" />
            </a>
          )}
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white transition-colors p-1 -mr-1"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
