# Punto y Banca — React

Refactor a React + Vite del proyecto original en HTML/CSS/JS puro.

## Uso local

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción -> carpeta dist/
npm run preview  # sirve el build de producción localmente
```

## Subir a GitHub y deployar en Vercel

**1. Subir el proyecto a GitHub** (desde la carpeta descomprimida):

```bash
cd pyb-react
git init
git add .
git commit -m "Punto y Banca - React + Tailwind"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

(Creá el repo vacío en GitHub primero, sin README ni .gitignore, para que no choque con el push).

**2. Deploy en Vercel:**

1. Andá a [vercel.com/new](https://vercel.com/new) e importá el repo.
2. Vercel debería detectar automáticamente **Framework Preset: Vite**. Si no
   lo detecta, o para estar seguro, el repo ya incluye `vercel.json` con la
   config explícita:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. Dale a **Deploy**. No hay variables de entorno que configurar (el
   proyecto no usa ninguna).

Cualquier push a `main` después del primer deploy se redeploya solo.

## Persistencia

El estado completo (pases, puntos, historial, valores anotados en cada celda,
modo oscuro) se guarda en `localStorage` cada vez que cambia
(`src/storage/localStorage.js` + el `useEffect` en `useScoreboard.js`). Al
refrescar la página, la tabla se restaura tal cual quedó. "Reset" borra todo,
incluido lo guardado. Si `localStorage` no está disponible (modo privado,
etc.) la app sigue funcionando normal, solo que sin recordar el estado entre
recargas.

## Estilos con Tailwind

El proyecto usa **Tailwind CSS v4** (setup nuevo: plugin de Vite, sin
`tailwind.config.js`). Los design tokens de la paleta original —verde paño,
dorado, plata, tostado, las dos tipografías Baskerville— quedaron definidos
en `src/index.css` dentro de un bloque `@theme`, y el modo oscuro sigue
activándose por clase (`.dark` en el div raíz) en vez de por preferencia del
sistema, vía `@custom-variant dark (&:where(.dark, .dark *));`.

- `src/index.css` → tokens de color/tipografía + `@import "tailwindcss"`.
  Incluye `--radius-cell: 10px`, el radio de esquina que se repite en
  celdas, botones y el panel lateral (genera `rounded-cell`,
  `rounded-tl-cell`, etc.).
- `src/ui/buttonStyles.js` → las 3 variantes de botón que se repetían en el
  CSS original (dorado, plata, tostado).
- `src/ui/cn.js` → helper mínimo para combinar clases condicionales.
- `src/data/cells.js` → clases Tailwind de borde/esquina de cada celda.

**Casi no quedan valores arbitrarios en píxeles.** En vez de `mb-[30px]`,
`w-[50px]`, etc., se usa la escala de spacing dinámica de Tailwind v4
(`mb-7.5`, `w-12.5`...), que son múltiplos exactos de 4px — mismo resultado
visual, pero como parte del sistema de escala en vez de números sueltos.
Quedaron arbitrarios solo los valores realmente puntuales del layout general
(`max-w-[425px]`, `grid-rows-[75px_auto_60px]`, `bottom-[5vh]`), que no
tienen un equivalente natural en la escala.

**Celda activa = toda la celda, no solo el botón interno.** Antes el
`<button>` de cada casillero no llenaba el 100% de su caja con borde, así
que al marcar un pase solo se veía un cuadradito de color adentro. Ahora el
botón usa `h-full w-full`, así que todo el rectángulo (borde incluido) pasa
a `bg-cell-active` (negro / gris claro en modo oscuro). El número (la
"caja de texto") también cambia de color junto con el fondo —de tostado a
dorado en modo claro, o a verde oscuro en modo oscuro— para mantener buen
contraste.

## Qué cambió respecto al original

- **180 funciones `numeroP1()`...`numeroB90()` → 1 componente `GridCell` + `data/cells.js`.**
  La grilla de 90 casilleros se genera con un loop en vez de estar hardcodeada
  en el HTML, y cada celda es la misma pieza reutilizada.
- **Estado global centralizado** en `reducer/scoreboardReducer.js` (patrón
  `useReducer`), reemplazando las variables globales (`pases`, `bancas`,
  `puntos`, `ancares`, `historial`) y la manipulación directa del DOM
  (`document.getElementById(...).innerHTML = ...`, `.style.backgroundColor = ...`).
- **Celdas activas vía clase CSS** (`bg-black dark:bg-[#cccccc]` condicional)
  en lugar de setear `backgroundColor` inline por JS — mismo resultado
  visual, más declarativo.
- **`alert` / `confirm` / `prompt`** se mantuvieron tal cual el original para
  no cambiar la experiencia de uso (marcar resultado de celda, confirmar
  reset, etc.). Si en algún momento querés reemplazarlos por modales propios,
  es un buen próximo paso.
- **Wake Lock** (`navigator.wakeLock`) y el **zoom táctil** del panel de
  resultados se portaron a hooks/handlers de React (`useWakeLock`,
  `onTouchStart`/`onTouchEnd` en `Sidebar`).

## Estructura

```
src/
  main.jsx              # entry point
  App.jsx                # arma Header + ScoreGrid + Sidebar + Footer
  index.css              # tokens Tailwind (@theme) + directivas
  data/cells.js           # genera las 90 celdas y sus clases de borde
  storage/localStorage.js # persistencia en localStorage
  reducer/scoreboardReducer.js
  hooks/
    useScoreboard.js      # acciones: registrar, volver, reset, etc.
    useWakeLock.js
  ui/
    buttonStyles.js        # variantes de botón (gold/silver/tan)
    cn.js                  # combinar classNames condicionales
  components/
    Header.jsx
    ScoreGrid.jsx
    GridCell.jsx
    Sidebar.jsx
    Footer.jsx
```
