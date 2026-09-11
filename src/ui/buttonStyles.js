// Réplica del selector global `button{}` del style.css original (altura,
// tipografía, radio) + los 3 degradés que se repetían: dorado (P/B/A),
// plata (volver/reset) y tostado (reglas/ayuda).
const BASE =
  'mx-auto h-10 w-12.5 p-1.25 rounded-cell font-serif text-xl font-bold text-black transition-colors';

export const btnGold = `${BASE} bg-gradient-to-br from-gold to-gold-dark`;
export const btnSilver = `${BASE} w-20 bg-gradient-to-br from-silver from-65% to-charcoal`;
export const btnTan = `${BASE} w-20 bg-gradient-to-br from-tan from-60% to-tan-dark`;
