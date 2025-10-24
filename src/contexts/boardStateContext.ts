import { createContext, useContext } from 'react';
import type { BoardStateContextType } from './boardStateProvider';

export const BoardStateContext = createContext<BoardStateContextType | null>(
  null,
);

const useBoardState = () => {
  const boardState = useContext(BoardStateContext);
  if (!boardState) {
    throw new Error('useBoardState must be used within a BoardStateProvider');
  }
  return boardState;
};

export default useBoardState;
