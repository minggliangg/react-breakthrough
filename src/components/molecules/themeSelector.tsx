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
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className='w-full text-left'>
        Change theme
        <span className='text-xs opacity-60 ml-2'>({currentTheme})</span>
      </button>

      <div className={`modal flex ${isOpen ? 'modal-open' : ''}`}>
        <div className='modal-box flex flex-col'>
          <h3 className='font-bold text-lg'>Select Theme</h3>
          <div className='grid grid-cols-2 gap-2 overflow-y-auto'>
            {THEMES.map((theme) => (
              <button
                key={theme}
                onClick={() => handleThemeChange(theme)}
                className={`btn btn-sm justify-start ${
                  currentTheme === theme ? 'btn-active' : 'btn-ghost'
                }`}
              >
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </button>
            ))}
          </div>
          <div className='modal-action'>
            <button onClick={() => setIsOpen(false)} className='btn'>
              Close
            </button>
          </div>
        </div>
        <div className='modal-backdrop' onClick={() => setIsOpen(false)}>
          <button>close</button>
        </div>
      </div>
    </>
  );
};

export default ThemeSelector;
