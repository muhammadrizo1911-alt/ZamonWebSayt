import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = translations[currentLang].footer;
  const navT = translations[currentLang].nav;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-lg font-bold text-neutral-900 dark:text-white font-display">
              <span className="w-2.5 h-2.5 bg-indigo-600 dark:bg-indigo-500 rounded-xs"></span>
              ZamonWeb
            </div>
            <p className="text-xs leading-relaxed max-w-sm text-neutral-500 dark:text-neutral-400">
              {t.tagline}
            </p>
            <div className="text-[11px] text-neutral-400 pt-2 font-mono">
              O'zbekiston Respublikasi bo'ylab yuridik shartnoma asosida ishlaymiz.
            </div>
          </div>

          {/* Quick Nav Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-bold text-neutral-900 dark:text-white text-xs uppercase tracking-wider">
              {t.quickLinks}
            </div>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollTo('services')} 
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {navT.services}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('calculator')} 
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {navT.calculator}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('builder')} 
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {navT.builder}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('portfolio')} 
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {navT.portfolio}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('faq')} 
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {navT.faq}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-bold text-neutral-900 dark:text-white text-xs uppercase tracking-wider">
              {t.contactTitle}
            </div>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <span>{t.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span className="font-mono">{t.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span className="font-mono">{t.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div>
            © 2026 ZamonWeb Digital Studio. {t.rights}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span>Yuqoriga qaytish</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
