export const initialState = {
  pases: 0,
  puntos: 0,
  bancas: 0,
  ancares: 0,
  historial: [], // array de 'P' | 'B' | 'A', uno por pase
  active: {}, // { P1: true, B5: true, ... } -> celda marcada
  values: {}, // { P1: '6', B12: '3' } -> número anotado en la celda
  dark: false,
};

export function scoreboardReducer(state, action) {
  switch (action.type) {
    case 'REGISTER': {
      if (state.pases >= 90) return state;
      const pase = state.pases + 1;
      const active = { ...state.active };

      if (action.side === 'A') {
        // Ancar marca P y B del mismo pase (como ancarDio() en el original)
        active[`P${pase}`] = true;
        active[`B${pase}`] = true;
      } else {
        active[`${action.side}${pase}`] = true;
      }

      return {
        ...state,
        pases: pase,
        puntos: state.puntos + (action.side === 'P' ? 1 : 0),
        bancas: state.bancas + (action.side === 'B' ? 1 : 0),
        ancares: state.ancares + (action.side === 'A' ? 1 : 0),
        historial: [...state.historial, action.side],
        active,
      };
    }

    case 'UNDO': {
      if (state.pases === 0) return state;
      const last = state.historial[state.historial.length - 1];
      const pase = state.pases;
      const active = { ...state.active };
      const values = { ...state.values };

      if (last === 'A') {
        delete active[`P${pase}`];
        delete active[`B${pase}`];
        delete values[`P${pase}`];
        delete values[`B${pase}`];
      } else {
        delete active[`${last}${pase}`];
        delete values[`${last}${pase}`];
      }

      return {
        ...state,
        pases: pase - 1,
        puntos: state.puntos - (last === 'P' ? 1 : 0),
        bancas: state.bancas - (last === 'B' ? 1 : 0),
        ancares: state.ancares - (last === 'A' ? 1 : 0),
        historial: state.historial.slice(0, -1),
        active,
        values,
      };
    }

    case 'RESET':
      // Mantiene la preferencia de modo oscuro, borra el resto (igual que reset())
      return { ...initialState, dark: state.dark };

    case 'TOGGLE_DARK':
      return { ...state, dark: !state.dark };

    case 'SET_VALUE':
      return {
        ...state,
        values: { ...state.values, [`${action.side}${action.id}`]: action.value },
      };

    default:
      return state;
  }
}
