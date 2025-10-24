import {
  useReducer,
  type ActionDispatch,
  type ReactNode,
  type Reducer,
} from 'react';
import { generateInitialBoard, movePiece } from '../utils/boardStateUtils';
import { DEFAULT_ROWS_COLS } from '../utils/constants';
import type { BoardStateType } from '../utils/types';
import { BoardStateContext } from './boardStateContext';

type BoardStateAction =
  | { type: 'START_GAME'; rows: number; cols: number }
  | { type: 'MOVE_PIECE'; origin: number; destination: number }
  | { type: 'RESET_GAME' };

export type BoardStateContextType = {
  boardState: BoardStateType;
  dispatch: ActionDispatch<[action: BoardStateAction]>;
};

const boardStateReducer: Reducer<BoardStateType, BoardStateAction> = (
  state: BoardStateType,
  action: BoardStateAction,
): BoardStateType => {
  switch (action.type) {
    case 'START_GAME':
      return {
        board: generateInitialBoard(action.rows, action.cols),
        rows: action.rows,
        cols: action.cols,
        currentPlayer: Math.random() < 0.5 ? 'white' : 'black',
      };
    case 'MOVE_PIECE':
      return {
        ...state,
        board: movePiece(state.board!, action.origin, action.destination),
        currentPlayer: state.currentPlayer === 'white' ? 'black' : 'white',
      };
    case 'RESET_GAME':
      return {
        board: undefined,
        rows: DEFAULT_ROWS_COLS,
        cols: DEFAULT_ROWS_COLS,
        currentPlayer: 'white',
      };
    default:
      return state;
  }
};

const BoardStateProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, dispatch] = useReducer(boardStateReducer, {
    board: undefined,
    rows: DEFAULT_ROWS_COLS,
    cols: DEFAULT_ROWS_COLS,
    currentPlayer: 'white',
  });

  return (
    <BoardStateContext.Provider
      value={{
        boardState: gameState,
        dispatch,
      }}
    >
      {children}
    </BoardStateContext.Provider>
  );
};

export default BoardStateProvider;
