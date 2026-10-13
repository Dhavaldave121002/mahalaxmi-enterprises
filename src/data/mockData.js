// Centralized Mock Data for Mahalaxmi Enterprises

export const initialCategories = [
  {
    id: "home-and-kitchen",
    slug: "home-and-kitchen",
    name: "Home and Kitchen",
    accentColor: "#F59E0B",
    description: "Functional and durable culinary textiles, crafted for daily kitchen handling and elegant dining table presentation.",
    bannerImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1600&q=80",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
    subcategories: ["Kitchen Towels", "Aprons", "Table Linen"],
    displayOrder: 1,
    featuredOnHome: true,
  },
  {
    id: "household",
    slug: "household",
    name: "Household",
    accentColor: "#10B981",
    description: "High-absorption cleaning microfiber, lint-free utility dusters, durable storage and laundry utility products.",
    bannerImage: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1600&q=80",
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80",
    subcategories: ["Cleaning Cloths", "Microfiber Dusters", "Storage", "Laundry Essentials"],
    displayOrder: 2,
    featuredOnHome: true,
  },
  {
    id: "textile",
    slug: "textile",
    name: "Textile",
    accentColor: "#3B82F6",
    description: "Direct-from-loom premium double bedsheets, pure linen curtains, unstitched fabric rolls and breathable cotton weaves.",
    bannerImage: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
    subcategories: ["Double Bedsheets", "Curtains", "Premium Linen", "Fabrics"],
    displayOrder: 3,
    featuredOnHome: true,
  },
  {
    id: "cotton-products",
    slug: "cotton-products",
    name: "Cotton Products",
    accentColor: "#8B5CF6",
    description: "100% pure combed ring-spun cotton bath towels, heavy canvas bags, and raw mill-finished cotton essentials.",
    bannerImage: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1600&q=80",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    subcategories: ["Pure Cotton Bath Towels", "Canvas Bags", "Cotton Essentials", "Direct Mill Goods"],
    displayOrder: 4,
    featuredOnHome: true,
  }
];

export const initialProducts = [
  // Home and Kitchen
  {
    id: "hk-001",
    slug: "waffle-weave-kitchen-towels-pack-of-6",
    name: "Waffle-Weave Cotton Kitchen Towels (Pack of 6)",
    categoryId: "home-and-kitchen",
    subcategory: "Kitchen Towels",
    price: 349,
    mrp: 599,
    discountPercent: 41,
    rating: 4.8,
    reviewCount: 124,
    stock: 45,
    lowStockThreshold: 10,
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Loomed from 100% premium unbleached cotton, these honeycomb waffle-weave kitchen towels offer superior water absorption and dry twice as fast as flat towels. Engineered for rigorous daily culinary handling.",
    fabric: "100% Ring-spun Cotton (380 GSM)",
    dimensions: "45 cm x 65 cm",
    packSize: "Set of 6 Assorted Neutral Tones",
    bulkTiers: [
      { minQty: 10, pricePerUnit: 299 },
      { minQty: 30, pricePerUnit: 260 },
      { minQty: 100, pricePerUnit: 220 }
    ],
    isBestSeller: true,
    isFeatured: true,
    careInstructions: "Machine wash cold with mild detergent. Tumble dry low. Do not bleach."
  },
  {
    id: "hk-002",
    slug: "heavy-duty-cotton-canvas-chef-apron",
    name: "Heavy-Duty Cotton Canvas Chef Apron",
    categoryId: "home-and-kitchen",
    subcategory: "Aprons",
    price: 499,
    mrp: 850,
    discountPercent: 41,
    rating: 4.7,
    reviewCount: 88,
    stock: 32,
    lowStockThreshold: 8,
    images: [
      "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Built with 12oz reinforced cotton canvas and brass-finished hardware, this ergonomic cross-back chef apron prevents neck strain during long prep shifts in kitchens or craft workshops.",
    fabric: "12 oz Dense Cotton Canvas",
    dimensions: "72 cm width x 84 cm length",
    packSize: "Single Unit (Charcoal / Natural Olive)",
    bulkTiers: [
      { minQty: 10, pricePerUnit: 430 },
      { minQty: 25, pricePerUnit: 390 },
      { minQty: 50, pricePerUnit: 350 }
    ],
    isBestSeller: false,
    isFeatured: true,
    careInstructions: "Spot clean or gentle machine wash. Avoid harsh scrubbing on brass eyelets."
  },
  {
    id: "hk-003",
    slug: "hemstitched-pure-linen-table-runner-napkins",
    name: "Hemstitched Pure Cotton Table Runner & 6 Napkins Set",
    categoryId: "home-and-kitchen",
    subcategory: "Table Linen",
    price: 699,
    mrp: 1200,
    discountPercent: 42,
    rating: 4.9,
    reviewCount: 96,
    stock: 18,
    lowStockThreshold: 5,
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Classic hand-drawn hemstitch detailing crafted on pure cotton-linen textured fabric. Elevates both daily family dining and formal restaurant hospitality tables.",
    fabric: "80% Cotton, 20% Linen Blend",
    dimensions: "Runner: 33 x 180 cm | Napkins: 40 x 40 cm",
    packSize: "1 Runner + 6 Matching Dinner Napkins",
    bulkTiers: [
      { minQty: 10, pricePerUnit: 610 },
      { minQty: 25, pricePerUnit: 560 },
      { minQty: 50, pricePerUnit: 510 }
    ],
    isBestSeller: true,
    isFeatured: false,
    careInstructions: "Warm iron while slightly damp for crisp hotel-finish presentation."
  },

  // Household
  {
    id: "hh-001",
    slug: "ultra-dense-microfiber-cleaning-cloths-pack-of-12",
    name: "Commercial-Grade Microfiber Cleaning Cloths (Pack of 12)",
    categoryId: "household",
    subcategory: "Cleaning Cloths",
    price: 399,
    mrp: 699,
    discountPercent: 43,
    rating: 4.9,
    reviewCount: 312,
    stock: 120,
    lowStockThreshold: 20,
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=900&q=80"
    ],
    description: "High-density 340 GSM split microfiber with sonic-cut edgeless borders. Leaves streak-free, scratch-free surfaces on glass, kitchen countertops, stainless steel, and automobile finishes.",
    fabric: "80/20 Polyester-Polyamide Split Microfiber",
    dimensions: "40 cm x 40 cm",
    packSize: "12 Pack (Color-coded for hygienic zone cleaning)",
    bulkTiers: [
      { minQty: 10, pricePerUnit: 340 },
      { minQty: 50, pricePerUnit: 295 },
      { minQty: 100, pricePerUnit: 250 }
    ],
    isBestSeller: true,
    isFeatured: true,
    careInstructions: "Machine wash warm. Do NOT use fabric softeners or chlorine bleach."
  },
  {
    id: "hh-002",
    slug: "telescopic-microfiber-high-reach-duster",
    name: "Electrostatic Microfiber Extendable Fan & Ceiling Duster",
    categoryId: "household",
    subcategory: "Microfiber Dusters",
    price: 349,
    mrp: 599,
    discountPercent: 42,
    rating: 4.6,
    reviewCount: 74,
    stock: 28,
    lowStockThreshold: 6,
    images: [
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Bendable microfiber core with an anodized aluminum telescopic wand extending up to 100 inches. Traps cobwebs and microscopic dust through electrostatic attraction without aerosol sprays.",
    fabric: "High-loft Microfiber with Stainless Steel Pole",
    dimensions: "Extends from 30 inches to 100 inches",
    packSize: "1 Telescopic Pole + 1 Washable Head",
    bulkTiers: [
      { minQty: 10, pricePerUnit: 300 },
      { minQty: 30, pricePerUnit: 265 },
      { minQty: 100, pricePerUnit: 230 }
    ],
    isBestSeller: false,
    isFeatured: false,
    careInstructions: "Detachable head rinses under lukewarm tap water. Air dry thoroughly."
  },
  {
    id: "hh-003",
    slug: "reinforced-cotton-rope-laundry-basket",
    name: "Handwoven Cotton Rope Laundry Hamper & Utility Bin",
    categoryId: "household",
    subcategory: "Laundry Essentials",
    price: 849,
    mrp: 1499,
    discountPercent: 43,
    rating: 4.8,
    reviewCount: 63,
    stock: 14,
    lowStockThreshold: 5,
    images: [
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Braided with heavy unbleached cotton cord with integrated handles. Holds over 60 liters of laundry, linens, or toys while maintaining its sleek upright silhouette.",
    fabric: "100% Thick Cotton Cord with Natural Stitches",
    dimensions: "40 cm diameter x 50 cm height (62L capacity)",
    packSize: "Single Heavy-duty Hamper",
    bulkTiers: [
      { minQty: 5, pricePerUnit: 750 },
      { minQty: 20, pricePerUnit: 690 },
      { minQty: 50, pricePerUnit: 620 }
    ],
    isBestSeller: true,
    isFeatured: true,
    careInstructions: "Steam or warm iron inside out to shape after initial unpacking."
  },

  // Textile
  {
    id: "tx-001",
    slug: "300-tc-percale-cotton-king-double-bedsheet-set",
    name: "300 Thread Count Pure Cotton Double Bedsheet + 2 Pillow Covers",
    categoryId: "textile",
    subcategory: "Double Bedsheets",
    price: 899,
    mrp: 1799,
    discountPercent: 50,
    rating: 4.9,
    reviewCount: 245,
    stock: 64,
    lowStockThreshold: 15,
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Woven in our certified Solapur & Coimbatore partner mills from extra-long staple combed Indian cotton. Crisp percale matte finish that stays cool in summer and softens with each wash.",
    fabric: "100% Long-Staple Combed Cotton (300 TC Percale)",
    dimensions: "Bedsheet: 274 x 274 cm (108 x 108 in) | Pillows: 46 x 69 cm",
    packSize: "1 King Bedsheet + 2 Flapped Pillowcases",
    bulkTiers: [
      { minQty: 10, pricePerUnit: 780 },
      { minQty: 30, pricePerUnit: 720 },
      { minQty: 100, pricePerUnit: 650 }
    ],
    isBestSeller: true,
    isFeatured: true,
    careInstructions: "Machine wash at 40°C with like colors. Line dry in shade to preserve cotton tensile strength."
  },
  {
    id: "tx-002",
    slug: "semi-sheer-linen-cotton-textured-curtains-pair",
    name: "Natural Textured Cotton-Linen Window Curtains (Pair of 2)",
    categoryId: "textile",
    subcategory: "Curtains",
    price: 1149,
    mrp: 2200,
    discountPercent: 48,
    rating: 4.7,
    reviewCount: 92,
    stock: 22,
    lowStockThreshold: 6,
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Filters harsh afternoon sunlight while ensuring privacy with an organic slub texture. Features anti-rust stainless steel eyelets suitable for standard rods.",
    fabric: "Linen-Cotton Slub Yarn Blend",
    dimensions: "4.5 ft width x 7 ft height (Each panel)",
    packSize: "Pack of 2 Curtain Panels with Rust-Proof Eyelets",
    bulkTiers: [
      { minQty: 10, pricePerUnit: 990 },
      { minQty: 25, pricePerUnit: 920 },
      { minQty: 50, pricePerUnit: 840 }
    ],
    isBestSeller: false,
    isFeatured: false,
    careInstructions: "Gentle machine wash or hand wash in cold water. Hang damp to minimize wrinkles."
  },
  {
    id: "tx-003",
    slug: "mill-loom-unstitched-cotton-casement-fabric-5-meters",
    name: "Direct Loom Natural Unbleached Cotton Casement Fabric (5 Meters)",
    categoryId: "textile",
    subcategory: "Fabrics",
    price: 549,
    mrp: 899,
    discountPercent: 39,
    rating: 4.8,
    reviewCount: 51,
    stock: 50,
    lowStockThreshold: 10,
    images: [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Raw unbleached medium-weight cotton fabric directly off the powerloom. Ideal for apparel prototyping, upholstery lining, screen printing, and natural tie-dyeing.",
    fabric: "100% Grey Raw Cotton Casement",
    dimensions: "5 Meters Length x 44 Inches Width",
    packSize: "5-Meter Continuous Roll (Uncut)",
    bulkTiers: [
      { minQty: 5, pricePerUnit: 480 },
      { minQty: 20, pricePerUnit: 420 },
      { minQty: 50, pricePerUnit: 360 }
    ],
    isBestSeller: false,
    isFeatured: true,
    careInstructions: "Preshrunk washing recommended before final tailoring."
  },

  // Cotton Products
  {
    id: "cp-001",
    slug: "550-gsm-plush-hotel-cotton-bath-towel-pack-of-2",
    name: "550 GSM Pure Cotton Hotel Luxury Bath Towels (Pack of 2)",
    categoryId: "cotton-products",
    subcategory: "Pure Cotton Bath Towels",
    price: 649,
    mrp: 1299,
    discountPercent: 50,
    rating: 4.9,
    reviewCount: 388,
    stock: 75,
    lowStockThreshold: 12,
    images: [
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Produced with zero-twist combed cotton yarns for velvet-soft tactile feel and instantaneous moisture absorption. Heavyweight hotel standard that resists fraying after 100+ commercial wash cycles.",
    fabric: "100% Zero-Twist Combed Turkish Cotton (550 GSM)",
    dimensions: "70 cm x 140 cm (Large Bath Sheet)",
    packSize: "Pack of 2 (Ivory White / Slate Gray)",
    bulkTiers: [
      { minQty: 10, pricePerUnit: 560 },
      { minQty: 30, pricePerUnit: 510 },
      { minQty: 100, pricePerUnit: 450 }
    ],
    isBestSeller: true,
    isFeatured: true,
    careInstructions: "Wash with warm water and tumble dry on low. Do not use silicone softeners."
  },
  {
    id: "cp-002",
    slug: "organic-heavyweight-cotton-canvas-tote-bags-pack-of-5",
    name: "Organic Heavyweight Cotton Canvas Market Tote Bags (Pack of 5)",
    categoryId: "cotton-products",
    subcategory: "Canvas Bags",
    price: 499,
    mrp: 850,
    discountPercent: 41,
    rating: 4.8,
    reviewCount: 119,
    stock: 40,
    lowStockThreshold: 10,
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Crafted from 10oz unbleached natural canvas with cross-stitched webbing handles tested to hold up to 15 kg. Reusable, washable, and eco-friendly packaging alternative.",
    fabric: "10 oz Heavy Natural Cotton Canvas",
    dimensions: "38 cm width x 42 cm height with 10 cm gusset",
    packSize: "Pack of 5 Plain Canvas Bags",
    bulkTiers: [
      { minQty: 10, pricePerUnit: 420 },
      { minQty: 50, pricePerUnit: 360 },
      { minQty: 200, pricePerUnit: 310 }
    ],
    isBestSeller: true,
    isFeatured: true,
    careInstructions: "Machine wash cold. Shrinkage occurs minimally on first wash."
  },
  {
    id: "cp-003",
    slug: "direct-mill-cotton-duster-cleaning-rolls-pack-of-10",
    name: "Direct Mill Yellow Cotton Floor Mop Cloths & Rags (Pack of 10)",
    categoryId: "cotton-products",
    subcategory: "Direct Mill Goods",
    price: 279,
    mrp: 450,
    discountPercent: 38,
    rating: 4.7,
    reviewCount: 142,
    stock: 95,
    lowStockThreshold: 15,
    images: [
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Authentic commercial Indian mill-made yellow cotton floor cleaning cloths (pocha). High water retention capacity with reinforced double-overlocked edges to stop thread unraveling.",
    fabric: "100% Recycled Cotton Thread Mill Weave",
    dimensions: "50 cm x 50 cm",
    packSize: "Bundle of 10 Overlocked Yellow Cloths",
    bulkTiers: [
      { minQty: 10, pricePerUnit: 235 },
      { minQty: 50, pricePerUnit: 199 },
      { minQty: 100, pricePerUnit: 175 }
    ],
    isBestSeller: false,
    isFeatured: false,
    careInstructions: "Rinse thoroughly after each use. Bleach safe for heavy sanitation."
  }
];

export const initialOrders = [
  {
    id: "ORD-2026-8801",
    customerName: "Ramesh Sharma",
    customerEmail: "ramesh.sharma@example.com",
    customerPhone: "+91 98201 44521",
    shippingAddress: {
      addressLine: "Flat 402, Green Glen Heights, HSR Layout",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560102"
    },
    items: [
      {
        productId: "tx-001",
        productName: "300 Thread Count Pure Cotton Double Bedsheet + 2 Pillow Covers",
        quantity: 2,
        price: 899,
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80"
      },
      {
        productId: "cp-001",
        productName: "550 GSM Pure Cotton Hotel Luxury Bath Towels (Pack of 2)",
        quantity: 1,
        price: 649,
        image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=900&q=80"
      }
    ],
    subtotal: 2447,
    discountAmount: 100,
    shippingFee: 0,
    total: 2347,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    orderDate: "2026-10-10T14:32:00.000Z",
    trackingNumber: "DTDC-BLR-992384"
  },
  {
    id: "ORD-2026-8802",
    customerName: "Priya Sundaram",
    customerEmail: "priya.s@hospitalitycorp.in",
    customerPhone: "+91 94432 11980",
    shippingAddress: {
      addressLine: "Hotel Royal Palm, Avinashi Road",
      city: "Coimbatore",
      state: "Tamil Nadu",
      pincode: "641018"
    },
    items: [
      {
        productId: "cp-001",
        productName: "550 GSM Pure Cotton Hotel Luxury Bath Towels (Pack of 2)",
        quantity: 30,
        price: 510, // Bulk tier applied
        image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=900&q=80"
      },
      {
        productId: "hh-001",
        productName: "Commercial-Grade Microfiber Cleaning Cloths (Pack of 12)",
        quantity: 10,
        price: 340,
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80"
      }
    ],
    subtotal: 18700,
    discountAmount: 1500,
    shippingFee: 0,
    total: 17200,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    orderStatus: "Processing",
    orderDate: "2026-10-12T09:15:00.000Z",
    trackingNumber: "BLUEDART-COI-771290"
  },
  {
    id: "ORD-2026-8803",
    customerName: "Vikramaditya Roy",
    customerEmail: "vikram.roy@kolkataexports.com",
    customerPhone: "+91 98310 99823",
    shippingAddress: {
      addressLine: "14/B Southern Avenue, Ballygunge",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700029"
    },
    items: [
      {
        productId: "hk-001",
        productName: "Waffle-Weave Cotton Kitchen Towels (Pack of 6)",
        quantity: 3,
        price: 349,
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80"
      }
    ],
    subtotal: 1047,
    discountAmount: 0,
    shippingFee: 50,
    total: 1097,
    paymentMethod: "COD",
    paymentStatus: "Pending on Delivery",
    orderStatus: "Processing",
    orderDate: "2026-10-13T08:45:00.000Z",
    trackingNumber: "INDIA-POST-KOL-44210"
  }
];

export const initialHomepageConfig = {
  announcementBar: {
    enabled: true,
    text: "Direct Mill Rates | Wholesale & Retail | Quality Essentials",
    linkText: "Enquire for B2B",
    linkHref: "#bulk-section"
  },
  hero: {
    headline: "Everyday Essentials. Better Quality. Direct Mill Rates.",
    supportingText: "Discover thoughtfully selected textiles, cotton essentials and household products for your home and business.",
    primaryCtaText: "Explore Collections",
    primaryCtaLink: "/collections/all",
    secondaryCtaText: "Shop Best Sellers",
    secondaryCtaLink: "#best-sellers",
    trustLabel: "Wholesale & Retail",
    bannerImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1400&q=80"
  },
  trustStrip: [
    {
      id: "trust-1",
      title: "Direct Mill Rates",
      description: "Eliminating distributor middle margins directly from looms"
    },
    {
      id: "trust-2",
      title: "Quality-Focused Products",
      description: "Combed ring-spun cotton and industrial grade weaves"
    },
    {
      id: "trust-3",
      title: "Wholesale & Retail",
      description: "Buy single pieces or bulk carton quantities transparently"
    },
    {
      id: "trust-4",
      title: "Convenient Shopping",
      description: "Pan-India dispatch with verified door delivery"
    }
  ],
  bulkBanner: {
    title: "Wholesale & Institutional Bulk Supply",
    subtitle: "Supplying premier hotels, hospitals, retail shops, and institutions with certified textile goods at transparent tier rates.",
    ctaText: "Explore Bulk Pricing",
    contactEmail: "b2b@mahalaxmienterprises.in",
    contactPhone: "+91 98400 12345"
  },
  brandStory: {
    badge: "Direct Mill Craftsmanship",
    heading: "Bridging Loom Craftsmanship to Modern Indian Homes & Enterprises",
    text: "Founded on the bedrock of fair pricing, Mahalaxmi Enterprises sources directly from master textile hubs in Solapur, Coimbatore, and Surat. Every kitchen napkin, microfiber duster, and cotton bedsheet meets strict density, absorbency, and tensile standards — providing exceptional durability for both family homes and large-scale commercial facilities."
  }
};

export const availableCoupons = [
  {
    code: "MILLDIRECT10",
    discountType: "percentage",
    discountValue: 10,
    minOrder: 999,
    description: "10% instant discount on orders above ₹999"
  },
  {
    code: "BULK15",
    discountType: "percentage",
    discountValue: 15,
    minOrder: 4999,
    description: "15% wholesale discount on orders above ₹4,999"
  },
  {
    code: "MAHALAXMI5",
    discountType: "percentage",
    discountValue: 5,
    minOrder: 499,
    description: "5% welcoming discount on any order above ₹499"
  }
];
