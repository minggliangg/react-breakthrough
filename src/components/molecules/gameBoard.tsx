import { DndContext } from '@dnd-kit/core';
import useGameMechanic from '../../hooks/useGameMechanic';
import type { GameBoardType } from '../../utils/types';
import GameSquare from '../atoms/gameSquare';

interface GameBoardProps {
  rows: number;
  columns: number;
  board: GameBoardType;
}

const GameBoard = ({ rows, columns, board }: GameBoardProps) => {
  const { movePiece } = useGameMechanic();

  return (
    <DndContext
      onDragStart={(event) => {
        console.log(event);
      }}
      onDragEnd={(event) => {
        movePiece({
          active: event.active.id.toString(),
          over: event.over?.id.toString(),
        });
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
                  gamePiece={board[i * columns + j]}
                />
              ))}
          </div>
        ))}
    </DndContext>
  );
};

export default GameBoard;
