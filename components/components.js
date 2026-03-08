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
      © Realizado por <span>Iván MOCA</span>
    </footer>`;
}


// ============================================================
// renderExamModal() — Modal de exámenes (solo lectura)
// Los exámenes se editan en components/config.js
// ============================================================
export function renderExamModal() {
  return `
    <div class="modal-overlay" id="modal-exams" onclick="MA.closeModalOutside(event,'modal-exams')">
      <div class="modal">
        <div class="modal-header">
          <span style="font-size:22px">📅</span>
          <div class="modal-title">Próximos Exámenes</div>
          <button class="modal-close" onclick="MA.closeModal('modal-exams')">✕</button>
        </div>
        <div class="modal-body">
          <div class="exam-list" id="exam-list"></div>
        </div>
      </div>
    </div>`;
}


// ============================================================
// renderScheduleModal() — Modal del horario semanal
// ============================================================
export function renderScheduleModal() {
  const { times, days, rows } = CONFIG.schedule;

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
// MA — Objeto global con la lógica compartida
// ============================================================
export const MA = {

  // ── Exámenes (solo lectura desde CONFIG) ─────────────────
  renderExams() {
    const list = document.getElementById('exam-list');
    if (!list) return;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const exams = (CONFIG.exams || []).slice().sort((a, b) => new Date(a.date) - new Date(b.date));
    const nextIdx = exams.findIndex(e => new Date(e.date) >= today);

    if (exams.length === 0) {
      list.innerHTML = '<div style="text-align:center;padding:20px;color:var(--muted);font-size:13px">No hay exámenes programados.</div>';
      return;
    }

    list.innerHTML = exams.map((e, i) => {
      const d = new Date(e.date + 'T12:00:00');
      const isPast = d < today;
      const isNext = i === nextIdx;
      const dateStr = d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
      return `<div class="exam-row ${isPast ? 'is-past' : ''} ${isNext ? 'is-next' : ''}">
        <div class="exam-date">${isNext ? '⭐ ' : ''}${dateStr}</div>
        <div class="exam-info">
          <div class="exam-subject">${e.subject}</div>
          <div class="exam-topic">${e.topic}</div>
        </div>
      </div>`;
    }).join('');
  },

  updateNextExam() {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const exams = (CONFIG.exams || []).slice().sort((a, b) => new Date(a.date) - new Date(b.date));
    const next  = exams.find(e => new Date(e.date) >= today);

    const dateEl    = document.getElementById('next-exam-date');
    const subjectEl = document.getElementById('next-exam-subject');
    const topicEl   = document.getElementById('next-exam-topic');
    if (!dateEl) return;

    if (next) {
      const d    = new Date(next.date + 'T12:00:00');
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
    this.updateNextExam();
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape')
        document.querySelectorAll('.modal-overlay.open')
          .forEach(m => m.classList.remove('open'));
    });
  },
};

// Exponer globalmente para llamadas inline en el HTML
window.MA = MA;
