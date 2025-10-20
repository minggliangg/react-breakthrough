import { useDroppable } from '@dnd-kit/core';
import type { GamePieceType } from '../../utils/types';
import GamePiece from './gamePiece';

interface GameSquareProps {
  id: string;
  gamePiece: GamePieceType | null;
  color: GamePieceType;
  isAvailabeMove?: boolean;
}

const GameSquare = ({
  id,
  color,
  gamePiece,
  isAvailabeMove = false,
}: GameSquareProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const getSquareColor = () => {
    if (isOver) return 'bg-red-500';
    if (isAvailabeMove) return 'bg-green-500';
    if (color == 'black') return 'bg-blue-500';
    if (color == 'white') return 'bg-white';
  };

  return (
    <div
      ref={setNodeRef}
      className={`w-6 h-6 content-center justify-items-center ${getSquareColor()} hover:bg-yellow-500`}
    >
      {gamePiece && <GamePiece id={`${id}-game-piece`} color={gamePiece} />}
    </div>
  );
};

export default GameSquare;
