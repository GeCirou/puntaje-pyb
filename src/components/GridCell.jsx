import { cn } from '../ui/cn';

export default function GridCell({ positionClass, active, value, onClick }) {
  return (
    <div className={positionClass}>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'flex h-full w-full items-center justify-center border-none p-0 transition-colors duration-200',
          active
            ? 'bg-cell-active dark:bg-cell-active-dark'
            : 'bg-felt dark:bg-felt-dark'
        )}
      >
        <label
          className={cn(
            'font-serif-alt text-xs font-bold',
            active ? 'text-gold dark:text-felt-dark' : 'text-tan'
          )}
        >
          {value ?? ''}
        </label>
      </button>
    </div>
  );
}
