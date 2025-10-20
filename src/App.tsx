import './App.css';
import GameBoard from './components/molecules/gameBoard';
import GameMenu from './components/molecules/gameMenu';
import useGameState from './contexts/gameStateContext';

const App = () => {
  const {
    gameState: { board, rows, cols },
  } = useGameState();

  return (
    <div className='p-8 flex gap-4 flex-col'>
      <h1 className='text-4xl font-bold text-center'>Breakthrough</h1>

      <GameMenu />

      {board && (
        <div className='mt-6 flex flex-col items-center'>
          <GameBoard rows={rows} columns={cols} board={board} />
        </div>
      )}
    </div>
  );
};

export default App;
