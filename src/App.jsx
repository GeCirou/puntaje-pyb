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

  return (
    <div
      className={cn(
        'px-8 grid min-h-screen w-full max-w-[600px] grid-cols-[1fr_100px] grid-rows-[75px_auto_60px] bg-felt font-serif transition-colors duration-200',
        state.dark && 'dark bg-felt-dark'
      )}
    >
      <Header />
      <ScoreGrid
        active={state.active}
        values={state.values}
        onCellClick={setCellValue}
      />
      <Sidebar state={state} toggleDark={toggleDark} reset={reset} />
      <Footer registrar={registrar} volver={volver} />
    </div>
  );
}
