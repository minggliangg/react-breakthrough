import type { UniqueIdentifier } from '@dnd-kit/core';
import { useState } from 'react';
import { DEFAULT_ROWS_COLS } from '../utils/constants';
import type { GameStateType } from '../utils/types';

const useGameMechanics = () => {
  const [gameState, setGameState] = useState<GameStateType>(
    Array(DEFAULT_ROWS_COLS ^ 2).fill(null),
  );
  const [isGameStarted, setIsGameStarted] = useState(false);

  const startGame = (
    rows: number = DEFAULT_ROWS_COLS,
    cols: number = DEFAULT_ROWS_COLS,
  ) => {
    const totalSquares = rows * cols;
    setIsGameStarted(true);
    setGameState(
      Array(totalSquares)
        .fill(null)
        .map((_, i) => {
          if (i < cols * 2) {
            return 'black';
          }
          if (i > totalSquares - 2 * cols - 1) {
            return 'white';
          }
          return undefined;
        }),
    );
  };

  const resetGame = () => {
    setGameState(Array(DEFAULT_ROWS_COLS ^ 2).fill(null));
    setIsGameStarted(false);
  };

  const getIndexFromId = (active: string) => {
    const activeSplit = active.split('-');
    const row = Number(activeSplit[1]);
    const col = Number(activeSplit[2]);
    return row * DEFAULT_ROWS_COLS + col;
  };

  const movePiece = ({
    active,
    over,
  }: {
    active: UniqueIdentifier;
    over?: UniqueIdentifier;
  }) => {
    if (!over) {
      return;
    }
    const activeIndex = getIndexFromId(active.toString());
    const overIndex = getIndexFromId(over.toString());

    console.log(`active: ${activeIndex}, over: ${overIndex}`);
    console.log(
      `activeState ${gameState[activeIndex]}, overState ${gameState[overIndex]}`,
    );
    setGameState((prevState) => {
      const newState = [...prevState];
      newState[overIndex] = newState[activeIndex];
      newState[activeIndex] = undefined;
      return newState;
    });
  };

  return { gameState, isGameStarted, startGame, resetGame, movePiece };
};

export default useGameMechanics;
