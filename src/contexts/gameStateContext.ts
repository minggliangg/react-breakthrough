import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type { GameStateType } from '../utils/types';

type GameStateContextType = {
  gameState: GameStateType;
  setGameState: Dispatch<SetStateAction<GameStateType>>;
  startGame: (rows: number, cols: number) => void;
  resetGame: () => void;
  movePiece: ({ active, over }: { active: string; over?: string }) => void;
  isGameStarted: boolean;
};

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
