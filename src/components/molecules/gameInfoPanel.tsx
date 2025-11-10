import useBoardStore from '../../stores/useBoardStore';
import ThemeSelector from './themeSelector';

interface GameInfoPanelProps {
  onQuit: () => void;
}

const GameInfoPanel = ({ onQuit }: GameInfoPanelProps) => {
  const currentPlayer = useBoardStore((state) => state.currentPlayer);

  return (
    <div className='flex flex-col gap-4'>
      <div className='stats shadow'>
        <div className='stat'>
          <div className='stat-title'>Current player</div>
          <div className='stat-value'>{currentPlayer?.toUpperCase()}</div>
        </div>
      </div>

      <ul className='menu bg-base-200 rounded-box w-72'>
        <li>
          <ThemeSelector />
        </li>
        <li>
          <a onClick={onQuit}>Quit</a>
        </li>
      </ul>
    </div>
  );
};

export default GameInfoPanel;
