import React from 'react';
import { useRouter } from './router/Router';
import { HomePage } from './pages/storefront/HomePage';
import { CategoryPage } from './pages/storefront/CategoryPage';
import { ShopAllPage } from './pages/storefront/ShopAllPage';
import { ProductDetailPage } from './pages/storefront/ProductDetailPage';
import { CheckoutPage } from './pages/storefront/CheckoutPage';
import { OrderConfirmationPage } from './pages/storefront/OrderConfirmationPage';
import { AboutPage } from './pages/storefront/AboutPage';
import { WishlistPage } from './pages/storefront/WishlistPage';
import { LoginPage } from './pages/storefront/LoginPage';
import { AdminPage } from './pages/admin/AdminPage';
import { ToastContainer } from './components/common/ToastContainer';

export const App = () => {
  const { currentPath } = useRouter();

  // Normalize path without trailing slash (unless root)
  const path = currentPath.split('?')[0].replace(/\/+$/, '') || '/';

  // Route Dispatcher
  const renderRoute = () => {
    // 1. Admin Portal
    if (path.startsWith('/admin')) {
      return <AdminPage />;
    }

    // 2. Collections All (Shop All)
    if (path === '/collections/all') {
      return <ShopAllPage />;
    }

    // 3. Dedicated Category Pages (/collections/:categorySlug)
    if (path.startsWith('/collections/')) {
      const categorySlug = path.replace('/collections/', '');
      return <CategoryPage categorySlug={categorySlug} />;
    }

    // 4. Product Details (/products/:slug)
    if (path.startsWith('/products/')) {
      const slug = path.replace('/products/', '');
      return <ProductDetailPage slug={slug} />;
    }

    // 5. Checkout
    if (path === '/checkout') {
      return <CheckoutPage />;
    }

    // 6. Order Confirmation
    if (path.startsWith('/order-confirmation/')) {
      const orderId = path.replace('/order-confirmation/', '');
      return <OrderConfirmationPage orderId={orderId} />;
    }

    // 7. About Us
    if (path === '/about') {
      return <AboutPage />;
    }

    // 8. Wishlist
    if (path === '/wishlist') {
      return <WishlistPage />;
    }

    // 9. Login & Account
    if (path === '/login') {
      return <LoginPage />;
    }

    // Default: Curated Brand Landing Page (Homepage)
    return <HomePage />;
  };

  return (
    <>
      {renderRoute()}
      <ToastContainer />
    </>
  );
};
export default App;
