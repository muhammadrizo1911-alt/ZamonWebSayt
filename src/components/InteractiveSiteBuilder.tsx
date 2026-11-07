import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  Monitor, 
  Smartphone, 
  Palette, 
  Layout, 
  Sparkles, 
  Check, 
  Star, 
  PhoneCall,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

interface InteractiveSiteBuilderProps {
  currentLang: Language;
  onOrderTemplate: (templateName: string) => void;
}

type TemplateType = 'restaurant' | 'it' | 'fashion' | 'construction';
type ColorScheme = 'emerald' | 'sapphire' | 'amber' | 'obsidian';

export const InteractiveSiteBuilder: React.FC<InteractiveSiteBuilderProps> = ({
  currentLang,
  onOrderTemplate,
}) => {
  const t = translations[currentLang].builder;

  const [template, setTemplate] = useState<TemplateType>('restaurant');
  const [color, setColor] = useState<ColorScheme>('sapphire');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  
  // Section visibility states
  const [showHero, setShowHero] = useState(true);
  const [showServices, setShowServices] = useState(true);
  const [showGallery, setShowGallery] = useState(true);
  const [showReviews, setShowReviews] = useState(true);
  const [showContact, setShowContact] = useState(true);

  // Theme accent colors
  const colorStyles: Record<ColorScheme, {
    primary: string;
    primaryBg: string;
    border: string;
    accent: string;
    gradient: string;
  }> = {
    sapphire: {
      primary: 'bg-blue-600 text-white',
      primaryBg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
      border: 'border-blue-500',
      accent: 'text-blue-600 dark:text-blue-400',
      gradient: 'from-blue-600 to-indigo-700',
    },
    emerald: {
      primary: 'bg-emerald-600 text-white',
      primaryBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
      border: 'border-emerald-500',
      accent: 'text-emerald-600 dark:text-emerald-400',
      gradient: 'from-emerald-600 to-teal-700',
    },
    amber: {
      primary: 'bg-amber-600 text-white',
      primaryBg: 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300',
      border: 'border-amber-500',
      accent: 'text-amber-600 dark:text-amber-400',
      gradient: 'from-amber-600 to-orange-700',
    },
    obsidian: {
      primary: 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900',
      primaryBg: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200',
      border: 'border-neutral-800 dark:border-neutral-200',
      accent: 'text-neutral-900 dark:text-white',
      gradient: 'from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-400',
    },
  };

  // Mock template content based on choice
  const templateData: Record<TemplateType, {
    brand: string;
    headline: string;
    subhead: string;
    cta: string;
    itemsTitle: string;
    items: { title: string; price: string; desc: string }[];
    testimonial: string;
  }> = {
    restaurant: {
      brand: 'Oshpaz & Co',
      headline: 'Haqiqiy Milliy va Yevropa Taomlari',
      subhead: 'Toshkent bo\'ylab 40 daqiqada issiq yetkazib beramiz yoki zalda stol band qiling.',
      cta: 'Menyuni ko\'rish & Buyurtma',
      itemsTitle: 'Tavsiya etiladigan taomlar',
      items: [
        { title: 'To\'y Oshi (Maxsus go\'sht bilan)', price: '48 000 so\'m', desc: 'Ziravorlar bilan pishirilgan maxsus guruch' },
        { title: 'Ribeye Steyk (Medium rare)', price: '120 000 so\'m', desc: 'Grilda pishirilgan mol go\'shti' },
        { title: 'Yangi uzilgan Caesar Salati', price: '42 000 so\'m', desc: 'Parmesan va qarsildoq nonlar bilan' },
      ],
      testimonial: '«Taomlar doim issiq va juda mazali. Onlayn buyurtma qilish esa 1 daqiqa vaqt oladi!» — Farhod A.',
    },
    it: {
      brand: 'NexusCloud Tech',
      headline: 'Biznesingiz uchun Bulutli Infratuzilma',
      subhead: 'Tezkor serverlar, 99.99% uzluksiz ishlash kafolati va professional DevOps.',
      cta: 'Sinov muddatini boshlash',
      itemsTitle: 'Bizning yechimlar',
      items: [
        { title: 'Cloud VPS Serverlar', price: '150 000 so\'m/oy', desc: 'SSD xotira, Toshkentdagi serverlar' },
        { title: 'Avtomatlashtirilgan CI/CD', price: '450 000 so\'m/oy', desc: 'Tezkor relizlar va monitoring' },
        { title: 'Kiberxavfsizlik Auditi', price: '1 200 000 so\'m', desc: 'DDoS himoyasi va shifrlash' },
      ],
      testimonial: '«Saytimiz yuki oshganda serverlar soniyada kengayadi. A\'lo darajada!» — Rustam B.',
    },
    fashion: {
      brand: 'Silk & Thread',
      headline: 'Zamonaviy Liboslar va Aksessuarlar',
      subhead: 'Yangi mavsum kolleksiyasi: tabiiy matolar, bejirim bichim va o\'ziga xos uslub.',
      cta: 'Katalogga o\'tish',
      itemsTitle: 'Top mahsulotlar',
      items: [
        { title: 'Ipak Ko\'ylak (Eksklyuziv)', price: '540 000 so\'m', desc: '100% tabiiy shoyi mato' },
        { title: 'Klassik Jun Kostyum', price: '1 100 000 so\'m', desc: 'Italiya matolaridan tikilgan' },
        { title: 'Charm Sumka (Qo\'l mehnati)', price: '680 000 so\'m', desc: 'Sifatli tabiiy charm' },
      ],
      testimonial: '«Kiyimlar sifati juda ajoyib, yetkazib berish ham juda tez bo\'ldi.» — Nilufar K.',
    },
    construction: {
      brand: 'BinoQurilmasi',
      headline: 'Sifatli Bino va Xonadonlar Qurilishi',
      subhead: 'Zamonaviy arxitektura, seysmik chidamli karkas va to\'liq ta\'mirlangan uylar.',
      cta: 'Loyihalarni ko\'rish',
      itemsTitle: 'Amaldagi turar-joy majmualari',
      items: [
        { title: 'Navoiy Residence (Premium)', price: '1 kv.m — 14 mln so\'m', desc: 'Shahar markazida, yerosti avtoturargohi bilan' },
        { title: 'Yashil Voha Majmuasi', price: '1 kv.m — 9.5 mln so\'m', desc: 'Ekologik toza hudud, bolalar maydonchasi' },
        { title: 'Zamonaviy Biznes Markazi', price: 'Ijara: 250 ming so\'m/m²', desc: 'A toifadagi ofis maydonlari' },
      ],
      testimonial: '«Kvartiramizni o\'z vaqtida topshirishdi, qurilish materiallari a\'lo.» — Akmal S.',
    },
  };

  const currentTheme = colorStyles[color];
  const activeTemplate = templateData[template];

  return (
    <section id="builder" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
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

        {/* Builder Workspace: Left Controls (4 Cols) + Right Live Preview Frame (8 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Bar */}
          <div className="lg:col-span-4 space-y-6 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
            
            {/* 1. Template Choice */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2.5">
                {t.templates.label}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['restaurant', 'it', 'fashion', 'construction'] as const).map((tmpl) => (
                  <button
                    key={tmpl}
                    onClick={() => setTemplate(tmpl)}
                    className={`p-2.5 rounded-lg text-xs font-medium border text-left transition-colors cursor-pointer ${
                      template === tmpl
                        ? 'border-indigo-600 bg-white dark:bg-neutral-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800'
                    }`}
                  >
                    {t.templates[tmpl]}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Color Palette */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2.5">
                {t.colors.label}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['sapphire', 'emerald', 'amber', 'obsidian'] as const).map((clr) => (
                  <button
                    key={clr}
                    onClick={() => setColor(clr)}
                    className={`flex items-center gap-2 p-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      color === clr
                        ? 'border-neutral-900 dark:border-white bg-white dark:bg-neutral-800 font-semibold shadow-sm'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    <span 
                      className={`w-3.5 h-3.5 rounded-full ${
                        clr === 'sapphire' ? 'bg-blue-600' :
                        clr === 'emerald' ? 'bg-emerald-600' :
                        clr === 'amber' ? 'bg-amber-600' : 'bg-neutral-900 dark:bg-neutral-200'
                      }`}
                    />
                    <span>{t.colors[clr]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Toggleable Sections */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2.5">
                {t.blocks.label}
              </label>
              <div className="space-y-1.5 text-xs">
                {[
                  { label: t.blocks.hero, val: showHero, set: setShowHero },
                  { label: t.blocks.services, val: showServices, set: setShowServices },
                  { label: t.blocks.gallery, val: showGallery, set: setShowGallery },
                  { label: t.blocks.reviews, val: showReviews, set: setShowReviews },
                  { label: t.blocks.contact, val: showContact, set: setShowContact },
                ].map((b, i) => (
                  <label 
                    key={i} 
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 cursor-pointer text-neutral-700 dark:text-neutral-300"
                  >
                    <span>{b.label}</span>
                    <input
                      type="checkbox"
                      checked={b.val}
                      onChange={(e) => b.set(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Device Switcher */}
            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Ekran rejimi:
              </span>
              <div className="flex items-center bg-neutral-200 dark:bg-neutral-800 p-0.5 rounded-lg text-xs">
                <button
                  onClick={() => setDevice('desktop')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    device === 'desktop' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-medium shadow-xs' : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>{t.previewDevice.desktop}</span>
                </button>
                <button
                  onClick={() => setDevice('mobile')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    device === 'mobile' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-medium shadow-xs' : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{t.previewDevice.mobile}</span>
                </button>
              </div>
            </div>

            {/* Quick Order Button for this design */}
            <button
              onClick={() => onOrderTemplate(activeTemplate.brand + ' (' + t.templates[template] + ')')}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Shu dizaynda sayt yaratish</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

          </div>

          {/* Interactive Live Mockup Frame (8 Cols) */}
          <div className="lg:col-span-8 flex justify-center">
            <div 
              className={`transition-all duration-300 w-full rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-neutral-900 p-2 shadow-2xl ${
                device === 'mobile' ? 'max-w-sm' : 'max-w-full'
              }`}
            >
              {/* Browser / Device Chrome Header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-800 bg-neutral-950 rounded-t-xl text-neutral-400 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block"></span>
                </div>
                <div className="font-mono text-[11px] text-neutral-400 truncate max-w-xs">
                  https://www.{template}-demo.uz
                </div>
                <div className="w-10"></div>
              </div>

              {/* Mock Website Canvas */}
              <div className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 rounded-b-xl overflow-hidden max-h-[580px] overflow-y-auto text-xs">
                
                {/* Mini Nav */}
                <div className="border-b border-neutral-200 dark:border-neutral-800 px-4 py-3 flex items-center justify-between">
                  <div className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-xs ${currentTheme.primary}`}></span>
                    <span>{activeTemplate.brand}</span>
                  </div>
                  <button className={`px-2.5 py-1 rounded text-[11px] font-semibold ${currentTheme.primary}`}>
                    Aloqa
                  </button>
                </div>

                {/* Hero Block */}
                {showHero && (
                  <div className="p-6 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950 border-b border-neutral-200 dark:border-neutral-800 text-center space-y-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${currentTheme.primaryBg}`}>
                      2026 Yangi Format
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                      {activeTemplate.headline}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
                      {activeTemplate.subhead}
                    </p>
                    <div className="pt-2">
                      <button className={`px-4 py-2 rounded-lg text-xs font-semibold shadow-xs ${currentTheme.primary}`}>
                        {activeTemplate.cta}
                      </button>
                    </div>
                  </div>
                )}

                {/* Services / Menu Block */}
                {showServices && (
                  <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 space-y-4">
                    <div className="text-center">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
                        {activeTemplate.itemsTitle}
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {activeTemplate.items.map((item, idx) => (
                        <div key={idx} className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
                          <div className="font-semibold text-xs text-neutral-900 dark:text-white">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                            {item.desc}
                          </div>
                          <div className={`mt-2 font-mono font-bold text-xs ${currentTheme.accent}`}>
                            {item.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gallery / Showcase */}
                {showGallery && (
                  <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">Galereya va Foto lavhalar</span>
                      <span className="text-[10px] text-neutral-400">12 ta fotosurat</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((n) => (
                        <div key={n} className="aspect-[4/3] rounded-md bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 text-[10px]">
                          Foto #{n}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Testimonial */}
                {showReviews && (
                  <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 text-center space-y-2">
                    <div className="flex justify-center gap-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-current" />)}
                    </div>
                    <p className="italic text-xs text-neutral-600 dark:text-neutral-300 max-w-sm mx-auto">
                      {activeTemplate.testimonial}
                    </p>
                  </div>
                )}

                {/* Contact Form */}
                {showContact && (
                  <div className="p-6 bg-white dark:bg-neutral-950 text-center space-y-3">
                    <h5 className="font-bold text-xs">Biz bilan bog'laning</h5>
                    <div className="flex max-w-xs mx-auto gap-2">
                      <input 
                        type="text" 
                        readOnly 
                        value="+998 90 123 45 67" 
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-xs text-neutral-600 font-mono"
                      />
                      <button className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${currentTheme.primary}`}>
                        Yuborish
                      </button>
                    </div>
                  </div>
                )}

                {/* Mini Footer */}
                <div className="px-6 py-3 border-t border-neutral-200 dark:border-neutral-800 text-center text-[10px] text-neutral-400">
                  © 2026 {activeTemplate.brand}. Sayt ZamonWeb platformasida ishlab chiqilgan.
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
