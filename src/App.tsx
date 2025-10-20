import './App.css';
import GameBoard from './components/molecules/gameBoard';
import useGameState from './contexts/gameStateContext';
import useGameMechanic from './hooks/useGameMechanic';

import { DEFAULT_ROWS_COLS } from './utils/constants';

const App = () => {
  const { gameState } = useGameState();
  const { isGameStarted, startGame, resetGame } = useGameMechanic();

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
