import { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';
import useBoardState from '../../contexts/boardStateContext';

const THEMES = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
];

const GameInfoPanel = () => {
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project

    // Get initial theme from localStorage or data attribute
    const theme =
      localStorage.getItem('theme') ||
      document.documentElement.getAttribute('data-theme') ||
      'light';
    setCurrentTheme(theme);
  }, []);

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

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
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='w-full text-left'>
              Change theme
              <span className='text-xs opacity-60 ml-2'>({currentTheme})</span>
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow max-h-64 overflow-y-auto'
            >
              {THEMES.map((theme) => (
                <li key={theme}>
                  <button
                    onClick={() => handleThemeChange(theme)}
                    className={currentTheme === theme ? 'active' : ''}
                  >
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </li>
        <li>
          <a>Quit</a>
        </li>
      </ul>
    </div>
  );
};

export default GameInfoPanel;
