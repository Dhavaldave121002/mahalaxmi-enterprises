import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter, Link } from '../../router/Router';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';

const FEATURED_BEST_SELLERS = [
  {
    id: "bs-001",
    slug: "luxury-pastel-towel-set",
    name: "Luxury Combed Cotton Bath Towel Set",
    subcategory: "Cotton Products",
    price: 499,
    mrp: 699,
    discountPercent: 30,
    rating: 4.9,
    reviewCount: 156,
    stock: 50,
    images: ["/images/hero_towels.jpg"],
    fabric: "100% Combed Cotton (500 GSM)",
    badgeType: "discount",
  },
  {
    id: "bs-002",
    slug: "blue-floral-cotton-bedsheet",
    name: "Floral Motif Double Bedsheet with Pillow Covers",
    subcategory: "Textile",
    price: 799,
    mrp: 999,
    discountPercent: 20,
    rating: 4.8,
    reviewCount: 98,
    stock: 35,
    images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80"],
    fabric: "100% Cotton Satin Weave (300 TC)",
    badgeType: "discount",
  },
  {
    id: "bs-003",
    slug: "teal-waffle-weave-towels",
    name: "Teal Waffle Quick-Dry Face & Hand Towels",
    subcategory: "Home and Kitchen",
    price: 349,
    mrp: 465,
    discountPercent: 25,
    rating: 4.9,
    reviewCount: 112,
    stock: 42,
    images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80"],
    fabric: "Honeycomb Waffle Cotton (380 GSM)",
    badgeType: "discount",
  },
  {
    id: "bs-004",
    slug: "chef-linen-apron-mitt-set",
    name: "Durable Checked Chef Apron & Mitt Set",
    subcategory: "Home and Kitchen",
    price: 299,
    mrp: 399,
    discountPercent: 0,
    isNew: true,
    rating: 4.7,
    reviewCount: 45,
    stock: 60,
    images: ["https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=600&q=80"],
    fabric: "Heavy Duty Cotton Canvas",
    badgeType: "new",
  },
  {
    id: "bs-005",
    slug: "linen-wardrobe-organizer-box",
    name: "Reinforced Fabric Storage Box with Handles",
    subcategory: "Household",
    price: 425,
    mrp: 500,
    discountPercent: 15,
    rating: 4.8,
    reviewCount: 82,
    stock: 28,
    images: ["https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80"],
    fabric: "Heavy Linen Blended Fabric",
    badgeType: "discount",
  },
  {
    id: "bs-006",
    slug: "natural-canvas-tote-and-towels",
    name: "Heavy-Duty Cotton Canvas Tote & Towel Combo",
    subcategory: "Cotton Products",
    price: 399,
    mrp: 599,
    discountPercent: 33,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 210,
    stock: 75,
    images: ["https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80"],
    fabric: "Raw Cotton (450 GSM)",
    badgeType: "bestseller",
  },
];

export const CuratedBestSellers = () => {
  const { products } = useStore();

  // Combine store products or fall back to high-fidelity matching list
  const displayProducts = FEATURED_BEST_SELLERS.map((fItem) => {
    const existing = products.find(p => p.id === fItem.id || p.slug === fItem.slug);
    return existing ? { ...fItem, ...existing, images: fItem.images } : fItem;
  });

  return (
    <section id="best-sellers" className="py-12 sm:py-16 bg-[#F8FAFC] border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Most loved products, handpicked for you.
            </p>
          </div>

          <Link
            to="/collections/all?sort=best-selling"
            className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-indigo-600 text-xs sm:text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors self-start sm:self-auto"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        {/* 6 Product Cards Grid matching reference mockup */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
