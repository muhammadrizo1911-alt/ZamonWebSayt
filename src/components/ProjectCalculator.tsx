import React, { useState, useMemo } from 'react';
import { Language, CalculatorState } from '../types';
import { translations } from '../data/translations';
import { 
  Calculator, 
  Check, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';

interface ProjectCalculatorProps {
  currentLang: Language;
  onApplyPlan: (details: {
    siteType: string;
    designTier: string;
    totalUzs: string;
    totalUsd: string;
    duration: string;
    selectedModules: string[];
  }) => void;
}

export const ProjectCalculator: React.FC<ProjectCalculatorProps> = ({
  currentLang,
  onApplyPlan,
}) => {
  const t = translations[currentLang].calculator;

  const [state, setState] = useState<CalculatorState>({
    siteType: 'corporate',
    designLevel: 'premium',
    pagesCount: 5,
    hasClickPayme: true,
    hasTelegramBot: true,
    hasMultiLang: true,
    hasAdminPanel: true,
    hasSeoOptimization: true,
    hasFreeDomainHosting: true,
    supportPlan: 'standard',
  });

  // Base pricing matrix in Uzbek So'm (UZS)
  const basePrices: Record<string, number> = {
    landing: 2500000,
    corporate: 5500000,
    ecommerce: 9000000,
    portal: 14000000,
  };

  const designMultipliers: Record<string, number> = {
    standard: 1.0,
    premium: 1.25,
    exclusive: 1.55,
  };

  const modulePrices = {
    clickPayme: 1200000,
    telegramBot: 800000,
    multiLang: 900000,
    adminPanel: 1500000,
    seo: 1000000,
    freeHosting: 600000,
  };

  const baseDays: Record<string, number> = {
    landing: 5,
    corporate: 12,
    ecommerce: 18,
    portal: 28,
  };

  // Memoized Calculation
  const calculation = useMemo(() => {
    let base = basePrices[state.siteType] || 5000000;
    
    // Additional page cost beyond 1
    const extraPages = Math.max(0, state.pagesCount - 1);
    const pagesCost = extraPages * 250000;
    
    // Apply design multiplier
    const multiplier = designMultipliers[state.designLevel] || 1.0;
    let subtotal = (base + pagesCost) * multiplier;

    // Additional modules
    const modules: string[] = [];
    if (state.hasClickPayme) {
      subtotal += modulePrices.clickPayme;
      modules.push(t.modules.clickPayme);
    }
    if (state.hasTelegramBot) {
      subtotal += modulePrices.telegramBot;
      modules.push(t.modules.telegramBot);
    }
    if (state.hasMultiLang) {
      subtotal += modulePrices.multiLang;
      modules.push(t.modules.multiLang);
    }
    if (state.hasAdminPanel) {
      subtotal += modulePrices.adminPanel;
      modules.push(t.modules.adminPanel);
    }
    if (state.hasSeoOptimization) {
      subtotal += modulePrices.seo;
      modules.push(t.modules.seo);
    }
    if (state.hasFreeDomainHosting) {
      subtotal += modulePrices.freeHosting;
      modules.push(t.modules.freeHosting);
    }

    // Days calculation
    let days = baseDays[state.siteType] || 10;
    if (state.designLevel === 'exclusive') days += 5;
    if (state.pagesCount > 6) days += Math.floor((state.pagesCount - 6) / 2);
    if (state.hasClickPayme) days += 2;
    if (state.hasAdminPanel) days += 3;

    // USD approximate conversion rate ~ 12,800 UZS
    const usdEstimate = Math.round(subtotal / 12800);

    return {
      totalUzs: Math.round(subtotal),
      totalUsd: usdEstimate,
      days,
      modules,
    };
  }, [state, currentLang]);

  // Format currency helper
  const formatUzbekPrice = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' so\'m';
  };

  const handleReset = () => {
    setState({
      siteType: 'corporate',
      designLevel: 'premium',
      pagesCount: 5,
      hasClickPayme: true,
      hasTelegramBot: true,
      hasMultiLang: true,
      hasAdminPanel: true,
      hasSeoOptimization: true,
      hasFreeDomainHosting: true,
      supportPlan: 'standard',
    });
  };

  const handleOrder = () => {
    onApplyPlan({
      siteType: t.siteTypes[state.siteType],
      designTier: t.designLevel[state.designLevel],
      totalUzs: formatUzbekPrice(calculation.totalUzs),
      totalUsd: `$${calculation.totalUsd}`,
      duration: `${calculation.days} ${t.summary.days}`,
      selectedModules: calculation.modules,
    });
  };

  return (
    <section id="calculator" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (8 Cols) */}
          <div className="lg:col-span-7 space-y-8 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm">
            
            {/* 1. Site Type Selection */}
            <div>
              <label className="block text-sm font-bold text-neutral-900 dark:text-white mb-3">
                1. {t.siteTypes.label}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(['landing', 'corporate', 'ecommerce', 'portal'] as const).map((type) => {
                  const active = state.siteType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setState(prev => ({ ...prev, siteType: type }))}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        active
                          ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-200 ring-1 ring-indigo-600'
                          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-800 dark:text-neutral-200'
                      }`}
                    >
                      <div className="font-semibold text-sm">
                        {t.siteTypes[type]}
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        Boshlang'ich: {formatUzbekPrice(basePrices[type])}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Design Tier Selection */}
            <div>
              <label className="block text-sm font-bold text-neutral-900 dark:text-white mb-3">
                2. {t.designLevel.label}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['standard', 'premium', 'exclusive'] as const).map((tier) => {
                  const active = state.designLevel === tier;
                  return (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setState(prev => ({ ...prev, designLevel: tier }))}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        active
                          ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-200 ring-1 ring-indigo-600'
                          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <div className="text-xs font-semibold">{t.designLevel[tier]}</div>
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {tier === 'standard' ? 'Bazaviy' : tier === 'premium' ? '+25% sifat' : '+55% 3D & effekt'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Number of Pages Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-neutral-900 dark:text-white">
                  3. {t.pages.label}
                </label>
                <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                  {state.pagesCount} ta sahifa
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={state.pagesCount}
                onChange={(e) => setState(prev => ({ ...prev, pagesCount: parseInt(e.target.value) || 1 }))}
                className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 mt-1 font-mono">
                <span>1 (Landing)</span>
                <span>5 (Standart)</span>
                <span>10+ (Katalog)</span>
                <span>20 (Yirik portal)</span>
              </div>
            </div>

            {/* 4. Extra Integrations (Checkboxes) */}
            <div>
              <label className="block text-sm font-bold text-neutral-900 dark:text-white mb-3">
                4. {t.modules.label}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { key: 'hasClickPayme', label: t.modules.clickPayme, price: '+1 200 000 so\'m' },
                  { key: 'hasTelegramBot', label: t.modules.telegramBot, price: '+800 000 so\'m' },
                  { key: 'hasMultiLang', label: t.modules.multiLang, price: '+900 000 so\'m' },
                  { key: 'hasAdminPanel', label: t.modules.adminPanel, price: '+1 500 000 so\'m' },
                  { key: 'hasSeoOptimization', label: t.modules.seo, price: '+1 000 000 so\'m' },
                  { key: 'hasFreeDomainHosting', label: t.modules.freeHosting, price: '+600 000 so\'m' },
                ].map((item) => {
                  const isChecked = (state as any)[item.key];
                  return (
                    <label
                      key={item.key}
                      className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                        isChecked
                          ? 'border-indigo-500/60 bg-indigo-50/30 dark:bg-indigo-950/20 text-neutral-900 dark:text-neutral-100'
                          : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => setState(prev => ({ ...prev, [item.key]: e.target.checked }))}
                        className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-[11px] text-neutral-500 font-mono mt-0.5">{item.price}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Reset button */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Parametrlarni tiklash</span>
              </button>
            </div>

          </div>

          {/* Real-time Summary Card (5 Cols Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-lg">
              
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
                <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">
                  {t.summary.title}
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Kafolatlangan
                </span>
              </div>

              {/* Price Output */}
              <div className="py-4">
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                  {t.summary.approxPrice}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white font-mono tabular-nums tracking-tight">
                  {formatUzbekPrice(calculation.totalUzs)}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-mono">
                  {t.summary.usdApprox} <span className="font-bold text-neutral-700 dark:text-neutral-300">${calculation.totalUsd}</span>
                </div>
              </div>

              {/* Delivery Duration */}
              <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-between text-xs mb-4">
                <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                  <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>{t.summary.approxDuration}</span>
                </div>
                <span className="font-bold font-mono text-neutral-900 dark:text-white tabular-nums">
                  ~{calculation.days} {t.summary.days}
                </span>
              </div>

              {/* Selected Modules preview */}
              <div className="space-y-2 py-2">
                <div className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Tanlangan konfiguratsiya:
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 space-y-1">
                  <div>· {t.siteTypes[state.siteType]} ({state.pagesCount} sahifa)</div>
                  <div>· {t.designLevel[state.designLevel]}</div>
                  <div>· {calculation.modules.length} ta faol modul va integratsiya</div>
                </div>
              </div>

              {/* Standard Guarantees */}
              <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 space-y-1.5">
                <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  {t.summary.includes}
                </div>
                {t.summary.incList.map((inc: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>

              {/* Order Button */}
              <button
                type="button"
                onClick={handleOrder}
                className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
              >
                <span>{t.summary.orderBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
