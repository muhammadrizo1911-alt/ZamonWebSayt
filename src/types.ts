export type Language = 'uz' | 'ru' | 'en';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  duration: string;
  startingPrice: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: 'ecommerce' | 'corporate' | 'restaurant' | 'startup';
  image: string;
  metric: string;
  metricLabel: string;
  description: string;
  challenge: string;
  solution: string;
  techStack: string[];
  completionTime: string;
}

export interface CalculatorState {
  siteType: 'landing' | 'corporate' | 'ecommerce' | 'portal';
  designLevel: 'standard' | 'premium' | 'exclusive';
  pagesCount: number;
  hasClickPayme: boolean;
  hasTelegramBot: boolean;
  hasMultiLang: boolean;
  hasAdminPanel: boolean;
  hasSeoOptimization: boolean;
  hasFreeDomainHosting: boolean;
  supportPlan: 'standard' | 'priority' | 'vip';
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  avatarText: string;
  comment: string;
  projectType: string;
  rating: number;
  result: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
