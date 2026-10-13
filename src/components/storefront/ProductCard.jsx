import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../router/Router';
import { Heart, ShoppingCart, Star, Check, AlertCircle } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const { navigate } = useRouter();

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;
  const isNew = product.isNew;

  const handleCardClick = (e) => {
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
      className="group relative rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* ── Image Frame ── */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* ── Top-Left Badges ── */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.discountPercent > 0 && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold uppercase bg-rose-500 text-white shadow-xs">
              {product.discountPercent}% OFF
            </span>
          )}
          {isNew && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold bg-indigo-600 text-white shadow-xs">
              New
            </span>
          )}
          {product.isBestSeller && !product.discountPercent && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold bg-amber-400 text-amber-950 shadow-xs">
              Best Seller
            </span>
          )}
        </div>

        {/* ── Top-Right Wishlist Button ── */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 shadow-xs ${
            isFavorited
              ? 'bg-rose-500 text-white scale-105'
              : 'bg-white/95 text-slate-400 hover:text-rose-500 hover:bg-white'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorited ? 'fill-white' : ''}`} />
        </button>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="px-2.5 py-1 bg-slate-900 text-white text-[10px] font-bold rounded uppercase">
              Sold Out
            </span>
          </div>
        )}

        {/* Quick Add Slide-up on Desktop */}
        {!isOutOfStock && (
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-2 z-10 hidden sm:block">
            <button
              type="button"
              onClick={handleQuickAdd}
              className="w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold flex items-center justify-center gap-1 shadow-md transition-colors"
            >
              <ShoppingCart className="w-3 h-3" />
              <span>Add to Cart</span>
            </button>
          </div>
        )}
      </div>

      {/* ── Product Info ── */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-wider truncate">
              {product.subcategory || 'Textile'}
            </span>
            {product.rating && (
              <div className="flex items-center gap-0.5 text-[10px] font-bold text-slate-700 flex-shrink-0">
                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
              </div>
            )}
          </div>

          {/* Product Title */}
          <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-2.5 pt-2 border-t border-slate-100">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-sm sm:text-base font-extrabold text-slate-900">
                ₹{product.price?.toLocaleString('en-IN')}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-[10px] text-slate-400 line-through">
                  ₹{product.mrp?.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[8.5px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-100">
              Mill Rate
            </span>
          </div>

          {/* Mobile Add to Cart button */}
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleQuickAdd}
            className={`mt-2 w-full py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all sm:hidden ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-slate-900 hover:bg-indigo-600 text-white'
            }`}
          >
            <ShoppingCart className="w-3 h-3" />
            <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
