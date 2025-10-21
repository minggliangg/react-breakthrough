import { useReducer, type ReactNode, type Reducer } from 'react';
import { DEFAULT_ROWS_COLS } from '../utils/constants';
import { generateInitialBoard, movePiece } from '../utils/gameState';
import type { GameStateType } from '../utils/types';
import { GameStateContext } from './gameStateContext';

type GameStateAction =
  | { type: 'START_GAME'; rows: number; cols: number }
  | { type: 'MOVE_PIECE'; origin: number; destination: number }
  | { type: 'RESET_GAME' };

export type GameStateContextType = {
  gameState: GameStateType;
  dispatch: React.ActionDispatch<[action: GameStateAction]>;
};

const gameStateReducer: Reducer<GameStateType, GameStateAction> = (
  state: GameStateType,
  action: GameStateAction,
): GameStateType => {
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

const GameStateProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, dispatch] = useReducer(gameStateReducer, {
    board: undefined,
    rows: DEFAULT_ROWS_COLS,
    cols: DEFAULT_ROWS_COLS,
    currentPlayer: 'white',
  });

  return (
    <GameStateContext.Provider
      value={{
        gameState,
        dispatch,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export default GameStateProvider;
