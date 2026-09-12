import { useRef } from 'react';
import Header from './components/Header';
import ScoreGrid from './components/ScoreGrid';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { useScoreboard } from './hooks/useScoreboard';
import { useWakeLock } from './hooks/useWakeLock';
import { cn } from './ui/cn';

export default function App() {
  const { state, registrar, volver, reset, toggleDark, setCellValue } = useScoreboard();
  useWakeLock();

  const scoreGridRef = useRef(null);

  const zoomOn = () => {
    if (scoreGridRef.current) scoreGridRef.current.style.transform = 'scale(0.5)';
  };
  const zoomOff = () => {
    if (scoreGridRef.current) scoreGridRef.current.style.transform = 'scale(1)';
  };

  return (
    <div
      className={cn(
        'px-8 grid min-h-screen w-full max-w-[600px] grid-cols-[1fr_100px] grid-rows-[75px_auto_60px] font-serif transition-colors duration-200',
        'bg-[linear-gradient(to_bottom,black_0px,var(--color-felt)_75px,var(--color-felt)_calc(100%_-_60px),black_100%)]',
        state.dark &&
          'dark bg-[linear-gradient(to_bottom,black_0px,var(--color-felt-dark)_75px,var(--color-felt-dark)_calc(100%_-_60px),black_100%)]'
      )}
    >
      <Header />
      <ScoreGrid
        ref={scoreGridRef}
        active={state.active}
        values={state.values}
        onCellClick={setCellValue}
      />
      <Sidebar
        state={state}
        toggleDark={toggleDark}
        reset={reset}
        zoomOn={zoomOn}
        zoomOff={zoomOff}
      />
      <Footer registrar={registrar} volver={volver} />
    </div>
  );
}
