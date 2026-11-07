import React, { useState } from 'react';
import { Language, CaseStudy } from '../types';
import { translations } from '../data/translations';
import { portfolioProjects } from '../data/projects';
import { ExternalLink, X, Clock, Layers, ArrowUpRight, TrendingUp } from 'lucide-react';

interface PortfolioShowcaseProps {
  currentLang: Language;
  onOrderSimilar: (projectName: string) => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  currentLang,
  onOrderSimilar,
}) => {
  const t = translations[currentLang].portfolio;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);

  const filteredProjects = activeCategory === 'all'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 mb-2">
              {t.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight font-display">
              {t.title}
            </h2>
            <p className="mt-2 text-base text-neutral-600 dark:text-neutral-400">
              {t.subtitle}
            </p>
          </div>

          {/* Interactive Category Filter Tabs (allowed buttons with click handlers) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-200/60 dark:bg-neutral-800/80 rounded-xl">
            {[
              { id: 'all', label: t.tabs.all },
              { id: 'ecommerce', label: t.tabs.ecommerce },
              { id: 'corporate', label: t.tabs.corporate },
              { id: 'restaurant', label: t.tabs.restaurant },
              { id: 'startup', label: t.tabs.startup },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white shadow-xs font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden flex flex-col justify-between hover:border-indigo-500/40 dark:hover:border-indigo-400/40 transition-all duration-300 shadow-xs"
            >
              {/* Image Preview Container with fallback */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Metric Overlay Sticker */}
                <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-neutral-950/85 backdrop-blur-md border border-neutral-800 text-white max-w-[280px]">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-0.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span className="font-mono text-base tabular-nums">{project.metric}</span>
                  </div>
                  <div className="text-[11px] text-neutral-300 leading-tight">
                    {project.metricLabel}
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                    <span>{project.client}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{project.completionTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-display mb-2">
                    {project.title}
                  </h3>

                  <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech tags unboxed */}
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                    {project.techStack.slice(0, 3).map((tech, idx) => (
                      <span key={idx}>
                        {tech}
                        {idx < 2 && <span className="ml-2 text-neutral-300 dark:text-neutral-700">/</span>}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
                  >
                    <span>{t.detailsBtn}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Case Study Modal Dialog */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md">
              <div className="text-xs uppercase font-mono tracking-wider text-neutral-500">
                {selectedProject.client}
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="rounded-xl overflow-hidden aspect-[16/9] bg-neutral-100 dark:bg-neutral-900">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white font-display">
                  {selectedProject.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Key Metric Highlight */}
              <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-4">
                <div className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 font-display tabular-nums">
                  {selectedProject.metric}
                </div>
                <div className="text-xs text-emerald-800 dark:text-emerald-300">
                  <div className="font-semibold">Erishilgan Natija:</div>
                  <div>{selectedProject.metricLabel}</div>
                </div>
              </div>

              {/* Challenge & Solution Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
                  <div className="font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                    Mavjud Muammo:
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {selectedProject.challenge}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
                  <div className="font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1.5">
                    Bizning Yechim:
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              {/* Tech Stack Chips & Duration */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-neutral-200 dark:border-neutral-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500">Texnologiyalar:</span>
                  <div className="flex flex-wrap gap-1 font-mono text-neutral-700 dark:text-neutral-300">
                    {selectedProject.techStack.join(' · ')}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-500 font-mono">
                  <Clock className="w-4 h-4" />
                  <span>{selectedProject.completionTime}</span>
                </div>
              </div>

              {/* Modal Footer CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    const title = selectedProject.title;
                    setSelectedProject(null);
                    onOrderSimilar(title);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors text-center cursor-pointer"
                >
                  {t.orderSimilarBtn}
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="py-3 px-5 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  {t.closeBtn}
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};
