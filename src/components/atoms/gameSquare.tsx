import { useDroppable } from '@dnd-kit/core';
import { memo } from 'react';
import type { GamePieceType } from '../../utils/types';
import GamePiece from './gamePiece';

interface GameSquareProps {
  id: string;
  gamePiece: GamePieceType | null;
  color: GamePieceType;
  isAvailabeMove?: boolean;
  isDisabled?: boolean;
}

const GameSquare = memo(
  ({
    id,
    color,
    gamePiece,
    isAvailabeMove = false,
    isDisabled = false,
  }: GameSquareProps) => {
    const { setNodeRef } = useDroppable({
      id: id,
    });

    const getSquareColor = () => {
      let colorStyleString;
      if (color === 'black') colorStyleString = 'bg-accent-content';
      if (color === 'white') colorStyleString = 'bg-accent';
      if (isAvailabeMove)
        colorStyleString = `${colorStyleString} border-green-500 border-2`;

      return colorStyleString;
    };

    return (
      <div
        ref={setNodeRef}
        className={`w-8 h-8 flex items-center justify-center ${getSquareColor()} ${!isDisabled && ' hover:border-yellow-500 hover:border-2'} m-0.5 rounded-xs`}
      >
        {gamePiece && (
          <GamePiece
            id={`${id}-game-piece`}
            color={gamePiece}
            isDisabled={isDisabled}
          />
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom equality check - only rerender if these specific props change
    // Ignore id and color as they're derived from board position
    return (
      prevProps.gamePiece === nextProps.gamePiece &&
      prevProps.isAvailabeMove === nextProps.isAvailabeMove &&
      prevProps.isDisabled === nextProps.isDisabled
    );
  },
);

GameSquare.displayName = 'GameSquare';

export default GameSquare;
