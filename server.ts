import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Google GenAI on server
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Persistent data directory
const DATA_DIR = path.join(__dirname, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  city: string;
  email?: string;
  score: number;
  maxScore: number;
  segment: string;
  rank: string;
  status: 'nuevo' | 'contactado' | 'matriculado' | 'archivado';
  answers?: Array<{
    questionIndex: number;
    question: string;
    selectedText: string;
    isCorrect: boolean;
  }>;
  createdAt: string;
  whatsappSent?: boolean;
  notes?: string;
}

export interface AppConfig {
  whatsappDestination: string; // e.g. 593999999999
  associationName: string;
  institutionSubtitle: string;
  leadMagnetTitle: string;
  scholarshipDiscount: string; // e.g. "30% DE BECA"
  websiteUrl: string;
  websiteDomain: string;
}

const DEFAULT_CONFIG: AppConfig = {
  whatsappDestination: '593967349504',
  associationName: 'ACBR Pastaza',
  institutionSubtitle: 'Tu Sede INMOBILIARIA',
  leadMagnetTitle: 'Guía Oficial de Profesionalización Inmobiliaria Ecuador + Beca ACBR Pastaza',
  scholarshipDiscount: '30% DE BECA',
  websiteUrl: 'https://acbirpastaza.com',
  websiteDomain: 'acbirpastaza.com',
};

function readConfig(): AppConfig {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
      return { ...DEFAULT_CONFIG, ...JSON.parse(data) };
    }
  } catch (err) {
    console.error('Error reading config file:', err);
  }
  return DEFAULT_CONFIG;
}

function saveConfig(config: AppConfig) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving config file:', err);
  }
}

function readLeads(): Lead[] {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const data = fs.readFileSync(LEADS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading leads file:', err);
  }
  return [];
}

function saveLeads(leads: Lead[]) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving leads file:', err);
  }
}

// Initial sample leads if empty
if (!fs.existsSync(LEADS_FILE)) {
  const initialLeads: Lead[] = [
    {
      id: 'LEAD-2026-001',
      name: 'Carlos Mendoza Ramos',
      phone: '0998123456',
      city: 'Puyo',
      email: 'carlos.mendoza@gmail.com',
      score: 50,
      maxScore: 50,
      segment: 'Aspirante al Curso / Licencia CBR',
      rank: 'Corredor Inmobiliario de Élite',
      status: 'contactado',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      whatsappSent: true,
      notes: 'Interesado en matricularse en la próxima cohorte 100% online.',
    },
    {
      id: 'LEAD-2026-002',
      name: 'Verónica Santillán',
      phone: '0987654321',
      city: 'Ambato',
      email: 'veronica.santi@yahoo.es',
      score: 40,
      maxScore: 50,
      segment: 'Corredor / Capacitación Continua',
      rank: 'Profesional Inmobiliario Senior',
      status: 'nuevo',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      whatsappSent: false,
      notes: 'Requiere actualización en normativa UAFE y avalúos comerciales.',
    },
  ];
  saveLeads(initialLeads);
}

// REST API Endpoints

// 1. Get configuration
app.get('/api/config', (_req, res) => {
  res.json(readConfig());
});

// 2. Update configuration
app.post('/api/config', (req, res) => {
  const current = readConfig();
  const updated: AppConfig = {
    ...current,
    whatsappDestination: req.body.whatsappDestination || current.whatsappDestination,
    associationName: req.body.associationName || current.associationName,
    institutionSubtitle: req.body.institutionSubtitle || current.institutionSubtitle,
    leadMagnetTitle: req.body.leadMagnetTitle || current.leadMagnetTitle,
    scholarshipDiscount: req.body.scholarshipDiscount || current.scholarshipDiscount,
    websiteUrl: req.body.websiteUrl || current.websiteUrl || 'https://acbirpastaza.com',
    websiteDomain: req.body.websiteDomain || current.websiteDomain || 'acbirpastaza.com',
  };
  saveConfig(updated);
  res.json({ success: true, config: updated });
});

// 3. Capture Lead (Automatic submission)
app.post('/api/leads', (req, res) => {
  try {
    const { name, phone, city, email, score, maxScore = 50, segment, answers, whatsappSent } = req.body;

    if (!name || !phone || !city) {
      res.status(400).json({ error: 'Faltan campos obligatorios (nombre, celular y ciudad).' });
      return;
    }

    const leads = readLeads();
    const rank =
      score >= 50
        ? 'Corredor Inmobiliario de Élite'
        : score >= 40
        ? 'Profesional Inmobiliario Senior'
        : score >= 30
        ? 'Agente Inmobiliario Promesa'
        : 'Iniciado en Bienes Raíces';

    const newLead: Lead = {
      id: `LEAD-2026-${String(leads.length + 1).padStart(3, '0')}-${Date.now().toString().slice(-4)}`,
      name: String(name).trim(),
      phone: String(phone).trim(),
      city: String(city).trim(),
      email: email ? String(email).trim() : undefined,
      score: Number(score) || 0,
      maxScore: Number(maxScore) || 50,
      segment: segment || 'General',
      rank,
      status: 'nuevo',
      answers: Array.isArray(answers) ? answers : [],
      createdAt: new Date().toISOString(),
      whatsappSent: Boolean(whatsappSent),
      notes: 'Prospecto capturado automáticamente desde el Reto Inmobiliario ACBR Pastaza.',
    };

    leads.unshift(newLead);
    saveLeads(leads);

    res.status(201).json({
      success: true,
      message: '¡Datos recibidos y guardados con éxito!',
      lead: newLead,
    });
  } catch (err) {
    console.error('Error creating lead:', err);
    res.status(500).json({ error: 'Error interno al registrar el lead.' });
  }
});

// 4. Get all leads (for CRM / Admin Panel)
app.get('/api/leads', (_req, res) => {
  const leads = readLeads();
  res.json(leads);
});

// 5. Update lead status or notes
app.patch('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const { status, notes, whatsappSent } = req.body;

  const leads = readLeads();
  const idx = leads.findIndex((l) => l.id === id);

  if (idx === -1) {
    res.status(404).json({ error: 'Lead no encontrado' });
    return;
  }

  if (status !== undefined) leads[idx].status = status;
  if (notes !== undefined) leads[idx].notes = notes;
  if (whatsappSent !== undefined) leads[idx].whatsappSent = whatsappSent;

  saveLeads(leads);
  res.json({ success: true, lead: leads[idx] });
});

// 6. Delete a lead
app.delete('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  let leads = readLeads();
  const initialLen = leads.length;
  leads = leads.filter((l) => l.id !== id);

  if (leads.length === initialLen) {
    res.status(404).json({ error: 'Lead no encontrado' });
    return;
  }

  saveLeads(leads);
  res.json({ success: true, message: 'Lead eliminado correctamente' });
});

// 7. Export leads to CSV (Excel compatible with UTF-8 BOM)
app.get('/api/leads/export', (_req, res) => {
  const leads = readLeads();
  const headers = ['ID', 'Nombre', 'WhatsApp', 'Ciudad', 'Email', 'Puntaje', 'Rango', 'Segmento / Interés', 'Estado', 'Fecha Registro', 'Notas'];

  const rows = leads.map((l) => [
    `"${l.id}"`,
    `"${l.name.replace(/"/g, '""')}"`,
    `"${l.phone.replace(/"/g, '""')}"`,
    `"${l.city.replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `${l.score}/${l.maxScore}`,
    `"${l.rank}"`,
    `"${l.segment.replace(/"/g, '""')}"`,
    `"${l.status}"`,
    `"${new Date(l.createdAt).toLocaleString('es-EC')}"`,
    `"${(l.notes || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="leads_acbr_pastaza.csv"');
  res.send(csvContent);
});

// 8. AI Real Estate Advisor & Diagnostic (Using Gemini with Thinking Level HIGH)
app.post('/api/ai/advisor', async (req, res) => {
  try {
    const { question, userScore, userSegment, userName, userCity } = req.body;

    if (!process.env.GEMINI_API_KEY || !aiClient) {
      res.status(503).json({
        error: 'Servicio de IA no disponible temporalmente (falta configurar API key).',
        fallback:
          'ACBR Pastaza te asesora directamente: Comunicate con nuestro equipo al WhatsApp oficial para resolver cualquier duda sobre la Ley de Corredores de 1984, registros UAFE o el curso de certificación virtual.',
      });
      return;
    }

    const systemPrompt = `Eres el Asesor Jurídico y Vocacional Inmobiliario Oficial de la ACBR Pastaza (Asociación de Corredores de Bienes Raíces de Pastaza en Ecuador).
Tu misión es brindar respuestas rigurosas, claras, precisas y fundamentadas en la legislación ecuatoriana sobre bienes raíces:
1. Ley de Corredores de Bienes Raíces de 1984 (Decreto Legislativo que regula el corretaje, derecho a honorarios, contrato de corretaje).
2. Normativa de la UAFE (Unidad de Análisis Financiero y Económico) para Sujetos Obligados del sector inmobiliario, prevención de lavado de activos y reporte de transacciones sospechosas.
3. Formación y Licencia Profesional CBR con ACBR Pastaza: Modalidad 100% virtual para todo el Ecuador, docentes expertos, redes internacionales (NAR).
4. Seguridad jurídica para propietarios y compradores: Promesa de compraventa, escrituras, levantamiento de gravámenes, plusvalía y alcabalas en municipios de Ecuador.

Personaliza el tono para dirigirte amablemente a ${userName || 'Colega'} de ${userCity || 'Ecuador'}, quien obtuvo ${userScore !== undefined ? userScore : 'un puntaje'} sobre 50 en el Reto Inmobiliario y tiene el perfil de "${userSegment || 'Interesado en Bienes Raíces'}".
Sé profesional, alentador y brinda consejos accionables.`;

    let responseText = '';

    // First attempt with gemini-4-argon with thinkingLevel HIGH as instructed
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-4-argon',
        contents: question || 'Dame un diagnóstico de mi perfil inmobiliario y cómo ACBR Pastaza me ayuda a crecer.',
        config: {
          systemInstruction: systemPrompt,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
        },
      });
      responseText = response.text || '';
    } catch (err: any) {
      console.warn('Falling back from gemini-4-argon to gemini-3.8-flash:', err?.message || err);
      // Fallback to gemini-3.8-flash
      const fallbackResponse = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: question || 'Dame un diagnóstico de mi perfil inmobiliario y cómo ACBR Pastaza me ayuda a crecer.',
        config: {
          systemInstruction: systemPrompt,
        },
      });
      responseText = fallbackResponse.text || '';
    }

    res.json({ text: responseText });
  } catch (error: any) {
    console.error('Error generating AI advice:', error);
    res.status(500).json({
      error: 'Error al consultar el Asesor Inmobiliario',
      details: error.message,
    });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor ACBR Pastaza ejecutándose en http://localhost:${PORT}`);
  });
}

startServer();
