// El tablero original tiene 90 pases, distribuidos en 3 "columnas" de 30
// filas cada una (P/B por fila). El DOM se recorre fila por fila para que
// el grid (grid-auto-flow por defecto = row) las ubique igual que el
// index.html original: P{r}, B{r}, P{r+30}, B{r+30}, P{r+60}, B{r+60}.
export function buildCells() {
  const cells = [];
  for (let row = 1; row <= 30; row++) {
    for (let group = 0; group < 3; group++) {
      const id = row + 30 * group;
      cells.push({ id, row, side: 'P' });
      cells.push({ id, row, side: 'B' });
    }
  }
  return cells;
}

// Todas las celdas comparten borde fino ivory + tipografía; la última fila
// (30/60/90) cierra el marco abajo con borde grueso + esquina redondeada,
// el resto usa el borde "de en medio" (solo grueso del lado P o B).
// ml-0.75/mr-0.75 = 3px (escala de spacing de Tailwind: 0.75 * 4px).
const CELL_BASE = 'border border-ivory text-center text-xl text-ivory';

export function getPositionClass(row, side) {
  const isLast = row === 30;
  if (side === 'P') {
    return isLast
      ? `${CELL_BASE} ml-0.75 border-b-4 border-l-4 rounded-bl-cell`
      : `${CELL_BASE} ml-0.75 border-l-4`;
  }
  return isLast
    ? `${CELL_BASE} mr-0.75 border-b-4 border-r-4 rounded-br-cell`
    : `${CELL_BASE} mr-0.75 border-r-4`;
}
