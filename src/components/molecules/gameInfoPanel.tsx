import useBoardState from '../../contexts/boardStateContext';
import ThemeSelector from './themeSelector';

const GameInfoPanel = () => {
  const {
    boardState: { currentPlayer },
  } = useBoardState();

  return (
    <div className='flex flex-col w-56 gap-4'>
      <div className='stats shadow'>
        <div className='stat'>
          <div className='stat-title'>Current player</div>
          <div className='stat-value'>{currentPlayer.toUpperCase()}</div>
        </div>
      </div>

      <ul className='menu bg-base-200 rounded-box w-56'>
        <li>
          <ThemeSelector />
        </li>
        <li>
          <a>Quit</a>
        </li>
      </ul>
    </div>
  );
};

export default GameInfoPanel;
