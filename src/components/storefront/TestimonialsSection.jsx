import React from 'react';
import { Star, ShieldCheck, Award, CheckCircle, Quote, Sparkles } from 'lucide-react';

export const TestimonialsSection = () => {
  const reviews = [
    {
      id: 1,
      name: 'Radhika Singhania',
      role: 'Verified Buyer',
      location: 'South Mumbai',
      rating: 5,
      product: '500 GSM Luxury Bath Towel Set',
      comment: 'The plush feel of these towels is unmatched. Even after 10+ washes, the ring-spun cotton remains cloud-soft with zero lint shedding. Pure 5-star hotel quality right in our home.',
      date: '2 days ago'
    },
    {
      id: 2,
      name: 'Vikramaditya Oberoi',
      role: 'Boutique Resort Owner',
      location: 'Udaipur, Rajasthan',
      rating: 5,
      product: '400 TC Satin Weave Bedsheets (Bulk 50 pcs)',
      comment: 'We switched our 30-room heritage resort linen supplies to Mahalaxmi Enterprises. The direct mill pricing saved us 35% without compromising an ounce of luxury softness.',
      date: '1 week ago'
    },
    {
      id: 3,
      name: 'Pooja & Ankit Dave',
      role: 'Verified Buyer',
      location: 'Ahmedabad, Gujarat',
      rating: 5,
      product: 'Honeycomb Waffle Face & Hand Towels',
      comment: 'Super fast drying and aesthetic earth tones! The waffle texture absorbs moisture instantly. The Surat loom direct dispatch reached us in just 2 days.',
      date: '3 weeks ago'
    }
  ];

  const certifications = [
    {
      title: 'OEKO-TEX® Standard 100',
      desc: 'Tested free from 100+ harmful chemical substances and toxic azo dyes.'
    },
    {
      title: '100% Ring-Spun Combed Cotton',
      desc: 'Extra-long staple yarn offering unmatched tensile durability.'
    },
    {
      title: 'Direct-From-Loom Guarantee',
      desc: 'Zero retail middleman markups. Shipped direct from mill warehouses.'
    },
    {
      title: 'Govt. GST & MSME Accredited',
      desc: 'Official GST tax invoices with instant B2B input credit eligibility.'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Mill Authenticity & Social Proof
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Trusted by 12,000+ Homes & Hospitality Partners
          </h2>
          <p className="mt-3 text-slate-600 text-sm leading-relaxed">
            From premier luxury boutique resorts to conscious homeowners, discover why discerning buyers choose our direct-from-loom cotton textiles.
          </p>
        </div>

        {/* Customer Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200/90 flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-100" />
              
              <div>
                {/* 5 Stars */}
                <div className="flex items-center space-x-1 mb-4 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-6 relative z-10 italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                    {rev.name}
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  </h4>
                  <p className="text-[11px] text-slate-500">{rev.location} • <span className="text-indigo-600 font-medium">{rev.product}</span></p>
                </div>
                <span className="text-[11px] text-slate-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications & Mill Guarantee Strip */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="text-center mb-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Mill Quality Assurance Standards
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, idx) => (
              <div key={idx} className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 text-indigo-600">
                  {idx === 0 && <Award className="w-5 h-5" />}
                  {idx === 1 && <ShieldCheck className="w-5 h-5" />}
                  {idx === 2 && <CheckCircle className="w-5 h-5" />}
                  {idx === 3 && <Award className="w-5 h-5 text-amber-600" />}
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-slate-900 leading-snug">{cert.title}</h5>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
