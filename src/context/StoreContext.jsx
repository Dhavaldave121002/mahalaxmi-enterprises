import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialCategories,
  initialProducts,
  initialOrders,
  initialHomepageConfig,
  availableCoupons
} from '../data/mockData';

const StoreContext = createContext(null);

const CURRENT_DATA_VERSION = 'v5_sync_latest_photos';

// Invalidate stale localStorage cache when data version changes
try {
  const savedVersion = localStorage.getItem('mahalaxmi_data_version');
  if (savedVersion !== CURRENT_DATA_VERSION) {
    localStorage.removeItem('mahalaxmi_categories');
    localStorage.removeItem('mahalaxmi_products');
    localStorage.removeItem('mahalaxmi_homepage_config');
    localStorage.setItem('mahalaxmi_data_version', CURRENT_DATA_VERSION);
  }
} catch (e) {
  // Ignore localStorage access issues
}

export const StoreProvider = ({ children }) => {
  // Load initial states from localStorage with graceful fallback
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('mahalaxmi_categories');
      return saved ? JSON.parse(saved) : initialCategories;
    } catch (e) {
      return initialCategories;
    }
  });

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('mahalaxmi_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch (e) {
      return initialProducts;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('mahalaxmi_orders');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch (e) {
      return initialOrders;
    }
  });

  const [homepageConfig, setHomepageConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('mahalaxmi_homepage_config');
      return saved ? JSON.parse(saved) : initialHomepageConfig;
    } catch (e) {
      return initialHomepageConfig;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('mahalaxmi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('mahalaxmi_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Auth User State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('mahalaxmi_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const loginUser = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem('mahalaxmi_user', JSON.stringify(userData));
    } catch (e) {}
  };

  const logoutUser = () => {
    setUser(null);
    try {
      localStorage.removeItem('mahalaxmi_user');
    } catch (e) {}
    showToast('Signed out successfully');
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mahalaxmi_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('mahalaxmi_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('mahalaxmi_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('mahalaxmi_homepage_config', JSON.stringify(homepageConfig));
  }, [homepageConfig]);

  useEffect(() => {
    localStorage.setItem('mahalaxmi_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mahalaxmi_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  // Cart Management
  const addToCart = (product, quantity = 1, customVariant = null) => {
    if (product.stock <= 0) {
      showToast(`${product.name} is currently out of stock`, 'error');
      return false;
    }

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.customVariant === customVariant
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        if (newQty > product.stock) {
          showToast(`Cannot add more than available stock (${product.stock})`, 'error');
          return prevCart;
        }
        updated[existingIndex].quantity = newQty;
        return updated;
      } else {
        const addQty = Math.min(quantity, product.stock);
        return [...prevCart, { product, quantity: addQty, customVariant }];
      }
    });

    showToast(`Added "${product.name}" to your cart`);
    setIsCartOpen(true);
    return true;
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const prod = products.find((p) => p.id === productId);
    if (prod && newQuantity > prod.stock) {
      showToast(`Only ${prod.stock} units available in stock`, 'error');
      newQuantity = prod.stock;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Calculate pricing with Bulk Tiers and Coupons
  const getEffectiveUnitPrice = (product, quantity) => {
    if (!product.bulkTiers || product.bulkTiers.length === 0) {
      return product.price;
    }
    // Sort descending by minQty
    const sortedTiers = [...product.bulkTiers].sort((a, b) => b.minQty - a.minQty);
    const applicableTier = sortedTiers.find((tier) => quantity >= tier.minQty);
    return applicableTier ? applicableTier.pricePerUnit : product.price;
  };

  const cartSubtotal = cart.reduce((total, item) => {
    const unitPrice = getEffectiveUnitPrice(item.product, item.quantity);
    return total + unitPrice * item.quantity;
  }, 0);

  // Apply Coupon
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const found = availableCoupons.find((c) => c.code === cleanCode);
    if (!found) {
      return { success: false, message: 'Invalid promo code. Try MILLDIRECT10 or BULK15' };
    }
    if (cartSubtotal < found.minOrder) {
      return {
        success: false,
        message: `Coupon requires minimum order of ₹${found.minOrder.toLocaleString('en-IN')}`
      };
    }
    setAppliedCoupon(found);
    showToast(`Coupon "${found.code}" applied!`);
    return { success: true, message: `Applied: ${found.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  let cartDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      cartDiscount = Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
    } else {
      cartDiscount = appliedCoupon.discountValue;
    }
  }

  // Shipping logic: Free shipping above ₹999, else flat ₹60
  const cartShipping = cartSubtotal >= 999 || cart.length === 0 ? 0 : 60;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  // Wishlist
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed from Wishlist: ${product.name}`, 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved to Wishlist: ${product.name}`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Product CRUD (Admin)
  const addProduct = (newProduct) => {
    const id = 'pr-' + Date.now().toString(36);
    const slug = newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const productRecord = {
      ...newProduct,
      id,
      slug,
      rating: newProduct.rating || 4.8,
      reviewCount: newProduct.reviewCount || 1,
      stock: Number(newProduct.stock) || 0,
      price: Number(newProduct.price) || 0,
      mrp: Number(newProduct.mrp) || Number(newProduct.price) || 0,
      discountPercent: Math.max(0, Math.round(((newProduct.mrp - newProduct.price) / (newProduct.mrp || 1)) * 100)),
      lowStockThreshold: Number(newProduct.lowStockThreshold) || 10,
      images: Array.isArray(newProduct.images) && newProduct.images.length > 0 ? newProduct.images : [
        "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80"
      ]
    };
    setProducts((prev) => [productRecord, ...prev]);
    showToast(`Added product "${productRecord.name}"`);
    return productRecord;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const price = updatedFields.price !== undefined ? Number(updatedFields.price) : item.price;
          const mrp = updatedFields.mrp !== undefined ? Number(updatedFields.mrp) : item.mrp;
          const discountPercent = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
          return {
            ...item,
            ...updatedFields,
            price,
            mrp,
            discountPercent,
            stock: updatedFields.stock !== undefined ? Number(updatedFields.stock) : item.stock
          };
        }
        return item;
      })
    );
    showToast('Product updated successfully');
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product deleted from catalog', 'info');
  };

  const updateProductStock = (id, newStock) => {
    const num = Math.max(0, parseInt(newStock, 10) || 0);
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: num } : p))
    );
    showToast('Stock inventory updated');
  };

  // Category Management
  const updateCategory = (id, updatedFields) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
    showToast('Category updated');
  };

  const addCategory = (categoryData) => {
    const id = categoryData.slug || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat = {
      ...categoryData,
      id,
      slug: id,
      displayOrder: categories.length + 1,
      featuredOnHome: true
    };
    setCategories((prev) => [...prev, newCat]);
    showToast(`Added category "${newCat.name}"`);
    return newCat;
  };

  // Homepage Config Management
  const updateHomepageConfig = (newConfig) => {
    setHomepageConfig((prev) => ({
      ...prev,
      ...newConfig
    }));
    showToast('Homepage presentation settings updated');
  };

  // Order Management
  const createOrder = (orderData) => {
    const id = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id,
      orderDate: new Date().toISOString(),
      orderStatus: 'Processing',
      paymentStatus: orderData.paymentMethod === 'COD' ? 'Pending on Delivery' : 'Paid (Verified)',
      trackingNumber: `EXP-MLL-${Math.floor(100000 + Math.random() * 900000)}`,
      ...orderData
    };

    // Deduct stock
    setProducts((prev) =>
      prev.map((prod) => {
        const boughtItem = orderData.items.find((item) => item.productId === prod.id);
        if (boughtItem) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - boughtItem.quantity)
          };
        }
        return prod;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Order #${id} placed successfully!`);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus, trackingNumber) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            orderStatus: newStatus,
            trackingNumber: trackingNumber !== undefined ? trackingNumber : order.trackingNumber
          };
        }
        return order;
      })
    );
    showToast(`Order #${orderId} marked as ${newStatus}`);
  };

  // Reset to factory defaults helper
  const resetToFactoryDefaults = () => {
    setCategories(initialCategories);
    setProducts(initialProducts);
    setOrders(initialOrders);
    setHomepageConfig(initialHomepageConfig);
    setCart([]);
    setWishlist([]);
    localStorage.clear();
    showToast('Reset to factory demo defaults');
  };

  return (
    <StoreContext.Provider
      value={{
        categories,
        products,
        orders,
        homepageConfig,
        cart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        appliedCoupon,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        toasts,
        showToast,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        getEffectiveUnitPrice,
        toggleWishlist,
        isInWishlist,
        addProduct,
        updateProduct,
        deleteProduct,
        updateProductStock,
        updateCategory,
        addCategory,
        updateHomepageConfig,
        createOrder,
        updateOrderStatus,
        resetToFactoryDefaults,
        user,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
