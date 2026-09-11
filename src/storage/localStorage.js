const STORAGE_KEY = 'pyb-scoreboard-v1';

// Lee el estado guardado. Si no hay nada, o localStorage no está
// disponible (modo privado, SSR, etc.), devuelve null y la app arranca
// con el estado inicial de siempre.
export function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (error) {
    console.log('No se pudo leer el estado guardado: ' + error);
    return null;
  }
}

export function saveState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.log('No se pudo guardar el estado: ' + error);
  }
}

export function clearState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.log('No se pudo borrar el estado guardado: ' + error);
  }
}
