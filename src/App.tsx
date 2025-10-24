import './App.css';
import GameBoard from './components/molecules/gameBoard';
import StartPage from './components/pages/startPage';
import useBoardState from './contexts/boardStateContext';
import useGameMechanic from './hooks/useGameMechanic';

const App = () => {
  const {
    boardState: { board, rows, cols },
  } = useBoardState();

  const { isGameStarted, currentPlayer, winner } = useGameMechanic();

  return (
    <div className='min-h-screen flex items-center justify-center p-8'>
      <StartPage />
      <div className='flex gap-4 flex-col'>
        {isGameStarted && (
          <p className='text-center'>
            Current player is {currentPlayer.toLocaleUpperCase()}
          </p>
        )}

        {winner() && <p className='text-center'>Winner is {winner()}</p>}

        {board && (
          <div className='mt-6 flex flex-col items-center'>
            <GameBoard rows={rows} columns={cols} board={board} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
