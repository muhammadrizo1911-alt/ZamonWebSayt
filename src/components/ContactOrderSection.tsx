import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  Send, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  Clock, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface ContactOrderSectionProps {
  currentLang: Language;
  prefilledType?: string;
  prefilledNotes?: string;
  onClearPrefilled?: () => void;
}

export const ContactOrderSection: React.FC<ContactOrderSectionProps> = ({
  currentLang,
  prefilledType = '',
  prefilledNotes = '',
  onClearPrefilled,
}) => {
  const t = translations[currentLang].contact;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [siteType, setSiteType] = useState('Korporativ veb-sayt');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledType) {
      setSiteType(prefilledType);
    }
    if (prefilledNotes) {
      setNotes(prefilledNotes);
    }
  }, [prefilledType, prefilledNotes]);

  const validate = () => {
    const errs: { name?: string; phone?: string } = {};
    if (!name.trim()) {
      errs.name = 'Iltimos, ismingizni kiriting';
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 9) {
      errs.phone = 'Telefon raqamni to\'liq kiriting (masalan: +998 90 123 45 67)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setName('');
    setPhone('+998 ');
    setNotes('');
    if (onClearPrefilled) onClearPrefilled();
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context & Direct Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
              {t.badge}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight font-display">
              {t.title}
            </h2>

            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t.subtitle}
            </p>

            {/* Direct Connect Buttons */}
            <div className="pt-4 space-y-3">
              <a
                href="https://t.me/zamonweb_admin"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 hover:border-indigo-500 transition-colors group cursor-pointer"
              >
                <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    Telegram orqali to'g'ridan-to'g'ri aloqa:
                  </div>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                    @zamonweb_admin
                  </div>
                </div>
              </a>

              <a
                href="tel:+998901234567"
                className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 hover:border-indigo-500 transition-colors group cursor-pointer"
              >
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    Qo'ng'iroq markazi (9:00 - 20:00):
                  </div>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-white font-mono group-hover:text-indigo-600 transition-colors">
                    +998 (90) 123-45-67
                  </div>
                </div>
              </a>
            </div>

            {/* Assurance notice */}
            <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-neutral-900 dark:text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Maxfiylik va Shartnoma kafolati</span>
              </div>
              <p>
                Ma'lumotlaringiz xavfsiz saqlanadi va uchinchi shaxslarga berilmaydi.
              </p>
            </div>

          </div>

          {/* Right Column: Clean Form Container (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 shadow-sm">
              
              {isSubmitted ? (
                <div className="py-8 text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white font-display">
                    {t.form.successTitle}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
                    {t.form.successDesc}
                  </p>

                  <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 max-w-sm mx-auto text-left text-xs space-y-1.5 font-mono">
                    <div>Ism: <span className="font-semibold text-neutral-900 dark:text-white">{name}</span></div>
                    <div>Telefon: <span className="font-semibold text-neutral-900 dark:text-white">{phone}</span></div>
                    <div>Sayt turi: <span className="font-semibold text-neutral-900 dark:text-white">{siteType}</span></div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                      Yana yangi ariza yuborish
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                      {t.form.nameLabel} *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                      }}
                      placeholder={t.form.namePlaceholder}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.name ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-800'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                      {t.form.phoneLabel} *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                      }}
                      placeholder={t.form.phonePlaceholder}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-mono transition-colors bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.phone ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-800'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  {/* Site Type Dropdown */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                      {t.form.typeLabel}
                    </label>
                    <select
                      value={siteType}
                      onChange={(e) => setSiteType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 text-sm bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    >
                      <option value="Landing Page (Sotuvchi sahifa)">Landing Page (Sotuvchi sahifa)</option>
                      <option value="Korporativ veb-sayt">Korporativ veb-sayt</option>
                      <option value="Internet do'kon (E-commerce)">Internet do'kon (E-commerce)</option>
                      <option value="CRM / Maxsus portal">CRM / Maxsus portal</option>
                      <option value="Telegram Bot integratsiyasi">Telegram Bot integratsiyasi</option>
                      <option value="SEO optimallashtirish">SEO optimallashtirish</option>
                    </select>
                  </div>

                  {/* Message notes */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                      {t.form.messageLabel}
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t.form.messagePlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 text-sm bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? t.form.submitting : t.form.submitBtn}</span>
                    <Send className="w-4 h-4" />
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
