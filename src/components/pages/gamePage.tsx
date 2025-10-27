import useBoardState from '../../contexts/boardStateContext';
import GameBoard from '../molecules/gameBoard';
import GameInfoPanel from '../molecules/gameInfoPanel';

const GamePage = () => {
  const {
    boardState: { board, rows, cols },
  } = useBoardState();

  if (!board || !rows || !cols) {
    return <span className='loading loading-bars loading-xl' />;
  }

  return (
    <div className='flex gap-4 flex-col md:flex-row'>
      <div className='flex flex-col items-center'>
        <GameBoard board={board} rows={rows} columns={cols} />
      </div>
      <GameInfoPanel />
    </div>
  );
};
export default GamePage;
