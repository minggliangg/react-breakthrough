import { DEFAULT_ROWS_COLS } from './constants';

export const getIndexFromId = (active: string) => {
  const activeSplit = active.split('-');
  const row = Number(activeSplit[1]);
  const col = Number(activeSplit[2]);
  return row * DEFAULT_ROWS_COLS + col;
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
