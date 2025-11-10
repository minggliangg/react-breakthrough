import { create } from 'zustand';
import type { GamePieceType } from '../utils/types';

type BoardState = {
  board: (GamePieceType | null)[];
  rows: number;
  cols: number;
  currentPlayer: GamePieceType | undefined;
};

type BoardActions = {
  generateBoard: (rows: number, cols: number) => void;
  movePiece: (from: number, to: number) => void;
  togglePlayer: () => void;
  resetBoard: () => void;
};

const generateInitialBoard = (
  rows: number,
  cols: number,
): (GamePieceType | null)[] => {
  const totalSquares = rows * cols;
  return Array(totalSquares)
    .fill(null)
    .map((_, i) => {
      if (i < cols * 2) {
        return 'black';
      }
      if (i > totalSquares - 2 * cols - 1) {
        return 'white';
      }
      return null;
    });
};

const useBoardStore = create<BoardState & BoardActions>((set) => ({
  board: [],
  rows: 0,
  cols: 0,
  currentPlayer: undefined,

  generateBoard: (rows: number, cols: number) => {
    const board = generateInitialBoard(rows, cols);
    const currentPlayer: GamePieceType =
      Math.random() < 0.5 ? 'white' : 'black';
    set({ board, rows, cols, currentPlayer });
  },

  movePiece: (from: number, to: number) => {
    set((state) => {
      const newBoard = [...state.board];
      const piece = newBoard[from];
      newBoard[from] = null;
      newBoard[to] = piece;
      return { board: newBoard };
    });
  },

  togglePlayer: () => {
    set((state) => ({
      currentPlayer: state.currentPlayer === 'white' ? 'black' : 'white',
    }));
  },

  resetBoard: () => {
    set({ board: [], rows: 0, cols: 0, currentPlayer: undefined });
  },
}));

export default useBoardStore;
