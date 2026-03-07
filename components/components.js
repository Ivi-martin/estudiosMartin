// ============================================================
// components.js — Componentes compartidos del portal
// Importar en cada HTML con: import { ... } from '../components/components.js'
// ============================================================

import { CONFIG } from './config.js';

// ── Constantes ──────────────────────────────────────────────
const SCHOOL_FULL = `${CONFIG.student.class} · ${CONFIG.student.school} · ${CONFIG.student.location}`;


// ============================================================
// renderOrbs() — Fondo con orbes de color
// ============================================================
export function renderOrbs() {
  return `
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>`;
}


// ============================================================
// renderHeader({ backButton }) — Cabecera del portal
//   backButton: true en las apps de asignatura
// ============================================================
export function renderHeader({ backButton = false } = {}) {
  return `
    <header>
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
        <div class="school-tag">🏫 ${SCHOOL_FULL}</div>
        ${backButton ? `<a href="../index.html" class="btn-back">← Volver al portal</a>` : ''}
      </div>
    </header>`;
}


// ============================================================
// renderFooter() — Pie de página común
// ============================================================
export function renderFooter() {
  return `
    <footer class="shared-footer">
      © Realizado por <span>Iván MOCA</span> &nbsp;·&nbsp; ${SCHOOL_FULL}
    </footer>`;
}


// ============================================================
// renderExamModal() — Modal del calendario de exámenes
// ============================================================
export function renderExamModal() {
  const subjectOptions = CONFIG.subjects
    .map(s => `<option value="${s.name}">${s.icon} ${s.name}</option>`)
    .join('');

  return `
    <div class="modal-overlay" id="modal-exams" onclick="MA.closeModalOutside(event,'modal-exams')">
      <div class="modal">
        <div class="modal-header">
          <span style="font-size:22px">📅</span>
          <div class="modal-title">Calendario de Exámenes</div>
          <button class="modal-close" onclick="MA.closeModal('modal-exams')">✕</button>
        </div>
        <div class="modal-body">
          <div class="exam-list" id="exam-list">
            <div style="text-align:center;padding:20px;color:var(--muted);font-size:13px">No hay exámenes añadidos todavía.</div>
          </div>
          <div class="add-exam-form">
            <div class="form-group">
              <label class="form-label">Fecha</label>
              <input type="date" class="form-input" id="new-exam-date">
            </div>
            <div class="form-group">
              <label class="form-label">Asignatura</label>
              <select class="form-input" id="new-exam-subject">
                <option value="">Seleccionar...</option>
                ${subjectOptions}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Tema / Unidad</label>
              <input type="text" class="form-input" id="new-exam-topic" placeholder="Ej: Unit 4 – Animals">
            </div>
            <button class="btn-add" onclick="MA.addExam()">+ Añadir</button>
          </div>
        </div>
      </div>
    </div>`;
}


// ============================================================
// renderScheduleModal() — Modal del horario semanal
// ============================================================
export function renderScheduleModal() {
  const { times, days, rows } = CONFIG.schedule;

  // Mapa de id → nombre corto para el horario
  const subjectMap = Object.fromEntries(
    CONFIG.subjects.map(s => [s.id, s.name.split(' ')[0]])  // primera palabra
  );
  const labelMap = {
    mat: 'Mates', cono: 'C. Medio', len: 'Lengua', ing: 'Inglés',
    ef: 'Ed. Física', pla: 'Plástica', val: 'Valores/Religión',
    recreo: '☀️ RECREO', empty: '',
  };

  const headers = `
    <div class="sch-head"></div>
    ${days.map(d => `<div class="sch-head">${d}</div>`).join('')}`;

  const bodyRows = rows.map((row, ri) => {
    const isRecreo = row.every(c => c === 'recreo');
    if (isRecreo) return `
      <div class="sch-time">${times[ri]}</div>
      <div class="sch-cell sch-recreo" style="grid-column:span 5">${labelMap.recreo}</div>`;

    const cells = row.map(id => {
      if (!id || id === 'empty') return `<div class="sch-cell sch-empty">–</div>`;
      return `<div class="sch-cell sch-${id}">${labelMap[id] ?? id}</div>`;
    }).join('');

    return `<div class="sch-time">${times[ri]}</div>${cells}`;
  }).join('');

  return `
    <div class="modal-overlay" id="modal-schedule" onclick="MA.closeModalOutside(event,'modal-schedule')">
      <div class="modal">
        <div class="modal-header">
          <span style="font-size:22px">🗓️</span>
          <div class="modal-title">Horario Semanal</div>
          <button class="modal-close" onclick="MA.closeModal('modal-schedule')">✕</button>
        </div>
        <div class="modal-body">
          <div class="schedule-grid">
            ${headers}
            ${bodyRows}
          </div>
          <div class="sch-note">⚠️ Horario orientativo — actualízalo en <code>components/config.js</code> si cambia.</div>
        </div>
      </div>
    </div>`;
}


// ============================================================
// MA — Objeto global con toda la lógica compartida
// Se expone como window.MA para que el HTML inline pueda llamarlo
// ============================================================
export const MA = {

  // ── Exámenes ─────────────────────────────────────────────
  exams: [],

  loadExams() {
    this.exams = JSON.parse(localStorage.getItem('martin-exams') || '[]');
    if (this.exams.length === 0) {
      this.exams = [{ date: '2026-03-17', subject: 'Inglés', topic: "Unit 4 – Animals & Can/Can't" }];
      this.saveExams();
    }
  },

  saveExams() {
    localStorage.setItem('martin-exams', JSON.stringify(this.exams));
  },

  renderExams() {
    const list = document.getElementById('exam-list');
    if (!list) return;
    const today = new Date(); today.setHours(0, 0, 0, 0);

    if (this.exams.length === 0) {
      list.innerHTML = '<div style="text-align:center;padding:20px;color:var(--muted);font-size:13px">No hay exámenes añadidos todavía.</div>';
      this.updateNextExam(); return;
    }

    const sorted = [...this.exams].sort((a, b) => new Date(a.date) - new Date(b.date));
    const nextIdx = sorted.findIndex(e => new Date(e.date) >= today);

    list.innerHTML = sorted.map((e, i) => {
      const d = new Date(e.date + 'T12:00:00');
      const isPast = d < today;
      const isNext = i === nextIdx;
      const dateStr = d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
      const origIdx = this.exams.findIndex(x => x.date === e.date && x.subject === e.subject && x.topic === e.topic);
      return `<div class="exam-row ${isPast ? 'is-past' : ''} ${isNext ? 'is-next' : ''}">
        <div class="exam-date">${isNext ? '⭐ ' : ''}${dateStr}</div>
        <div class="exam-info">
          <div class="exam-subject">${e.subject}</div>
          <div class="exam-topic">${e.topic}</div>
        </div>
        <button class="exam-delete" onclick="MA.deleteExam(${origIdx})" title="Eliminar">🗑</button>
      </div>`;
    }).join('');

    this.updateNextExam();
  },

  updateNextExam() {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const sorted = [...this.exams].sort((a, b) => new Date(a.date) - new Date(b.date));
    const next = sorted.find(e => new Date(e.date) >= today);

    const dateEl    = document.getElementById('next-exam-date');
    const subjectEl = document.getElementById('next-exam-subject');
    const topicEl   = document.getElementById('next-exam-topic');
    if (!dateEl) return;

    if (next) {
      const d = new Date(next.date + 'T12:00:00');
      const diff = Math.ceil((d - today) / 86400000);
      dateEl.textContent    = d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
      subjectEl.textContent = next.subject;
      topicEl.textContent   = diff === 0 ? '¡HOY!' : diff === 1 ? 'Mañana' : `${diff} días`;
    } else {
      dateEl.textContent    = '–';
      subjectEl.textContent = 'Próximo examen';
      topicEl.textContent   = 'Sin exámenes';
    }
  },

  addExam() {
    const date    = document.getElementById('new-exam-date').value;
    const subject = document.getElementById('new-exam-subject').value;
    const topic   = document.getElementById('new-exam-topic').value.trim();
    if (!date || !subject || !topic) { alert('Rellena todos los campos'); return; }
    this.exams.push({ date, subject, topic });
    this.saveExams();
    this.renderExams();
    document.getElementById('new-exam-date').value    = '';
    document.getElementById('new-exam-subject').value = '';
    document.getElementById('new-exam-topic').value   = '';
  },

  deleteExam(idx) {
    if (!confirm('¿Eliminar este examen?')) return;
    this.exams.splice(idx, 1);
    this.saveExams();
    this.renderExams();
  },

  // ── Modales ───────────────────────────────────────────────
  openModal(id) {
    document.getElementById(id)?.classList.add('open');
    if (id === 'modal-exams') this.renderExams();
  },

  closeModal(id) {
    document.getElementById(id)?.classList.remove('open');
  },

  closeModalOutside(e, id) {
    if (e.target.id === id) this.closeModal(id);
  },

  // ── Init ─────────────────────────────────────────────────
  init() {
    this.loadExams();
    this.updateNextExam();
    // Cerrar modales con Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape')
        document.querySelectorAll('.modal-overlay.open')
          .forEach(m => m.classList.remove('open'));
    });
  },
};

// Exponer globalmente para llamadas inline en el HTML
window.MA = MA;
