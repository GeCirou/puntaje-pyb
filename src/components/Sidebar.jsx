import { useRef } from 'react';
import { cn } from '../ui/cn';
import { btnSilver, btnTan } from '../ui/buttonStyles';

const REGLAS =
  'Tabla para el punto\n\n 0, 1, 2, 3, 4 - PIDE carta.\n 5 - A Voluntad.\n 6, 7 - PLANTA.\n 8, 9 - Pase definido.\n\n' +
  'Tabla para la banca\n\n Teniendo 0, 1, 2 - PIDE carta.\n Teniendo 3 - PLANTA con 8.\n Teniendo 4 - PLANTA con 1, 8, 9, 0.\n ' +
  'Teniendo 5 - PLANTA con 1, 2, 3, 8, 9, 0.\n Teniendo 6 - PIDE carta con 6, 7.\n Teniendo 7 - PLANTA.\n Teniendo 8, 9 - Pase definido.\n\n' +
  ' Teniendo 5 la banca  y habiendo plantado el punto, la banca PIDE carta.';

const AYUDA =
  'El objetivo de esta app es apuntar los pases de un sabot de Punto y Banca, no guardando estos registros.\n\n' +
  'Esta app permite marcar la suerte ganadora de cada pase utilizando los botones que se encuentran a la derecha, ' +
  'estos pases son registrados de manera secuencial, sin poder saltear un pase.\n\n' +
  'Presionando en las celdas de la tabla, se tendrá la posibilidad de anotar el puntaje de ambas suertes.\n\n' +
  'El botón "Back" permite retroceder un pase, borrando la información anotada.\n' +
  'El botón "Reset" elimina toda la información registrada.\n\n' +
  'El botón "Reglas" da acceso al Reglamento de Naipes que se aplica durante la partida.';

export default function Sidebar({ state, toggleDark, reset }) {
  const resultadosRef = useRef(null);

  const zoomOn = () => {
    if (resultadosRef.current) resultadosRef.current.style.zoom = '50%';
  };
  const zoomOff = () => {
    if (resultadosRef.current) resultadosRef.current.style.zoom = '100%';
  };

  return (
    <aside className="col-start-2 row-start-2 flex flex-col items-center rounded-cell border-2 border-ivory p-1.25 text-base">
      <button
        onClick={toggleDark}
        className={cn(
          'relative mx-auto mt-10 mb-10 flex h-8.75 w-15 items-center rounded-full px-0.75 py-0.5 text-ivory transition-colors duration-300',
          state.dark
            ? 'bg-gradient-to-r from-switch-red from-10% to-black'
            : 'bg-gradient-to-r from-charcoal from-[2%] to-black'
        )}
      >
        <span className="block h-6.75 w-7.5 bg-transparent">&#x2665;</span>
        <span className="block h-6.75 w-7.5 bg-transparent">&#x2663;</span>
      </button>

      <div className="mt-15">
        <button className={cn(btnTan, 'mb-7.5')} onClick={() => alert(REGLAS)}>
          Reglas
        </button>
        <button className={cn(btnTan, 'mb-7.5')} onClick={() => alert(AYUDA)}>
          Ayuda
        </button>
      </div>

      <div
        className="my-10 font-serif-alt text-xl leading-normal font-bold text-ivory"
        ref={resultadosRef}
        onTouchStart={zoomOn}
        onTouchEnd={zoomOff}
      >
        <div className="flex flex-col items-center border-b-2 border-dashed border-ivory p-2.5">
          <label>Pases:</label>
          <label className="justify-self-center text-2xl">{state.pases}</label>
        </div>
        <div className="flex flex-col items-center border-b-2 border-dashed border-ivory p-2.5">
          <label>Punto:</label>
          <label className="justify-self-center text-2xl">{state.puntos}</label>
        </div>
        <div className="flex flex-col items-center border-b-2 border-dashed border-ivory p-2.5">
          <label>Banca:</label>
          <label className="justify-self-center text-2xl">{state.bancas}</label>
        </div>
        <div className="flex flex-col items-center p-2.5">
          <label>Ancar:</label>
          <label className="justify-self-center text-2xl">{state.ancares}</label>
        </div>
      </div>

      <button type="reset" className={cn(btnSilver, 'mt-10 mb-0')} onClick={reset}>
        Reset
      </button>
    </aside>
  );
}
