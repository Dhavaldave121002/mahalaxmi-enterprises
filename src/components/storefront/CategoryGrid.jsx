import React from 'react';
import { useRouter } from '../../router/Router';

const CATEGORIES = [
  {
    id: 'best-sellers',
    slug: 'all?sort=best-selling',
    title: 'BEST SELLERS',
    image: '/images/cat_bestsellers.jpg',
    alt: 'Woman in beige robe beside luxury made bed'
  },
  {
    id: 'textile',
    slug: 'textile',
    title: 'BEDDING',
    image: '/images/cat_bedding.jpg',
    alt: 'Earth tone olive and brown layered linen bed'
  },
  {
    id: 'household',
    slug: 'household',
    title: 'PILLOWS & DUVET INSERTS',
    image: '/images/cat_pillows.jpg',
    alt: 'Plush white goose down pillows and puffy duvet'
  },
  {
    id: 'cotton-products',
    slug: 'cotton-products',
    title: 'TOWELS & ROBES',
    image: '/images/cat_robes.jpg',
    alt: 'Woman in plush mauve robe with towel on head on balcony'
  }
];

export const CategoryGrid = () => {
  const { navigate } = useRouter();

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Serif Section Title matching Parachute reference */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-slate-900 tracking-tight">
            Shop by Category
          </h2>
        </div>

        {/* 4 Portrait Luxury Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/collections/${cat.slug}`)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Tall Vertical Portrait Image Frame */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
                <img
                  src={cat.image}
                  alt={cat.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Centered Uppercase Category Label */}
              <div className="mt-4 text-center">
                <span className="inline-block text-xs sm:text-[13px] font-semibold tracking-[0.14em] text-slate-900 group-hover:text-indigo-600 transition-colors uppercase">
                  {cat.title}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
