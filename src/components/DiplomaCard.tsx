import React, { useRef } from 'react';
import { Award, Printer, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

interface DiplomaProps {
  userName: string;
  userCity: string;
  score: number;
  maxScore: number;
  rank: string;
  segment: string;
  dateStr?: string;
}

export const DiplomaCard: React.FC<DiplomaProps> = ({
  userName,
  userCity,
  score,
  maxScore,
  rank,
  segment,
  dateStr = new Date().toLocaleDateString('es-EC', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }),
}) => {
  const diplomaRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#0b192c] border border-slate-700/80 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      {/* Background seal decorative glow */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Diploma container (print-friendly) */}
      <div
        ref={diplomaRef}
        id="diploma-view"
        className="relative bg-gradient-to-b from-[#0f233d] to-[#071322] border-2 border-amber-400/40 rounded-xl p-6 md:p-8 text-center shadow-inner"
      >
        {/* Border ornament */}
        <div className="border border-amber-400/20 p-5 rounded-lg relative">
          {/* Official Logo at the top of the certificate */}
          <div className="flex justify-center mb-3">
            <Logo variant="card" size="md" />
          </div>

          {/* Top header badge */}
          <div className="flex flex-col items-center justify-center gap-1 mb-4">
            <div className="flex items-center gap-2 bg-[#0284c7]/20 border border-[#0284c7]/40 px-3 py-1 rounded-full text-xs font-bold text-sky-300">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>ACBR PASTAZA • TU SEDE INMOBILIARIA</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-amber-300 tracking-wider uppercase mt-1">
              Certificado de Conocimiento Inmobiliario
            </h3>
            <p className="text-xs text-slate-300 font-medium">
              Ecuador • Ley de Corredores de Bienes Raíces de 1984
            </p>
          </div>

          <p className="text-xs text-slate-400 uppercase tracking-widest my-2">
            Se otorga el presente reconocimiento oficial a:
          </p>

          <h4 className="text-2xl md:text-3xl font-black text-white my-3 tracking-tight border-b border-slate-700/60 pb-2 inline-block px-4">
            {userName || 'Profesional Participante'}
          </h4>

          <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed my-3">
            Por haber completado con éxito el <strong>Reto de Conocimientos Normativos y Comerciales del Sector Inmobiliario del Ecuador</strong>, demostrando un alto dominio en la legislación vigente, prevención UAFE y ética en el corretaje.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-5 max-w-md mx-auto text-left">
            <div className="bg-[#0b192c]/90 border border-slate-700 p-2.5 rounded-lg text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">Puntaje</span>
              <span className="text-lg font-black text-emerald-400">{score} / {maxScore} pts</span>
            </div>
            <div className="bg-[#0b192c]/90 border border-slate-700 p-2.5 rounded-lg text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">Distinción</span>
              <span className="text-xs font-extrabold text-amber-300 block truncate" title={rank}>{rank}</span>
            </div>
            <div className="col-span-2 md:col-span-1 bg-[#0b192c]/90 border border-slate-700 p-2.5 rounded-lg text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">Ubicación</span>
              <span className="text-xs font-bold text-sky-300 block truncate">{userCity || 'Ecuador'}</span>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="text-left">
              <div className="h-7 border-b border-slate-600 w-36 mb-1" />
              <p className="font-bold text-slate-200">ACBR Pastaza</p>
              <p className="text-[10px] text-slate-400">Tu Sede INMOBILIARIA</p>
              <p className="text-[9px] text-sky-400 font-mono mt-0.5">acbirpastaza.com</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 px-3 py-1.5 rounded-lg text-amber-300 text-[11px] font-bold">
                <Award className="w-5 h-5 text-amber-400" />
                <span>ACBR-VERIFIED 2026</span>
              </div>
              <span className="text-[9px] text-slate-400 font-mono">Registro oficial ACBR Pastaza</span>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400">Fecha de Emisión:</p>
              <p className="font-semibold text-slate-300">{dateStr}</p>
              <p className="text-[9px] text-slate-400 font-mono">Puyo • Ecuador</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 hover:text-white px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition"
        >
          <Printer className="w-4 h-4 text-sky-400" />
          <span>Imprimir / Guardar en PDF</span>
        </button>
      </div>
    </div>
  );
};
