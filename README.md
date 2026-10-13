# Mahalaxmi Enterprises — Direct Mill Rates & Wholesale Essentials
## Premium E-Commerce Storefront + Admin Dashboard

A production-quality, responsive e-commerce web application built with **React 18+**, **Vite**, **Tailwind CSS**, and **Lucide React**, designed specifically for **Mahalaxmi Enterprises**.

---

### 🌟 Features Overview

#### 1. Curated Storefront Experience (`/`)
- **Premium Announcement Bar**: Direct mill rates & B2B enquiry shortcuts.
- **Header with Instant Autocomplete Search**: Real-time product search with category pills, live price hints, and thumbnail preview.
- **Editorial Hero Section**: High-impact textile photography with value pillars (*"Everyday Essentials. Better Quality. Direct Mill Rates."*).
- **Trust & Value Strip**: Direct mill rates, quality-focused products, wholesale & retail, and convenient Pan-India shipping.
- **4 Dedicated Category Cards**:
  1. *Home and Kitchen* (`#F59E0B`) — Kitchen Towels, Aprons, Table Linens
  2. *Household* (`#10B981`) — Cleaning Cloths, Microfiber Dusters, Storage, Laundry Essentials
  3. *Textile* (`#3B82F6`) — 300 TC Bedsheets, Curtains, Premium Linen, Fabrics
  4. *Cotton Products* (`#8B5CF6`) — 550 GSM Bath Towels, Canvas Bags, Cotton Essentials, Direct Mill Goods
- **Curated Best Sellers**: Refined 4–6 card grid featuring direct mill rates, genuine discounts, and stock availability.
- **Wholesale & Bulk Buying Section**: Transparent tier discounting matrix (10+, 50+, 100+ units) with an interactive B2B enquiry modal.
- **Brand Story Section**: Highlighting loom provenance in Solapur, Coimbatore, and Surat.
- **Footer**: Full customer care links, policies, and GST compliance info.

#### 2. Dedicated Category Pages (`/collections/:categorySlug`)
- Custom category banner and contextual description.
- Subcategory filtering pills and breadcrumb navigation.
- Real-time price slider, in-stock only toggle, and sorting options (*Featured*, *Best Selling*, *Price Low to High*, *Price High to Low*, *A-Z*).
- Empty-state design with one-click filter reset.

#### 3. Product Details Page (`/products/:slug`)
- High-resolution gallery with thumbnail selector.
- Live bulk pricing tier table with click-to-apply quantities.
- Real-time stock counter and low-stock indicators.
- Technical textile specifications (GSM, thread count, dimensions, pack configuration).
- Care & wash instructions.
- Add to Cart and Buy Now.
- Related products recommendations from the same loom category.

#### 4. Cart & Checkout (`/checkout`)
- **Right-Side Sliding Cart Drawer**: Dynamic quantity controls, bulk tier recalculation, and coupon code support (`MILLDIRECT10`, `BULK15`, `MAHALAXMI5`).
- **Comprehensive Checkout**: Delivery address form with validation, Cash on Delivery (COD), and Instant UPI options.
- **Order Confirmation Page** (`/order-confirmation/:orderId`): Itemized invoice, consignment tracking number, and print-ready summary.

#### 5. Executive Admin Dashboard (`/admin`)
- **Overview & KPIs**: Live revenue counter, total order count, active SKUs, low-stock warnings, and recent order log.
- **Product Management**: Full CRUD modal for adding/editing products, setting bulk tiers, fabrics, and stock.
- **Category Management**: Edit category banners, colors, subcategories, and homepage visibility.
- **Homepage Studio**: Live-sync editor for hero copy, announcements, and brand story.
- **Order Management**: Status workflow (*Processing* ➔ *Delivered* / *Cancelled*) and tracking number assignment.
- **Inventory Controller**: Quick `+` / `-` stock adjustments, threshold alerts, and instant sync with the storefront.

---

### 🚀 Running Locally

The local development server is currently active:
```bash
# To run the development server:
npm run dev -- --host
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

To build the production bundle:
```bash
npm run build
```

---

### 📁 Project Structure

```
mahalaxmi-enterprises/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    ├── context/
    │   └── StoreContext.jsx       # State management with LocalStorage sync
    ├── data/
    │   └── mockData.js           # Centralized realistic catalog & order mock data
    ├── router/
    │   └── Router.jsx             # Client-side SPA router with URL history
    ├── components/
    │   ├── common/
    │   │   └── ToastContainer.jsx
    │   ├── storefront/
    │   │   ├── AnnouncementBar.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── HeroSection.jsx
    │   │   ├── TrustValueStrip.jsx
    │   │   ├── CategoryGrid.jsx
    │   │   ├── ProductCard.jsx
    │   │   ├── CuratedBestSellers.jsx
    │   │   ├── WholesaleBulkSection.jsx
    │   │   ├── BrandStorySection.jsx
    │   │   ├── FinalShoppingCta.jsx
    │   │   ├── Footer.jsx
    │   │   └── CartDrawer.jsx
    │   └── admin/
    │       ├── AdminLayout.jsx
    │       ├── AdminOverview.jsx
    │       ├── AdminProducts.jsx
    │       ├── AdminCategories.jsx
    │       ├── AdminHomepage.jsx
    │       ├── AdminOrders.jsx
    │       └── AdminInventory.jsx
    └── pages/
        ├── storefront/
        │   ├── HomePage.jsx
        │   ├── CategoryPage.jsx
        │   ├── ShopAllPage.jsx
        │   ├── ProductDetailPage.jsx
        │   ├── CheckoutPage.jsx
        │   ├── OrderConfirmationPage.jsx
        │   ├── AboutPage.jsx
        │   └── WishlistPage.jsx
        └── admin/
            └── AdminPage.jsx
```

# mahalaxmi-enterprises
"# mahalaxmi-enterprises" 
"# mahalaxmi-enterprises" 
