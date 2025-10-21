export type GamePieceType = 'black' | 'white';
export type GameStateType = {
  board: GameBoardType | undefined;
  rows: number;
  cols: number;
  currentPlayer: GamePieceType;
};
export type GameBoardType = (GamePieceType | null)[];
