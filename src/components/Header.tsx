import React from 'react';
import { BookOpen, Users, MessageCircle, Lock, ArrowLeft } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  currentView: 'quiz' | 'crm' | 'ai';
  onSelectView: (view: 'quiz' | 'crm' | 'ai') => void;
  onRequestCRM: () => void;
  onOpenGuide: () => void;
  scholarshipText: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  onRequestCRM,
  onOpenGuide,
  scholarshipText,
}) => {
  return (
    <header className="w-full max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4">
      {/* Official ACBR Pastaza Logo & Badge */}
      <div className="flex items-center gap-3">
        {/* Render Official Logo */}
        <Logo variant="card" size="md" />

        <div className="hidden sm:flex bg-[#112a46] border border-[#0284c7]/40 px-3 py-1.5 rounded-xl items-center gap-2 shadow">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[#38bdf8] text-[11px] font-black tracking-wider uppercase">
            RETO INMOBILIARIO ECUADOR
          </span>
        </div>
      </div>

      {/* Navigation & Action pills */}
      <div className="flex items-center gap-2 text-xs font-bold">
        {/* Direct WhatsApp pill with +593 96 734 9504 */}
        <a
          href="https://wa.me/593967349504?text=Hola%20ACBR%20Pastaza%2C%20deseo%20informaci%C3%B3n%20sobre%20el%20Reto%20Inmobiliario"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
          title="WhatsApp Oficial: +593 96 734 9504"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden md:inline font-mono">096 734 9504</span>
        </a>

        {/* Official Website link */}
        <a
          href="https://acbirpastaza.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-400/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
          title="Visitar Portal Web Oficial: acbirpastaza.com"
        >
          <span className="text-sm">🌐</span>
          <span className="font-semibold">acbirpastaza.com</span>
        </a>

        <button
          onClick={onOpenGuide}
          className="bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
        >
          <BookOpen className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">Guía Normativa</span>
        </button>

        {/* Protected CRM Button with Password Lock */}
        <button
          onClick={currentView === 'crm' ? () => onSelectView('quiz') : onRequestCRM}
          className={`px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 ${
            currentView === 'crm'
              ? 'bg-sky-600 border-sky-400 text-white shadow-lg'
              : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
          }`}
          title={
            currentView === 'crm'
              ? 'Volver al reto del usuario'
              : 'Acceso protegido por clave de seguridad (exclusivo ACBR Pastaza)'
          }
        >
          {currentView === 'crm' ? (
            <>
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ver Reto</span>
            </>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>CRM Leads</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
