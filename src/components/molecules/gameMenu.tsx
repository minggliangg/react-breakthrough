import { useState } from 'react';
import useGameMechanic from '../../hooks/useGameMechanic';
import { DEFAULT_ROWS_COLS } from '../../utils/constants';

const GameMenu = () => {
  const { isGameStarted, startGame, resetGame } = useGameMechanic();
  const [isCustom, setIsCustom] = useState(false);
  const [rows, setRows] = useState(DEFAULT_ROWS_COLS);
  const [cols, setCols] = useState(DEFAULT_ROWS_COLS);

  return (
    <form
      className='flex gap-1 justify-center content-center'
      onSubmit={(event) => {
        event.preventDefault();
        if (isGameStarted) resetGame();
        else startGame(rows, cols);
      }}
    >
      <button className='btn' type='submit'>
        {isGameStarted ? 'Reset' : 'Start'}
      </button>
      <label className='label'>
        <input
          type='checkbox'
          checked={isCustom}
          onChange={() => setIsCustom((prev) => !prev)}
          className='checkbox checkbox-sm checkbox-primary'
        />
        Custom
      </label>

      {isCustom && (
        <>
          <label className='input w-36'>
            <svg
              viewBox='0 0 24 24'
              className='h-[1em] opacity-50'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9 3V21M15 3V21M7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
            </svg>
            <input
              type='number'
              placeholder='Columns'
              min={4}
              max={26}
              value={cols}
              onChange={(e) => setCols(e.currentTarget.valueAsNumber)}
            />
          </label>
          <label className='input w-36'>
            <svg
              viewBox='0 0 24 24'
              className='h-[1em] opacity-50'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M3 9H21M3 15H21M7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
            </svg>
            <input
              type='number'
              placeholder='Rows'
              min={4}
              max={26}
              value={rows}
              onChange={(e) => setRows(e.currentTarget.valueAsNumber)}
            />
          </label>
        </>
      )}
    </form>
  );
};

export default GameMenu;
