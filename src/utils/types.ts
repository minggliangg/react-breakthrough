export type GamePieceType = 'black' | 'white';
export type GameStateType = {
  board: GameBoardType | undefined;
  rows: number;
  cols: number;
};
export type GameBoardType = (GamePieceType | null)[];
