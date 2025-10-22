import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import useGameMechanic from '../../hooks/useGameMechanic';
import type { GameBoardType } from '../../utils/types';
import GameSquare from '../atoms/gameSquare';

interface GameBoardProps {
  rows: number;
  columns: number;
  board: GameBoardType;
}

const GameBoard = ({ rows, columns, board }: GameBoardProps) => {
  const { movePiece, currentPlayer, getValidMoves, validMoves, winner } =
    useGameMechanic();

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => {
        getValidMoves(event.active.id.toString());
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
              .map((_, j) => {
                const index = i * columns + j;
                const gamePiece = board[index];
                return (
                  <GameSquare
                    key={`game-square-${i}-${j}`}
                    id={`square-${i}-${j}`}
                    color={(i + j) % 2 ? 'black' : 'white'}
                    isAvailabeMove={validMoves.includes(index)}
                    gamePiece={gamePiece}
                    isDisabled={
                      winner() != undefined || currentPlayer != gamePiece
                    }
                  />
                );
              })}
          </div>
        ))}
    </DndContext>
  );
};

export default GameBoard;
