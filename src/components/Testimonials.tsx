import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { clientTestimonials } from '../data/projects';
import { Star, Quote, TrendingUp } from 'lucide-react';

interface TestimonialsProps {
  currentLang: Language;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ currentLang }) => {
  const t = translations[currentLang].testimonials;

  return (
    <section className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 mb-2">
            {t.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight font-display">
            {t.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
            {t.subtitle}
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clientTestimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Result highlight */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{item.result}</span>
                  </div>
                </div>

                {/* Quote Text */}
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed italic mb-6">
                  "{item.comment}"
                </p>
              </div>

              {/* Author & Attribution */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 font-bold text-xs flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                  {item.avatarText}
                </div>
                <div>
                  <div className="font-semibold text-sm text-neutral-900 dark:text-white">
                    {item.name}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {item.role} · {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
