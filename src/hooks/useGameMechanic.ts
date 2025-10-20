import useGameState from '../contexts/gameStateContext';
import { DEFAULT_ROWS_COLS } from '../utils/constants';
import { getIndexFromId } from '../utils/gameState';

const useGameMechanic = () => {
  const { gameState, dispatch } = useGameState();
  const isGameStarted = gameState.board != undefined;

  const startGame = (
    rows: number = DEFAULT_ROWS_COLS,
    cols: number = DEFAULT_ROWS_COLS,
  ) => {
    dispatch({ type: 'START_GAME', rows, cols });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  const movePiece = ({ active, over }: { active: string; over?: string }) => {
    if (!over) {
      return;
    }

    const activeIndex = getIndexFromId(active, gameState.cols);
    const overIndex = getIndexFromId(over, gameState.cols);

    if (activeIndex === overIndex) {
      return;
    }

    dispatch({
      type: 'MOVE_PIECE',
      origin: activeIndex,
      destination: overIndex,
    });
  };

  return { isGameStarted, startGame, resetGame, movePiece };
};

export default useGameMechanic;
