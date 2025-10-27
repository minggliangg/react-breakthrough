import { useState } from 'react';
import './App.css';
import GamePage from './components/pages/gamePage';
import StartPage from './components/pages/startPage';

const App = () => {
  const [screen, setScreen] = useState<'start' | 'game'>('start');

  const handleOnQuit = () => setScreen('start');

  return (
    <div className='min-h-screen flex items-center justify-center p-8'>
      {screen === 'start' && <StartPage callback={() => setScreen('game')} />}
      {screen === 'game' && <GamePage onQuit={handleOnQuit} />}
    </div>
  );
};

export default App;
