import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  Copy,
  Check,
  Award,
  BookOpen,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  Clock,
} from 'lucide-react';
import { Lead, AppConfig } from '../types';
import { DiplomaCard } from './DiplomaCard';
import { AIAdvisor } from './AIAdvisor';

interface ResultScreenProps {
  lead: Lead;
  config: AppConfig;
  onRestart: () => void;
  onOpenGuide: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  lead,
  config,
  onRestart,
  onOpenGuide,
}) => {
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(5);
  const [autoRedirectStopped, setAutoRedirectStopped] = useState(false);

  const correctCount = Math.round(lead.score / 10);
  const totalQuestions = Math.round(lead.maxScore / 10);

  // Format WhatsApp message sending complete data and results to ACBR Pastaza
  const generateWhatsAppUrl = () => {
    const rawDest = config.whatsappDestination || '593967349504';
    const cleanDest = rawDest.replace(/\D/g, '');

    const message = `¡Hola *${config.associationName || 'ACBR Pastaza'}*! 🏠 (Tu Sede Inmobiliaria)
Acabo de completar el *Reto Inmobiliario Oficial* y recibí mi Certificado Digital.

👤 *Nombre:* ${lead.name}
📍 *Ciudad:* ${lead.city}
📱 *WhatsApp:* ${lead.phone}${lead.email ? `\n✉️ *Email:* ${lead.email}` : ''}
🏆 *Resultado obtenido:* ${lead.score}/${lead.maxScore} pts (${correctCount}/${totalQuestions} aciertos)
🎖️ *Nivel:* ${lead.rank}
🎯 *Mi interés:* ${lead.segment}
🆔 *Código de Certificado:* ${lead.id}
🌐 *Portal Oficial:* https://acbirpastaza.com

Deseo conversar con un asesor para conocer la beca o descuento asignado según mi resultado obtenido. ¡Muchas gracias!`;

    return `https://wa.me/${cleanDest}?text=${encodeURIComponent(message)}`;
  };

  const whatsAppUrl = generateWhatsAppUrl();

  const handleOpenWhatsApp = () => {
    setAutoRedirectStopped(true);
    setCountdown(null);
    window.open(whatsAppUrl, '_blank');
  };

  const handleCopyMessage = () => {
    const message = `¡Hola ACBR Pastaza! 🏠 Acabo de completar el Reto Inmobiliario: Nombre: ${lead.name}, Ciudad: ${lead.city}, Tel: ${lead.phone}, Resultado: ${lead.score}/${lead.maxScore} pts (${correctCount}/${totalQuestions} aciertos - ${lead.rank}), Interés: ${lead.segment}, Código: ${lead.id}. Deseo conocer la beca o descuento asignado según mi resultado.`;
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Auto-open WhatsApp after 5s unless cancelled
  useEffect(() => {
    if (countdown === null || autoRedirectStopped) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      window.open(whatsAppUrl, '_blank');
      setCountdown(null);
    }
  }, [countdown, autoRedirectStopped, whatsAppUrl]);

  return (
    <div className="py-2 animate-fade-in space-y-6">
      {/* Success Notification Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 to-[#0b192c] border border-emerald-500/50 p-4 md:p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40">
                CERTIFICADO ENTREGADO • DATOS REGISTRADOS
              </span>
              <span className="text-[11px] font-mono text-slate-400">{lead.id}</span>
            </div>
            <h2 className="text-lg md:text-xl font-black text-white mt-0.5">
              ¡Felicitaciones, {lead.name}!
            </h2>
            <p className="text-xs text-slate-300">
              Tu certificado está listo abajo. Envía tus resultados por WhatsApp para conversar con nuestro equipo y recibir tu <strong>beca o descuento según el puntaje obtenido</strong>.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full md:w-auto flex flex-col items-center gap-1.5">
          <button
            onClick={handleOpenWhatsApp}
            className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black py-3 px-6 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Enviar Resultado por WhatsApp</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          {countdown !== null && countdown > 0 && !autoRedirectStopped && (
            <div className="text-[11px] text-emerald-300/90 flex items-center gap-1">
              <Clock className="w-3 h-3 animate-spin" />
              <span>Abriendo WhatsApp automáticamente en {countdown}s...</span>
              <button
                onClick={() => setAutoRedirectStopped(true)}
                className="underline text-slate-400 hover:text-white ml-1"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Official Certificate of Knowledge (Delivered immediately upon submitting data) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-black text-white">Tu Certificado Digital Oficial</h3>
          </div>
          <span className="text-xs text-slate-400">Firmado y verificable por ACBR Pastaza</span>
        </div>

        <DiplomaCard
          userName={lead.name}
          userCity={lead.city}
          score={lead.score}
          maxScore={lead.maxScore}
          rank={lead.rank}
          segment={lead.segment}
        />
      </div>

      {/* Main Options Grid: WhatsApp & Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* WhatsApp Card */}
        <div className="bg-[#0b192c] border border-slate-700/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4" />
                Vía WhatsApp Oficial
              </span>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                +{config.whatsappDestination || '593967349504'}
              </span>
            </div>

            <h3 className="text-base font-extrabold text-white mb-2">
              Inicia la Conversación y Conoce tu Beca
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Envía tu resultado ({lead.score}/{lead.maxScore} pts) directamente al WhatsApp de ACBR Pastaza. Nuestro equipo evaluará tu desempeño y te comunicará personalmente el porcentaje de beca o monto de descuento que te corresponde.
            </p>

            <div className="bg-[#060d1a] border border-slate-800 p-3 rounded-xl text-xs text-slate-400 font-mono line-clamp-3 mb-3">
              ¡Hola ACBR Pastaza! Acabo de completar el Reto Inmobiliario... Nombre: {lead.name}, Ciudad: {lead.city}, Resultado: {lead.score}/{lead.maxScore} pts...
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleOpenWhatsApp}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enviar en WhatsApp</span>
            </button>

            <button
              onClick={handleCopyMessage}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 hover:text-white px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1"
              title="Copiar texto del mensaje"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* Guide Card */}
        <div className="bg-[#0b192c] border border-slate-700/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                Material Normativo Gratuito
              </span>
              <span className="text-[11px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded font-bold">
                Guía Desbloqueada
              </span>
            </div>

            <h3 className="text-base font-extrabold text-white mb-2">
              Guía de Profesionalización Inmobiliaria
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Consulta el compendio oficial con la Ley de Corredores de 1984, normas UAFE, modelo de contratos y cómo obtener tu Licencia Profesional 100% online.
            </p>
          </div>

          <button
            onClick={onOpenGuide}
            className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
          >
            <BookOpen className="w-4 h-4" />
            <span>Leer Guía Normativa Completa</span>
          </button>
        </div>
      </div>

      {/* Official Website & Advertising Banner */}
      <div className="bg-gradient-to-r from-[#0284c7]/20 via-[#0b192c] to-[#060d1a] border border-[#0284c7]/50 p-4 md:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3 text-left">
          <div className="w-12 h-12 rounded-xl bg-[#0284c7]/30 text-sky-300 border border-sky-400/40 flex items-center justify-center shrink-0 text-2xl">
            🌐
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded border border-sky-400/30">
                PORTAL WEB OFICIAL
              </span>
              <span className="text-xs text-sky-400 font-mono font-bold">acbirpastaza.com</span>
            </div>
            <h4 className="text-sm md:text-base font-extrabold text-white mt-0.5">
              Conoce propiedades, capacitaciones y servicios gremiales
            </h4>
            <p className="text-xs text-slate-300">
              Visita nuestra sede digital para consultar inmuebles en Pastaza y el catálogo académico.
            </p>
          </div>
        </div>

        <a
          href="https://acbirpastaza.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center justify-center gap-2 transition shrink-0 shadow"
        >
          <span>Visitar acbirpastaza.com</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* AI Legal & Professional Real Estate Advisor */}
      <AIAdvisor
        userScore={lead.score}
        userSegment={lead.segment}
        userName={lead.name}
        userCity={lead.city}
      />

      {/* Restart Button */}
      <div className="text-center pt-4">
        <button
          onClick={onRestart}
          className="text-xs text-slate-400 hover:text-slate-200 transition inline-flex items-center gap-1.5 font-semibold"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Volver a realizar el Reto Inmobiliario</span>
        </button>
      </div>
    </div>
  );
};
