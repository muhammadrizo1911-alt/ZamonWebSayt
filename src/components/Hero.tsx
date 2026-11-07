import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ArrowRight, Calculator, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  currentLang: Language;
  onOpenCalculator: () => void;
  onOpenPortfolio: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onOpenCalculator,
  onOpenPortfolio,
}) => {
  const t = translations[currentLang].hero;

  return (
    <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden border-b border-neutral-200 dark:border-neutral-800">
      {/* Background ambient gradient glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none -z-10" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed kicker label with metadata separation */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
              <span>{t.badge}</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-500 dark:text-neutral-400 font-normal">Toshkent, O'zbekiston</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.12] [text-wrap:balance]">
              <span>{t.titleHighlight} </span>
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                {t.titleSuffix}
              </span>
            </h1>

            {/* Sub-headline description */}
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl font-normal leading-relaxed">
              {t.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-xl transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>{t.calcBtn}</span>
              </button>

              <button
                onClick={onOpenPortfolio}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl transition-all cursor-pointer"
              >
                <span>{t.portfolioBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Guarantees inline text */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Shartnoma va kafolat</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Click & Payme integratsiyasi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Qulay admin boshqaruv</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Focal Carrier with Actual Generated Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-xl bg-neutral-100 dark:bg-neutral-900 group">
              <img
                src="/src/assets/images/hero_web_agency_1794027695519.jpg"
                alt="ZamonWeb Digital Agency Studio Workstation"
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs uppercase tracking-wider text-indigo-300 font-semibold mb-1">
                  Zamonaviy Texnologiyalar
                </div>
                <div className="text-sm font-medium text-neutral-200">
                  React 19 · Node.js · Click & Payme API · SEO Optimization
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width KPI Strip strictly below hero split */}
        <div className="mt-14 pt-8 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white font-display tabular-nums">
              {t.stats.projects}
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              {t.stats.projectsLabel}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white font-display tabular-nums">
              {t.stats.days}
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              {t.stats.daysLabel}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white font-display tabular-nums">
              {t.stats.satisfaction}
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              {t.stats.satisfactionLabel}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white font-display tabular-nums">
              {t.stats.support}
            </div>
            <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              {t.stats.supportLabel}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
