import React from 'react';
import { AnnouncementBar } from '../../components/storefront/AnnouncementBar';
import { Navbar } from '../../components/storefront/Navbar';
import { HeroSection } from '../../components/storefront/HeroSection';
import { TrustValueStrip } from '../../components/storefront/TrustValueStrip';
import { CategoryGrid } from '../../components/storefront/CategoryGrid';
import { CuratedBestSellers } from '../../components/storefront/CuratedBestSellers';
import { WholesaleBulkSection } from '../../components/storefront/WholesaleBulkSection';
import { BrandStorySection } from '../../components/storefront/BrandStorySection';
import { FinalShoppingCta } from '../../components/storefront/FinalShoppingCta';
import { Footer } from '../../components/storefront/Footer';
import { CartDrawer } from '../../components/storefront/CartDrawer';

export const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-navy">
      <AnnouncementBar />
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        <TrustValueStrip />
        <CategoryGrid />
        <CuratedBestSellers />
        <WholesaleBulkSection />
        <BrandStorySection />
        <FinalShoppingCta />
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};
