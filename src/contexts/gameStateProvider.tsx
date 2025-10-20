import { useState, type ReactNode } from 'react';
import { DEFAULT_ROWS_COLS } from '../utils/constants';
import type { GameStateType } from '../utils/types';
import { GameStateContext } from './gameStateContext';

const GameStateProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameStateType>(
    Array(DEFAULT_ROWS_COLS ** 2).fill(null),
  );

  return (
    <GameStateContext.Provider
      value={{
        gameState,
        setGameState,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export default GameStateProvider;
