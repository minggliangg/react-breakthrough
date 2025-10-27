import useBoardState from '../../contexts/boardStateContext';
import GameBoard from '../molecules/gameBoard';

const GamePage = () => {
  const {
    boardState: { board, rows, cols },
  } = useBoardState();

  if (!board || !rows || !cols) {
    return <span className='loading loading-bars loading-xl' />;
  }

  return (
    <div className='flex flex-col items-center'>
      <GameBoard board={board} rows={rows} columns={cols} />
    </div>
  );
};
export default GamePage;
