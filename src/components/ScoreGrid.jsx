import { buildCells, getPositionClass } from '../data/cells';
import GridCell from './GridCell';

const cells = buildCells();
const HEADER_CELL = 'border border-ivory text-center text-xl text-ivory';

export default function ScoreGrid({ active, values, onCellClick }) {
  return (
    <section className="col-start-1 row-start-2 max-w-[500px]">
      <div className="grid grid-cols-6 grid-rows-[repeat(30,1fr)]">
        {/* Fila de encabezado P/B (idéntica al index.html original) */}
        <div className={`${HEADER_CELL} ml-0.75 border-t-4 border-l-4 border-b-4 rounded-tl-cell`}>
          P
        </div>
        <div className={`${HEADER_CELL} mr-0.75 border-t-4 border-r-4 border-b-4 rounded-tr-cell`}>
          B
        </div>
        <div className={`${HEADER_CELL} ml-0.75 border-t-4 border-l-4 border-b-4 rounded-tl-cell`}>
          P
        </div>
        <div className={`${HEADER_CELL} mr-0.75 border-t-4 border-r-4 border-b-4 rounded-tr-cell`}>
          B
        </div>
        <div className={`${HEADER_CELL} ml-0.75 border-t-4 border-l-4 border-b-4 rounded-tl-cell`}>
          P
        </div>
        <div className={`${HEADER_CELL} mr-0.75 border-t-4 border-r-4 border-b-4 rounded-tr-cell`}>
          B
        </div>

        {cells.map(({ id, row, side }) => {
          const key = `${side}${id}`;
          return (
            <GridCell
              key={key}
              positionClass={getPositionClass(row, side)}
              active={!!active[key]}
              value={values[key]}
              onClick={() => onCellClick(id, side)}
            />
          );
        })}
      </div>
    </section>
  );
}
