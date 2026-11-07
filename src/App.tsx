/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesBento } from './components/ServicesBento';
import { ProjectCalculator } from './components/ProjectCalculator';
import { InteractiveSiteBuilder } from './components/InteractiveSiteBuilder';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { WorkflowSteps } from './components/WorkflowSteps';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { ContactOrderSection } from './components/ContactOrderSection';
import { Footer } from './components/Footer';
import { Send, Phone } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('uz');
  const [isDark, setIsDark] = useState<boolean>(true);
  
  // Pre-filled state for the contact / order section
  const [prefilledType, setPrefilledType] = useState<string>('');
  const [prefilledNotes, setPrefilledNotes] = useState<string>('');

  // Synchronize dark class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyPlan = (details: {
    siteType: string;
    designTier: string;
    totalUzs: string;
    totalUsd: string;
    duration: string;
    selectedModules: string[];
  }) => {
    setPrefilledType(details.siteType);
    setPrefilledNotes(
      `Tanlangan hisob-kitob:\n` +
      `• Turi: ${details.siteType} (${details.designTier})\n` +
      `• Taxminiy narx: ${details.totalUzs} (${details.totalUsd})\n` +
      `• Muddat: ${details.duration}\n` +
      `• Modullar: ${details.selectedModules.join(', ')}`
    );
    scrollToContact();
  };

  const handleSelectService = (serviceName: string) => {
    setPrefilledType(serviceName);
    setPrefilledNotes(`Xizmat bo'yicha qiziqish: ${serviceName}`);
    scrollToContact();
  };

  const handleOrderTemplate = (templateName: string) => {
    setPrefilledType('Konstruktor andozasi');
    setPrefilledNotes(`Konstruktorda tanlangan andoza: ${templateName}`);
    scrollToContact();
  };

  const handleOrderSimilar = (projectName: string) => {
    setPrefilledType('Portfolio asosida');
    setPrefilledNotes(`Ushbu loyihaga o'xshash sayt yaratish: ${projectName}`);
    scrollToContact();
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-indigo-600 selection:text-white transition-colors duration-200">
      
      {/* Top Navbar adhering strictly to Top Bar Contract */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        isDark={isDark}
        onThemeToggle={toggleTheme}
        onOpenOrderModal={scrollToContact}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          currentLang={currentLang}
          onOpenCalculator={scrollToCalculator}
          onOpenPortfolio={scrollToPortfolio}
        />

        {/* 2. Core Capabilities & Bento Services */}
        <ServicesBento
          currentLang={currentLang}
          onSelectService={handleSelectService}
        />

        {/* 3. Interactive Pricing & Feature Calculator */}
        <ProjectCalculator
          currentLang={currentLang}
          onApplyPlan={handleApplyPlan}
        />

        {/* 4. Interactive Live Website Preview Builder */}
        <InteractiveSiteBuilder
          currentLang={currentLang}
          onOrderTemplate={handleOrderTemplate}
        />

        {/* 5. Selected Client Portfolio & Case Studies */}
        <PortfolioShowcase
          currentLang={currentLang}
          onOrderSimilar={handleOrderSimilar}
        />

        {/* 6. 4-Stage Workflow Steps */}
        <WorkflowSteps currentLang={currentLang} />

        {/* 7. Client Reviews and Social Proof */}
        <Testimonials currentLang={currentLang} />

        {/* 8. Frequently Asked Questions */}
        <FAQSection currentLang={currentLang} />

        {/* 9. Validated Contact and Consultation Form */}
        <ContactOrderSection
          currentLang={currentLang}
          prefilledType={prefilledType}
          prefilledNotes={prefilledNotes}
          onClearPrefilled={() => {
            setPrefilledType('');
            setPrefilledNotes('');
          }}
        />
      </main>

      {/* 10. Quiet Footer */}
      <Footer currentLang={currentLang} />

      {/* Floating Telegram / Call Shortcut Button */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-2.5">
        <a
          href="https://t.me/zamonweb_admin"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 p-3 rounded-full bg-sky-500 hover:bg-sky-600 text-white shadow-lg hover:scale-105 transition-all cursor-pointer"
          aria-label="Direct Telegram support"
          title="Telegram orqali bog'lanish"
        >
          <Send className="w-5 h-5" />
        </a>
      </div>

    </div>
  );
}
