import { DndContext } from '@dnd-kit/core';
import useGameMechanics from '../../hooks/useGameMechanics';
import type { GameStateType } from '../../utils/types';
import GameSquare from '../atoms/game-square';

interface GameBoardProps {
  rows: number;
  columns: number;
  gameState: GameStateType;
}
const GameBoard = ({ rows, columns, gameState }: GameBoardProps) => {
  // TODO: this is wrong. need to use context
  const { movePiece } = useGameMechanics();
  return (
    <DndContext
      onDragEnd={(event) => {
        console.log(event.active.id);
        console.log(event.over?.id);
        movePiece({ active: event.active.id, over: event.over?.id });
      }}
    >
      {Array(rows)
        .fill(0)
        .map((_, i) => (
          <div key={`row-${i}`} className='flex'>
            {Array(columns)
              .fill(0)
              .map((_, j) => (
                <GameSquare
                  key={`game-square-${i}-${j}`}
                  id={`square-${i}-${j}`}
                  color={(i + j) % 2 ? 'black' : 'white'}
                  gamePiece={gameState[i * columns + j]}
                />
              ))}
          </div>
        ))}
    </DndContext>
  );
};

export default GameBoard;
