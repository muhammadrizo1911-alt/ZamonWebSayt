import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { FileText, Palette, Code2, Rocket } from 'lucide-react';

interface WorkflowStepsProps {
  currentLang: Language;
}

export const WorkflowSteps: React.FC<WorkflowStepsProps> = ({ currentLang }) => {
  const t = translations[currentLang].workflow;

  const stepIcons = [
    <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    <Palette className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    <Rocket className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
  ];

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

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.steps.map((step: any, idx: number) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-2xl font-bold text-neutral-300 dark:text-neutral-700">
                    {step.num}
                  </span>
                  <div className="p-2 rounded-xl bg-neutral-200/60 dark:bg-neutral-800">
                    {stepIcons[idx]}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-display mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-400 font-mono">
                Bosqich 0{idx + 1} / 04
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
