import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, Brain, AlertCircle, RefreshCw } from 'lucide-react';

interface AIAdvisorProps {
  userScore?: number;
  userSegment?: string;
  userName?: string;
  userCity?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isThinking?: boolean;
}

export const AIAdvisor: React.FC<AIAdvisorProps> = ({
  userScore,
  userSegment,
  userName,
  userCity,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `¡Hola ${userName || 'Colega'}! Soy el **Asesor Normativo y Vocacional con IA de ACBR Pastaza**. 
      
Puedo orientarte sobre:
• La **Ley de Corredores de Bienes Raíces (1984)** y validez de contratos.
• Normas de cumplimiento y prevención de lavado de activos ante la **UAFE**.
• Plan de estudios y ventajas de la **Licencia Profesional CBR 100% Online** con ACBR Pastaza.
• Requisitos para compraventas, gravámenes, plusvalía y trámites notariales en Ecuador.

¿Qué consulta legal o profesional deseas profundizar hoy?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sampleQuestions = [
    '¿Cuáles son los requisitos para obtener la Licencia CBR en Ecuador?',
    '¿Qué sanciones impone la UAFE al corredor que no reporte transacciones?',
    '¿Cómo asegurar el cobro de la comisión de corretaje ante la ley?',
    '¿Qué diferencia legal hay entre una Promesa de Compraventa y la Escritura?',
  ];

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          userScore,
          userSegment,
          userName,
          userCity,
        }),
      });

      const data = await res.json();
      if (data.text) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.text },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.fallback || 'Por el momento nuestros asesores están disponibles vía WhatsApp para atenderte de forma personalizada.',
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'No fue posible conectar con el asistente en este momento. Por favor, comunícate directamente con ACBR Pastaza en WhatsApp.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0b192c] border border-slate-700/80 rounded-2xl p-5 md:p-6 shadow-xl my-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
            <Brain className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base">Consultorio Legal & Vocacional Inmobiliario</h3>
              <span className="bg-sky-500/20 text-sky-300 text-[10px] font-extrabold px-2 py-0.5 rounded border border-sky-400/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-sky-400" />
                IA Alta Precisión
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Especializado en Ley de Corredores 1984, UAFE y Normativa Inmobiliaria de Ecuador
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2 mb-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 ${
              m.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                m.role === 'user'
                  ? 'bg-sky-600 text-white'
                  : 'bg-[#112a46] border border-sky-500/30 text-sky-400'
              }`}
            >
              {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div
              className={`p-3.5 rounded-2xl text-xs md:text-sm max-w-[85%] whitespace-pre-line leading-relaxed ${
                m.role === 'user'
                  ? 'bg-[#0284c7] text-white rounded-tr-none'
                  : 'bg-[#060d1a] border border-slate-800 text-slate-200 rounded-tl-none shadow'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#112a46] border border-sky-500/30 text-sky-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-[#060d1a] border border-slate-800 p-3.5 rounded-2xl rounded-tl-none text-xs text-sky-300 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-sky-400" />
              <span>Analizando legislación ecuatoriana y razonando respuesta...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="mb-3">
        <p className="text-[11px] text-slate-400 mb-1.5 font-semibold">Preguntas frecuentes:</p>
        <div className="flex flex-wrap gap-1.5">
          {sampleQuestions.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sq)}
              disabled={loading}
              className="text-[11px] bg-[#112a46]/70 hover:bg-[#0284c7]/30 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700/80 transition text-left"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu consulta sobre leyes, UAFE o curso de ACBR Pastaza..."
          className="flex-1 bg-[#060d1a] border border-slate-700 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-[#0284c7] hover:bg-[#0369a1] disabled:opacity-50 text-white px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-1.5 text-xs md:text-sm"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Consultar</span>
        </button>
      </form>
    </div>
  );
};
