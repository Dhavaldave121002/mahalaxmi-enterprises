import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../router/Router';
import { Heart, ShoppingBag, Star, Check, AlertCircle } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist, isInWishlist } = useStore();
  const { navigate } = useRouter();

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= (product.lowStockThreshold || 10);

  const handleCardClick = (e) => {
    // If target is a button or inside button, do not navigate
    if (e.target.closest('button')) return;
    navigate(`/products/${product.slug}`);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative rounded-2xl bg-white border border-slate-200/90 shadow-subtle hover:shadow-premium hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badges (Discount, Direct Mill Rate, Stock Alert) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discountPercent > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-brand-navy text-white shadow-sm">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-amber-950 shadow-sm">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist Button Top-Right */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 shadow-sm ${
            isFavorited
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/90 text-slate-500 hover:text-rose-600 hover:bg-white'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-lg uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Subcategory & Rating row */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-semibold text-brand-violet uppercase tracking-wider">
              {product.subcategory || 'Textile'}
            </span>

            {product.rating && (
              <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400 text-[11px] font-normal">({product.reviewCount})</span>
              </div>
            )}
          </div>

          {/* Product Title */}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-brand-indigo transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Fabric / Specs Tag */}
          {product.fabric && (
            <p className="text-xs text-slate-500 mt-1 line-clamp-1">
              {product.fabric}
            </p>
          )}
        </div>

        {/* Pricing, Stock status, and Action */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          
          <div className="flex items-baseline justify-between mb-2.5">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-brand-navy">
                ₹{product.price}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{product.mrp}
                </span>
              )}
            </div>

            {/* Direct Mill Label */}
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
              Mill Rate
            </span>
          </div>

          {/* Stock Availability indicator */}
          <div className="flex items-center justify-between text-[11px] mb-3">
            {isOutOfStock ? (
              <span className="text-rose-600 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Unavailable
              </span>
            ) : isLowStock ? (
              <span className="text-amber-600 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Only {product.stock} left in stock
              </span>
            ) : (
              <span className="text-emerald-600 font-medium flex items-center gap-1">
                <Check className="w-3 h-3" />
                In Stock ({product.stock} units)
              </span>
            )}
            
            {product.bulkTiers && product.bulkTiers.length > 0 && (
              <span className="text-brand-indigo font-medium text-[10px]">
                Bulk discounts available
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-slate-900 hover:bg-brand-indigo text-white shadow-sm hover:shadow-md'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'Sold Out' : 'Quick Add'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
