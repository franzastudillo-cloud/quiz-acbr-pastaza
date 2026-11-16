import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Send,
  Lock,
  Phone,
  User,
  MapPin,
  Mail,
  Loader2,
  Target,
} from 'lucide-react';
import { Lead, LeadAnswer, AppConfig } from '../types';
import { Logo } from './Logo';

interface LeadCaptureScreenProps {
  score: number;
  maxScore: number;
  segment: string;
  answers: LeadAnswer[];
  config: AppConfig;
  onSubmitSuccess: (lead: Lead) => void;
}

const INTEREST_OPTIONS = [
  '🎓 Quiero obtener mi Licencia Profesional de Corredor con ACBR Pastaza',
  '🤝 Ya ejerzo en bienes raíces y quiero agremiarme o actualizarme',
  '🏡 Busco comprar, vender o arrendar una propiedad con un corredor legal',
];

export const LeadCaptureScreen: React.FC<LeadCaptureScreenProps> = ({
  score,
  maxScore,
  segment: initialSegment,
  answers,
  onSubmitSuccess,
}) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedInterest, setSelectedInterest] = useState(
    initialSegment && initialSegment !== 'General' ? initialSegment : INTEREST_OPTIONS[0]
  );
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const quickCities = ['Puyo', 'Quito', 'Ambato', 'Guayaquil', 'Cuenca', 'Riobamba', 'Tena', 'Macas'];

  const getRankTitle = (pts: number) => {
    if (pts >= 90) return 'Corredor Inmobiliario de Élite';
    if (pts >= 70) return 'Profesional Inmobiliario Senior';
    if (pts >= 50) return 'Agente Inmobiliario Promesa';
    return 'Iniciado en Bienes Raíces';
  };

  const rank = getRankTitle(score);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanName = name.trim();
    const cleanCity = city.trim();
    const cleanPhone = phone.trim().replace(/\s+/g, '');

    if (!cleanName || cleanName.length < 3) {
      setErrorMsg('Por favor ingresa tu Nombre y Apellido completo.');
      return;
    }

    if (!cleanCity) {
      setErrorMsg('Por favor selecciona o escribe tu Ciudad en Ecuador.');
      return;
    }

    if (!cleanPhone || cleanPhone.length < 8) {
      setErrorMsg('Por favor ingresa un número de WhatsApp válido.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          phone: cleanPhone,
          city: cleanCity,
          email: email.trim() || undefined,
          score,
          maxScore,
          segment: selectedInterest,
          answers,
          whatsappSent: true,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error al guardar los datos.');
      }

      const data = await res.json();
      const createdLead: Lead = data.lead;

      try {
        const localSaved = JSON.parse(localStorage.getItem('acbr_leads') || '[]');
        localSaved.unshift(createdLead);
        localStorage.setItem('acbr_leads', JSON.stringify(localSaved));
      } catch {
        // Ignore localStorage error
      }

      onSubmitSuccess(createdLead);
    } catch (err) {
      console.error('Submission error:', err);
      const fallbackLead: Lead = {
        id: `LEAD-LOCAL-${Date.now()}`,
        name: cleanName,
        phone: cleanPhone,
        city: cleanCity,
        email: email.trim() || undefined,
        score,
        maxScore,
        segment: selectedInterest,
        rank,
        status: 'nuevo',
        answers,
        createdAt: new Date().toISOString(),
        whatsappSent: true,
      };
      onSubmitSuccess(fallbackLead);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-2 animate-fade-in">
      {/* Top Completion Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-3">
          <Logo variant="card" size="md" />
        </div>

        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-sky-500/20 to-emerald-500/20 text-[#38bdf8] text-2xl mb-2 border border-sky-500/30 shadow-lg">
          <GraduationCap className="w-7 h-7 text-sky-400" />
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">
          ¡Reto Inmobiliario Completado!
        </h2>

        <div className="inline-flex items-center gap-2 bg-[#112a46] px-4 py-1.5 rounded-full border border-sky-500/30 my-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-[#38bdf8] font-black text-sm md:text-base">
            Obtuviste {score} de {maxScore} puntos • {rank}
          </span>
        </div>

        <p className="text-slate-300 text-xs md:text-sm max-w-lg mx-auto mt-2 leading-relaxed">
          Completa tus datos para recibir de inmediato tu <strong>Certificado Digital Oficial</strong> y enviar tu resultado al WhatsApp de <strong>ACBR Pastaza</strong>, donde te comunicaremos la <strong>beca o monto de descuento asignado según los resultados obtenidos</strong>.
        </p>
      </div>

      {/* Error alert */}
      {errorMsg && (
        <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      {/* Capture Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-[#060d1a]/80 p-5 rounded-2xl border border-slate-800 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs text-slate-400 uppercase font-extrabold mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-sky-400" />
              <span>Nombre y Apellido *</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Juan Carlos Pérez"
              required
              className="w-full p-3.5 rounded-xl bg-[#0b192c] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition placeholder-slate-500"
            />
          </div>

          {/* City and WhatsApp */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 uppercase font-extrabold mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>Ciudad en Ecuador *</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ej. Puyo, Ambato, Quito..."
                required
                className="w-full p-3.5 rounded-xl bg-[#0b192c] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition placeholder-slate-500 mb-2"
              />

              {/* Quick city chips */}
              <div className="flex flex-wrap gap-1.5">
                {quickCities.map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setCity(c)}
                    className={`text-[10px] px-2 py-1 rounded-md border transition ${
                      city === c
                        ? 'bg-sky-600 border-sky-400 text-white font-bold'
                        : 'bg-[#112a46]/70 border-slate-700/80 text-slate-300 hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 uppercase font-extrabold mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tu WhatsApp * (Ecuador)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-slate-400 font-bold text-sm">
                  🇪🇨 +593
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0999999999"
                  required
                  className="w-full p-3.5 pl-20 rounded-xl bg-[#0b192c] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition placeholder-slate-500 font-mono"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                A este número te enviaremos tu evaluación de beca o descuento.
              </p>
            </div>
          </div>

          {/* Email (Optional) */}
          <div>
            <label className="block text-xs text-slate-400 uppercase font-extrabold mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>Correo Electrónico (Opcional para respaldo)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ej. juanperez@gmail.com"
              className="w-full p-3.5 rounded-xl bg-[#0b192c] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition placeholder-slate-500"
            />
          </div>

          {/* Interest Selector */}
          <div>
            <label className="block text-xs text-slate-400 uppercase font-extrabold mb-2 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              <span>¿Cuál es tu interés principal hoy? *</span>
            </label>
            <div className="space-y-2">
              {INTEREST_OPTIONS.map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setSelectedInterest(option)}
                  className={`w-full text-left p-3 rounded-xl border text-xs md:text-sm transition ${
                    selectedInterest === option
                      ? 'bg-sky-500/20 border-sky-400 text-white font-bold'
                      : 'bg-[#0b192c] border-slate-700/80 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black py-4 px-6 rounded-xl shadow-xl hover:shadow-emerald-500/20 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base md:text-lg cursor-pointer"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generando Certificado y enviando tus datos...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>🎓 Recibir Certificado y Enviar Resultado a WhatsApp</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Datos protegidos por <strong>ACBR Pastaza</strong>. Encriptación y privacidad garantizada.</span>
        </p>
      </form>
    </div>
  );
};
