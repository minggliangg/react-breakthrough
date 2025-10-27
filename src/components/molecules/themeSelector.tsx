import { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';

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

const ThemeSelector = () => {
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

  return (
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
  );
};

export default ThemeSelector;
