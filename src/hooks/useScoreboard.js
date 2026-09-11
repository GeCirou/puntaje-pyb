import { useCallback, useEffect, useReducer } from 'react';
import { initialState, scoreboardReducer } from '../reducer/scoreboardReducer';
import { loadState, saveState } from '../storage/localStorage';

// Combina lo guardado con initialState por si en el futuro se agregan
// campos nuevos al estado (evita romper con datos viejos guardados).
function getInitialState() {
  const saved = loadState();
  return saved ? { ...initialState, ...saved } : initialState;
}

export function useScoreboard() {
  const [state, dispatch] = useReducer(scoreboardReducer, undefined, getInitialState);

  // Persiste automáticamente cada vez que cambia el estado.
  useEffect(() => {
    saveState(state);
  }, [state]);

  const registrar = useCallback(
    (side) => {
      if (state.pases >= 90) {
        alert('No hay más espacio.');
        return;
      }
      dispatch({ type: 'REGISTER', side });
    },
    [state.pases]
  );

  const volver = useCallback(() => {
    if (state.pases === 0) {
      alert('aún no pasó nada');
      return;
    }
    dispatch({ type: 'UNDO' });
  }, [state.pases]);

  const reset = useCallback(() => {
    if (confirm('¿Seguro quiere borrar todo?')) {
      dispatch({ type: 'RESET' });
    } else {
      alert('Seguimos jugando.');
    }
  }, []);

  const toggleDark = useCallback(() => dispatch({ type: 'TOGGLE_DARK' }), []);

  const setCellValue = useCallback((id, side) => {
    const num = prompt('¿resultado?');
    if (num !== null) {
      dispatch({ type: 'SET_VALUE', id, side, value: num });
    }
  }, []);

  return { state, registrar, volver, reset, toggleDark, setCellValue };
}
