import React from 'react';
import { X, BookOpen, CheckCircle, ShieldAlert, Award, FileText } from 'lucide-react';
import { Logo } from './Logo';

interface LegalGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalGuideModal: React.FC<LegalGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-[#0b192c] border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 md:p-5 bg-[#0f233d] border-b border-slate-700 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Logo variant="card" size="sm" />
            <div>
              <span className="text-[10px] font-extrabold text-sky-400 uppercase tracking-wider block">
                ACBR Pastaza • Tu Sede INMOBILIARIA
              </span>
              <h3 className="text-base md:text-lg font-black text-white">
                Guía de Profesionalización Inmobiliaria
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-sm leading-relaxed">
          {/* Section 1 */}
          <div className="bg-[#060d1a] border border-slate-800 rounded-xl p-4">
            <h4 className="text-white font-bold flex items-center gap-2 mb-2 text-base text-sky-300">
              <FileText className="w-4 h-4 text-sky-400" />
              1. Ley de Corredores de Bienes Raíces (1984)
            </h4>
            <p className="mb-2">
              Publicada en el Registro Oficial N° 845 de 1984, es el marco legal que reconoce y protege la labor del corredor en el Ecuador.
            </p>
            <ul className="space-y-1.5 list-disc list-inside text-xs text-slate-300">
              <li><strong>Art. 3:</strong> Para ejercer legalmente y devengar honorarios de corretaje es obligatorio poseer la Licencia Profesional emitida por las asociaciones gremiales autorizadas en Ecuador.</li>
              <li><strong>Derecho a Honorarios:</strong> El corredor con licencia puede accionar judicialmente para el cobro de honorarios pactados mediante contrato formal.</li>
              <li><strong>Infracción por ejercicio ilegal:</strong> Quien intermedie sin licencia incurre en usurpación de funciones y carece de acción de cobro judicial.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="bg-[#060d1a] border border-slate-800 rounded-xl p-4">
            <h4 className="text-white font-bold flex items-center gap-2 mb-2 text-base text-amber-300">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              2. Obligaciones ante la UAFE para Inmobiliarias
            </h4>
            <p className="mb-2 text-xs">
              De acuerdo con la Ley Orgánica de Prevención de Lavado de Activos, las inmobiliarias y corredores son <strong>Sujetos Obligados</strong>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#0b192c] p-3 rounded-lg border border-slate-800">
                <span className="font-bold text-slate-200 block mb-1">Debida Diligencia:</span>
                Identificar plenamente a compradores y vendedores, origen lícito de fondos y beneficiario final.
              </div>
              <div className="bg-[#0b192c] p-3 rounded-lg border border-slate-800">
                <span className="font-bold text-slate-200 block mb-1">Reportes Periódicos:</span>
                Reporte de operaciones individuales iguales o superiores a $10,000 USD y Reporte de Operaciones Sospechosas (ROS).
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-[#060d1a] border border-slate-800 rounded-xl p-4">
            <h4 className="text-white font-bold flex items-center gap-2 mb-2 text-base text-emerald-300">
              <Award className="w-4 h-4 text-emerald-400" />
              3. ¿Cómo certificarse con ACBR Pastaza?
            </h4>
            <p className="text-xs mb-3">
              ACBR Pastaza cuenta con un programa de certificación profesional 100% online, válido en todas las provincias del Ecuador.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Flexibilidad Nacional:</strong> Clases virtuales sincrónicas y asincrónicas adaptadas a tu horario laboral.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Módulos Clave:</strong> Derecho Inmobiliario, Avalúos y Catastros, Marketing Digital de Propiedades, Tributación y UAFE, Negociación de Alto Impacto.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Alianza Global:</strong> Vinculación internacional con la NAR (National Association of Realtors).</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0f233d] border-t border-slate-700 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Documento oficial ACBR Pastaza</span>
            <span>•</span>
            <a
              href="https://acbirpastaza.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 font-bold underline font-mono"
            >
              acbirpastaza.com
            </a>
          </div>
          <button
            onClick={onClose}
            className="bg-[#0284c7] hover:bg-[#0369a1] text-white px-5 py-2 rounded-xl text-xs font-bold transition"
          >
            Entendido / Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
