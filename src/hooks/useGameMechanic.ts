import useBoardStore from '../stores/useBoardStore';
import useGameStore from '../stores/useGameStore';
import { DEFAULT_ROWS_COLS } from '../utils/constants';

const useGameMechanic = () => {
  // Use selective Zustand subscriptions to prevent unnecessary rerenders
  // Only rerender when specific properties change
  const currentPlayer = useBoardStore((state) => state.currentPlayer);
  const generateBoard = useBoardStore((state) => state.generateBoard);
  const movePieceStore = useBoardStore((state) => state.movePiece);
  const togglePlayer = useBoardStore((state) => state.togglePlayer);

  const validMoves = useGameStore((state) => state.validMoves);
  const setValidMoves = useGameStore((state) => state.setValidMoves);
  const clearValidMoves = useGameStore((state) => state.clearValidMoves);
  const getWinner = useGameStore((state) => state.getWinner);
  const isGameStarted = useGameStore((state) => state.isGameStarted);
  const calculateValidMoves = useGameStore((state) => state.calculateValidMoves);
  const getIndexFromId = useGameStore((state) => state.getIndexFromId);

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
