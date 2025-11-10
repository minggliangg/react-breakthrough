import { create } from 'zustand';
import useBoardStore from './useBoardStore';

type GameState = {
  // Ephemeral state (doesn't persist)
  validMoves: number[];
  selectedSquare: number | undefined;
};

type GameActions = {
  setValidMoves: (moves: number[]) => void;
  clearValidMoves: () => void;
  setSelectedSquare: (square: number | undefined) => void;
  getWinner: () => 'black' | 'white' | undefined;
  isGameStarted: () => boolean;
  calculateValidMoves: (squareIndex: number) => number[];
  getIndexFromId: (id: string) => number;
};

// Computed getters (pure functions)

const useGameStore = create<GameState & GameActions>((set) => ({
  validMoves: [],
  selectedSquare: undefined,
  setValidMoves: (moves: number[]) => set({ validMoves: moves }),
  clearValidMoves: () => set({ validMoves: [] }),
  setSelectedSquare: (square: number | undefined) =>
    set({ selectedSquare: square }),
  getWinner: () => {
    const { board, rows, cols } = useBoardStore.getState();

    // Win condition logic
    if (!board) return undefined;

    // Check white pieces in top row
    for (let i = 0; i < cols; i++) {
      if (board[i] === 'white') return 'white';
    }

    // Check black pieces in bottom row
    const lastRowStart = (rows - 1) * cols;
    for (let i = lastRowStart; i < lastRowStart + cols; i++) {
      if (board[i] === 'black') return 'black';
    }

    return undefined;
  },
  isGameStarted: () => {
    const { currentPlayer } = useBoardStore.getState();
    return currentPlayer !== undefined;
  },
  calculateValidMoves: (squareIndex: number) => {
    const { board, cols, currentPlayer } = useBoardStore.getState();

    if (!board || !currentPlayer) return [];

    const piece = board[squareIndex];
    if (!piece || piece !== currentPlayer) return [];

    const direction = currentPlayer === 'black' ? 1 : -1;
    const offset = direction * cols;
    const currentValidMoves = [];

    if (board[squareIndex + offset] == null) {
      currentValidMoves.push(squareIndex + offset);
    }

    if (squareIndex % cols != 0) {
      currentValidMoves.push(squareIndex + offset - 1);
    }

    // Check right diagonal
    if (squareIndex % cols != cols - 1) {
      currentValidMoves.push(squareIndex + offset + 1);
    }

    // Filter moves to exclude those occupied by current player
    const validMoves = currentValidMoves.filter((move) => {
      return board[move] != currentPlayer;
    });

    return validMoves;
  },
  getIndexFromId: (id: string) => {
    const { cols } = useBoardStore.getState();
    const idSplit = id.split('-');
    const row = Number(idSplit[1]);
    const col = Number(idSplit[2]);
    return row * cols + col;
  },
}));

export default useGameStore;
