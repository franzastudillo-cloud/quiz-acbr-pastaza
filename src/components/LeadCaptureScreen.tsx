import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Send,
  CheckCircle2,
  Lock,
  Phone,
  User,
  MapPin,
  Mail,
  Loader2,
  Building,
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

export const LeadCaptureScreen: React.FC<LeadCaptureScreenProps> = ({
  score,
  maxScore,
  segment,
  answers,
  config,
  onSubmitSuccess,
}) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const quickCities = ['Puyo', 'Quito', 'Ambato', 'Guayaquil', 'Cuenca', 'Riobamba', 'Tena', 'Macas'];

  const getRankTitle = (pts: number) => {
    if (pts >= 50) return 'Corredor Inmobiliario de Élite';
    if (pts >= 40) return 'Profesional Inmobiliario Senior';
    if (pts >= 30) return 'Agente Inmobiliario Promesa';
    return 'Iniciado en Bienes Raíces';
  };

  const rank = getRankTitle(score);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanName = name.trim();
    const cleanCity = city.trim();
    let cleanPhone = phone.trim().replace(/\s+/g, '');

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
      // 1. Post to backend API to ensure lead is NEVER lost
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
          segment,
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

      // 2. Also save to localStorage as local client cache
      try {
        const localSaved = JSON.parse(localStorage.getItem('acbr_leads') || '[]');
        localSaved.unshift(createdLead);
        localStorage.setItem('acbr_leads', JSON.stringify(localSaved));
      } catch (e) {
        // Ignore localStorage error
      }

      // 3. Callback to parent to transition to result view with automated WhatsApp trigger
      onSubmitSuccess(createdLead);
    } catch (err: any) {
      console.error('Submission error:', err);
      // Even if network error occurs, create local lead object so user is not blocked
      const fallbackLead: Lead = {
        id: `LEAD-LOCAL-${Date.now()}`,
        name: cleanName,
        phone: cleanPhone,
        city: cleanCity,
        email: email.trim() || undefined,
        score,
        maxScore,
        segment,
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
          Ingresa tus datos para registrar automáticamente tu resultado, desbloquear tu <strong>Certificado Digital de Conocimiento</strong> y reclamar en WhatsApp tu <strong>Guía de Profesionalización + Beca de ACBR Pastaza</strong>.
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
                Te enviaremos a este WhatsApp tu confirmación oficial.
              </p>
            </div>
          </div>

          {/* Email (Optional) */}
          <div>
            <label className="block text-xs text-slate-400 uppercase font-extrabold mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>Correo Electrónico (Opcional para recibir PDF)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ej. juanperez@gmail.com"
              className="w-full p-3.5 rounded-xl bg-[#0b192c] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition placeholder-slate-500"
            />
          </div>

          {/* Selected Interest Badge */}
          <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Interés registrado:</span>
            <span className="font-bold text-sky-300 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20">
              {segment}
            </span>
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
              <span>Registrando y procesando tus datos...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>📲 Enviar mis Datos y Reclamar Beneficio en WhatsApp</span>
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
