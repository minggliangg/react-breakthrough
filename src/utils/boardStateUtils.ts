import type { GamePieceType } from './types';

export const getIndexFromId = (active: string, cols: number) => {
  const activeSplit = active.split('-');
  const row = Number(activeSplit[1]);
  const col = Number(activeSplit[2]);
  return row * cols + col;
};

export const generateInitialBoard = (rows: number, cols: number) => {
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

export const movePiece = (
  board: (GamePieceType | null)[],
  origin: number,
  destination: number,
) => {
  const next = [...board];
  next[destination] = board[origin];
  next[origin] = null;
  return next;
};
