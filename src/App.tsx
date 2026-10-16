import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { LeadCaptureScreen } from './components/LeadCaptureScreen';
import { ResultScreen } from './components/ResultScreen';
import { AdminCRM } from './components/AdminCRM';
import { LegalGuideModal } from './components/LegalGuideModal';
import { AdminPasswordModal } from './components/AdminPasswordModal';
import { QUIZ_QUESTIONS } from './data/quizQuestions';
import { Lead, LeadAnswer, AppConfig } from './types';

const DEFAULT_CONFIG: AppConfig = {
  whatsappDestination: '593967349504',
  associationName: 'ACBR Pastaza',
  institutionSubtitle: 'Tu Sede INMOBILIARIA',
  leadMagnetTitle: 'Guía de Profesionalización Inmobiliaria en Ecuador + Beca Gremial',
  scholarshipDiscount: '30% DE BECA',
  websiteUrl: 'https://acbirpastaza.com',
  websiteDomain: 'acbirpastaza.com',
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<'start' | 'quiz' | 'capture' | 'result'>('start');
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('acbr_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [score, setScore] = useState(0);
  const [segment, setSegment] = useState('General');
  const [answers, setAnswers] = useState<LeadAnswer[]>([]);
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);
  const [guideModalOpen, setGuideModalOpen] = useState(false);

  // Load configuration from server
  useEffect(() => {
    fetch('/api/config')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Config not loaded');
      })
      .then((data) => setConfig(data))
      .catch((err) => console.log('Using default config', err));
  }, []);

  const handleStartQuiz = () => {
    setCurrentStep('quiz');
  };

  const handleQuizComplete = (finalScore: number, finalSegment: string, answersLog: LeadAnswer[]) => {
    setScore(finalScore);
    setSegment(finalSegment);
    setAnswers(answersLog);
    setCurrentStep('capture');
  };

  const handleLeadSubmitSuccess = (lead: Lead) => {
    setCurrentLead(lead);
    setCurrentStep('result');
  };

  const handleRestart = () => {
    setScore(0);
    setSegment('General');
    setAnswers([]);
    setCurrentLead(null);
    setCurrentStep('start');
  };

  const handleRequestCRM = () => {
    if (isAdminAuthenticated) {
      setIsAdminView(true);
    } else {
      setPasswordModalOpen(true);
    }
  };

  const handlePasswordSuccess = () => {
    try {
      sessionStorage.setItem('acbr_admin_authenticated', 'true');
    } catch {
      // Ignore
    }
    setIsAdminAuthenticated(true);
    setPasswordModalOpen(false);
    setIsAdminView(true);
  };

  return (
    <div className="min-h-screen bg-[#060d1a] text-slate-100 flex flex-col justify-between p-3 sm:p-5 md:p-8 font-sans">
      {/* Background radial atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-sky-600/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-40 right-10 w-[500px] h-[400px] bg-indigo-600/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center">
        {/* Top Header */}
        <Header
          currentView={isAdminView ? 'crm' : 'quiz'}
          onSelectView={(view) => setIsAdminView(view === 'crm')}
          onRequestCRM={handleRequestCRM}
          onOpenGuide={() => setGuideModalOpen(true)}
          scholarshipText={config.scholarshipDiscount}
        />

        {/* Admin CRM Portal */}
        {isAdminView ? (
          <AdminCRM
            onBackToQuiz={() => setIsAdminView(false)}
            config={config}
            onUpdateConfig={setConfig}
          />
        ) : (
          /* Main User Container */
          <main className="w-full bg-[#0b192c] rounded-2xl md:rounded-3xl shadow-2xl border border-slate-800 p-5 sm:p-7 md:p-10 relative overflow-hidden backdrop-blur-sm">
            {currentStep === 'start' && (
              <StartScreen
                onStart={handleStartQuiz}
                onOpenGuide={() => setGuideModalOpen(true)}
                scholarshipText={config.scholarshipDiscount}
              />
            )}

            {currentStep === 'quiz' && (
              <QuizScreen
                questions={QUIZ_QUESTIONS}
                onComplete={handleQuizComplete}
              />
            )}

            {currentStep === 'capture' && (
              <LeadCaptureScreen
                score={score}
                maxScore={50}
                segment={segment}
                answers={answers}
                config={config}
                onSubmitSuccess={handleLeadSubmitSuccess}
              />
            )}

            {currentStep === 'result' && currentLead && (
              <ResultScreen
                lead={currentLead}
                config={config}
                onRestart={handleRestart}
                onOpenGuide={() => setGuideModalOpen(true)}
              />
            )}
          </main>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-xs text-slate-500 mt-6 border-t border-slate-900/80">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3 px-2">
          <p>© 2026 ACBR Pastaza • Asociación de Corredores de Bienes Raíces de Pastaza. Tu Sede INMOBILIARIA.</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
            <a
              href="https://acbirpastaza.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 transition"
            >
              <span>🌐</span>
              <span className="font-mono">acbirpastaza.com</span>
            </a>
            <span>•</span>
            <span>Puyo • Pastaza • Ecuador</span>
            <span>•</span>
            <button
              onClick={isAdminView ? () => setIsAdminView(false) : handleRequestCRM}
              className="hover:text-sky-400 transition underline underline-offset-2 flex items-center gap-1"
            >
              <span>{isAdminView ? 'Modo Participante' : 'Acceso Administrativo'}</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Legal Guide Modal */}
      <LegalGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
      />

      {/* Admin Password Security Modal */}
      <AdminPasswordModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSuccess={handlePasswordSuccess}
      />
    </div>
  );
}
