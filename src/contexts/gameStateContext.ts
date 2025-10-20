import { createContext, useContext } from 'react';
import type { GameStateContextType } from './gameStateProvider';

export const GameStateContext = createContext<GameStateContextType | null>(
  null,
);

const useGameState = () => {
  const gameState = useContext(GameStateContext);
  if (!gameState) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return gameState;
};

export default useGameState;
