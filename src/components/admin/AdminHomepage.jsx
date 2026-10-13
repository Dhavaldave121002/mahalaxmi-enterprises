import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Home, Save, CheckCircle2, Eye, Sparkles, ExternalLink } from 'lucide-react';

export const AdminHomepage = () => {
  const { homepageConfig, updateHomepageConfig, showToast } = useStore();

  const [formData, setFormData] = useState({
    announcementText: homepageConfig?.announcementBar?.text || '',
    announcementEnabled: homepageConfig?.announcementBar?.enabled !== false,
    heroHeadline: homepageConfig?.hero?.headline || '',
    heroSupportingText: homepageConfig?.hero?.supportingText || '',
    heroPrimaryCtaText: homepageConfig?.hero?.primaryCtaText || '',
    heroSecondaryCtaText: homepageConfig?.hero?.secondaryCtaText || '',
    heroTrustLabel: homepageConfig?.hero?.trustLabel || '',
    heroBannerImage: homepageConfig?.hero?.bannerImage || '',
    bulkTitle: homepageConfig?.bulkBanner?.title || '',
    bulkSubtitle: homepageConfig?.bulkBanner?.subtitle || '',
    brandStoryHeading: homepageConfig?.brandStory?.heading || '',
    brandStoryText: homepageConfig?.brandStory?.text || ''
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();

    const newConfig = {
      ...homepageConfig,
      announcementBar: {
        ...homepageConfig.announcementBar,
        enabled: formData.announcementEnabled,
        text: formData.announcementText
      },
      hero: {
        ...homepageConfig.hero,
        headline: formData.heroHeadline,
        supportingText: formData.heroSupportingText,
        primaryCtaText: formData.heroPrimaryCtaText,
        secondaryCtaText: formData.heroSecondaryCtaText,
        trustLabel: formData.heroTrustLabel,
        bannerImage: formData.heroBannerImage
      },
      bulkBanner: {
        ...homepageConfig.bulkBanner,
        title: formData.bulkTitle,
        subtitle: formData.bulkSubtitle
      },
      brandStory: {
        ...homepageConfig.brandStory,
        heading: formData.brandStoryHeading,
        text: formData.brandStoryText
      }
    };

    updateHomepageConfig(newConfig);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Homepage Content & Presentation Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Edit hero messaging, announcement copy, and editorial brand story sections. Changes synchronize immediately.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedSuccess && (
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 animate-fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Published Live!</span>
            </span>
          )}
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-subtle"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Open Storefront Preview</span>
          </a>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        
        {/* 1. Announcement Bar Settings */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">
              1. Announcement Strip Bar
            </h3>
            <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.announcementEnabled}
                onChange={(e) => setFormData({ ...formData, announcementEnabled: e.target.checked })}
                className="rounded text-brand-indigo"
              />
              <span>Enabled</span>
            </label>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Announcement Message
            </label>
            <input
              type="text"
              value={formData.announcementText}
              onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-brand-indigo outline-none text-xs"
            />
          </div>
        </div>

        {/* 2. Hero Section Settings */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
            2. Hero Editorial Banner
          </h3>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Headline Title *
            </label>
            <input
              type="text"
              required
              value={formData.heroHeadline}
              onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-brand-indigo outline-none text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Supporting Body Text
            </label>
            <textarea
              rows={2}
              value={formData.heroSupportingText}
              onChange={(e) => setFormData({ ...formData, heroSupportingText: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-brand-indigo outline-none text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Primary CTA Button</label>
              <input
                type="text"
                value={formData.heroPrimaryCtaText}
                onChange={(e) => setFormData({ ...formData, heroPrimaryCtaText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Secondary CTA Button</label>
              <input
                type="text"
                value={formData.heroSecondaryCtaText}
                onChange={(e) => setFormData({ ...formData, heroSecondaryCtaText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Trust Label</label>
              <input
                type="text"
                value={formData.heroTrustLabel}
                onChange={(e) => setFormData({ ...formData, heroTrustLabel: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Hero Editorial Photography URL
            </label>
            <input
              type="url"
              value={formData.heroBannerImage}
              onChange={(e) => setFormData({ ...formData, heroBannerImage: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono"
            />
          </div>
        </div>

        {/* 3. Wholesale & Institutional Banner */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
            3. Wholesale & Institutional B2B Banner
          </h3>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Bulk Section Heading
            </label>
            <input
              type="text"
              value={formData.bulkTitle}
              onChange={(e) => setFormData({ ...formData, bulkTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Bulk Section Description
            </label>
            <textarea
              rows={2}
              value={formData.bulkSubtitle}
              onChange={(e) => setFormData({ ...formData, bulkSubtitle: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
            />
          </div>
        </div>

        {/* 4. Brand Story Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
            4. Brand Story & Loom Provenance
          </h3>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Story Headline
            </label>
            <input
              type="text"
              value={formData.brandStoryHeading}
              onChange={(e) => setFormData({ ...formData, brandStoryHeading: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Story Narrative
            </label>
            <textarea
              rows={3}
              value={formData.brandStoryText}
              onChange={(e) => setFormData({ ...formData, brandStoryText: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
            />
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-4 bg-white p-4 rounded-2xl border border-slate-300 shadow-xl flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Saving updates both desktop and mobile storefront immediately.
          </span>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-indigo hover:bg-brand-indigo-hover text-white text-xs font-bold shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Publish Homepage Changes</span>
          </button>
        </div>

      </form>
    </div>
  );
};
