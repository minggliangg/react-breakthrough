import useBoardStore from '../stores/useBoardStore';
import useGameStore from '../stores/useGameStore';
import { DEFAULT_ROWS_COLS } from '../utils/constants';

const useGameMechanic = () => {
  // Get state and actions from Zustand stores
  const {
    currentPlayer,
    generateBoard,
    movePiece: movePieceStore,
    togglePlayer,
  } = useBoardStore();
  const {
    validMoves,
    setValidMoves,
    clearValidMoves,
    getWinner,
    isGameStarted,
    calculateValidMoves,
    getIndexFromId,
  } = useGameStore();

  const winner = () => {
    return getWinner();
  };

  const startGame = (
    rows: number = DEFAULT_ROWS_COLS,
    cols: number = DEFAULT_ROWS_COLS,
  ) => {
    generateBoard(rows, cols);
  };

  const movePiece = ({ active, over }: { active: string; over?: string }) => {
    clearValidMoves();
    if (!over) {
      return;
    }

    const activeIndex = getIndexFromId(active);
    const overIndex = getIndexFromId(over);

    if (activeIndex === overIndex || !validMoves.includes(overIndex)) {
      return;
    }

    movePieceStore(activeIndex, overIndex);
    togglePlayer();
  };

  const getValidMoves = (active: string) => {
    const activeIndex = getIndexFromId(active);

    if (!isGameStarted()) {
      return;
    }

    const moves = calculateValidMoves(activeIndex);
    setValidMoves(moves);
  };

  return {
    isGameStarted: isGameStarted(),
    startGame,
    movePiece,
    currentPlayer,
    validMoves,
    getValidMoves,
    winner,
  };
};

export default useGameMechanic;
