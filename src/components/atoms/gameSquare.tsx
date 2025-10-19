import { useDroppable } from '@dnd-kit/core';
import type { GamePieceType } from '../../utils/types';
import GamePiece from './gamePiece';

interface GameSquareProps {
  id: string;
  gamePiece: GamePieceType | null;
  color: GamePieceType;
}

const GameSquare = ({ id, color, gamePiece }: GameSquareProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const squareColor = isOver
    ? 'bg-red-500'
    : color === 'black'
      ? 'bg-blue-500'
      : 'bg-white';

  return (
    <div
      ref={setNodeRef}
      className={`w-6 h-6 content-center justify-items-center ${squareColor} hover:bg-yellow-500`}
    >
      {gamePiece && <GamePiece id={`${id}-game-piece`} color={gamePiece} />}
    </div>
  );
};

export default GameSquare;
