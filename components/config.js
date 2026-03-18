// ============================================================
// config.js — Fuente de verdad para toda la academia
// Edita aquí y cambia en todos los HTMLs a la vez
// ============================================================

export const CONFIG = {
  student: {
    name: 'Martín',
    class: '2ºA',
    school: 'C.E.I.P. Francisco Ayala',
    location: 'Ogíjares',
    year: '2025–2026',
    avatar: '../assets/avatar.png',  // relativo a apps/
  },

  // ── Profesores ── edita aquí el nombre de cada uno
  teachers: {
    mat:  'Nombre del/la profe',
    cono: 'Nombre del/la profe',
    len:  'Nombre del/la profe',
    ing:  'Nombre del/la profe',
    ef:   'Nombre del/la profe',
    pla:  'Nombre del/la profe',
    val:  'Nombre del/la profe',
    vida: 'Nombre del/la profe',
  },

  // ── Asignaturas ──
  subjects: [
    {
      id: 'mat', icon: '🔢', name: 'Matemáticas',
      color: '#3b82f6', colorBg: 'rgba(59,130,246,0.12)', colorText: '#93c5fd',
      topics: [
        //{ label: 'Unidad 1 – Números hasta el 999', url: null },
        //{ label: 'Unidad 2 – Sumas y restas',       url: null },
        //{ label: 'Unidad 3 – Multiplicación',        url: null },
        //{ label: 'Unidad 4 – Geometría',             url: null },
        { label: 'Unidad 6 – Una tarde de juegos',         url: 'apps/mat6.html' },
        { label: 'Act. Evaluable – Cálculo (sumas/restas)', url: 'apps/matCalculo.html' },
      ],
    },
    {
      id: 'cono', icon: '🌍', name: 'Conocimiento del Medio',
      color: '#10b981', colorBg: 'rgba(16,185,129,0.12)', colorText: '#6ee7b7',
      topics: [
        //{ label: 'Unidad 1 – El cuerpo humano', url: null },
        //{ label: 'Unidad 2 – Los animales',     url: null },
        //{ label: 'Unidad 3 – Las plantas',      url: null },
      ],
    },
    {
      id: 'len', icon: '📖', name: 'Lengua Castellana',
      color: '#f43f5e', colorBg: 'rgba(244,63,94,0.12)', colorText: '#fda4af',
      topics: [
        //{ label: 'Unidad 1 – Lectura y comprensión', url: null },
        //{ label: 'Unidad 2 – Ortografía',            url: null },
        //{ label: 'Unidad 3 – Gramática',             url: null },
      ],
    },
    {
      id: 'ing', icon: '🇬🇧', name: 'Inglés',
      color: '#8b5cf6', colorBg: 'rgba(139,92,246,0.12)', colorText: '#c4b5fd',
      topics: [
        //{ label: 'Unit 1 – Hello!',                    url: null },
        //{ label: 'Unit 2 – My Family',                 url: null },
        //{ label: 'Unit 3 – My School',                 url: null },
        { label: "Unit 4 – Animals & Can/Can't",       url: 'apps/inglesUnit4.html' },
        //{ label: 'Unit 5 – Food & Drinks',             url: null },
        //{ label: 'Unit 6 – My Day',                    url: null },
      ],
    },
    {
      id: 'ef', icon: '⚽', name: 'Educación Física',
      color: '#f97316', colorBg: 'rgba(249,115,22,0.12)', colorText: '#fdba74',
      topics: [
        //{ label: 'Tema 1 – El cuerpo en movimiento', url: null },
        //{ label: 'Tema 2 – Juegos y deportes',       url: null },
      ],
    },
    {
      id: 'pla', icon: '🎨', name: 'Plástica',
      color: '#d946ef', colorBg: 'rgba(217,70,239,0.12)', colorText: '#f0abfc',
      topics: [
        //{ label: 'Tema 1 – El color y las formas', url: null },
        //{ label: 'Tema 2 – Técnicas plásticas',    url: null },
      ],
    },
    {
      id: 'val', icon: '🕊️', name: 'Valores / Religión',
      color: '#64748b', colorBg: 'rgba(100,116,139,0.12)', colorText: '#cbd5e1',
      topics: [
        //{ label: 'Tema 1 – Los valores personales',  url: null },
        //{ label: 'Tema 2 – Convivencia y respeto',   url: null },
      ],
    },
    {
      id: 'vida', icon: '🌱', name: 'La Vida',
      color: '#16a34a', colorBg: 'rgba(22,163,74,0.12)', colorText: '#86efac',
      topics: [
        { label: '🛌 Sueño y descanso',        url: 'apps/vidaSueno.html' },
        { label: '🥗 Alimentación sana',        url: 'apps/vidaAlim.html' },
        { label: '🏃 Movimiento y ejercicio',   url: 'apps/vidaMove.html' },
        { label: '❤️ Emociones',               url: 'apps/vidaEmoc.html' },
        { label: '🧹 Hábitos',                 url: 'apps/vidaHabit.html' },
        { label: '🌱 Valores',                  url: 'apps/vidaVals.html' },
        { label: '🧩 TEA',                      url: 'apps/vidaTEA.html' },
        { label: '🛡️ Bullying',               url: 'apps/vidaBullying.html' },
      ],
    },
  ],

  // ── Próximos exámenes ── edita aquí para añadir o quitar
  // Formato: { date: 'YYYY-MM-DD', subject: 'Nombre', topic: 'Descripción' }
  exams: [
    { date: '2026-03-20', subject: 'Matemáticas',   topic: "Actividad Evaluable Cálculo" },
  ],

  // ── Horario semanal ──
  // null = celda vacía
  schedule: {
    times: ['9:00', '10:00', '11:00', '11:00', '12:00', '12:30', '13:30'],
    days:  ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    rows: [
      // [Lunes, Martes, Miércoles, Jueves, Viernes]  — id de asignatura o 'recreo'/'empty'
      ['val',    'cono',  'ef',    'val',   'ing'  ],
      ['len',    'ef',    'mat',   'len',   'len'  ],
      ['ing',    'pla',   'mat',   'len',   'len'  ],
      ['mat',    'mat',   'ing',   'ef',    'pla'  ],
      ['recreo', 'recreo','recreo','recreo','recreo'],
      ['mat',    'mat',   'ing',   'ef',    'cono' ],
      ['cono',   'len',   'len',   'mat',   'mat'  ],
    ],
  },
};
