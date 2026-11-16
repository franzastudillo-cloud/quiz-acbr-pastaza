import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    q: '1. ¿Cuáles son dos maneras de tratar a un cliente "sabelotodo"?',
    options: [
      { text: 'A) No perder la serenidad, no replicarle en tono alterado', correct: true },
      { text: 'B) Analizar y superar rápidamente las objeciones', correct: false },
      { text: 'C) Interesar en su opinión y elogiar sus comentarios', correct: false },
      { text: 'D) Rebatir sus comentarios y no perder la serenidad', correct: false },
    ],
    explanation:
      'Con un cliente sabelotodo nunca debes entrar en confrontación directa ni responder en tono alterado. Mantener la serenidad desactiva la tensión y te permite conducir la negociación con profesionalismo.',
    legalBasis: 'Técnicas de Ventas y Atención al Cliente Inmobiliario • Perfil Sabelotodo.',
  },
  {
    id: 2,
    q: '2. ¿De qué depende la interacción en redes sociales?',
    options: [
      { text: 'A) El nivel de conversación que tengas con tu público', correct: true },
      { text: 'B) El nivel de inversión que le pongas a las pautas', correct: false },
      { text: 'C) La cantidad de contenido que subas', correct: false },
    ],
    explanation:
      'La verdadera interacción (engagement) no depende únicamente de publicar en volumen ni solo de pagar pauta, sino de la conversación bidireccional y la conexión real que generas con tu audiencia.',
    legalBasis: 'Marketing Digital Inmobiliario • Gestión de Comunidades y Redes Sociales.',
  },
  {
    id: 3,
    q: '3. ¿Para la validez del contrato de arrendamiento donde el canon de arrendamiento a cancelar es de $400, qué requisito se debe cumplir para que sea válido?',
    options: [
      { text: 'A) Inscribir el Contrato en la Notaría', correct: true },
      { text: 'B) Inscribir el Contrato en el Registro de la Propiedad', correct: false },
      { text: 'C) Registrar el inmueble que se arrienda en el Municipio', correct: false },
    ],
    explanation:
      'De acuerdo con la Ley de Inquilinato del Ecuador (Art. 29), todo contrato cuyo canon supere un Salario Básico Unificado debe celebrarse por escrito e inscribirse obligatoriamente ante una Notaría dentro de los 30 días siguientes.',
    legalBasis: 'Ley de Inquilinato del Ecuador, Art. 29 (Inscripción notarial de contratos de arrendamiento).',
  },
  {
    id: 4,
    q: '4. ¿Cuál es el método más apropiado para la valoración del terreno?',
    options: [
      { text: 'A) Método de Reposición', correct: false },
      { text: 'B) Método Comparativo de Mercado', correct: true },
      { text: 'C) Método Residual', correct: false },
      { text: 'D) Cualquier inmueble que aparezca en los portales inmobiliarios.', correct: false },
    ],
    explanation:
      'El terreno no puede reproducirse ni depreciarse por construcción; por ello, el Método Comparativo de Mercado (analizando transacciones y ofertas comparables de terrenos en la misma zona) es el método técnico más apropiado.',
    legalBasis: 'Normativa Técnica de Avalúos y Valoración Inmobiliaria • Valoración de Suelo.',
  },
  {
    id: 5,
    q: '5. ¿Si una persona fallece y tiene un inmueble que adquirió por donación, quién hereda el bien inmueble?',
    options: [
      { text: 'A) La cónyuge el 50% y los hijos el otro 50%', correct: false },
      { text: 'B) La cónyuge recibe la totalidad', correct: false },
      { text: 'C) Los hijos reciben la totalidad', correct: true },
    ],
    explanation:
      'Los bienes adquiridos por donación son bienes propios y no ingresan a la sociedad conyugal (no generan 50% de gananciales para el cónyuge). Según el primer orden de sucesión intestada del Código Civil, los hijos excluyen a los demás herederos y reciben la totalidad (sin perjuicio de la porción conyugal si aplicara).',
    legalBasis: 'Código Civil del Ecuador, Art. 158 (Bienes propios por donación) y Art. 1028 (Primer orden sucesorio).',
  },
  {
    id: 6,
    q: '6. ¿A qué se refiere la fase de awareness, dentro del embudo de marketing digital?',
    options: [
      { text: 'A) La fase de mejor conexión digital con el prospecto', correct: false },
      { text: 'B) El proceso de compra de un proyecto inmobiliario', correct: false },
      { text: 'C) El conocimiento o reconocimiento de la gente en el entorno digital', correct: true },
    ],
    explanation:
      'En el embudo de conversión (funnel), la fase de Awareness (notoriedad o reconocimiento) corresponde al primer contacto en el que el público descubre y reconoce tu marca inmobiliaria en el entorno digital.',
    legalBasis: 'Estrategia Digital Inmobiliaria • Embudo de Conversión (Awareness / Consideración / Conversión).',
  },
  {
    id: 7,
    q: '7. ¿Cuáles son dos características que nos permiten distinguir al cliente curioso?',
    options: [
      { text: 'A) Es introvertido; y, prefiere mantenerse sin conversar con nadie', correct: false },
      { text: 'B) Hace preguntas que sorprenden al vendedor; y, revisa, investiga y observa minuciosamente el inmueble', correct: true },
      { text: 'C) Habla permanentemente, le gusta contar anécdotas.', correct: false },
    ],
    explanation:
      'El cliente curioso indaga a profundidad: realiza preguntas inesperadas o técnicas y examina minuciosamente cada detalle físico y documental del inmueble.',
    legalBasis: 'Psicología del Comprador Inmobiliario • Tipología de Clientes.',
  },
  {
    id: 8,
    q: '8. ¿Si vas a realizar un avalúo del inmueble a través del método comparativo de mercado, los comparables deben ser:',
    options: [
      { text: 'A) Inmuebles vendidos o en oferta en el mismo sector, con características físicas, ubicación y de uso diferentes al bien sujeto de avalúo.', correct: false },
      { text: 'B) Inmuebles vendidos o en oferta en el mismo sector, con características físicas, ubicación y de uso semejantes al bien sujeto de avalúo', correct: true },
    ],
    explanation:
      'Para que un avalúo comparativo sea técnicamente válido y objetivo, las muestras comparables deben pertenecer al mismo entorno o sector y guardar homogeneidad en características físicas, ubicación y uso.',
    legalBasis: 'Estándares de Valuación Inmobiliaria • Principio de Sustitución y Homogeneización.',
  },
  {
    id: 9,
    q: '9. ¿Cuál es el documento que demuestra que una persona es el propietario actual de un inmueble?',
    options: [
      { text: 'A) La escritura pública de compraventa inscrita en el registro de la propiedad', correct: false },
      { text: 'B) La certificación del Catastro Municipal.', correct: false },
      { text: 'C) El certificado de gravámenes emitido por el Registro de la Propiedad', correct: true },
    ],
    explanation:
      'Una escritura antigua pudo quedar sin efecto si el bien fue vendido posteriormente. En Ecuador, el Certificado de Gravámenes emitido por el Registro de la Propiedad acredita quién es el propietario actual vigente y si el bien posee hipotecas o prohibiciones.',
    legalBasis: 'Ley de Registro del Ecuador • Certificación de Historial de Dominio y Gravámenes.',
  },
  {
    id: 10,
    q: '10. ¿Cuáles son dos características del cliente "Dominante"?',
    options: [
      { text: 'A) Busca siempre descuentos, cree ser hábil comprador', correct: false },
      { text: 'B) Cree saber todo del inmueble, es detallista y hace críticas', correct: false },
      { text: 'C) Vive permanentemente descontento, es de acciones rápidas', correct: true },
    ],
    explanation:
      'El cliente dominante actúa con rapidez, exige agilidad en las respuestas, impone ritmo en la negociación y suele mostrarse inconforme o exigente si percibe demoras o falta de contundencia.',
    legalBasis: 'Técnicas de Negociación Inmobiliaria • Manejo del Cliente Dominante.',
  },
];
