export interface QuizOption {
  text: string;
  correct?: boolean;
  tag?: string;
}

export interface QuizQuestion {
  id: number;
  q: string;
  isSegmentation?: boolean;
  options: QuizOption[];
  explanation: string;
  legalBasis?: string;
}

export interface LeadAnswer {
  questionIndex: number;
  question: string;
  selectedText: string;
  isCorrect: boolean;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  city: string;
  email?: string;
  score: number;
  maxScore: number;
  segment: string;
  rank: string;
  status: 'nuevo' | 'contactado' | 'matriculado' | 'archivado';
  answers?: LeadAnswer[];
  createdAt: string;
  whatsappSent?: boolean;
  notes?: string;
}

export interface AppConfig {
  whatsappDestination: string;
  associationName: string;
  institutionSubtitle: string;
  leadMagnetTitle: string;
  scholarshipDiscount: string;
  websiteUrl: string;
  websiteDomain: string;
}
