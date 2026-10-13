import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter, Link } from '../../router/Router';
import { Navbar } from '../../components/storefront/Navbar';
import { AnnouncementBar } from '../../components/storefront/AnnouncementBar';
import { Footer } from '../../components/storefront/Footer';
import { CartDrawer } from '../../components/storefront/CartDrawer';
import { ProductCard } from '../../components/storefront/ProductCard';
import {
  ChevronRight,
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  Tag,
  Factory,
  Layers,
  ArrowRight,
  MessageCircle
} from 'lucide-react';

export const ProductDetailPage = ({ slug }) => {
  const {
    products,
    categories,
    addToCart,
    toggleWishlist,
    isInWishlist,
    getEffectiveUnitPrice,
    showToast
  } = useStore();
  const { navigate } = useRouter();

  const product = products.find((p) => p.slug === slug) || products[0];
  const category = categories.find((c) => c.id === product?.categoryId);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-bg text-brand-navy">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <div>
            <h2 className="text-xl font-bold">Product Not Found</h2>
            <Link to="/collections/all" className="mt-4 inline-block px-4 py-2 bg-brand-indigo text-white rounded-lg text-sm">
              Return to Catalog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= (product.lowStockThreshold || 10);
  const unitPrice = getEffectiveUnitPrice(product, quantity);
  const totalPrice = unitPrice * quantity;

  // Related products from same category (excluding current)
  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    const success = addToCart(product, quantity);
    if (success) {
      navigate('/checkout');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-navy">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-brand-indigo transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/collections/all" className="hover:text-brand-indigo transition-colors">Collections</Link>
            {category && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link to={`/collections/${category.slug}`} className="hover:text-brand-indigo transition-colors">
                  {category.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 font-semibold truncate max-w-xs">{product.name}</span>
          </nav>

          {/* Product Hero Layout: Gallery Left (6 cols), Details Right (6 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-premium">
            
            {/* Gallery Left */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image Frame */}
              <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-subtle group">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />

                {/* Badge tags */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.discountPercent > 0 && (
                    <span className="px-3 py-1 rounded-md text-xs font-black uppercase bg-brand-navy text-white shadow-sm">
                      {product.discountPercent}% OFF Direct Mill
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-amber-400 text-amber-950 shadow-sm">
                      Best Seller
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-4 right-4 p-3 rounded-full transition-all shadow-md ${
                    isFavorited
                      ? 'bg-rose-50 text-rose-600'
                      : 'bg-white/90 text-slate-500 hover:text-rose-600 hover:bg-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeImageIndex === idx
                          ? 'border-brand-indigo ring-2 ring-brand-indigo/20'
                          : 'border-slate-200 hover:border-slate-300 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${product.name} thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Technical Loom Highlights Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Factory className="w-4 h-4 text-brand-indigo" />
                  <span>Direct Mill Sourcing Provenance</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Loomed in Maharashtra & Tamil Nadu accredited textile clusters. Packed and sealed under stringent warp & weft quality controls.
                </p>
              </div>
            </div>

            {/* Product Details Right */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                
                {/* Category & Subcategory */}
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-violet mb-2">
                  <span>{category?.name || 'Direct Mill'}</span>
                  <span>•</span>
                  <span>{product.subcategory}</span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight leading-snug">
                  {product.name}
                </h1>

                {/* Ratings & Stock Row */}
                <div className="flex items-center gap-4 mt-3 pb-4 border-b border-slate-100 text-xs">
                  {product.rating && (
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-slate-500 font-normal">({product.reviewCount} customer reviews)</span>
                    </div>
                  )}

                  {/* Stock status indicator */}
                  <div>
                    {isOutOfStock ? (
                      <span className="text-rose-600 font-bold flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        Out of Stock
                      </span>
                    ) : isLowStock ? (
                      <span className="text-amber-600 font-bold flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        Only {product.stock} items remaining
                      </span>
                    ) : (
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        In Stock ({product.stock} units available)
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing Block */}
                <div className="mt-4 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block mb-0.5">Direct Mill Selling Rate</span>
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-3xl font-extrabold text-brand-navy">
                        ₹{unitPrice}
                      </span>
                      {product.mrp && product.mrp > unitPrice && (
                        <span className="text-sm text-slate-400 line-through">
                          MRP ₹{product.mrp}
                        </span>
                      )}
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        Save ₹{(product.mrp || unitPrice) - unitPrice}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-brand-indigo bg-white px-3 py-1 rounded-full border border-indigo-200 shadow-subtle">
                    Tax Inclusive
                  </span>
                </div>

                {/* Bulk Pricing Tiers Table */}
                {product.bulkTiers && product.bulkTiers.length > 0 && (
                  <div className="mt-5">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      <Tag className="w-3.5 h-3.5 text-brand-indigo" />
                      <span>Configured Bulk & Institutional Tiers</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {product.bulkTiers.map((tier, idx) => {
                        const isCurrentActive = quantity >= tier.minQty;
                        return (
                          <div
                            key={idx}
                            onClick={() => setQuantity(tier.minQty)}
                            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                              isCurrentActive
                                ? 'bg-indigo-900 text-white border-brand-indigo shadow-sm'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            <span className="block text-[10px] font-semibold opacity-80 uppercase">
                              {tier.minQty}+ Units
                            </span>
                            <span className="block text-sm font-extrabold mt-0.5">
                              ₹{tier.pricePerUnit} / pc
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1.5">
                      Click any tier to adjust quantity. Pricing calculates live at cart.
                    </p>
                  </div>
                )}

                {/* Attributes: Fabric, Pack, Dimensions */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  {product.packSize && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Pack Configuration</span>
                      <span className="font-semibold text-slate-800 mt-0.5 block">{product.packSize}</span>
                    </div>
                  )}
                  {product.fabric && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Fabric & GSM</span>
                      <span className="font-semibold text-slate-800 mt-0.5 block">{product.fabric}</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Dimensions</span>
                      <span className="font-semibold text-slate-800 mt-0.5 block">{product.dimensions}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Product Description
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Care Instructions */}
                {product.careInstructions && (
                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-600">
                    <span className="font-bold text-slate-700 block mb-1">Care & Wash Guide:</span>
                    <span>{product.careInstructions}</span>
                  </div>
                )}

              </div>

              {/* Actions Section */}
              <div className="pt-6 border-t border-slate-200 space-y-4">
                
                {/* Quantity Selector and Total */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">Quantity:</span>
                    <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1 || isOutOfStock}
                        className="p-1.5 rounded-lg hover:bg-white text-slate-600 disabled:opacity-40 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        max={product.stock || 1}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                        className="w-12 text-center text-xs font-bold bg-transparent outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        disabled={quantity >= product.stock || isOutOfStock}
                        className="p-1.5 rounded-lg hover:bg-white text-slate-600 disabled:opacity-40 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Total Amount:</span>
                    <span className="text-xl font-extrabold text-brand-navy">
                      ₹{totalPrice}
                    </span>
                  </div>
                </div>

                {/* Add to Cart and Buy Now Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={isOutOfStock}
                    onClick={handleAddToCart}
                    className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      isOutOfStock
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-white hover:bg-slate-50 text-brand-navy border border-slate-300 shadow-sm'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 text-brand-indigo" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    type="button"
                    disabled={isOutOfStock}
                    onClick={handleBuyNow}
                    className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      isOutOfStock
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        : 'bg-brand-indigo hover:bg-brand-indigo-hover text-white shadow-md shadow-indigo-600/25'
                    }`}
                  >
                    <span>Buy Now Directly</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Instant WhatsApp Wholesale Quote Button */}
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hello Mahalaxmi Enterprises! I am interested in wholesale/bulk pricing for "${product.name}" (Qty: ${quantity} units). Please share the rate sheet.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Inquire Direct Mill Rates on WhatsApp</span>
                </a>

                {/* Delivery and Guarantee strip */}
                <div className="grid grid-cols-3 gap-2 pt-3 text-[11px] text-slate-500 text-center border-t border-slate-100">
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-4 h-4 text-brand-indigo" />
                    <span>Fast Pan-India Dispatch</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Direct Mill Tested</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RotateCcw className="w-4 h-4 text-brand-violet" />
                    <span>7-Day Quality Guarantee</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Related Products from Same Category */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 sm:mt-20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy">
                    Related {category?.name || 'Collection'} Items
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Complementary essentials loomed from the same textile clusters.
                  </p>
                </div>
                {category && (
                  <Link
                    to={`/collections/${category.slug}`}
                    className="text-xs font-bold text-brand-indigo hover:underline"
                  >
                    View All {category.name} →
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};
