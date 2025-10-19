import './App.css';
import GameBoard from './components/molecules/game-board';
import useGameMechanics from './hooks/useGameState';
import { DEFAULT_ROWS_COLS } from './utils/constants';

const App = () => {
  const { gameState, isGameStarted, startGame, resetGame } = useGameMechanics();

  return (
    <>
      <h1>Breakthrough</h1>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={() =>
          isGameStarted
            ? resetGame()
            : startGame(DEFAULT_ROWS_COLS, DEFAULT_ROWS_COLS)
        }
      >
        {isGameStarted ? 'Reset' : 'Start'}
      </button>

      <p>isGameStarted: {isGameStarted.toString()}</p>
      <GameBoard
        rows={DEFAULT_ROWS_COLS}
        columns={DEFAULT_ROWS_COLS}
        gameState={gameState}
      />
    </>
  );
};

export default App;
