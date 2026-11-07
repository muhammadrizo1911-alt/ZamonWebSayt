import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  Laptop, 
  Building2, 
  ShoppingBag, 
  Layers, 
  Send, 
  Search, 
  Check, 
  ArrowRight 
} from 'lucide-react';

interface ServicesBentoProps {
  currentLang: Language;
  onSelectService: (serviceName: string) => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({
  currentLang,
  onSelectService,
}) => {
  const t = translations[currentLang].services;

  const iconMap: Record<string, React.ReactNode> = {
    landing: <Laptop className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    corporate: <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    ecommerce: <ShoppingBag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    crm: <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    bot: <Send className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    seo: <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
  };

  return (
    <section id="services" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 mb-2">
            Raqamli Yechimlar
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight font-display">
            {t.sectionTitle}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((item: any, idx: number) => {
            const isFeatured = idx === 0 || idx === 2; // Feature first and third in layout
            return (
              <div
                key={item.id}
                className={`flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 transition-all duration-300 ${
                  isFeatured ? 'md:col-span-1 lg:col-span-1' : ''
                }`}
              >
                <div>
                  {/* Top Row: Natural editorial numbering & icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-sm font-mono font-medium text-neutral-400 dark:text-neutral-500">
                      {item.number}.
                    </span>
                    <div className="p-2 rounded-lg bg-neutral-200/50 dark:bg-neutral-800/60">
                      {iconMap[item.id] || <Laptop className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-display mb-1.5">
                    {item.title}
                  </h3>
                  <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-3">
                    {item.tagline}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Feature check list */}
                  <ul className="space-y-2 mb-6">
                    {item.features.map((feat: string, fIdx: number) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Card Footer: Price, Duration & Action */}
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-neutral-900 dark:text-white font-mono tabular-nums">
                      {item.startingPrice}
                    </div>
                    <div className="text-neutral-500 dark:text-neutral-400">
                      {item.duration}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectService(item.title)}
                    className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer group"
                  >
                    <span>Tanlash</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
