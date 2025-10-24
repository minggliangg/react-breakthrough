import { useState } from 'react';
import useBoardState from '../contexts/boardStateContext';
import { getIndexFromId } from '../utils/boardStateUtils';
import { DEFAULT_ROWS_COLS } from '../utils/constants';

const useGameMechanic = () => {
  const { boardState, dispatch } = useBoardState();

  const [validMoves, setValidMoves] = useState<number[]>([]);

  const { board, cols, currentPlayer } = boardState;

  const isGameStarted = board != undefined;

  const winner = () => {
    if (!isGameStarted) return;
    for (let i = 0; i < cols; i++) {
      if (board[i] === 'white') return 'white';
    }

    for (let i = board.length - cols; i < board.length; i++) {
      if (board[i] === 'black') return 'black';
    }

    return;
  };

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
    clearValidMoves();
    if (!over) {
      return;
    }

    const activeIndex = getIndexFromId(active, boardState.cols);
    const overIndex = getIndexFromId(over, boardState.cols);

    if (activeIndex === overIndex || !validMoves.includes(overIndex)) {
      return;
    }

    dispatch({
      type: 'MOVE_PIECE',
      origin: activeIndex,
      destination: overIndex,
    });
  };

  const getValidMoves = (active: string) => {
    const activeIndex = getIndexFromId(active, boardState.cols);

    if (!isGameStarted) {
      return;
    }

    const direction = currentPlayer === 'black' ? 1 : -1;
    const offset = direction * boardState.cols;
    const currentValidMoves = [];

    if (board[activeIndex + offset] == null) {
      currentValidMoves.push(activeIndex + offset);
    }

    if (activeIndex % cols != 0) {
      currentValidMoves.push(activeIndex + offset - 1);
    }
    if (activeIndex % cols != cols - 1) {
      currentValidMoves.push(activeIndex + offset + 1);
    }

    const filteredMoves = currentValidMoves.filter((move) => {
      return board[move] != currentPlayer;
    });

    setValidMoves(filteredMoves);
  };

  const clearValidMoves = () => setValidMoves([]);

  return {
    isGameStarted,
    startGame,
    resetGame,
    movePiece,
    currentPlayer,
    validMoves,
    getValidMoves,
    winner,
  };
};

export default useGameMechanic;
