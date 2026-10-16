import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, Sparkles, Scale } from 'lucide-react';
import { QuizQuestion, QuizOption, LeadAnswer } from '../types';

interface QuizScreenProps {
  questions: QuizQuestion[];
  onComplete: (score: number, segment: string, answers: LeadAnswer[]) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState('General');
  const [answersLog, setAnswersLog] = useState<LeadAnswer[]>([]);

  const currentQ = questions[currentIdx];
  const progressPercent = ((currentIdx + 1) / questions.length) * 100;

  const handleSelectOption = (opt: QuizOption) => {
    if (hasAnswered) return;

    setSelectedOption(opt);
    setHasAnswered(true);

    let isCorrect = false;

    if (currentQ.isSegmentation) {
      if (opt.tag) setSelectedSegment(opt.tag);
    } else if (opt.correct) {
      isCorrect = true;
      setScore((prev) => prev + 10);
    }

    const logEntry: LeadAnswer = {
      questionIndex: currentIdx + 1,
      question: currentQ.q,
      selectedText: opt.text,
      isCorrect,
    };
    setAnswersLog((prev) => [...prev, logEntry]);
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      // Completed all questions
      onComplete(score, selectedSegment, answersLog);
    }
  };

  return (
    <div className="py-2 animate-fade-in">
      {/* Step and Score Header */}
      <div className="flex justify-between items-center text-xs text-slate-400 mb-2 font-medium">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-400" />
          Pregunta {currentIdx + 1} de {questions.length}
        </span>
        <span className="bg-[#112a46] px-3 py-1 rounded-full text-[#38bdf8] font-black border border-sky-500/30">
          Puntaje: {score} / 50 pts
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-2.5 rounded-full mb-6 overflow-hidden border border-slate-700/50">
        <div
          className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Title */}
      <div className="mb-5">
        {currentQ.isSegmentation && (
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-2.5 py-0.5 rounded mb-2 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            Pregunta de Personalización y Diagnóstico
          </span>
        )}
        <h2 className="text-xl md:text-2xl font-black text-white leading-snug">
          {currentQ.q}
        </h2>
      </div>

      {/* Options List */}
      <div className="space-y-3 mb-5">
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedOption === opt;
          let btnStyle =
            'w-full text-left p-4 rounded-xl bg-[#112a46]/60 hover:bg-[#0284c7]/30 border border-slate-700 hover:border-[#38bdf8] transition text-sm md:text-base font-medium flex items-center justify-between text-slate-200 cursor-pointer';

          if (hasAnswered) {
            if (currentQ.isSegmentation) {
              if (isSelected) {
                btnStyle =
                  'w-full text-left p-4 rounded-xl border-2 border-sky-400 bg-sky-500/20 text-white font-bold flex items-center justify-between';
              } else {
                btnStyle =
                  'w-full text-left p-4 rounded-xl border border-slate-800 bg-[#060d1a]/60 text-slate-500 opacity-60';
              }
            } else if (opt.correct) {
              btnStyle =
                'w-full text-left p-4 rounded-xl border-2 border-emerald-400 bg-emerald-950/60 text-emerald-200 font-bold flex items-center justify-between';
            } else if (isSelected && !opt.correct) {
              btnStyle =
                'w-full text-left p-4 rounded-xl border-2 border-rose-400 bg-rose-950/60 text-rose-200 font-bold flex items-center justify-between';
            } else {
              btnStyle =
                'w-full text-left p-4 rounded-xl border border-slate-800 bg-[#060d1a]/60 text-slate-500 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(opt)}
              disabled={hasAnswered}
              className={btnStyle}
            >
              <span className="flex-1 pr-2">{opt.text}</span>
              {hasAnswered && !currentQ.isSegmentation && (
                opt.correct ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : isSelected ? (
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                ) : null
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback Card */}
      {hasAnswered && (
        <div
          className={`p-4 rounded-xl border text-sm leading-relaxed mb-5 animate-fade-in ${
            currentQ.isSegmentation
              ? 'border-sky-400/50 bg-[#112a46] text-slate-200'
              : selectedOption?.correct
              ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-200'
              : 'border-amber-500/50 bg-amber-950/40 text-amber-200'
          }`}
        >
          <div className="font-bold flex items-center gap-1.5 mb-1 text-white">
            {currentQ.isSegmentation ? (
              <Sparkles className="w-4 h-4 text-sky-400" />
            ) : selectedOption?.correct ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            )}
            <span>
              {currentQ.isSegmentation
                ? 'Perfil Registrado'
                : selectedOption?.correct
                ? '¡Respuesta Correcta!'
                : 'Dato Normativo Clave:'}
            </span>
          </div>

          <p>{currentQ.explanation}</p>

          {currentQ.legalBasis && (
            <div className="mt-2 pt-2 border-t border-slate-700/60 text-[11px] text-slate-300 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span><strong>Base Legal:</strong> {currentQ.legalBasis}</span>
            </div>
          )}
        </div>
      )}

      {/* Next Button */}
      {hasAnswered && (
        <button
          onClick={handleNext}
          className="w-full bg-[#0284c7] hover:bg-[#0369a1] active:scale-95 text-white font-extrabold py-3.5 px-6 rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer text-base"
        >
          <span>
            {currentIdx + 1 === questions.length ? 'Finalizar Reto y Ver Resultado' : 'Siguiente pregunta'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
