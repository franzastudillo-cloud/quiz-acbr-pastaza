import React, { useState, useEffect } from 'react';
import {
  Users,
  Download,
  Search,
  MessageCircle,
  Trash2,
  Settings,
  RefreshCw,
  CheckCircle,
  Clock,
  Award,
  Filter,
  Save,
  ChevronDown,
  Building,
  PhoneCall,
  ArrowLeft,
} from 'lucide-react';
import { Lead, AppConfig } from '../types';
import { Logo } from './Logo';

interface AdminCRMProps {
  onBackToQuiz: () => void;
  config: AppConfig;
  onUpdateConfig: (newConfig: AppConfig) => void;
}

export const AdminCRM: React.FC<AdminCRMProps> = ({
  onBackToQuiz,
  config,
  onUpdateConfig,
}) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [editedConfig, setEditedConfig] = useState<AppConfig>(config);
  const [savingConfig, setSavingConfig] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleStatusChange = async (id: string, newStatus: Lead['status']) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
        showToast('Estado del lead actualizado');
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDeleteLead = async (id: string, name: string) => {
    if (!window.confirm(`¿Estás seguro de eliminar el registro de ${name}?`)) return;

    try {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        showToast('Lead eliminado');
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingConfig(true);
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedConfig),
      });
      if (res.ok) {
        const data = await res.json();
        onUpdateConfig(data.config);
        setShowConfigModal(false);
        showToast('Configuración de ACBR guardada con éxito');
      }
    } catch (err) {
      console.error('Error saving config:', err);
    } finally {
      setSavingConfig(false);
    }
  };

  const handleOpenWhatsAppToLead = (lead: Lead) => {
    const cleanPhone = lead.phone.replace(/\D/g, '');
    let targetNumber = cleanPhone;
    if (targetNumber.startsWith('0')) {
      targetNumber = '593' + targetNumber.substring(1);
    } else if (!targetNumber.startsWith('593')) {
      targetNumber = '593' + targetNumber;
    }

    const message = `¡Hola ${lead.name}! 🏠 Te saludamos de *ACBR Pastaza*. Felicitaciones por completar nuestro Reto Inmobiliario con un puntaje de *${lead.score}/${lead.maxScore} pts* (${lead.rank}). Vimos que tu interés principal es *${lead.segment}*. ¿En qué horario podemos brindarte los detalles del beneficio exclusivo y resolver tus dudas?`;

    window.open(`https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm) ||
      (l.email && l.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = selectedStatus === 'all' || l.status === selectedStatus;
    const matchesSegment = selectedSegment === 'all' || l.segment === selectedSegment;

    return matchesSearch && matchesStatus && matchesSegment;
  });

  // Metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'nuevo').length;
  const contactedLeads = leads.filter((l) => l.status === 'contactado').length;
  const enrolledLeads = leads.filter((l) => l.status === 'matriculado').length;
  const avgScore =
    totalLeads > 0
      ? (leads.reduce((acc, l) => acc + l.score, 0) / totalLeads).toFixed(1)
      : '0';

  return (
    <div className="max-w-6xl w-full mx-auto p-4 md:p-6 text-slate-100">
      {/* Toast Alert */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-sm font-semibold animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-[#0b192c] p-4 md:p-5 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToQuiz}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold"
            title="Volver a la vista del usuario"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Volver al Reto</span>
          </button>
          
          <Logo variant="card" size="sm" />

          <div>
            <div className="flex items-center gap-2">
              <span className="bg-sky-500/20 text-sky-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded border border-sky-500/30">
                PANEL CRM EXCLUSIVO
              </span>
              <span className="text-xs text-slate-400 font-mono">WhatsApp: +593 96 734 9504</span>
            </div>
            <h1 className="text-lg md:text-xl font-black text-white">
              Gestor de Prospectos • ACBR Pastaza
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowConfigModal(true)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border border-slate-700"
          >
            <Settings className="w-4 h-4 text-sky-400" />
            <span>Configuración</span>
          </button>

          <a
            href="/api/leads/export"
            download="leads_acbr_pastaza.csv"
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow"
          >
            <Download className="w-4 h-4" />
            <span>Descargar CSV Excel</span>
          </a>

          <button
            onClick={fetchLeads}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
            title="Recargar leads"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        <div className="bg-[#0b192c] border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Total Prospectos</span>
            <span className="text-xl font-black text-white">{totalLeads}</span>
          </div>
        </div>

        <div className="bg-[#0b192c] border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Nuevos por Contactar</span>
            <span className="text-xl font-black text-amber-300">{newLeads}</span>
          </div>
        </div>

        <div className="bg-[#0b192c] border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Contactados / Alumnos</span>
            <span className="text-xl font-black text-emerald-400">{contactedLeads + enrolledLeads}</span>
          </div>
        </div>

        <div className="bg-[#0b192c] border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Puntaje Promedio</span>
            <span className="text-xl font-black text-indigo-300">{avgScore} / 50 pts</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0b192c] p-4 rounded-2xl border border-slate-800 mb-6 flex flex-wrap gap-3 items-center justify-between">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Buscar por nombre, ciudad o celular..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#060d1a] border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs md:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#060d1a] border border-slate-700 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-sky-400"
          >
            <option value="all">Todos los estados</option>
            <option value="nuevo">Nuevos</option>
            <option value="contactado">Contactados</option>
            <option value="matriculado">Matriculados</option>
            <option value="archivado">Archivados</option>
          </select>

          {/* Segment filter */}
          <select
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
            className="bg-[#060d1a] border border-slate-700 text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-sky-400"
          >
            <option value="all">Todos los intereses</option>
            <option value="Aspirante al Curso / Licencia CBR">Aspirante al Curso / Licencia</option>
            <option value="Corredor / Capacitación Continua">Corredor / Actualización</option>
            <option value="Cliente Propietario / Comprador">Cliente Propietario / Comprador</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-[#0b192c] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="bg-[#0f233d] border-b border-slate-700/80 text-slate-300 uppercase text-[11px] font-extrabold tracking-wider">
              <tr>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Prospecto</th>
                <th className="py-3 px-4">WhatsApp / Contacto</th>
                <th className="py-3 px-4">Ciudad</th>
                <th className="py-3 px-4">Calificación</th>
                <th className="py-3 px-4">Interés</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No se encontraron prospectos con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#112a46]/40 transition">
                    <td className="py-3.5 px-4 text-slate-400 text-xs whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString('es-EC', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                      <div>{lead.name}</div>
                      {lead.email && (
                        <div className="text-[11px] text-slate-400 font-normal">{lead.email}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenWhatsAppToLead(lead)}
                          className="bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/40 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                          title="Contactar directamente por WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{lead.phone}</span>
                        </button>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                      <span className="bg-slate-800 px-2 py-1 rounded text-xs">
                        {lead.city}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`font-black px-2 py-0.5 rounded text-xs ${
                          lead.score >= 40
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : lead.score >= 30
                            ? 'bg-sky-500/20 text-sky-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {lead.score} / {lead.maxScore} pts
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-[200px] truncate text-slate-300 text-xs" title={lead.segment}>
                      {lead.segment}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          handleStatusChange(lead.id, e.target.value as Lead['status'])
                        }
                        className={`text-xs font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                          lead.status === 'nuevo'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : lead.status === 'contactado'
                            ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                            : lead.status === 'matriculado'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-700 text-slate-300 border-slate-600'
                        }`}
                      >
                        <option value="nuevo">Nuevo</option>
                        <option value="contactado">Contactado</option>
                        <option value="matriculado">Matriculado</option>
                        <option value="archivado">Archivado</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteLead(lead.id, lead.name)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition"
                        title="Eliminar registro"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Config Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0b192c] border border-slate-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-sky-400" />
              Configuración de ACBR Pastaza
            </h3>

            <form onSubmit={handleSaveConfig} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Número de WhatsApp Receptor (con 593, sin '+') *
                </label>
                <input
                  type="text"
                  value={editedConfig.whatsappDestination}
                  onChange={(e) =>
                    setEditedConfig({ ...editedConfig, whatsappDestination: e.target.value })
                  }
                  placeholder="Ej. 593998732145"
                  className="w-full bg-[#060d1a] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-sky-400"
                  required
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  A este número llegarán todos los prospectos que hagan clic en reclamar su beneficio.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Nombre de la Institución
                </label>
                <input
                  type="text"
                  value={editedConfig.associationName}
                  onChange={(e) =>
                    setEditedConfig({ ...editedConfig, associationName: e.target.value })
                  }
                  className="w-full bg-[#060d1a] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Beneficio / Descuento Ofrecido
                </label>
                <input
                  type="text"
                  value={editedConfig.scholarshipDiscount}
                  onChange={(e) =>
                    setEditedConfig({ ...editedConfig, scholarshipDiscount: e.target.value })
                  }
                  className="w-full bg-[#060d1a] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Página Web Oficial
                </label>
                <input
                  type="text"
                  value={editedConfig.websiteUrl || 'https://acbirpastaza.com'}
                  onChange={(e) =>
                    setEditedConfig({ ...editedConfig, websiteUrl: e.target.value })
                  }
                  className="w-full bg-[#060d1a] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-sky-400 font-mono text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-300 hover:bg-slate-800 text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={savingConfig}
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white px-5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingConfig ? 'Guardando...' : 'Guardar Cambios'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
