import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    q: '1. ¿En qué año se promulgó la Ley de Corredores de Bienes Raíces en el Ecuador que regula oficialmente nuestra profesión?',
    options: [
      { text: 'A) En 1984 (Decreto Legislativo sobre corretaje inmobiliario)', correct: true },
      { text: 'B) En 2015 con el COGEP', correct: false },
      { text: 'C) No existe una ley específica en Ecuador', correct: false },
    ],
    explanation: '¡Exacto! La Ley de Corredores de Bienes Raíces rige en Ecuador desde 1984 y respalda legalmente el ejercicio profesional.',
    legalBasis: 'Ley de Corredores de Bienes Raíces, Registro Oficial N° 845 del 19 de septiembre de 1984.',
  },
  {
    id: 2,
    q: '2. Según la normativa ecuatoriana, ¿por qué es indispensable contar con la Licencia Profesional (CBR) para intermediar bienes raíces?',
    options: [
      { text: 'A) Es solo un requisito opcional para cobrar más comisión', correct: false },
      { text: 'B) Otorga respaldo legal para exigir honorarios, celebrar contratos de corretaje y brindar seguridad jurídica', correct: true },
      { text: 'C) Solo sirve para trabajar en el sector público', correct: false },
    ],
    explanation: '¡Así es! Ejercer con Licencia Profesional garantiza seguridad jurídica al cliente y protege legalmente el cobro de tus honorarios ante cualquier tribunal.',
    legalBasis: 'Art. 3 y 4 de la Ley de Corredores: Solo quien ostente la licencia puede percibir corretaje legal y formalizar actos de mediación inmobiliaria.',
  },
  {
    id: 3,
    q: '3. ¿Cuál es el rol de la UAFE respecto a los Corredores de Bienes Raíces e Inmobiliarias en el Ecuador?',
    options: [
      { text: 'A) Fijar el precio de los terrenos y casas en cada municipio', correct: false },
      { text: 'B) Supervisar a los corredores como Sujetos Obligados a reportar y prevenir el lavado de activos', correct: true },
      { text: 'C) Cobrar impuestos prediales anuales', correct: false },
    ],
    explanation: '¡Correcto! El sector inmobiliario es Sujeto Obligado ante la UAFE; conocer la normativa evita multas severas y protege tu patrimonio y el de tus clientes.',
    legalBasis: 'Ley Orgánica de Prevención, Detección y Erradicación del Delito de Lavado de Activos y del Financiamiento de Delitos (Resoluciones UAFE).',
  },
  {
    id: 4,
    q: '4. ¿Qué ventaja competitiva ofrece el programa de formación de ACBR Pastaza para quienes desean obtener su Licencia Profesional en Ecuador?',
    options: [
      { text: 'A) Modalidad 100% virtual accesible desde cualquier provincia del país con aval gremial oficial', correct: true },
      { text: 'B) Solo permite estudiar de forma presencial en la Amazonía', correct: false },
      { text: 'C) Dura 5 años como una carrera universitaria tradicional', correct: false },
    ],
    explanation: '¡Brillante! ACBR Pastaza te permite formarte y certificarte 100% online desde cualquier rincón del Ecuador con docentes expertos y horarios flexibles.',
    legalBasis: 'Convenio y estatutos gremiales de ACBR Pastaza para la capacitación y titulación de Corredores Profesionales.',
  },
  {
    id: 5,
    q: '5. Además del respaldo gremial oficial en Ecuador, ¿qué beneficio obtienen los miembros de ACBR Pastaza a nivel global?',
    options: [
      { text: 'A) Alianzas estratégicas internacionales (como NAR / redes globales) para expandir fronteras operativas', correct: true },
      { text: 'B) Ninguno, la licencia solo sirve dentro de un barrio', correct: false },
      { text: 'C) Descuentos únicamente en pasajes de autobús', correct: false },
    ],
    explanation: '¡Excelente! Nuestras alianzas nacionales e internacionales conectan tu negocio inmobiliario con redes de alto nivel e inversionistas de todo el mundo.',
    legalBasis: 'Alianzas internacionales de ACBR Pastaza con NAR (National Association of Realtors) y CILA (Confederación Inmobiliaria Latinoamericana).',
  },
  {
    id: 6,
    q: '6. Para personalizar tu diagnóstico final: ¿Cuál es tu interés principal en el sector inmobiliario hoy?',
    isSegmentation: true,
    options: [
      { text: '🎓 Quiero obtener mi Licencia Profesional de Corredor con ACBR Pastaza', tag: 'Aspirante al Curso / Licencia CBR' },
      { text: '🤝 Ya ejerzo en bienes raíces y quiero agremiarme o actualizarme (UAFE, Avalúos, Legal)', tag: 'Corredor / Capacitación Continua' },
      { text: '🏡 Busco comprar, vender o tomar en anticresis una propiedad con un corredor legal', tag: 'Cliente Propietario / Comprador' },
    ],
    explanation: '🎯 ¡Perfecto! Hemos ajustado tu resultado y el beneficio según tu perfil profesional.',
  },
];
