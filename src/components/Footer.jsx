import { cn } from '../ui/cn';
import { btnGold, btnSilver } from '../ui/buttonStyles';

export default function Footer({ registrar, volver }) {
  return (
    <footer className="fixed bottom-[5vh] left-[2vw] mb-2.5 pt-5 text-center text-xl text-ivory transition-colors duration-200 dark:bg-gradient-to-b dark:from-felt-dark dark:from-25% dark:to-black">
      <div className="flex flex-row rounded-cell bg-felt p-2.5">
        <button className={cn(btnGold, 'mr-7.5')} onClick={() => registrar('P')}>
          P
        </button>
        <button className={cn(btnGold, 'mr-7.5')} onClick={() => registrar('B')}>
          B
        </button>
        <button className={btnGold} onClick={() => registrar('A')}>
          A
        </button>
        <button className={cn(btnSilver, 'ml-7.5')} onClick={volver}>
          &#8630;
        </button>
      </div>
    </footer>
  );
}
