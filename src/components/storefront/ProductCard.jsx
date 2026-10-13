import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../router/Router';
import { Heart, ShoppingCart, Star, Check, AlertCircle, Zap } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const { navigate } = useRouter();

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= (product.lowStockThreshold || 10);
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
      className="product-card group relative rounded-2xl bg-white border border-slate-200/90 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* ── Image Frame ── */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="product-img w-full h-full object-cover object-center"
          loading="lazy"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* ── Top-Left Badges ── */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.discountPercent > 0 && (
            <span className="animate-badge-pop inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-rose-500 text-white shadow-sm tracking-wide">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-400 text-amber-950 shadow-sm">
              Best Seller
            </span>
          )}
          {isNew && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-600 text-white shadow-sm">
              New
            </span>
          )}
        </div>

        {/* ── Wishlist Button ── */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 shadow-sm ${
            isFavorited
              ? 'bg-rose-500 text-white scale-110'
              : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white hover:scale-105'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
        </button>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick Add — appears on hover */}
        {!isOutOfStock && (
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-2.5 z-10">
            <button
              type="button"
              onClick={handleQuickAdd}
              className="w-full py-2 rounded-xl bg-brand-indigo hover:bg-brand-indigo-hover text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          </div>
        )}
      </div>

      {/* ── Product Info ── */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] font-bold text-brand-violet uppercase tracking-wider">
              {product.subcategory || 'Textile'}
            </span>
            {product.rating && (
              <div className="flex items-center gap-0.5 text-[11px] font-bold text-slate-700">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400 font-normal ml-0.5">({product.reviewCount})</span>
              </div>
            )}
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-indigo transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Fabric Tag */}
          {product.fabric && (
            <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{product.fabric}</p>
          )}
        </div>

        {/* ── Pricing & Stock ── */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-brand-navy">
                ₹{product.price?.toLocaleString('en-IN')}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{product.mrp?.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100">
              Mill Rate
            </span>
          </div>

          {/* Stock status */}
          <div className="flex items-center justify-between text-[11px]">
            {isOutOfStock ? (
              <span className="text-rose-500 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Unavailable
              </span>
            ) : isLowStock ? (
              <span className="text-amber-600 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Only {product.stock} left
              </span>
            ) : (
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" /> In Stock
              </span>
            )}
            {product.bulkTiers?.length > 0 && (
              <span className="text-brand-indigo font-semibold flex items-center gap-0.5 text-[10px]">
                <Zap className="w-3 h-3" /> Bulk Discount
              </span>
            )}
          </div>

          {/* Mobile / fallback Add to Cart button (visible always on mobile) */}
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleQuickAdd}
            className={`mt-2.5 w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 sm:hidden ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-slate-900 hover:bg-brand-indigo text-white'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
