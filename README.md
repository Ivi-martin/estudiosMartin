# 🎓 Portal de Estudio de Martín

## Estructura del proyecto

```
martin-academy/
│
├── index.html                  ← Portal principal (punto de entrada)
│
├── assets/
│   └── avatar.png              ← Imagen de Martín (cámbiala aquí y se actualiza en toda la app)
│
├── components/
│   ├── config.js               ← ⭐ ARCHIVO PRINCIPAL — edita aquí nombres, profesores, horario y temas
│   ├── components.js           ← Componentes JS reutilizables (header, footer, modales...)
│   └── shared.css              ← Estilos CSS comunes a todas las páginas
│
└── apps/
    └── inglesUnit4.html        ← App de Inglés Unit 4
    └── [futuras apps aquí...]
```

---

## Cómo usar el proyecto

1. Abre la carpeta `martin-academy/` con **VSCode**
2. Instala la extensión **Live Server** (si no la tienes)
3. Haz clic derecho en `index.html` → **"Open with Live Server"**
4. El portal se abrirá en tu navegador en `http://127.0.0.1:5500`

---

## Cómo personalizar

### ✏️ Cambiar el nombre de un profesor
Abre `components/config.js` y edita la sección `teachers`:

```js
teachers: {
  mat:  'Doña Carmen López',
  ing:  'Miss Sarah',
  // ...
},
```

### 📚 Activar una nueva app
Cuando tengas lista una nueva app, ponla en `apps/` y en `config.js` pon la URL en el topic correspondiente:

```js
{ label: 'Unidad 1 – Números hasta el 999', url: 'apps/matesUnidad1.html' },
```

### 🗓️ Actualizar el horario
En `config.js`, sección `schedule.rows`, cada fila es una franja horaria y cada columna un día (Lun–Vie). Usa el `id` de la asignatura (`mat`, `len`, `ing`...) o `recreo` / `empty`.

### 🖼️ Cambiar la imagen de Martín
Reemplaza el archivo `assets/avatar.png` con la nueva imagen (mismo nombre). El cambio se aplica en el portal y en todas las apps automáticamente.

---

## Añadir una nueva app de asignatura

1. Copia `apps/inglesUnit4.html` como plantilla
2. Cambia el contenido de la app
3. En el `<script type="module">` al final del HTML, ya tienes disponibles `CONFIG` y `MA`
4. Registra la app en `config.js` añadiendo la URL al topic correspondiente

---

## Tecnologías

- HTML5 + CSS3 (sin frameworks)
- JavaScript ES6 Modules (import/export)
- Web Speech API (pronunciación en inglés)
- localStorage (exámenes y progreso)
- Live Server de VSCode (servidor local de desarrollo)
