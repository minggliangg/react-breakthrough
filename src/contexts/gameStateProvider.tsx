import { useState, type ReactNode } from 'react';
import { DEFAULT_ROWS_COLS } from '../utils/constants';
import type { GameStateType } from '../utils/types';
import { GameStateContext } from './gameStateContext';

const GameStateProvider = ({ children }: { children: ReactNode }) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameState, setGameState] = useState<GameStateType>(
    Array(DEFAULT_ROWS_COLS ** 2).fill(null),
  );

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
          return null;
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

  const movePiece = ({ active, over }: { active: string; over?: string }) => {
    if (!over) {
      return;
    }
    const activeIndex = getIndexFromId(active);
    const overIndex = getIndexFromId(over);

    if (activeIndex === overIndex) {
      return;
    }

    setGameState((prevState) => {
      const newState = [...prevState];
      newState[overIndex] = newState[activeIndex];
      newState[activeIndex] = null;
      return newState;
    });
  };

  return (
    <GameStateContext.Provider
      value={{
        gameState,
        setGameState,
        startGame,
        resetGame,
        movePiece,
        isGameStarted,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export default GameStateProvider;
