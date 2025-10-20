import { useState } from 'react';
import useGameState from '../contexts/gameStateContext';
import { DEFAULT_ROWS_COLS } from '../utils/constants';
import { generateInitialBoard, getIndexFromId } from '../utils/gameState';

const useGameMechanic = () => {
  const { setGameState } = useGameState();
  const [isGameStarted, setIsGameStarted] = useState(false);

  const startGame = (
    rows: number = DEFAULT_ROWS_COLS,
    cols: number = DEFAULT_ROWS_COLS,
  ) => {
    setIsGameStarted(true);
    setGameState(generateInitialBoard(rows, cols));
  };

  const resetGame = () => {
    setGameState(Array(DEFAULT_ROWS_COLS ^ 2).fill(null));
    setIsGameStarted(false);
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

  return { isGameStarted, startGame, resetGame, movePiece };
};

export default useGameMechanic;
