import './App.css';
import GameBoard from './components/molecules/gameBoard';
import StartPage from './components/pages/startPage';
import useGameState from './contexts/gameStateContext';
import useGameMechanic from './hooks/useGameMechanic';

const App = () => {
  const {
    gameState: { board, rows, cols },
  } = useGameState();

  const { isGameStarted, currentPlayer, winner } = useGameMechanic();

  return (
    <>
      <div className='p-8 flex gap-4 flex-col'>
        <StartPage />

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
    </>
  );
};

export default App;
