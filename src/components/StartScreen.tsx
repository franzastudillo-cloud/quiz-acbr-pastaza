import React from 'react';
import { ArrowRight, CheckCircle2, Award, Sparkles, Building2, BookCheck, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';

interface StartScreenProps {
  onStart: () => void;
  onOpenGuide: () => void;
  scholarshipText: string;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStart,
  onOpenGuide,
  scholarshipText,
}) => {
  return (
    <div className="py-2 animate-fade-in">
      {/* Association Header Branding Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-4 rounded-2xl bg-[#060d1a]/90 border border-slate-800">
        <Logo variant="card" size="lg" />

        <div className="text-right flex flex-col items-end gap-1">
          <div className="inline-flex items-center gap-1.5 bg-[#112a46] border border-sky-500/30 px-3 py-1 rounded-full text-[11px] font-bold text-sky-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sede Oficial • ACBR Pastaza</span>
          </div>
          <a
            href="https://acbirpastaza.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 transition underline underline-offset-2"
          >
            <span>🌐 Web Oficial:</span>
            <span className="font-mono">acbirpastaza.com</span>
          </a>
          <p className="text-[11px] text-slate-400">
            WhatsApp: <span className="text-emerald-400 font-mono font-bold">+593 96 734 9504</span>
          </p>
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4 text-white tracking-tight">
        🏠 ¡Pon a prueba tus conocimientos inmobiliarios!
      </h1>

      <p className="text-slate-300 text-base md:text-lg mb-6 leading-relaxed">
        5 preguntas clave para demostrar cuánto sabes del mundo legal, normativo y comercial de los bienes raíces en Ecuador. Al finalizar, desbloquea tu <strong>diagnóstico oficial</strong>, tu <strong>Certificado Digital</strong> y el beneficio exclusivo de <strong>ACBR Pastaza • Tu Sede Inmobiliaria ({scholarshipText})</strong>.
      </p>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <div className="bg-[#060d1a]/80 border border-slate-800 p-3.5 rounded-xl flex items-start gap-2.5">
          <BookCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
          <div className="text-left">
            <h4 className="text-xs font-bold text-white">Leyes & UAFE</h4>
            <p className="text-[11px] text-slate-400">Ley de 1984 y deberes ante la UAFE en Ecuador.</p>
          </div>
        </div>

        <div className="bg-[#060d1a]/80 border border-slate-800 p-3.5 rounded-xl flex items-start gap-2.5">
          <Building2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-left">
            <h4 className="text-xs font-bold text-white">100% Virtual</h4>
            <p className="text-[11px] text-slate-400">Formación oficial accesible desde cualquier provincia.</p>
          </div>
        </div>

        <div className="bg-[#060d1a]/80 border border-slate-800 p-3.5 rounded-xl flex items-start gap-2.5">
          <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-left">
            <h4 className="text-xs font-bold text-white">Licencia CBR</h4>
            <p className="text-[11px] text-slate-400">Respaldo legal oficial y alianzas internacionales.</p>
          </div>
        </div>
      </div>

      {/* Main CTA */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={onStart}
          className="w-full sm:w-auto bg-[#0284c7] hover:bg-[#0369a1] active:scale-95 text-white font-extrabold py-4 px-8 rounded-xl shadow-xl hover:shadow-sky-500/20 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base md:text-lg cursor-pointer"
        >
          <span>Empezar el reto ahora</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={onOpenGuide}
          className="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white font-bold py-4 px-5 rounded-xl border border-slate-700 transition text-sm flex items-center justify-center gap-1.5"
        >
          <span>Ver resumen normativo previo</span>
        </button>
      </div>

      <div className="flex items-center gap-4 mt-6 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          5 preguntas interactivas
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          Toma menos de 2 minutos
        </span>
        <span className="hidden sm:flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          Certificado inmediato
        </span>
      </div>
    </div>
  );
};
